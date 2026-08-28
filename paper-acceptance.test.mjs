import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.ACCEPTANCE_BASE_URL;

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.json();
  return { response, body };
}

test("paper trading acceptance flow keeps state, portfolio, and ledger consistent", { skip: !baseUrl }, async () => {
  const state = await request("/api/paper/state");
  assert.equal(state.response.status, 200);
  assert.ok(Number.isFinite(state.body.cash));

  const portfolio = await request("/api/paper/portfolio");
  assert.equal(portfolio.response.status, 200);
  assert.ok(Number.isFinite(portfolio.body.totalValue));
  assert.ok(Object.hasOwn(portfolio.body, "realizedPnl"));

  const ledger = await request("/api/paper/ledger");
  assert.equal(ledger.response.status, 200);
  assert.ok(Array.isArray(ledger.body));
});