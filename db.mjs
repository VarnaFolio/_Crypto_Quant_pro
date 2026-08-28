import pg from "pg";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const { Pool } = pg;
const systemUserId = process.env.PAPER_DATABASE_USER_ID || "00000000-0000-0000-0000-000000000001";
const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

export function createDatabasePool(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) return null;
  return new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX || 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });
}

export async function withTransaction(pool, operation) {
  if (!pool) throw new Error("DATABASE_URL is not configured");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await operation(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function readPaperStoreFromDatabase(pool) {
  return withTransaction(pool, async (client) => {
    await ensureSystemUser(client);
    const result = await client.query("SELECT payload FROM paper_state WHERE id = TRUE");
    return result.rows[0]?.payload || { cash: 12450.8, positions: [], orders: [] };
  });
}

export async function writePaperStoreToDatabase(pool, store) {
  return withTransaction(pool, async (client) => {
    await ensureSystemUser(client);
    await client.query(
      "INSERT INTO paper_state (id, payload, updated_at) VALUES (TRUE, $1::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()",
      [JSON.stringify(store)],
    );
    for (const user of store.users || []) {
      await client.query(
        "INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash, updated_at = NOW()",
        [user.id, user.email, user.passwordHash || null],
      );
    }
    await client.query("DELETE FROM balances WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM positions WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM orders WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM trades WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM alerts WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM alert_events WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM audit_logs WHERE user_id = $1", [systemUserId]);
    await client.query("DELETE FROM payment_transactions WHERE user_id = $1", [systemUserId]);
    await client.query("INSERT INTO balances (user_id, asset, available, reserved) VALUES ($1, 'USD', $2, $3)", [systemUserId, store.cash, store.reservedCash]);
    for (const [asset, reserved] of Object.entries(store.reservedAssets || {})) {
      await client.query("INSERT INTO balances (user_id, asset, reserved) VALUES ($1, $2, $3)", [systemUserId, asset, reserved]);
    }
    for (const position of store.positions || []) {
      await client.query("INSERT INTO positions (user_id, symbol, amount, average_entry) VALUES ($1, $2, $3, $4)", [systemUserId, position.symbol, position.amount, position.avgBuy]);
    }
    for (const order of store.orders || []) {
      await client.query("INSERT INTO orders (id, user_id, symbol, side, type, status, price, quantity, quote_amount, fee, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb)", [order.id, systemUserId, order.symbol, order.side, order.type, order.status, order.price, order.quantity, order.quoteAmount, order.fee || 0, JSON.stringify(order)]);
    }
    for (const trade of store.trades || []) {
      await client.query("INSERT INTO trades (id, order_id, user_id, symbol, side, price, quantity, quote_amount, fee, realized_pnl, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb)", [trade.id, trade.orderId || null, systemUserId, trade.symbol, trade.side, trade.price, trade.quantity, trade.quoteAmount, trade.fee || 0, trade.realizedPnl || 0, JSON.stringify(trade)]);
    }
    for (const alert of store.alerts || []) {
      await client.query("INSERT INTO alerts (id, user_id, symbol, condition, target, enabled, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)", [alert.id, systemUserId, alert.symbol, alert.condition, alert.target, alert.enabled, JSON.stringify(alert)]);
    }
    for (const event of store.alertEvents || []) {
      await client.query("INSERT INTO alert_events (id, alert_id, user_id, value, metadata) VALUES ($1, $2, $3, $4, $5::jsonb)", [event.id, event.alertId || null, systemUserId, event.value, JSON.stringify(event)]);
    }
    for (const entry of store.auditLog || []) {
      await client.query("INSERT INTO audit_logs (id, user_id, action, ip, metadata, created_at) VALUES ($1, $2, $3, $4, $5::jsonb, $6)", [entry.id, entry.userId || null, entry.action, entry.ip, JSON.stringify(entry.metadata || {}), entry.createdAt]);
    }
    for (const payment of store.paymentLedger || []) {
      await client.query("INSERT INTO payment_transactions (id, event_id, payment_intent_id, user_id, amount_cents, currency, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [payment.id, payment.eventId, payment.paymentIntentId, payment.userId || null, payment.amount, payment.currency, payment.status, payment.createdAt]);
    }
    return store;
  });
}

export async function removeLegacyPaperStoreFile(legacyPath = join(rootDirectory, "paper-store.json")) {
  await unlink(legacyPath).catch((error) => {
    if (error?.code !== "ENOENT") throw error;
  });
}

async function ensureSystemUser(client) {
  await client.query(
    "INSERT INTO users (id, email) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
    [systemUserId, "paper-system@localhost"],
  );
}