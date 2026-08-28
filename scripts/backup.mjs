import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createDatabasePool, readPaperStoreFromDatabase } from "../db.mjs";

const rootDirectory = fileURLToPath(new URL("..", import.meta.url));
const backupDirectory = join(rootDirectory, "backups");
const pool = createDatabasePool();

if (!pool) {
  console.error("DATABASE_URL is required to create a backup");
  process.exitCode = 1;
} else {
  try {
    const store = await readPaperStoreFromDatabase(pool);
    const timestamp = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
    const backupPath = join(backupDirectory, `paper-state-${timestamp}.json`);
    await mkdir(backupDirectory, { recursive: true });
    await writeFile(backupPath, JSON.stringify({ version: 1, createdAt: new Date().toISOString(), store }, null, 2), "utf8");
    console.log(`Created backup ${backupPath}`);
  } finally {
    await pool.end();
  }
}