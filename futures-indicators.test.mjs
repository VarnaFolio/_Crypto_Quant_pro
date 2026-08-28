import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculateAtr,
  calculateOiDeltas,
  calculateOrderbookBuckets,
  calculateOrderbookImbalance,
  calculatePositionSize,
  calculateProfitFactor,
  summarizeDirectionalObservations,
} from "./futures-indicators.mjs";

const makeKline = (open, high, low, close) => [0, open, high, low, close, 0];

test("calculates ATR from true ranges", () => {
  const klines = [
    makeKline(100, 105, 95, 100),
    makeKline(100, 110, 98, 105),
    makeKline(105, 108, 100, 102),
  ];
  assert.equal(calculateAtr(klines, 2), 10);
});

test("calculates risk-based position size in units", () => {
  assert.equal(calculatePositionSize(10000, 1, 100, 95), 20);
});

test("calculates profit factor", () => {
  assert.equal(calculateProfitFactor([{ pnl: 100 }, { pnl: -50 }, { pnl: 25 }]), 2.5);
});

test("calculates OI deltas and ignores invalid zero baselines", () => {
  assert.deepEqual(calculateOiDeltas([
    { value: 100 },
    { value: 110 },
    { value: 0 },
    { value: 120 },
  ]), [10]);
});

test("calculates orderbook bid/ask imbalance", () => {
  assert.equal(calculateOrderbookImbalance({
    bids: [[100, 2]],
    asks: [[101, 1]],
  }), (200 - 101) / 301);
});

test("summarizes directional observations", () => {
  const summary = summarizeDirectionalObservations([0.2, -0.3, 0.01, 0], 0.05);
  assert.deepEqual({ ...summary, average: undefined }, {
    observations: 4,
    bullish: 1,
    bearish: 1,
    neutral: 2,
    average: undefined,
  });
  assert.ok(Math.abs(summary.average - (-0.0225)) < Number.EPSILON);
});

test("aggregates orderbook levels using weighted average price", () => {
  const buckets = calculateOrderbookBuckets([[100, 2], [101, 1]], 100, 0.05);
  assert.equal(buckets.length, 1);
  assert.equal(buckets[0].notional, 301);
  assert.equal(buckets[0].averagePrice, 301 / 3);
  assert.equal(buckets[0].levels, 2);
});
