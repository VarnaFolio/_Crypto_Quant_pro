export function calculateAtr(klines, period = 14) {
  if (!Array.isArray(klines) || klines.length < period + 1) return null;
  const trueRanges = [];
  for (let index = 1; index < klines.length; index += 1) {
    const high = Number(klines[index][2]);
    const low = Number(klines[index][3]);
    const previousClose = Number(klines[index - 1][4]);
    trueRanges.push(Math.max(high - low, Math.abs(high - previousClose), Math.abs(low - previousClose)));
  }
  return trueRanges.slice(-period).reduce((total, value) => total + value, 0) / period;
}

export function calculatePositionSize(accountSize, riskPercent, entryPrice, stopPrice) {
  const riskCapital = Math.max(0, Number(accountSize) * Number(riskPercent) / 100);
  const riskPerUnit = Math.abs(Number(entryPrice) - Number(stopPrice));
  return riskPerUnit > 0 ? riskCapital / riskPerUnit : 0;
}

export function calculateProfitFactor(trades) {
  const grossProfit = trades.filter((trade) => trade.pnl > 0).reduce((total, trade) => total + trade.pnl, 0);
  const grossLoss = trades.filter((trade) => trade.pnl < 0).reduce((total, trade) => total + Math.abs(trade.pnl), 0);
  return grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;
}

export function calculateOiDeltas(history) {
  if (!Array.isArray(history)) return [];
  const deltas = [];
  for (let index = 1; index < history.length; index += 1) {
    const previous = Number(history[index - 1]?.value);
    const current = Number(history[index]?.value);
    if (previous > 0 && current > 0) {
      deltas.push((current - previous) / previous * 100);
    }
  }
  return deltas;
}

export function calculateOrderbookImbalance(snapshot, levelLimit = 20) {
  const bids = snapshot?.bids?.slice(0, levelLimit) || [];
  const asks = snapshot?.asks?.slice(0, levelLimit) || [];
  const bidNotional = bids.reduce((total, [price, quantity]) => total + Number(price) * Number(quantity), 0);
  const askNotional = asks.reduce((total, [price, quantity]) => total + Number(price) * Number(quantity), 0);
  const totalNotional = bidNotional + askNotional;
  return totalNotional > 0 ? (bidNotional - askNotional) / totalNotional : 0;
}

export function summarizeDirectionalObservations(values, bullishThreshold = 0) {
  const observations = values.filter((value) => Number.isFinite(value));
  const bullish = observations.filter((value) => value > bullishThreshold).length;
  const bearish = observations.filter((value) => value < -bullishThreshold).length;
  return {
    observations: observations.length,
    bullish,
    bearish,
    neutral: observations.length - bullish - bearish,
    average: observations.length
      ? observations.reduce((total, value) => total + value, 0) / observations.length
      : null,
  };
}

export function calculateOrderbookBuckets(levels, price, bucketPercent) {
  const buckets = new Map();
  for (const [rawPrice, rawQuantity] of levels || []) {
    const levelPrice = Number(rawPrice);
    const quantity = Number(rawQuantity);
    const key = Math.floor(levelPrice / (price * bucketPercent));
    const bucket = buckets.get(key) || { price: 0, quantity: 0, notional: 0, levels: 0 };
    bucket.price += levelPrice * quantity;
    bucket.quantity += quantity;
    bucket.notional += levelPrice * quantity;
    bucket.levels += 1;
    buckets.set(key, bucket);
  }
  return [...buckets.values()]
    .map((bucket) => ({ ...bucket, averagePrice: bucket.quantity > 0 ? bucket.price / bucket.quantity : 0 }))
    .sort((left, right) => right.notional - left.notional)
    .slice(0, 5);
}
