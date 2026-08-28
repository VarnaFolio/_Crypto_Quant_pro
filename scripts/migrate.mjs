import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createDatabasePool, removeLegacyPaperStoreFile, withTransaction } from "../db.mjs";

const rootDirectory = fileURLToPath(new URL("..", import.meta.url));
const pool = createDatabasePool();

if (!pool) {
  console.error("DATABASE_URL is required to run migrations");
  process.exitCode = 1;
} else {
  try {
    const version = "001_initial";
    const sql = await readFile(join(rootDirectory, "migrations", `${version}.sql`), "utf8");
    await withTransaction(pool, async (client) => {
      const existing = await client.query("SELECT 1 FROM schema_migrations WHERE version = $1", [version]);
      if (existing.rowCount > 0) return;
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [version]);
    });
    await removeLegacyPaperStoreFile();
    console.log(`Applied migration ${version}`);
  } finally {
    await pool.end();
  }
}