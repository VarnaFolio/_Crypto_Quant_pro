const logLevels = { error: 50, warn: 40, info: 30, debug: 20 };
const defaultLevel = process.env.LOG_LEVEL || "info";
const redactedKeys = new Set([
  "password",
  "secret",
  "token",
  "authorization",
  "cookie",
  "session",
  "apiKey",
  "apikey",
  "privateKey",
  "secretKey",
  "webhookSecret",
  "geminiApiKey",
  "binanceApiKey",
  "binanceApiSecret",
]);

function redactValue(value) {
  return value === undefined ? value : "[REDACTED]";
}

export function sanitizeLogPayload(value, seen = new WeakSet()) {
  if (value === null || value === undefined) return value;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map((item) => sanitizeLogPayload(item, seen));
  if (typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const next = {};
    for (const [key, nested] of Object.entries(value)) {
      const normalisedKey = key.toLowerCase();
      if (redactedKeys.has(normalisedKey) || normalisedKey.includes("secret") || normalisedKey.includes("token") || normalisedKey.includes("password") || normalisedKey.includes("cookie")) {
        next[key] = redactValue(nested);
        continue;
      }
      next[key] = sanitizeLogPayload(nested, seen);
    }
    return next;
  }
  return String(value);
}

export function createLogger({ service = "crypto-quant-pro", level = defaultLevel } = {}) {
  const currentLevel = logLevels[level] ?? logLevels.info;
  const write = (levelName, entry, metadata = {}) => {
    if ((logLevels[levelName] ?? 0) < currentLevel) return;
    const payload = sanitizeLogPayload({
      timestamp: new Date().toISOString(),
      service,
      level: levelName,
      ...entry,
      ...metadata,
    });
    const line = JSON.stringify(payload);
    if (levelName === "error") {
      console.error(line);
      return;
    }
    console.log(line);
  };

  return {
    error: (entry, metadata) => write("error", entry, metadata),
    warn: (entry, metadata) => write("warn", entry, metadata),
    info: (entry, metadata) => write("info", entry, metadata),
    debug: (entry, metadata) => write("debug", entry, metadata),
  };
}

export const logger = createLogger();
