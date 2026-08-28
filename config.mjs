const secretPattern = /(key|secret|password|token|private|credential)/i;

export function readSecret(name, { required = false } = {}) {
  const value = process.env[name]?.trim();
  if (required && !value) throw new Error(`${name} is required`);
  return value || undefined;
}

export function redactSecrets(value) {
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    secretPattern.test(key) ? "[REDACTED]" : item,
  ]));
}

export function validateProductionSecrets() {
  if (process.env.NODE_ENV !== "production") return;
  const tlsTermination = process.env.TLS_TERMINATION || "node";
  if (!new Set(["node", "proxy"]).has(tlsTermination)) throw new Error("TLS_TERMINATION must be node or proxy");
  if (process.env.CORS_ORIGIN === "*") throw new Error("CORS_ORIGIN must be an explicit HTTPS origin in production");
  if (!process.env.CORS_ORIGIN?.startsWith("https://")) throw new Error("CORS_ORIGIN must use HTTPS in production");
  readSecret("SESSION_SECRET", { required: true });
  readSecret("CORS_ORIGIN", { required: true });
  if (tlsTermination === "node") {
    readSecret("TLS_KEY_PATH", { required: true });
    readSecret("TLS_CERT_PATH", { required: true });
  }
  if (process.env.BINANCE_WITHDRAWALS_ENABLED !== "false") {
    throw new Error("BINANCE_WITHDRAWALS_ENABLED=false is required in production");
  }
  if (process.env.PAPER_STORAGE === "postgres") readSecret("DATABASE_URL", { required: true });
}

export function validateExchangeTradingPolicy() {
  const realTradingEnabled = process.env.REAL_TRADING_ENABLED === "true";
  const withdrawalsEnabled = process.env.BINANCE_WITHDRAWALS_ENABLED === "true";
  const sandboxMode = process.env.BINANCE_SANDBOX_MODE === "true"
    || process.env.BINANCE_TESTNET_MODE === "true"
    || process.env.BINANCE_USE_TESTNET === "true";

  if (withdrawalsEnabled) throw new Error("BINANCE_WITHDRAWALS_ENABLED must remain false");
  if (realTradingEnabled) {
    readSecret("BINANCE_API_KEY", { required: true });
    readSecret("BINANCE_API_SECRET", { required: true });
    if (process.env.BINANCE_WITHDRAWALS_ENABLED !== "false") {
      throw new Error("BINANCE_WITHDRAWALS_ENABLED=false is required before real trading");
    }
    if (!sandboxMode) {
      throw new Error("BINANCE_SANDBOX_MODE=true is required before live real trading is allowed for validation.");
    }
  }
  return { realTradingEnabled, withdrawalsEnabled, sandboxMode };
}