import { readFile } from "node:fs/promises";
import { createDatabasePool, writePaperStoreToDatabase } from "../db.mjs";

const backupPath = process.argv[2];
const pool = createDatabasePool();

if (!backupPath) {
  console.error("Usage: npm run restore -- backups/paper-state-<timestamp>.json");
  process.exitCode = 1;
} else if (!pool) {
  console.error("DATABASE_URL is required to restore a backup");
  process.exitCode = 1;
} else {
  try {
    const backup = JSON.parse(await readFile(backupPath, "utf8"));
    if (backup.version !== 1 || !backup.store || typeof backup.store !== "object") {
      throw new Error("Unsupported backup format");
    }
    await writePaperStoreToDatabase(pool, backup.store);
    console.log(`Restored backup ${backupPath}`);
  } finally {
    await pool.end();
  }
}