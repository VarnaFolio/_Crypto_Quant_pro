import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { test, before, after } from "node:test";
import { validateExchangeTradingPolicy } from "./config.mjs";
import { createLogger, sanitizeLogPayload } from "./logger.mjs";
import { createMonitor, getDefaultMonitorSummary } from "./monitoring.mjs";

const port = 3240;
const baseUrl = `http://127.0.0.1:${port}`;
const storePath = `paper-store.json.test-${process.pid}`;
let serverProcess;

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.json();
  return { response, body };
}

before(async () => {
  await rm(storePath, { force: true });
  serverProcess = spawn(process.execPath, ["server.mjs"], {
    env: { ...process.env, PORT: String(port), PAPER_STORE_PATH: storePath },
    stdio: "ignore",
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const { response } = await request("/api/paper/state");
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Test server did not become ready");
});

after(async () => {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM");
  }
  await rm(storePath, { force: true });
  await rm(`${storePath}.tmp`, { force: true });
});

test("requires sandbox/testnet validation before enabling live real trading", () => {
  const previous = {
    REAL_TRADING_ENABLED: process.env.REAL_TRADING_ENABLED,
    BINANCE_WITHDRAWALS_ENABLED: process.env.BINANCE_WITHDRAWALS_ENABLED,
    BINANCE_API_KEY: process.env.BINANCE_API_KEY,
    BINANCE_API_SECRET: process.env.BINANCE_API_SECRET,
    BINANCE_SANDBOX_MODE: process.env.BINANCE_SANDBOX_MODE,
  };

  try {
    process.env.REAL_TRADING_ENABLED = "true";
    process.env.BINANCE_WITHDRAWALS_ENABLED = "false";
    process.env.BINANCE_API_KEY = "test-key";
    process.env.BINANCE_API_SECRET = "test-secret";
    delete process.env.BINANCE_SANDBOX_MODE;
    assert.throws(() => validateExchangeTradingPolicy(), /BINANCE_SANDBOX_MODE=true/i);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("sanitizes sensitive fields from structured logs", () => {
  const payload = {
    apiKey: "abc123",
    secret: "super-secret",
    nested: { token: "token-abc", safe: "ok" },
  };

  const sanitized = sanitizeLogPayload(payload);
  assert.equal(sanitized.apiKey, "[REDACTED]");
  assert.equal(sanitized.secret, "[REDACTED]");
  assert.equal(sanitized.nested.token, "[REDACTED]");
  assert.equal(sanitized.nested.safe, "ok");
});

test("monitoring summary exposes health and error counts", async () => {
  const monitor = createMonitor({ service: "crypto-quant-pro" });
  monitor.record({ category: "security", severity: "error", message: "emergency stop enabled" });
  monitor.record({ category: "validation", severity: "warning", message: "bad input" });
  monitor.record({ event: "websocket.reconnect", category: "operational", severity: "warning", message: "reconnect scheduled", symbol: "BTC" });

  const summary = monitor.snapshot();
  assert.equal(summary.service, "crypto-quant-pro");
  assert.equal(summary.errorCounts.security, 1);
  assert.equal(summary.warningCounts.validation, 1);
  assert.equal(summary.websocketReconnects, 1);
  assert.equal(summary.status, "degraded");

  const defaultSummary = getDefaultMonitorSummary();
  assert.equal(defaultSummary.service, "crypto-quant-pro");
  assert.ok(Array.isArray(defaultSummary.errorCounts));

  const monitoring = await request("/api/monitoring/summary");
  assert.equal(monitoring.response.status, 200);
  assert.ok(Object.hasOwn(monitoring.body, "status"));
  assert.ok(Object.hasOwn(monitoring.body, "uptimeSeconds"));
  assert.ok(Object.hasOwn(monitoring.body, "websocketReconnects"));
});

test("health endpoint exposes safe operational status", async () => {
  const response = await request("/health");
  assert.equal(response.response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "crypto-quant-pro");
  assert.ok(Object.hasOwn(response.body, "realTradingEnabled"));
  assert.ok(Object.hasOwn(response.body, "emergencyStop"));
});
