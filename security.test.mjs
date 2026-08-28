import assert from "node:assert/strict";
import { test } from "node:test";
import { validateExchangeTradingPolicy } from "./config.mjs";

test("real trading requires sandbox mode and disabled withdrawals", () => {
  const previous = { ...process.env };
  try {
    process.env.REAL_TRADING_ENABLED = "true";
    process.env.BINANCE_API_KEY = "test-key";
    process.env.BINANCE_API_SECRET = "test-secret";
    process.env.BINANCE_WITHDRAWALS_ENABLED = "false";
    delete process.env.BINANCE_SANDBOX_MODE;
    assert.throws(() => validateExchangeTradingPolicy(), /BINANCE_SANDBOX_MODE=true/i);
  } finally {
    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});

test("withdrawals cannot be enabled", () => {
  const previous = { ...process.env };
  try {
    process.env.BINANCE_WITHDRAWALS_ENABLED = "true";
    assert.throws(() => validateExchangeTradingPolicy(), /withdrawals.*false/i);
  } finally {
    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});

test("production configuration rejects wildcard and non-HTTPS CORS", async () => {
  const previous = { ...process.env };
  const { validateProductionSecrets } = await import("./config.mjs");
  try {
    process.env.NODE_ENV = "production";
    process.env.CORS_ORIGIN = "*";
    assert.throws(() => validateProductionSecrets(), /explicit HTTPS origin/i);
    process.env.CORS_ORIGIN = "http://example.com";
    assert.throws(() => validateProductionSecrets(), /use HTTPS/i);
  } finally {
    for (const key of Object.keys(process.env)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});