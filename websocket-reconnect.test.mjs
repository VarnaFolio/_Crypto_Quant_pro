import assert from "node:assert/strict";
import { test } from "node:test";
import { createMonitor } from "./monitoring.mjs";

test("records websocket reconnect attempts with backoff metadata", () => {
  const monitor = createMonitor();
  monitor.record({
    event: "websocket.reconnect",
    category: "operational",
    severity: "warning",
    symbol: "BTC",
    attempt: 3,
    delayMs: 4000,
  });

  const summary = monitor.snapshot();
  assert.equal(summary.websocketReconnects, 1);
  assert.ok(summary.lastReconnectAt);
  assert.equal(summary.lastEvent.symbol, "BTC");
  assert.equal(summary.lastEvent.attempt, 3);
  assert.equal(summary.lastEvent.delayMs, 4000);
});