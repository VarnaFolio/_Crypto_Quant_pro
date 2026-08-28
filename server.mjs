import { createServer as createHttpServer } from "node:http";
import { createServer as createHttpsServer } from "node:https";
import { readFile, rename, unlink, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createHmac, randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import {
  calculateAtr as indicatorCalculateAtr,
  calculateOiDeltas,
  calculateOrderbookBuckets,
  calculateOrderbookImbalance,
  calculatePositionSize,
  summarizeDirectionalObservations,
} from "./futures-indicators.mjs";
import {
  createDatabasePool,
  readPaperStoreFromDatabase,
  writePaperStoreToDatabase,
} from "./db.mjs";
import * as OTPAuth from "otpauth";
import { readSecret, validateExchangeTradingPolicy, validateProductionSecrets } from "./config.mjs";
import { mapBinanceError } from "./binance-errors.mjs";
import { validatePaymentAmount, verifyStripeWebhookSignature } from "./payments.mjs";
import { createLogger } from "./logger.mjs";
import { buildErrorReport } from "./error-tracking.mjs";
import { monitor } from "./monitoring.mjs";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 3000);
const binanceFuturesApiUrl = "https://fapi.binance.com/fapi/v1";
const binanceFuturesDataUrl = "https://fapi.binance.com/futures/data";
const coinGeckoApiUrl = "https://api.coingecko.com/api/v3";
const fearGreedApiUrl = "https://api.alternative.me/fng/?limit=1";
const paperStorePath = process.env.PAPER_STORE_PATH || join(rootDirectory, "paper-store.json");
const paperStorage = process.env.PAPER_STORAGE || "json";
const databasePool = paperStorage === "postgres" ? createDatabasePool() : null;
const futuresHistoryPath = join(rootDirectory, "futures-history.json");
const binanceApiUrl = process.env.BINANCE_API_URL || "https://api.binance.com/api/v3";
const paperFeeRate = 0.001;
const maxPaperOrderQuote = Number(process.env.MAX_PAPER_ORDER_QUOTE || 5000);
const maxPaperDailyVolume = Number(process.env.MAX_PAPER_DAILY_VOLUME || 25000);
const maxRealOrderQuote = Number(process.env.MAX_REAL_ORDER_QUOTE || 5000);
const maxRealDailyVolume = Number(process.env.MAX_REAL_DAILY_VOLUME || 25000);
const paperSpreadBps = Number(process.env.PAPER_SPREAD_BPS || 2);
const paperSlippageBps = Number(process.env.PAPER_SLIPPAGE_BPS || 1);
const paperFillFraction = Number(process.env.PAPER_FILL_FRACTION || 0.5);
const alertCooldownMs = Number(process.env.ALERT_COOLDOWN_MS || 300000);
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const sessionTtlMs = Number(process.env.SESSION_TTL_MS || 24 * 60 * 60 * 1000);
const authRateLimitWindowMs = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const authRateLimitMax = Number(process.env.AUTH_RATE_LIMIT_MAX || 10);
const authCookieSecure = process.env.NODE_ENV === "production";
const maxRequestBodyBytes = Number(process.env.MAX_REQUEST_BODY_BYTES || 64 * 1024);
const corsOrigin = process.env.CORS_ORIGIN || (process.env.NODE_ENV === "production" ? "null" : "*");
const isProduction = process.env.NODE_ENV === "production";
const tlsTermination = process.env.TLS_TERMINATION || "node";
const logger = createLogger({ service: "crypto-quant-pro", level: process.env.LOG_LEVEL || "info" });
const tlsKeyPath = process.env.TLS_KEY_PATH;
const tlsCertPath = process.env.TLS_CERT_PATH;
const sessionSecret = readSecret("SESSION_SECRET");
const sessions = new Map();
const authRateLimits = new Map();
const recentRealOrderRequests = new Map();
const scryptAsync = promisify(scrypt);

class InputValidationError extends Error {}
const symbolFilters = new Map();
const futuresOiHistory = new Map();
const futuresTrackedSymbols = new Set(["BTC", "ETH", "SOL"]);
let futuresHistoryOperation = Promise.resolve();
const futuresLiveState = new Map();
const futuresConnections = new Map();
const futuresClusterState = new Map();

async function initializeFuturesBook(state) {
  const snapshot = await fetchFuturesJson("/depth", {
    symbol: `${state.symbol}USDT`,
    limit: 1000,
  });
  state.bookBids = new Map(snapshot.bids || []);
  state.bookAsks = new Map(snapshot.asks || []);
  state.lastDepthUpdateId = Number(snapshot.lastUpdateId || 0);
  state.bookReady = true;
}

function ensureFuturesConnection(symbol) {
  if (futuresConnections.has(symbol)) return futuresConnections.get(symbol);
  const state = {
    symbol,
    status: "CONNECTING",
    reconnectAttempt: 0,
    socket: null,
    subscribers: new Set(),
    retryTimer: null,
  };
  futuresConnections.set(symbol, state);

  const connect = () => {
    state.status = "CONNECTING";
    state.bookBids = new Map();
    state.bookAsks = new Map();
    state.lastDepthUpdateId = 0;
    state.bookReady = false;
    const streams = [
      `${symbol.toLowerCase()}usdt@ticker`,
      `${symbol.toLowerCase()}usdt@markPrice@1s`,
      `${symbol.toLowerCase()}usdt@kline_15m`,
      `${symbol.toLowerCase()}usdt@depth@100ms`,
    ].join("/");
    try {
      state.socket = new WebSocket(`wss://fstream.binance.com/stream?streams=${streams}`);
      state.socket.onopen = () => {
        initializeFuturesBook(state).catch(() => {
          state.status = "ERROR";
          publishFuturesState(state);
        });
        state.status = "LIVE";
        state.reconnectAttempt = 0;
        publishFuturesState(state);
      };
      state.socket.onmessage = (event) => {
        const message = JSON.parse(event.data).data;
        const current = futuresLiveState.get(symbol) || { symbol, source: "BINANCE_FUTURES_WS" };
        if (message.e === "24hrTicker") {
          current.price = Number(message.c);
          current.change24h = Number(message.P);
          current.volume = Number(message.q);
        } else if (message.e === "markPriceUpdate") {
          current.markPrice = Number(message.p);
          current.fundingRate = Number(message.r);
          current.nextFundingTime = message.T;
        } else if (message.e === "kline") {
          current.kline = message.k;
        } else if (message.e === "depthUpdate") {
          if (!state.bookReady) return;
          if (message.u <= state.lastDepthUpdateId) return;
          if (state.lastDepthUpdateId && message.U > state.lastDepthUpdateId + 1) {
            state.status = "CONNECTING";
            state.bookReady = false;
            initializeFuturesBook(state)
              .then(() => {
                state.status = "LIVE";
                publishFuturesState(state);
              })
              .catch(() => { state.status = "ERROR"; });
            return;
          }
          state.lastDepthUpdateId = message.u || state.lastDepthUpdateId;
          for (const [price, quantity] of message.b || []) {
            if (Number(quantity) === 0) state.bookBids.delete(price);
            else state.bookBids.set(price, quantity);
          }
          for (const [price, quantity] of message.a || []) {
            if (Number(quantity) === 0) state.bookAsks.delete(price);
            else state.bookAsks.set(price, quantity);
          }
          current.bids = [...state.bookBids.entries()]
            .sort((left, right) => Number(right[0]) - Number(left[0]))
            .slice(0, 100);
          current.asks = [...state.bookAsks.entries()]
            .sort((left, right) => Number(left[0]) - Number(right[0]))
            .slice(0, 100);
          current.lastDepthUpdateId = state.lastDepthUpdateId;
        }
        current.status = state.status;
        current.updatedAt = new Date().toISOString();
        futuresLiveState.set(symbol, current);
        publishFuturesState(state);
      };
      state.socket.onerror = () => state.socket?.close();
      state.socket.onclose = () => {
        state.status = "DISCONNECTED";
        publishFuturesState(state);
        if (state.subscribers.size === 0) return;
        const delay = Math.min(30000, 1000 * 2 ** state.reconnectAttempt++);
        monitor.record({
          event: "websocket.reconnect",
          category: "operational",
          severity: "warning",
          message: `Reconnecting ${symbol} futures WebSocket`,
          symbol,
          delayMs: delay,
          attempt: state.reconnectAttempt,
        });
        state.retryTimer = setTimeout(connect, delay);
      };
    } catch {
      state.status = "ERROR";
      publishFuturesState(state);
      const delay = Math.min(30000, 1000 * 2 ** state.reconnectAttempt++);
      state.retryTimer = setTimeout(connect, delay);
    }
  };
  state.connect = connect;
  connect();
  return state;
}

function publishFuturesState(state) {
  const payload = JSON.stringify({
    ...(futuresLiveState.get(state.symbol) || { symbol: state.symbol }),
    status: state.status,
  });
  state.subscribers.forEach((response) => response.write(`data: ${payload}\n\n`));
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Credentials": corsOrigin === "*" ? "false" : "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0]?.trim() || "unknown";
  return request.socket?.remoteAddress || "unknown";
}

function logRequestStart(request, requestUrl) {
  logger.info({
    event: "http.request",
    method: request.method,
    path: requestUrl.pathname,
    query: requestUrl.search || undefined,
    ip: getClientIp(request),
    userAgent: request.headers["user-agent"],
  });
}

function logRequestError(request, requestUrl, error, statusCode) {
  const report = buildErrorReport(error, {
    stage: "http.request",
    route: requestUrl.pathname,
    requestId: request.headers["x-request-id"] || randomUUID(),
    metadata: { statusCode },
  });
  logger.error({
    event: "http.error",
    method: request.method,
    path: requestUrl.pathname,
    query: requestUrl.search || undefined,
    ip: getClientIp(request),
    statusCode,
    error: report.message,
    category: report.category,
    severity: report.severity,
    requestId: report.requestId,
  });
  monitor.record({
    event: "http.error",
    category: report.category,
    severity: report.severity,
    message: report.message,
    route: requestUrl.pathname,
    statusCode,
  });
}

async function readPaperStore() {
  if (paperStorage === "postgres") {
    if (!databasePool) throw new Error("PAPER_STORAGE=postgres requires DATABASE_URL");
    return readPaperStoreFromDatabase(databasePool);
  }
  try {
    return JSON.parse(await readFile(paperStorePath, "utf8"));
  } catch {
    return { cash: 12450.8, positions: [], orders: [] };
  }
}

async function writePaperStore(store) {
  if (paperStorage === "postgres") {
    if (!databasePool) throw new Error("PAPER_STORAGE=postgres requires DATABASE_URL");
    return writePaperStoreToDatabase(databasePool, store);
  }
  const temporaryPath = `${paperStorePath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(store, null, 2), "utf8");
  try {
    await rename(temporaryPath, paperStorePath);
  } finally {
    await unlink(temporaryPath).catch(() => {});
  }
}

async function readFuturesHistory() {
  try {
    return JSON.parse(await readFile(futuresHistoryPath, "utf8"));
  } catch {
    return { oi: [], orderbook: [] };
  }
}

async function writeFuturesHistory(history) {
  const temporaryPath = `${futuresHistoryPath}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(history, null, 2), "utf8");
  await rename(temporaryPath, futuresHistoryPath);
}

function withFuturesHistory(operation) {
  const nextOperation = futuresHistoryOperation.then(async () => {
    const history = await readFuturesHistory();
    const result = await operation(history);
    await writeFuturesHistory(history);
    return result;
  });
  futuresHistoryOperation = nextOperation.catch(() => {});
  return nextOperation;
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body, "utf8") > maxRequestBodyBytes) throw new InputValidationError("Request body is too large");
  }
  return JSON.parse(body || "{}");
}

async function readRawBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (Buffer.byteLength(body, "utf8") > maxRequestBodyBytes) throw new InputValidationError("Request body is too large");
  }
  return body;
}

function validateSymbol(value, field = "symbol") {
  const symbol = String(value || "").toUpperCase();
  if (!/^[A-Z0-9]{2,20}$/.test(symbol)) throw new InputValidationError(`Invalid ${field}`);
  return symbol;
}

function validateTimeframe(value, allowed = ["scalp", "intraday", "swing"], field = "timeframe") {
  const timeframe = String(value || "");
  if (!allowed.includes(timeframe)) throw new InputValidationError(`Invalid ${field}`);
  return timeframe;
}

function validatePositiveNumber(value, field, { maximum = Number.MAX_SAFE_INTEGER, integer = false } = {}) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0 || number > maximum || (integer && !Number.isInteger(number))) {
    throw new InputValidationError(`Invalid ${field}`);
  }
  return number;
}

function validateUuid(value, field = "id") {
  const id = String(value || "");
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new InputValidationError(`Invalid ${field}`);
  return id;
}

function validateMarketQuery(path, searchParams) {
  const symbol = searchParams.get("symbol");
  if (path !== "/api/market/ticker") validateSymbol(symbol);
  if (path === "/api/market/ticker" && searchParams.has("symbols")) {
    let symbols;
    try { symbols = JSON.parse(searchParams.get("symbols")); } catch { throw new InputValidationError("Invalid symbols"); }
    if (!Array.isArray(symbols) || symbols.length === 0 || symbols.length > 50 || symbols.some((item) => !/^[A-Z0-9]{2,20}USDT$/.test(String(item)))) throw new InputValidationError("Invalid symbols");
  }
  if (["/api/market/klines", "/api/market/depth"].includes(path)) {
    const interval = searchParams.get("interval");
    if (path === "/api/market/klines" && !["1m", "15m", "1h", "4h", "1d"].includes(interval)) throw new InputValidationError("Invalid interval");
    if (searchParams.has("limit")) validatePositiveNumber(searchParams.get("limit"), "limit", { maximum: 1500, integer: true });
  }
}

function getClientAddress(request) {
  return request.socket.remoteAddress || "unknown";
}

function isRateLimited(request) {
  const key = getClientAddress(request);
  const now = Date.now();
  const current = authRateLimits.get(key);
  if (!current || now - current.startedAt >= authRateLimitWindowMs) {
    authRateLimits.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > authRateLimitMax;
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const separator = part.indexOf("=");
    return [part.slice(0, separator).trim(), decodeURIComponent(part.slice(separator + 1).trim())];
  }));
}

function setSessionCookie(response, sessionId, maxAge) {
  const secure = authCookieSecure ? "; Secure" : "";
  const signature = createHmac("sha256", sessionSecret || "development-session-key").update(sessionId).digest("base64url");
  response.setHeader("Set-Cookie", `sid=${encodeURIComponent(`${sessionId}.${signature}`)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`);
}

function getSessionUser(request) {
  const session = getSession(request);
  return session?.mfaVerified ? session.user : null;
}

function getSession(request) {
  const cookieValue = parseCookies(request).sid || "";
  const separator = cookieValue.lastIndexOf(".");
  const sessionId = separator > 0 ? cookieValue.slice(0, separator) : "";
  const signature = separator > 0 ? cookieValue.slice(separator + 1) : "";
  const expectedSignature = createHmac("sha256", sessionSecret || "development-session-key").update(sessionId).digest("base64url");
  if (!sessionId || !signature || signature.length !== expectedSignature.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;
  const session = sessionId ? sessions.get(sessionId) : null;
  if (!session || session.expiresAt <= Date.now()) {
    if (sessionId) sessions.delete(sessionId);
    return null;
  }
  return session;
}

async function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const derivedKey = await scryptAsync(password, salt, 64);
  return `scrypt$${salt}$${Buffer.from(derivedKey).toString("hex")}`;
}

async function verifyPassword(password, encodedHash) {
  const [, salt, encodedKey] = String(encodedHash || "").split("$");
  if (!salt || !encodedKey) return false;
  const derivedKey = await scryptAsync(password, salt, 64);
  const expected = Buffer.from(encodedKey, "hex");
  return expected.length === derivedKey.length && timingSafeEqual(expected, Buffer.from(derivedKey));
}

function validateAuthInput(body) {
  const email = String(body.email || "").trim().toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error("Valid email is required");
  if (password.length < 12 || password.length > 128) throw new Error("Password must be 12-128 characters");
  return { email, password };
}

function createTotp(secret) {
  return new OTPAuth.TOTP({
    issuer: "CryptoQuant Pro",
    label: "CryptoQuant Pro",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: typeof secret === "string" ? OTPAuth.Secret.fromBase32(secret) : secret,
  });
}

function validateTotpToken(body) {
  const token = String(body.token || "").trim();
  if (!/^\d{6}$/.test(token)) throw new Error("MFA token must be 6 digits");
  return token;
}

function normalizePaperStore(store) {
  const today = new Date().toISOString().slice(0, 10);
  const daily = store.dailyVolume?.date === today
    ? store.dailyVolume
    : { date: today, quote: 0 };
  return {
    users: Array.isArray(store.users) ? store.users : [],
    auditLog: Array.isArray(store.auditLog) ? store.auditLog : [],
    paymentLedger: Array.isArray(store.paymentLedger) ? store.paymentLedger : [],
    emergencyStop: store.emergencyStop === true,
    cash: Number(store.cash) || 0,
    reservedCash: Number(store.reservedCash) || 0,
    positions: Array.isArray(store.positions) ? store.positions : [],
    reservedAssets: store.reservedAssets || {},
    orders: Array.isArray(store.orders) ? store.orders : [],
    realOrders: Array.isArray(store.realOrders) ? store.realOrders : [],
    trades: Array.isArray(store.trades) ? store.trades : [],
    realizedPnl: Number(store.realizedPnl) || 0,
    totalFees: Number(store.totalFees) || 0,
    dailyVolume: daily,
    ledger: Array.isArray(store.ledger) ? store.ledger : [],
    dailySnapshots: Array.isArray(store.dailySnapshots) ? store.dailySnapshots : [],
    alerts: Array.isArray(store.alerts) ? store.alerts : [],
    alertEvents: Array.isArray(store.alertEvents) ? store.alertEvents : [],
    signalHistory: Array.isArray(store.signalHistory) ? store.signalHistory : [],
  };
}

function appendAuditLog(store, request, action, userId = null, metadata = {}) {
  store.auditLog.unshift({
    id: randomUUID(),
    action,
    userId,
    ip: getClientAddress(request),
    metadata,
    createdAt: new Date().toISOString(),
  });
  store.auditLog = store.auditLog.slice(0, 1000);
}

function alertIsCoolingDown(alert, now = Date.now()) {
  return alert.lastTriggeredAt && now - Date.parse(alert.lastTriggeredAt) < alertCooldownMs;
}

function summarizePaperWinRate(trades) {
  const closedTrades = trades.filter((trade) => trade.side === "SELL" && Number.isFinite(Number(trade.realizedPnl)));
  const winningTrades = closedTrades.filter((trade) => Number(trade.realizedPnl) > 0).length;
  const losingTrades = closedTrades.filter((trade) => Number(trade.realizedPnl) < 0).length;
  return {
    closedTrades: closedTrades.length,
    winningTrades,
    losingTrades,
    breakevenTrades: closedTrades.length - winningTrades - losingTrades,
    winRate: closedTrades.length ? winningTrades / closedTrades.length * 100 : null,
  };
}

async function fetchAlertMarketData(alert) {
  const symbol = `${alert.symbol}USDT`;
  const [tickerResponse, candlesResponse] = await Promise.all([
    fetch(`${binanceApiUrl}/ticker/24hr?symbol=${symbol}`),
    fetch(`${binanceApiUrl}/klines?symbol=${symbol}&interval=15m&limit=1`),
  ]);
  if (!tickerResponse.ok || !candlesResponse.ok) throw new Error(`Unable to evaluate ${alert.symbol}`);
  const ticker = await tickerResponse.json();
  const candles = await candlesResponse.json();
  const candle = candles[0];
  return {
    price: Number(ticker.lastPrice),
    volume: Number(ticker.quoteVolume),
    volatility: candle ? ((Number(candle[2]) - Number(candle[3])) / Number(candle[1])) * 100 : 0,
  };
}

async function evaluateAlerts() {
  const events = await withPaperStore(async (store) => {
    const events = [];
    for (const alert of store.alerts.filter((item) => item.enabled)) {
      if (alertIsCoolingDown(alert)) continue;
      let market;
      try { market = await fetchAlertMarketData(alert); } catch { continue; }
      const type = alert.type || "PRICE";
      const triggered = type === "VOLATILITY"
        ? market.volatility >= Number(alert.volatilityThreshold ?? alert.vol ?? 0)
        : type === "VOLUME"
          ? market.volume >= Number(alert.volumeThreshold ?? alert.target ?? 0)
          : alert.condition === "ABOVE"
            ? market.price >= Number(alert.target)
            : market.price <= Number(alert.target);
      if (!triggered) continue;
      const event = {
        id: randomUUID(), alertId: alert.id, symbol: alert.symbol, type,
        value: type === "VOLATILITY" ? market.volatility : type === "VOLUME" ? market.volume : market.price,
        triggeredAt: new Date().toISOString(),
      };
      alert.lastTriggeredAt = event.triggeredAt;
      events.push(event);
      store.alertEvents.unshift(event);
      if (alert.oneTime) alert.enabled = false;
    }
    store.alertEvents = store.alertEvents.slice(0, 500);
    return events;
  });
  const store = normalizePaperStore(await readPaperStore());
  await Promise.all(events.map(async (event) => {
    const alert = store.alerts.find((item) => item.id === event.alertId);
    if (!alert?.webhookUrl) return;
    try {
      const webhook = new URL(alert.webhookUrl);
      if (!["http:", "https:"].includes(webhook.protocol)) return;
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, alert }),
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.error(`Alert webhook delivery failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }));
  return events;
}

async function getSymbolFilters(symbol) {
  if (symbolFilters.has(symbol)) return symbolFilters.get(symbol);
  const response = await fetch(`${binanceApiUrl}/exchangeInfo?symbol=${symbol}USDT`);
  if (!response.ok) throw new Error(`Unable to load Binance filters for ${symbol}`);
  const data = await response.json();
  const filters = Object.fromEntries((data.symbols?.[0]?.filters || []).map((filter) => [filter.filterType, filter]));
  const result = {
    minQuantity: Number(filters.LOT_SIZE?.minQty || 0),
    stepSize: Number(filters.LOT_SIZE?.stepSize || 0),
    tickSize: Number(filters.PRICE_FILTER?.tickSize || 0),
    minNotional: Number(filters.NOTIONAL?.minNotional || filters.MIN_NOTIONAL?.minNotional || 0),
  };
  symbolFilters.set(symbol, result);
  return result;
}

async function fetchFuturesJson(path, searchParams = {}) {
  const url = new URL(`${binanceFuturesApiUrl}${path}`);
  Object.entries(searchParams).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Binance Futures request failed: ${path}`);
  return response.json();
}

function recordFuturesOi(symbol, value) {
  const history = futuresOiHistory.get(symbol) || [];
  history.push({ timestamp: Date.now(), value });
  futuresOiHistory.set(symbol, history.slice(-120));
  const previous = history.find((item) => Date.now() - item.timestamp >= 5 * 60 * 1000);
  return previous && previous.value > 0 ? ((value - previous.value) / previous.value) * 100 : null;
}

async function getFuturesSnapshot(symbol, interval = "15m") {
  const normalizedSymbol = String(symbol || "").toUpperCase();
  if (!/^[A-Z0-9]{2,20}$/.test(normalizedSymbol)) throw new Error("Invalid Futures symbol");
  futuresTrackedSymbols.add(normalizedSymbol);
  const [ticker, premium, openInterest, depth, klines, ratio] = await Promise.all([
    fetchFuturesJson("/ticker/24hr", { symbol: `${normalizedSymbol}USDT` }),
    fetchFuturesJson("/premiumIndex", { symbol: `${normalizedSymbol}USDT` }),
    fetchFuturesJson("/openInterest", { symbol: `${normalizedSymbol}USDT` }),
    fetchFuturesJson("/depth", { symbol: `${normalizedSymbol}USDT`, limit: 100 }),
    fetchFuturesJson("/klines", { symbol: `${normalizedSymbol}USDT`, interval, limit: 100 }),
    fetch(`${binanceFuturesDataUrl}/globalLongShortAccountRatio?symbol=${normalizedSymbol}USDT&period=5m&limit=1`)
      .then((response) => response.ok ? response.json() : [])
      .catch(() => []),
  ]);
  const price = Number(ticker.lastPrice);
  const openInterestValue = Number(openInterest.openInterest);
  const oiDelta5m = recordFuturesOi(normalizedSymbol, openInterestValue);
  return {
    symbol: normalizedSymbol,
    source: "BINANCE_FUTURES",
    status: oiDelta5m === null ? "COLLECTING" : "LIVE",
    price,
    markPrice: Number(premium.markPrice),
    fundingRate: Number(premium.lastFundingRate),
    nextFundingTime: premium.nextFundingTime,
    openInterest: openInterestValue,
    oiDelta5m,
    oiHistorySamples: futuresOiHistory.get(normalizedSymbol)?.length || 0,
    longShortRatio: ratio[0] ? Number(ratio[0].longShortRatio) : null,
    spread: depth.bids?.[0] && depth.asks?.[0]
      ? ((Number(depth.asks[0][0]) - Number(depth.bids[0][0])) / price) * 100
      : null,
    bids: depth.bids || [],
    asks: depth.asks || [],
    klines,
    calculatedAt: new Date().toISOString(),
  };
}

async function analyzeWithGemini(body) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
  const symbol = validateSymbol(body.symbol || "BTC");
  const timeframe = validateTimeframe(body.timeframe || "intraday");
  const question = String(body.question || "Анализирай текущата ситуация.").slice(0, 1000);
  const interval = timeframe === "scalp" ? "5m" : timeframe === "swing" ? "4h" : "15m";
  const snapshot = await getFuturesSnapshot(symbol, interval);
  const analysis = buildFuturesAnalysis(snapshot, timeframe);
  const failedChecks = analysis.checks.filter((check) => !check.pass).map((check) => check.name);
  const approved = analysis.ready && analysis.signal !== "WAITING" && failedChecks.length === 0;
  const riskApproval = {
    approved,
    status: approved ? "APPROVED" : "REJECTED",
    reasons: failedChecks.length ? failedChecks : approved ? [] : ["Signal is not ready"],
  };
  const prompt = `Ти си консервативен quantitative crypto analyst. Използвай само предоставения snapshot. Не измисляй данни, не обещавай печалба и не изпращай поръчки. Ако status е WAITING, обясни защо няма потвърден сигнал. Въпрос: ${question}\n\nFutures snapshot:\n${JSON.stringify(analysis)}`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || "Gemini request failed");
  return {
    answer: result.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini не върна анализ.",
    symbol,
    timeframe,
    signal: analysis.signal,
    riskApproval,
    snapshotAt: analysis.calculatedAt,
    model: geminiModel,
  };
}

async function collectFuturesSnapshot(symbol) {
  const normalizedSymbol = String(symbol || "").toUpperCase();
  const [openInterest, depth] = await Promise.all([
    fetchFuturesJson("/openInterest", { symbol: `${normalizedSymbol}USDT` }),
    fetchFuturesJson("/depth", { symbol: `${normalizedSymbol}USDT`, limit: 100 }),
  ]);
  const snapshot = {
    symbol: normalizedSymbol,
    openInterest: Number(openInterest.openInterest),
    bids: depth.bids || [],
    asks: depth.asks || [],
    lastUpdateId: Number(depth.lastUpdateId || 0),
    capturedAt: new Date().toISOString(),
  };
  await withFuturesHistory((history) => {
    history.oi.push({ symbol: snapshot.symbol, value: snapshot.openInterest, capturedAt: snapshot.capturedAt });
    history.orderbook.push(snapshot);
    history.oi = history.oi.slice(-10000);
    history.orderbook = history.orderbook.slice(-5000);
    return snapshot;
  });
  futuresTrackedSymbols.add(normalizedSymbol);
  return snapshot;
}

function calculateAtr(klines, period = 14) {
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

function buildOrderbookBuckets(levels, price, bucketPercent) {
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
    bucket.averagePrice = bucket.quantity > 0 ? bucket.price / bucket.quantity : levelPrice;
    buckets.set(key, bucket);
  }
  return [...buckets.values()]
    .sort((left, right) => right.notional - left.notional)
    .slice(0, 5);
}

function analyzeFundingPressure(fundingRate, longShortRatio) {
  const fundingPercent = fundingRate * 100;
  const crowdedLongs = longShortRatio !== null && longShortRatio > 1.15;
  const crowdedShorts = longShortRatio !== null && longShortRatio < 0.85;
  if (fundingPercent > 0.01 || crowdedLongs) return { direction: "BEARISH", fundingPercent, crowdedLongs, crowdedShorts };
  if (fundingPercent < -0.01 || crowdedShorts) return { direction: "BULLISH", fundingPercent, crowdedLongs, crowdedShorts };
  return { direction: "NEUTRAL", fundingPercent, crowdedLongs, crowdedShorts };
}

function trackCluster(symbol, side, averagePrice, now = Date.now()) {
  const previous = futuresClusterState.get(symbol);
  const moved = !previous || previous.side !== side || Math.abs(previous.averagePrice - averagePrice) / averagePrice > 0.01;
  const current = moved ? { side, averagePrice, bornAt: now } : previous;
  futuresClusterState.set(symbol, current);
  return { side, averagePrice, ageSeconds: Math.floor((now - current.bornAt) / 1000) };
}

function assessSpoofRisk(cluster, allLevels) {
  if (!cluster) return { risk: "UNKNOWN", reason: "No orderbook cluster" };
  const nearbyLevels = (allLevels || []).filter((level) => Math.abs(Number(level[0]) - cluster.averagePrice) / cluster.averagePrice < 0.005);
  if (cluster.ageSeconds < 3 || nearbyLevels.length < 2) {
    return { risk: "HIGH", reason: "Cluster is young or supported by too few nearby levels" };
  }
  return { risk: "LOW", reason: `${nearbyLevels.length} nearby levels support the cluster` };
}

function buildFuturesAnalysis(snapshot, timeframe, accountSize = 10000, riskPercent = 1) {
  const minimumHistorySamples = 6;
  const profiles = {
    scalp: { stopAtr: 1.2, maxSpread: 0.05, maxFunding: 0.015, bucketPercent: 0.003, minRiskReward: 1.5 },
    intraday: { stopAtr: 1.5, maxSpread: 0.12, maxFunding: 0.025, bucketPercent: 0.005, minRiskReward: 2 },
    swing: { stopAtr: 2, maxSpread: 0.3, maxFunding: 0.04, bucketPercent: 0.01, minRiskReward: 2.5 },
  };
  const profile = profiles[timeframe] || profiles.intraday;
  const atr = indicatorCalculateAtr(snapshot.klines);
  const asks = calculateOrderbookBuckets(snapshot.asks, snapshot.price, profile.bucketPercent);
  const bids = calculateOrderbookBuckets(snapshot.bids, snapshot.price, profile.bucketPercent);
  const strongestAsk = asks[0] || null;
  const strongestBid = bids[0] || null;
  const cluster = (strongestBid?.notional || 0) >= (strongestAsk?.notional || 0)
    ? strongestBid ? trackCluster(snapshot.symbol, "BID", strongestBid.averagePrice) : null
    : strongestAsk ? trackCluster(snapshot.symbol, "ASK", strongestAsk.averagePrice) : null;
  const fundingPressure = analyzeFundingPressure(snapshot.fundingRate, snapshot.longShortRatio);
  const spoofRisk = assessSpoofRisk(cluster, [...(snapshot.bids || []), ...(snapshot.asks || [])]);
  const direction = fundingPressure.direction === "BULLISH" ? "LONG" : fundingPressure.direction === "BEARISH" ? "SHORT" : cluster?.side === "BID" ? "LONG" : "SHORT";
  const stopDistance = atr ? atr * profile.stopAtr : null;
  const target = direction === "LONG" ? strongestAsk?.averagePrice : strongestBid?.averagePrice;
  const stop = stopDistance ? direction === "LONG" ? snapshot.price - stopDistance : snapshot.price + stopDistance : null;
  const riskReward = target && stop ? Math.abs(target - snapshot.price) / Math.abs(snapshot.price - stop) : null;
  const checks = [
    { name: "ATR(14)", pass: atr !== null, value: atr },
    { name: "Spread guard", pass: snapshot.spread !== null && snapshot.spread <= profile.maxSpread, value: snapshot.spread },
    { name: "Funding guard", pass: Math.abs(snapshot.fundingRate * 100) <= profile.maxFunding, value: snapshot.fundingRate * 100 },
    { name: "OI history", pass: snapshot.oiDelta5m !== null && (snapshot.oiHistorySamples || 0) >= minimumHistorySamples, value: snapshot.oiDelta5m },
    { name: "Risk/reward", pass: riskReward !== null && riskReward >= profile.minRiskReward, value: riskReward },
    { name: "Spoof risk", pass: spoofRisk.risk !== "HIGH", value: spoofRisk.risk },
  ];
  const ready = checks.every((check) => check.pass);
  const signal = !ready ? "WAITING" : direction;
  const riskCapital = Math.max(0, accountSize * (riskPercent / 100));
  const positionSize = stopDistance && stopDistance > 0
    ? calculatePositionSize(accountSize, riskPercent, snapshot.price, stop)
    : 0;
  return {
    symbol: snapshot.symbol,
    source: snapshot.source,
    timeframe,
    status: ready ? "READY" : "WAITING",
    signal,
    ready,
    score: ready ? Math.round((riskReward || 0) * 20) : 0,
    price: snapshot.price,
    markPrice: snapshot.markPrice,
    fundingRate: snapshot.fundingRate,
    openInterest: snapshot.openInterest,
    oiDelta5m: snapshot.oiDelta5m,
    oiHistorySamples: snapshot.oiHistorySamples,
    longShortRatio: snapshot.longShortRatio,
    fundingPressure,
    cluster,
    spoofRisk,
    spread: snapshot.spread,
    atr,
    stop,
    target,
    riskReward,
    checks,
    risk: {
      maxSpread: profile.maxSpread,
      maxFunding: profile.maxFunding,
      stopDistance,
      riskReward,
      accountSize,
      riskPercent,
      riskCapital,
      positionSize,
      minimumHistorySamples,
    },
    orderbook: { asks, bids, strongestAsk, strongestBid },
    calculatedAt: snapshot.calculatedAt,
  };
}

async function saveSignalSnapshot(analysis) {
  await withPaperStore((store) => {
    store.signalHistory.unshift({ ...analysis, recordedAt: new Date().toISOString() });
    store.signalHistory = store.signalHistory.slice(0, 500);
    return store;
  });
}

function backtestFuturesKlines(klines, timeframe, startingCapital = 10000) {
  const profile = {
    scalp: { stopAtr: 1.2, targetAtr: 2 },
    intraday: { stopAtr: 1.5, targetAtr: 3 },
    swing: { stopAtr: 2, targetAtr: 4 },
  }[timeframe] || { stopAtr: 1.5, targetAtr: 3 };
  let capital = startingCapital;
  let wins = 0;
  let losses = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  let peak = capital;
  let maxDrawdown = 0;
  const trades = [];
  for (let index = 15; index < klines.length - 1; index += 1) {
    const atr = indicatorCalculateAtr(klines.slice(0, index + 1));
    if (!atr) continue;
    const entry = Number(klines[index][4]);
    const currentOpen = Number(klines[index][1]);
    const direction = entry >= currentOpen ? "LONG" : "SHORT";
    const nextHigh = Number(klines[index + 1][2]);
    const nextLow = Number(klines[index + 1][3]);
    const stopDistance = atr * profile.stopAtr;
    const targetDistance = atr * profile.targetAtr;
    const stop = direction === "LONG" ? entry - stopDistance : entry + stopDistance;
    const target = direction === "LONG" ? entry + targetDistance : entry - targetDistance;
    const targetHit = direction === "LONG" ? nextHigh >= target : nextLow <= target;
    const stopHit = direction === "LONG" ? nextLow <= stop : nextHigh >= stop;
    if (!targetHit && !stopHit) continue;
    const grossPnl = targetHit && !stopHit ? targetDistance : -stopDistance;
    const fee = entry * paperFeeRate;
    const pnl = grossPnl - fee;
    capital += pnl;
    if (pnl > 0) {
      wins += 1;
      grossProfit += pnl;
    } else {
      losses += 1;
      grossLoss += Math.abs(pnl);
    }
    peak = Math.max(peak, capital);
    maxDrawdown = Math.max(maxDrawdown, peak - capital);
    trades.push({ direction, entry, stop, target, pnl, candleIndex: index });
  }
  const midpoint = Math.floor(klines.length / 2);
  const firstHalf = trades.filter((trade) => trade.candleIndex < midpoint);
  const secondHalf = trades.filter((trade) => trade.candleIndex >= midpoint);
  const summarizeWindow = (windowTrades) => {
    const profit = windowTrades.filter((trade) => trade.pnl > 0).reduce((total, trade) => total + trade.pnl, 0);
    const loss = windowTrades.filter((trade) => trade.pnl < 0).reduce((total, trade) => total + Math.abs(trade.pnl), 0);
    return {
      trades: windowTrades.length,
      netPnl: windowTrades.reduce((total, trade) => total + trade.pnl, 0),
      profitFactor: loss > 0 ? profit / loss : profit > 0 ? Infinity : 0,
    };
  };
  return {
    timeframe, startingCapital, endingCapital: capital,
    netPnl: capital - startingCapital, trades: trades.length,
    wins, losses, winRate: trades.length ? (wins / trades.length) * 100 : 0,
    grossProfit, grossLoss,
    profitFactor: grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0,
    maxDrawdown,
    maxDrawdownPercent: peak > 0 ? (maxDrawdown / peak) * 100 : 0,
    walkForward: { inSample: summarizeWindow(firstHalf), outOfSample: summarizeWindow(secondHalf) },
    validation: {
      oiDeltaRules: "NOT_AVAILABLE_WITH_KLINES_ONLY",
      orderbookBucketRules: "NOT_AVAILABLE_WITH_KLINES_ONLY",
      minimumTradeConfidence: trades.length >= 30,
    },
    calculatedAt: new Date().toISOString(),
  };
}

function validateHistoricalFuturesData(history, symbol) {
  const oi = history.oi.filter((item) => item.symbol === symbol);
  const books = history.orderbook.filter((item) => item.symbol === symbol);
  const oiDeltas = calculateOiDeltas(oi);
  const bucketImbalances = books.map((book) => {
    const bestBid = Number(book.bids?.[0]?.[0]);
    const bestAsk = Number(book.asks?.[0]?.[0]);
    const midpoint = Number.isFinite(bestBid) && Number.isFinite(bestAsk)
      ? (bestBid + bestAsk) / 2
      : bestBid || bestAsk;
    if (!midpoint || !Number.isFinite(midpoint)) return 0;
    const bids = calculateOrderbookBuckets(book.bids, midpoint, 0.005);
    const asks = calculateOrderbookBuckets(book.asks, midpoint, 0.005);
    return calculateOrderbookImbalance({
      bids: bids.map((bucket) => [bucket.averagePrice, bucket.quantity]),
      asks: asks.map((bucket) => [bucket.averagePrice, bucket.quantity]),
    });
  });
  const oiSummary = summarizeDirectionalObservations(oiDeltas, 0);
  const orderbookSummary = summarizeDirectionalObservations(bucketImbalances, 0.1);
  return {
    oiSamples: oi.length,
    orderbookSamples: books.length,
    oiDeltaObservations: oiDeltas.length,
    orderbookBucketObservations: bucketImbalances.length,
    oiDeltaRules: oiDeltas.length > 0 ? "AVAILABLE" : "COLLECTING_HISTORY",
    orderbookBucketRules: bucketImbalances.length > 0 ? "AVAILABLE" : "COLLECTING_HISTORY",
    latestOiDelta: oiDeltas.at(-1) ?? null,
    latestOrderbookImbalance: bucketImbalances.at(-1) ?? null,
    oiDeltaBacktest: oiSummary,
    orderbookBucketBacktest: orderbookSummary,
  };
}

const futuresOiMonitor = setInterval(() => {
  futuresTrackedSymbols.forEach((symbol) => {
    collectFuturesSnapshot(symbol)
      .then((snapshot) => recordFuturesOi(symbol, snapshot.openInterest))
      .catch(() => {});
  });
}, 60000);

futuresOiMonitor.unref();

function validateOrderLimits(store, symbol, quantity, quoteAmount, filters) {
  if (quoteAmount > maxPaperOrderQuote) throw new Error(`Paper order exceeds maximum $${maxPaperOrderQuote}`);
  if (store.dailyVolume.quote + quoteAmount > maxPaperDailyVolume) throw new Error(`Daily paper volume limit is $${maxPaperDailyVolume}`);
  if (filters.minQuantity && quantity < filters.minQuantity) throw new Error(`Minimum quantity is ${filters.minQuantity}`);
  if (filters.minNotional && quoteAmount < filters.minNotional) throw new Error(`Minimum notional is $${filters.minNotional}`);
}

function validateRealOrderSafety(store, body) {
  const symbol = validateSymbol(body.symbol || "BTCUSDT");
  const side = String(body.side || "").toUpperCase();
  const type = String(body.type || "").toUpperCase();
  if (!/^(BUY|SELL)$/.test(side) || !/^(LIMIT|MARKET)$/.test(type)) {
    throw new InputValidationError("Invalid real order payload");
  }
  if (body.confirmed !== true) {
    throw new Error("Real order requires a second confirmation before execution.");
  }
  const confirmationToken = String(body.confirmationToken || "").trim();
  if (!confirmationToken || confirmationToken !== "double-confirm") {
    throw new Error("Real order requires a valid confirmation token for second confirmation.");
  }

  const price = Number(body.price ?? 0);
  const quantity = Number(body.quantity ?? 0);
  const quoteAmount = Number(body.quoteAmount ?? (quantity && price ? quantity * price : 0));

  if (!Number.isFinite(quoteAmount) || quoteAmount <= 0) {
    throw new InputValidationError("Real order quote amount must be positive");
  }
  if (quoteAmount > maxRealOrderQuote) {
    throw new Error(`Real order exceeds maximum $${maxRealOrderQuote}`);
  }
  if (store.dailyVolume.quote + quoteAmount > maxRealDailyVolume) {
    throw new Error(`Daily real volume limit is $${maxRealDailyVolume}`);
  }
  return { symbol, side, type, quoteAmount, price, quantity };
}

function ensureUniqueRealOrder(userId, body) {
  const fingerprint = JSON.stringify({
    userId,
    symbol: String(body.symbol || "").toUpperCase(),
    side: String(body.side || "").toUpperCase(),
    type: String(body.type || "").toUpperCase(),
    quantity: Number(body.quantity ?? 0),
    price: Number(body.price ?? 0),
    quoteAmount: Number(body.quoteAmount ?? 0),
    confirmed: body.confirmed === true,
    confirmationToken: String(body.confirmationToken || "").trim(),
  });
  const now = Date.now();
  const previous = recentRealOrderRequests.get(fingerprint);
  if (previous && now - previous < 30000) {
    throw new Error("Duplicate real order detected. This request matches an order submitted recently.");
  }
  recentRealOrderRequests.set(fingerprint, now);
  for (const [key, timestamp] of recentRealOrderRequests.entries()) {
    if (now - timestamp > 30000) recentRealOrderRequests.delete(key);
  }
}

let paperOperation = Promise.resolve();

function withPaperStore(operation) {
  const nextOperation = paperOperation.then(async () => {
    const store = normalizePaperStore(await readPaperStore());
    const result = await operation(store);
    await writePaperStore(store);
    return result;
  });
  paperOperation = nextOperation.catch(() => {});
  return nextOperation;
}

function applyPaperFill(store, order, executionPrice, requestedQuoteAmount = order.remainingQuoteAmount ?? order.quoteAmount) {
  const fillQuoteAmount = Math.min(requestedQuoteAmount, order.remainingQuoteAmount ?? order.quoteAmount);
  const quantity = fillQuoteAmount / executionPrice;
  const fee = fillQuoteAmount * paperFeeRate;
  const positionIndex = store.positions.findIndex((item) => item.symbol === order.symbol);
  const averageEntryPrice = positionIndex === -1 ? executionPrice : store.positions[positionIndex].avgBuy;
  const reservedAsset = Number(store.reservedAssets[order.symbol]) || 0;

  if (order.reservation === "CASH") {
    store.reservedCash = Math.max(0, store.reservedCash - fillQuoteAmount - fee);
  }
  if (order.reservation === "ASSET") {
    store.reservedAssets[order.symbol] = Math.max(0, reservedAsset - quantity);
  }

  if (order.side === "BUY") {
    if (store.cash - store.reservedCash < fillQuoteAmount + fee) throw new Error("Insufficient paper USD balance");
    store.cash -= fillQuoteAmount + fee;
    if (positionIndex === -1) {
      store.positions.push({ symbol: order.symbol, amount: quantity, avgBuy: executionPrice });
    } else {
      const position = store.positions[positionIndex];
      const totalAmount = position.amount + quantity;
      position.avgBuy = (position.amount * position.avgBuy + quantity * executionPrice) / totalAmount;
      position.amount = totalAmount;
    }
  } else {
    if (positionIndex === -1 || store.positions[positionIndex].amount < quantity) {
      throw new Error("Insufficient paper asset balance");
    }
    store.realizedPnl += quantity * (executionPrice - averageEntryPrice) - fee;
    store.positions[positionIndex].amount -= quantity;
    store.cash += fillQuoteAmount - fee;
    if (store.positions[positionIndex].amount <= 0.000001) store.positions.splice(positionIndex, 1);
  }

  order.price = executionPrice;
  order.quantity = (order.filledQuantity || 0) + quantity;
  order.filledQuantity = order.quantity;
  order.filledQuoteAmount = (order.filledQuoteAmount || 0) + fillQuoteAmount;
  order.remainingQuoteAmount = Math.max(0, (order.remainingQuoteAmount ?? order.quoteAmount) - fillQuoteAmount);
  order.fee = fee;
  order.status = order.remainingQuoteAmount <= 0.00000001 ? "FILLED" : "PARTIALLY_FILLED";
  order.filledAt = new Date().toISOString();
  store.totalFees += fee;
  store.dailyVolume.quote += fillQuoteAmount;
  store.ledger.unshift({
    id: randomUUID(),
    type: "TRADE",
    orderId: order.id,
    symbol: order.symbol,
    side: order.side,
    amount: order.side === "BUY" ? -(fillQuoteAmount + fee) : fillQuoteAmount - fee,
    currency: "USD",
    createdAt: order.filledAt,
  });
  store.trades.unshift({
    id: randomUUID(),
    orderId: order.id,
    symbol: order.symbol,
    side: order.side,
    price: executionPrice,
    quantity,
    quoteAmount: fillQuoteAmount,
    fee,
    realizedPnl: order.side === "SELL" ? quantity * (executionPrice - averageEntryPrice) - fee : 0,
    executedAt: order.filledAt,
  });
  store.trades = store.trades.slice(0, 200);
  store.ledger = store.ledger.slice(0, 500);
}

async function executePaperOrder(body) {
  const currentStore = normalizePaperStore(await readPaperStore());
  if (currentStore.emergencyStop) throw new Error("Emergency stop is active");
  const symbol = validateSymbol(body.symbol);
  const side = String(body.side || "").toUpperCase();
  const type = String(body.type || "").toUpperCase();
  const quoteAmount = Number(body.quoteAmount);
  const limitPrice = Number(body.limitPrice);
  if (!["BUY", "SELL"].includes(side) || !["MARKET", "LIMIT"].includes(type)) {
    throw new Error("Invalid paper order");
  }
  if (!Number.isFinite(quoteAmount) || quoteAmount <= 0) {
    throw new Error("Quote amount must be positive");
  }
  if (type === "LIMIT" && (!Number.isFinite(limitPrice) || limitPrice <= 0)) {
    throw new Error("Limit price must be positive");
  }

  const tickerResponse = await fetch(`${binanceApiUrl}/ticker/price?symbol=${symbol}USDT`);
  if (!tickerResponse.ok) throw new Error("Unable to get Binance price");
  const ticker = await tickerResponse.json();
  const price = Number(ticker.price);
  const filters = await getSymbolFilters(symbol);
  if (type === "LIMIT" && (side === "BUY" ? price > limitPrice : price < limitPrice)) {
    return withPaperStore((store) => {
      if (store.emergencyStop) throw new Error("Emergency stop is active");
      const fee = quoteAmount * paperFeeRate;
      const quantity = quoteAmount / limitPrice;
      validateOrderLimits(store, symbol, quantity, quoteAmount, filters);
      if (side === "BUY") {
        if (store.cash - store.reservedCash < quoteAmount + fee) {
          throw new Error("Insufficient available paper USD balance");
        }
        store.reservedCash += quoteAmount + fee;
      } else {
        const position = store.positions.find((item) => item.symbol === symbol);
        const reservedAsset = Number(store.reservedAssets[symbol]) || 0;
        if (!position || position.amount - reservedAsset < quantity) {
          throw new Error("Insufficient available paper asset balance");
        }
        store.reservedAssets[symbol] = reservedAsset + quantity;
      }
      const order = {
        id: randomUUID(), symbol, side, type, price: limitPrice, quantity,
        quoteAmount, remainingQuoteAmount: quoteAmount, filledQuoteAmount: 0, filledQuantity: 0,
        fee, status: "OPEN", reservation: side === "BUY" ? "CASH" : "ASSET",
        createdAt: new Date().toISOString(),
      };
      store.orders.unshift(order);
      store.orders = store.orders.slice(0, 100);
      return { store, order };
    });
  }
  return withPaperStore((store) => {
    if (store.emergencyStop) throw new Error("Emergency stop is active");
    const executionPrice = price * (1 + (side === "BUY" ? 1 : -1) * (paperSpreadBps / 2 + paperSlippageBps) / 10000);
    const quantity = quoteAmount / executionPrice;
    validateOrderLimits(store, symbol, quantity, quoteAmount, filters);
    const order = {
      id: randomUUID(), symbol, side, type, price: executionPrice,
      quantity, quoteAmount,
      fee: quoteAmount * paperFeeRate, status: "FILLED",
      createdAt: new Date().toISOString(),
    };
    applyPaperFill(store, order, executionPrice);
    store.orders.unshift(order);
    store.orders = store.orders.slice(0, 100);
    return { store, order };
  });
}

let limitCheckInProgress = false;

async function fillEligibleLimitOrders() {
  if (limitCheckInProgress) return;
  limitCheckInProgress = true;
  try {
    const initialStore = normalizePaperStore(await readPaperStore());
    const openOrders = initialStore.orders.filter((order) => ["OPEN", "PARTIALLY_FILLED"].includes(order.status));
    const prices = new Map();
    for (const order of openOrders) {
      const response = await fetch(`${binanceApiUrl}/ticker/price?symbol=${order.symbol}USDT`);
      if (!response.ok) continue;
      const ticker = await response.json();
      prices.set(order.symbol, Number(ticker.price));
    }
    await withPaperStore((store) => {
      if (store.emergencyStop) return store;
      for (const order of store.orders.filter((item) => ["OPEN", "PARTIALLY_FILLED"].includes(item.status))) {
        const currentPrice = prices.get(order.symbol);
        if (!currentPrice) continue;
        const eligible = order.side === "BUY" ? currentPrice <= order.price : currentPrice >= order.price;
        if (!eligible) continue;
        try {
          const fillAmount = order.remainingQuoteAmount * Math.min(1, Math.max(0.01, paperFillFraction));
          applyPaperFill(store, order, currentPrice, fillAmount);
        } catch {
          order.status = "REJECTED";
          order.rejectedAt = new Date().toISOString();
        }
      }
      return store;
    });
  } finally {
    limitCheckInProgress = false;
  }
}

async function cancelPaperOrder(orderId) {
  return withPaperStore((store) => {
    const order = store.orders.find((item) => item.id === orderId);
    if (!order) throw new Error("Paper order not found");
    if (!["OPEN", "PARTIALLY_FILLED"].includes(order.status)) throw new Error("Only open orders can be canceled");
    const remainingQuoteAmount = order.remainingQuoteAmount ?? order.quoteAmount;
    if (order.reservation === "CASH") store.reservedCash = Math.max(0, store.reservedCash - remainingQuoteAmount - remainingQuoteAmount * paperFeeRate);
    if (order.reservation === "ASSET") store.reservedAssets[order.symbol] = Math.max(0, (Number(store.reservedAssets[order.symbol]) || 0) - remainingQuoteAmount / order.price);
    order.status = "CANCELED";
    order.canceledAt = new Date().toISOString();
    return { store, order };
  });
}

async function getPortfolioSummary() {
  const store = normalizePaperStore(await readPaperStore());
  const tradeStats = summarizePaperWinRate(store.trades);
  const valuations = await Promise.all(store.positions.map(async (position) => {
    const response = await fetch(`${binanceApiUrl}/ticker/24hr?symbol=${position.symbol}USDT`);
    if (!response.ok) throw new Error(`Unable to value ${position.symbol}`);
    const ticker = await response.json();
    const price = Number(ticker.lastPrice);
    const changePercent = Number(ticker.priceChangePercent);
    const value = position.amount * price;
    const unrealizedPnl = position.amount * (price - position.avgBuy);
    const dayStartPrice = price / (1 + changePercent / 100);
    return {
      symbol: position.symbol,
      price,
      value,
      unrealizedPnl,
      dailyPnl: position.amount * (price - dayStartPrice),
    };
  }));
  const cryptoValue = valuations.reduce((total, item) => total + item.value, 0);
  const summary = {
    cash: store.cash,
    reservedCash: store.reservedCash,
    reservedAssets: store.reservedAssets,
    cryptoValue,
    totalValue: store.cash + cryptoValue,
    unrealizedPnl: valuations.reduce((total, item) => total + item.unrealizedPnl, 0),
    realizedPnl: store.realizedPnl,
    dailyPnl: valuations.reduce((total, item) => total + item.dailyPnl, 0),
    totalFees: store.totalFees,
    ...tradeStats,
    positions: valuations,
    calculatedAt: new Date().toISOString(),
  };
  await withPaperStore((currentStore) => {
    const snapshot = {
      date: summary.calculatedAt.slice(0, 10),
      totalValue: summary.totalValue,
      cryptoValue: summary.cryptoValue,
      cash: summary.cash,
      unrealizedPnl: summary.unrealizedPnl,
      realizedPnl: summary.realizedPnl,
      dailyPnl: summary.dailyPnl,
      totalFees: summary.totalFees,
      capturedAt: summary.calculatedAt,
    };
    const existingIndex = currentStore.dailySnapshots.findIndex((item) => item.date === snapshot.date);
    if (existingIndex === -1) currentStore.dailySnapshots.push(snapshot);
    else currentStore.dailySnapshots[existingIndex] = snapshot;
    currentStore.dailySnapshots = currentStore.dailySnapshots.slice(-365);
    return currentStore;
  });
  return summary;
}

async function getMarketOverview() {
  const [binanceResponse, globalResponse, coinsResponse, fearGreedResponse] = await Promise.all([
    fetch(`${binanceApiUrl}/ticker/24hr`),
    fetch(`${coinGeckoApiUrl}/global`),
    fetch(`${coinGeckoApiUrl}/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,avalanche-2,chainlink&order=market_cap_desc&per_page=5&page=1&sparkline=false`),
    fetch(fearGreedApiUrl),
  ]);
  if (!binanceResponse.ok) throw new Error("Binance overview request failed");
  const binanceTickers = await binanceResponse.json();
  const global = globalResponse.ok ? await globalResponse.json() : null;
  const coins = coinsResponse.ok ? await coinsResponse.json() : [];
  const fearGreed = fearGreedResponse.ok ? await fearGreedResponse.json() : null;
  const usdtTickers = binanceTickers.filter((ticker) => ticker.symbol.endsWith("USDT"));
  const volume24h = usdtTickers.reduce((total, ticker) => total + Number(ticker.quoteVolume || 0), 0);
  const marketCaps = Object.fromEntries(coins.map((coin) => [
    { bitcoin: "BTC", ethereum: "ETH", solana: "SOL", "avalanche-2": "AVAX", chainlink: "LINK" }[coin.id],
    coin.market_cap,
  ]).filter(([symbol]) => symbol));
  return {
    volume24h,
    btcDominance: global?.data?.market_cap_percentage?.btc ?? null,
    fearGreed: fearGreed?.data?.[0] ? Number(fearGreed.data[0].value) : null,
    fearGreedLabel: fearGreed?.data?.[0]?.value_classification ?? null,
    marketCaps,
    calculatedAt: new Date().toISOString(),
  };
}

async function proxyBinance(response, path, searchParams) {
  const upstreamUrl = new URL(`${binanceApiUrl}${path}`);
  searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));

  const upstreamResponse = await fetch(upstreamUrl);
  const payload = await upstreamResponse.json();

  if (!upstreamResponse.ok) {
    sendJson(response, upstreamResponse.status, {
      error: "Binance market data request failed",
      details: payload,
    });
    return;
  }

  sendJson(response, 200, payload);
}

function buildOrderFingerprint(order) {
  const symbol = String(order.symbol || "").toUpperCase();
  const side = String(order.side || "").toUpperCase();
  const type = String(order.type || "").toUpperCase();
  const quantity = Number(order.quantity ?? order.origQty ?? 0);
  const price = Number(order.price ?? 0);
  return `${symbol}|${side}|${type}|${quantity.toFixed(8)}|${price.toFixed(8)}`;
}

async function fetchBinanceOpenOrders() {
  if (!exchangeTradingPolicy.realTradingEnabled) {
    throw new Error("Real trading is disabled. Set REAL_TRADING_ENABLED=true with approved Binance credentials.");
  }
  const apiKey = readSecret("BINANCE_API_KEY");
  const apiSecret = readSecret("BINANCE_API_SECRET");
  if (!apiKey || !apiSecret) {
    throw new Error("Binance API credentials are required for real trading.");
  }

  const timestamp = Date.now().toString();
  const query = new URLSearchParams({ timestamp }).toString();
  const signature = createHmac("sha256", apiSecret).update(query).digest("hex");
  const url = new URL(`${binanceApiUrl}/openOrders?${query}&signature=${signature}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-MBX-APIKEY": apiKey,
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json().catch(() => []);
  if (!response.ok) {
    throw new Error(mapBinanceError(payload));
  }
  return Array.isArray(payload) ? payload : [];
}

async function reconcileRealOrders(userId, store) {
  const localOrders = (store.realOrders || []).filter((order) => order.userId === userId || order.userId === undefined);
  const remoteOrders = await fetchBinanceOpenOrders().catch(() => []);
  const remoteKeys = new Set();
  for (const order of remoteOrders) {
    const key = buildOrderFingerprint(order);
    if (key) remoteKeys.add(key);
  }

  const unmatchedLocalOrders = [];
  for (const order of localOrders) {
    const key = buildOrderFingerprint(order);
    if (!remoteKeys.has(key)) {
      unmatchedLocalOrders.push({
        id: order.id || order.orderId || randomUUID(),
        symbol: String(order.symbol || "").toUpperCase(),
        side: String(order.side || "").toUpperCase(),
        type: String(order.type || "").toUpperCase(),
        status: order.status || "PENDING",
      });
    } else {
      remoteKeys.delete(key);
    }
  }

  const missingOnExchange = [];
  const remainingRemoteKeys = new Set(remoteKeys);
  for (const order of remoteOrders) {
    const key = buildOrderFingerprint(order);
    if (remainingRemoteKeys.has(key)) {
      missingOnExchange.push({
        orderId: order.orderId || order.id || null,
        symbol: String(order.symbol || "").toUpperCase(),
        side: String(order.side || "").toUpperCase(),
        type: String(order.type || "").toUpperCase(),
        status: order.status || "NEW",
      });
      remainingRemoteKeys.delete(key);
    }
  }

  return {
    remoteOrderCount: remoteOrders.length,
    localOrderCount: localOrders.length,
    unmatchedLocalOrders,
    missingOnExchange,
    syncedAt: new Date().toISOString(),
  };
}

async function fetchBinanceAccountOverview() {
  if (!exchangeTradingPolicy.realTradingEnabled) {
    throw new Error("Real trading is disabled. Set REAL_TRADING_ENABLED=true with approved Binance credentials.");
  }
  const apiKey = readSecret("BINANCE_API_KEY");
  const apiSecret = readSecret("BINANCE_API_SECRET");
  if (!apiKey || !apiSecret) {
    throw new Error("Binance API credentials are required for real trading.");
  }

  const timestamp = Date.now().toString();
  const query = new URLSearchParams({ timestamp }).toString();
  const signature = createHmac("sha256", apiSecret).update(query).digest("hex");
  const url = new URL(`${binanceApiUrl}/account?${query}&signature=${signature}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-MBX-APIKEY": apiKey,
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(mapBinanceError(payload));
  }

  return {
    accountType: payload.accountType || "SPOT",
    canTrade: payload.canTrade === true,
    canWithdraw: payload.canWithdraw === true,
    balances: (payload.balances || []).map((balance) => ({
      asset: balance.asset,
      free: Number(balance.free || 0),
      locked: Number(balance.locked || 0),
      total: Number(balance.free || 0) + Number(balance.locked || 0),
    })),
    updatedAt: new Date().toISOString(),
  };
}

async function serveStaticFile(response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = normalize(join(rootDirectory, requestedPath));

  if (!filePath.startsWith(rootDirectory)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(content);
  } catch {
    sendJson(response, 404, { error: "File not found" });
  }
}

validateProductionSecrets();
const exchangeTradingPolicy = validateExchangeTradingPolicy();

const server = (isProduction && tlsTermination === "node"
  ? createHttpsServer({ key: readFileSync(tlsKeyPath), cert: readFileSync(tlsCertPath) })
  : createHttpServer)(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  try {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Credentials": corsOrigin === "*" ? "false" : "true",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
      });
      response.end();
      return;
    }

    if (requestUrl.pathname === "/api/payments/intents" && request.method === "POST") {
      const user = getSessionUser(request);
      if (!user) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const stripeSecret = readSecret("STRIPE_SECRET_KEY");
      if (!stripeSecret) {
        sendJson(response, 503, { error: "Payment provider is not configured" });
        return;
      }
      const idempotencyKey = request.headers["idempotency-key"];
      if (!idempotencyKey || !/^[A-Za-z0-9_-]{16,128}$/.test(idempotencyKey)) {
        sendJson(response, 400, { error: "A valid Idempotency-Key header is required" });
        return;
      }
      try {
        const body = await readJsonBody(request);
        const amount = validatePaymentAmount(body.amount);
        const currency = String(body.currency || "usd").toLowerCase();
        if (!/^[a-z]{3}$/.test(currency)) throw new InputValidationError("Invalid currency");
        const form = new URLSearchParams({ amount: String(amount), currency, "metadata[user_id]": user.id });
        const stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
          method: "POST",
          headers: { Authorization: `Bearer ${stripeSecret}`, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": idempotencyKey },
          body: form,
          signal: AbortSignal.timeout(10000),
        });
        const result = await stripeResponse.json().catch(() => ({}));
        if (!stripeResponse.ok) {
          sendJson(response, 502, { error: "Payment provider request failed" });
          return;
        }
        sendJson(response, 201, { id: result.id, clientSecret: result.client_secret, status: result.status, currency: result.currency, amount: result.amount });
      } catch (error) {
        sendJson(response, error instanceof InputValidationError ? 400 : 502, { error: error instanceof Error ? error.message : "Payment intent failed" });
      }
      return;
    }

    if (requestUrl.pathname === "/api/payments/webhook" && request.method === "POST") {
      const webhookSecret = readSecret("STRIPE_WEBHOOK_SECRET");
      if (!webhookSecret) {
        sendJson(response, 503, { error: "Payment webhook is not configured" });
        return;
      }
      const rawBody = await readRawBody(request);
      if (!verifyStripeWebhookSignature(rawBody, request.headers["stripe-signature"], webhookSecret)) {
        sendJson(response, 400, { error: "Invalid webhook signature" });
        return;
      }
      const event = JSON.parse(rawBody);
      const eventId = String(event.id || "");
      const paymentIntent = event.data?.object || {};
      const paymentIntentId = String(paymentIntent.id || "");
      if (!/^evt_[A-Za-z0-9]{8,}$/.test(eventId) || !/^pi_[A-Za-z0-9]{8,}$/.test(paymentIntentId)) {
        sendJson(response, 400, { error: "Invalid payment event" });
        return;
      }
      await withPaperStore((store) => {
        if (store.paymentLedger.some((entry) => entry.eventId === eventId)) return store;
        const amount = Number(paymentIntent.amount);
        const currency = String(paymentIntent.currency || "").toLowerCase();
        const userId = String(paymentIntent.metadata?.user_id || "");
        const validAmount = Number.isInteger(amount) && amount > 0 && amount <= 100000000;
        const validCurrency = currency === "usd";
        const userExists = store.users.some((user) => user.id === userId);
        const status = event.type === "payment_intent.succeeded" && validAmount && validCurrency && userExists ? "CREDITED" : "REJECTED";
        const ledgerEntry = {
          id: randomUUID(), eventId, paymentIntentId, userId: userExists ? userId : null,
          amount, currency, status, createdAt: new Date().toISOString(),
        };
        store.paymentLedger.unshift(ledgerEntry);
        if (status === "CREDITED") {
          store.cash += amount / 100;
          store.ledger.unshift({ id: randomUUID(), type: "DEPOSIT", paymentIntentId, amount: amount / 100, currency: "USD", createdAt: ledgerEntry.createdAt });
        }
        store.paymentLedger = store.paymentLedger.slice(0, 500);
        appendAuditLog(store, request, `PAYMENT_${status}`, userExists ? userId : null, { paymentIntentId, amount, currency });
        return store;
      });
      sendJson(response, 200, { received: true });
      return;
    }

    if (["POST"].includes(request.method) && ["/api/auth/register", "/api/auth/login"].includes(requestUrl.pathname)) {
      if (isRateLimited(request)) {
        sendJson(response, 429, { error: "Too many authentication attempts" });
        return;
      }
      try {
        const { email, password } = validateAuthInput(await readJsonBody(request));
        if (requestUrl.pathname === "/api/auth/register") {
          const passwordHash = await hashPassword(password);
          const result = await withPaperStore((store) => {
            if (store.users.some((user) => user.email === email)) throw new Error("Email is already registered");
            const user = { id: randomUUID(), email, passwordHash, createdAt: new Date().toISOString() };
            store.users.push(user);
            appendAuditLog(store, request, "AUTH_REGISTER", user.id);
            return user;
          });
          sendJson(response, 201, { user: { id: result.id, email: result.email } });
          return;
        }
        const store = normalizePaperStore(await readPaperStore());
        const user = store.users.find((item) => item.email === email);
        if (!user || !(await verifyPassword(password, user.passwordHash))) {
          sendJson(response, 401, { error: "Invalid email or password" });
          return;
        }
        const sessionId = randomBytes(32).toString("hex");
        sessions.set(sessionId, {
          user: { id: user.id, email: user.email },
          mfaVerified: !user.mfaEnabled,
          expiresAt: Date.now() + sessionTtlMs,
        });
        await withPaperStore((currentStore) => {
          appendAuditLog(currentStore, request, "AUTH_LOGIN", user.id);
          return currentStore;
        });
        setSessionCookie(response, sessionId, Math.floor(sessionTtlMs / 1000));
        if (user.mfaEnabled) {
          sendJson(response, 401, { error: "MFA verification required", mfaRequired: true });
        } else {
          sendJson(response, 200, { user: { id: user.id, email: user.email } });
        }
      } catch (error) {
        sendJson(response, 400, { error: error instanceof Error ? error.message : "Authentication request failed" });
      }
      return;
    }

    if (requestUrl.pathname === "/api/auth/mfa/setup" && request.method === "POST") {
      const session = getSession(request);
      if (!session?.mfaVerified) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const secret = OTPAuth.Secret.fromHex(randomBytes(20).toString("hex"));
      const result = await withPaperStore((store) => {
        const user = store.users.find((item) => item.id === session.user.id);
        if (!user) throw new Error("User not found");
        user.mfaSecret = secret.base32;
        user.mfaEnabled = false;
        appendAuditLog(store, request, "MFA_SETUP", user.id);
        return user;
      });
      sendJson(response, 200, {
        secret: result.mfaSecret,
        uri: createTotp(result.mfaSecret).toString(),
      });
      return;
    }

    if (requestUrl.pathname === "/api/auth/mfa/verify" && request.method === "POST") {
      const session = getSession(request);
      if (!session) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      try {
        const token = validateTotpToken(await readJsonBody(request));
        const store = normalizePaperStore(await readPaperStore());
        const user = store.users.find((item) => item.id === session.user.id);
        if (!user?.mfaSecret || createTotp(user.mfaSecret).validate({ token, window: 1 }) === null) {
          sendJson(response, 401, { error: "Invalid MFA token" });
          return;
        }
        await withPaperStore((currentStore) => {
          const currentUser = currentStore.users.find((item) => item.id === session.user.id);
          currentUser.mfaEnabled = true;
          appendAuditLog(currentStore, request, "MFA_VERIFY", currentUser.id);
          return currentUser;
        });
        session.mfaVerified = true;
        sendJson(response, 200, { user: session.user, mfaEnabled: true });
      } catch (error) {
        sendJson(response, 400, { error: error instanceof Error ? error.message : "MFA verification failed" });
      }
      return;
    }

    if (requestUrl.pathname === "/api/auth/me" && request.method === "GET") {
      const user = getSessionUser(request);
      sendJson(response, user ? 200 : 401, user ? { user } : { error: "Authentication required" });
      return;
    }

    if (requestUrl.pathname === "/api/audit" && request.method === "GET") {
      const user = getSessionUser(request);
      if (!user) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, store.auditLog.slice(0, 100));
      return;
    }

    if (requestUrl.pathname === "/api/auth/logout" && request.method === "POST") {
      const cookieValue = parseCookies(request).sid || "";
      const sessionId = cookieValue.slice(0, cookieValue.lastIndexOf("."));
      const session = getSession(request);
      if (sessionId) sessions.delete(sessionId);
      await withPaperStore((store) => {
        appendAuditLog(store, request, "AUTH_LOGOUT", session?.user.id || null);
        return store;
      });
      setSessionCookie(response, "", 0);
      sendJson(response, 200, { ok: true });
      return;
    }

    if (requestUrl.pathname === "/api/security/status" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, {
        realTradingEnabled: exchangeTradingPolicy.realTradingEnabled,
        withdrawalsEnabled: exchangeTradingPolicy.withdrawalsEnabled,
        emergencyStop: store.emergencyStop,
      });
      return;
    }

    if (requestUrl.pathname === "/api/real/account" && request.method === "GET") {
      const user = getSessionUser(request);
      if (!user) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const store = normalizePaperStore(await readPaperStore());
      if (store.emergencyStop) {
        sendJson(response, 403, {
          error: "Emergency stop is active. Real trading is temporarily disabled.",
        });
        return;
      }
      if (!exchangeTradingPolicy.realTradingEnabled) {
        sendJson(response, 403, {
          error: "Real trading is disabled. Set REAL_TRADING_ENABLED=true with approved Binance credentials.",
        });
        return;
      }
      try {
        const account = await fetchBinanceAccountOverview();
        sendJson(response, 200, { user: { id: user.id, email: user.email }, ...account });
      } catch (error) {
        const report = buildErrorReport(error, {
          stage: "binance.account",
          route: requestUrl.pathname,
          userId: user.id,
          requestId: request.headers["x-request-id"] || randomUUID(),
        });
        logger.error({
          event: "real.account.error",
          category: report.category,
          severity: report.severity,
          requestId: report.requestId,
          userId: user.id,
          error: report.message,
        });
        sendJson(response, 400, {
          error: error instanceof Error ? error.message : "Binance account lookup failed",
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/real/orders" && ["GET", "POST"].includes(request.method)) {
      const user = getSessionUser(request);
      if (!user) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const store = normalizePaperStore(await readPaperStore());
      if (store.emergencyStop) {
        sendJson(response, 403, {
          error: "Emergency stop is active. Real trading is temporarily disabled.",
        });
        return;
      }
      if (!exchangeTradingPolicy.realTradingEnabled) {
        sendJson(response, 403, {
          error: "Real trading is disabled. Set REAL_TRADING_ENABLED=true with approved Binance credentials.",
        });
        return;
      }
      if (request.method === "POST") {
        try {
          const body = await readJsonBody(request);
          const store = normalizePaperStore(await readPaperStore());
          ensureUniqueRealOrder(user.id, body);
          const order = validateRealOrderSafety(store, body);
          const realOrder = {
            id: randomUUID(),
            userId: user.id,
            symbol: order.symbol,
            side: order.side,
            type: order.type,
            quantity: order.quantity,
            price: order.price,
            quoteAmount: order.quoteAmount,
            status: "PENDING",
            createdAt: new Date().toISOString(),
          };
          await withPaperStore((currentStore) => {
            const cleanStore = normalizePaperStore(currentStore);
            cleanStore.realOrders.unshift(realOrder);
            cleanStore.realOrders = cleanStore.realOrders.slice(0, 200);
            appendAuditLog(cleanStore, request, "REAL_ORDER_SUBMITTED", user.id, {
              orderId: realOrder.id,
              symbol: realOrder.symbol,
              side: realOrder.side,
              type: realOrder.type,
              quantity: realOrder.quantity,
              price: realOrder.price,
              quoteAmount: realOrder.quoteAmount,
              status: realOrder.status,
            });
            return cleanStore;
          });
          sendJson(response, 200, {
            ok: true,
            message: "Second confirmation accepted. Real execution is still gated by exchange approval and operational rules.",
            user: { id: user.id, email: user.email },
            order,
            realOrder,
          });
          return;
        } catch (error) {
          const report = buildErrorReport(error, {
            stage: "real.order.validation",
            route: requestUrl.pathname,
            userId: user.id,
            requestId: request.headers["x-request-id"] || randomUUID(),
          });
          logger.error({
            event: "real.order.validation.error",
            category: report.category,
            severity: report.severity,
            requestId: report.requestId,
            userId: user.id,
            error: report.message,
          });
          sendJson(response, error instanceof Error && /duplicate/i.test(error.message) ? 409 : 400, {
            error: error instanceof Error ? error.message : "Real order validation failed",
          });
          return;
        }
      }

      try {
        const store = normalizePaperStore(await readPaperStore());
        const reconciliation = await reconcileRealOrders(user.id, store);
        appendAuditLog(store, request, "REAL_ORDER_RECONCILIATION", user.id, {
          remoteOrderCount: reconciliation.remoteOrderCount,
          localOrderCount: reconciliation.localOrderCount,
          unmatchedLocalOrders: reconciliation.unmatchedLocalOrders.length,
          missingOnExchange: reconciliation.missingOnExchange.length,
        });
        await withPaperStore((currentStore) => {
          const cleanStore = normalizePaperStore(currentStore);
          cleanStore.auditLog.unshift({
            id: randomUUID(),
            action: "REAL_ORDER_RECONCILIATION",
            userId: user.id,
            ip: getClientAddress(request),
            metadata: {
              remoteOrderCount: reconciliation.remoteOrderCount,
              localOrderCount: reconciliation.localOrderCount,
              unmatchedLocalOrders: reconciliation.unmatchedLocalOrders.length,
              missingOnExchange: reconciliation.missingOnExchange.length,
            },
            createdAt: new Date().toISOString(),
          });
          cleanStore.auditLog = cleanStore.auditLog.slice(0, 1000);
          return cleanStore;
        });
        sendJson(response, 200, {
          user: { id: user.id, email: user.email },
          orders: (store.realOrders || []).filter((entry) => entry.userId === user.id),
          reconciliation,
        });
      } catch (error) {
        const report = buildErrorReport(error, {
          stage: "real.order.reconciliation",
          route: requestUrl.pathname,
          userId: user.id,
          requestId: request.headers["x-request-id"] || randomUUID(),
        });
        logger.error({
          event: "real.order.reconciliation.error",
          category: report.category,
          severity: report.severity,
          requestId: report.requestId,
          userId: user.id,
          error: report.message,
        });
        sendJson(response, 502, { error: error instanceof Error ? error.message : "Real order reconciliation failed" });
      }
      return;
    }

    if (requestUrl.pathname === "/health" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, {
        status: "ok",
        service: "crypto-quant-pro",
        storage: paperStorage,
        realTradingEnabled: exchangeTradingPolicy.realTradingEnabled,
        emergencyStop: store.emergencyStop,
        checkedAt: new Date().toISOString(),
      });
      return;
    }

    if (requestUrl.pathname === "/api/monitoring/summary" && request.method === "GET") {
      const summary = monitor.snapshot();
      sendJson(response, 200, {
        service: summary.service,
        status: summary.status,
        uptimeSeconds: summary.uptimeSeconds,
        totalEvents: summary.totalEvents,
        websocketReconnects: summary.websocketReconnects,
        lastReconnectAt: summary.lastReconnectAt,
        errorCounts: summary.errorCounts,
        warningCounts: summary.warningCounts,
        lastEvent: summary.lastEvent,
      });
      return;
    }

    if (requestUrl.pathname === "/api/security/emergency-stop" && request.method === "POST") {
      const user = getSessionUser(request);
      if (!user) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      const body = await readJsonBody(request);
      if (typeof body.enabled !== "boolean") throw new InputValidationError("enabled must be boolean");
      const result = await withPaperStore((store) => {
        store.emergencyStop = body.enabled;
        appendAuditLog(store, request, body.enabled ? "EMERGENCY_STOP_ENABLED" : "EMERGENCY_STOP_DISABLED", user.id);
        return { emergencyStop: store.emergencyStop };
      });
      sendJson(response, 200, result);
      return;
    }

    if (requestUrl.pathname === "/api/market/ticker") {
      validateMarketQuery(requestUrl.pathname, requestUrl.searchParams);
      await proxyBinance(response, "/ticker/24hr", requestUrl.searchParams);
      return;
    }

    if (requestUrl.pathname === "/api/market/klines") {
      validateMarketQuery(requestUrl.pathname, requestUrl.searchParams);
      await proxyBinance(response, "/klines", requestUrl.searchParams);
      return;
    }

    if (requestUrl.pathname === "/api/market/depth") {
      validateMarketQuery(requestUrl.pathname, requestUrl.searchParams);
      await proxyBinance(response, "/depth", requestUrl.searchParams);
      return;
    }

    if (requestUrl.pathname === "/api/market/overview" && request.method === "GET") {
      try {
        sendJson(response, 200, await getMarketOverview());
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : "Market overview failed",
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/ai/analyze" && request.method === "POST") {
      try {
        sendJson(response, 200, await analyzeWithGemini(await readJsonBody(request)));
      } catch (error) {
        const message = error instanceof Error ? error.message : "AI analysis failed";
        sendJson(response, message === "GEMINI_API_KEY is not configured" ? 503 : 502, { error: message });
      }
      return;
    }

    if (requestUrl.pathname === "/api/futures/history" && request.method === "GET") {
      const history = await readFuturesHistory();
      sendJson(response, 200, {
        oi: history.oi.slice(-1000),
        orderbook: history.orderbook.slice(-500),
      });
      return;
    }

    if (requestUrl.pathname.startsWith("/api/futures/collect/") && request.method === "POST") {
      try {
        const symbol = validateSymbol(requestUrl.pathname.split("/").pop());
        sendJson(response, 201, await collectFuturesSnapshot(symbol));
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : "Futures collection failed" });
      }
      return;
    }

    if (requestUrl.pathname === "/api/analysis/history" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, store.signalHistory);
      return;
    }

    if (requestUrl.pathname.startsWith("/api/analysis/") && request.method === "GET") {
      const analysisPath = requestUrl.pathname.split("/").filter(Boolean);
      const symbol = validateSymbol(analysisPath[2]);
      const timeframe = validateTimeframe(requestUrl.searchParams.get("timeframe") || "intraday");
      const accountSize = requestUrl.searchParams.has("accountSize") ? validatePositiveNumber(requestUrl.searchParams.get("accountSize"), "accountSize", { maximum: 1e12 }) : 10000;
      const riskPercent = requestUrl.searchParams.has("riskPercent") ? validatePositiveNumber(requestUrl.searchParams.get("riskPercent"), "riskPercent", { maximum: 100 }) : 1;
      try {
        const snapshot = await getFuturesSnapshot(symbol, timeframe === "swing" ? "4h" : timeframe === "scalp" ? "5m" : "15m");
        const analysis = buildFuturesAnalysis(snapshot, timeframe, accountSize, riskPercent);
        await saveSignalSnapshot(analysis);
        sendJson(response, 200, analysis);
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : "Futures analysis failed",
        });
      }
      return;
    }

    if (requestUrl.pathname.startsWith("/api/backtest/") && request.method === "GET") {
      const symbol = validateSymbol(requestUrl.pathname.split("/").pop());
      const timeframe = validateTimeframe(requestUrl.searchParams.get("timeframe") || "intraday");
      const interval = timeframe === "swing" ? "4h" : timeframe === "scalp" ? "5m" : "15m";
      try {
        const klines = await fetchFuturesJson("/klines", { symbol: `${symbol}USDT`, interval, limit: 500 });
        const history = await readFuturesHistory();
        const result = backtestFuturesKlines(klines, timeframe);
        result.validation = {
          ...result.validation,
          ...validateHistoricalFuturesData(history, symbol),
        };
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, 502, { error: error instanceof Error ? error.message : "Backtest failed" });
      }
      return;
    }

    if (requestUrl.pathname.startsWith("/api/futures/") && requestUrl.pathname.endsWith("/stream") && request.method === "GET") {
      const symbol = validateSymbol(requestUrl.pathname.split("/")[3], "Futures symbol");
      const connection = ensureFuturesConnection(symbol);
      response.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Credentials": corsOrigin === "*" ? "false" : "true",
      });
      connection.subscribers.add(response);
      response.write(`data: ${JSON.stringify({ symbol, status: connection.status })}\n\n`);
      request.on("close", () => {
        connection.subscribers.delete(response);
        if (connection.subscribers.size === 0 && connection.socket) {
          connection.socket.close();
          if (connection.retryTimer) clearTimeout(connection.retryTimer);
          futuresConnections.delete(symbol);
          futuresLiveState.delete(symbol);
        }
      });
      return;
    }

    if (requestUrl.pathname.startsWith("/api/futures/") && request.method === "GET") {
      const symbol = validateSymbol(requestUrl.pathname.split("/").pop(), "Futures symbol");
      try {
        sendJson(response, 200, await getFuturesSnapshot(symbol, requestUrl.searchParams.get("interval") || "15m"));
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : "Futures market data failed",
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/paper/config" && request.method === "GET") {
      sendJson(response, 200, {
        feeRate: paperFeeRate,
        fee: paperFeeRate,
        maxOrderQuote: maxPaperOrderQuote,
        maxDailyVolume: maxPaperDailyVolume,
        spreadBps: paperSpreadBps,
        slippageBps: paperSlippageBps,
      });
      return;
    }

    if (requestUrl.pathname === "/api/paper/state" && request.method === "GET") {
      sendJson(response, 200, normalizePaperStore(await readPaperStore()));
      return;
    }

    if (requestUrl.pathname === "/api/paper/orders" && request.method === "POST") {
      try {
        const result = await executePaperOrder(await readJsonBody(request));
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, 400, {
          error: error instanceof Error ? error.message : "Paper order failed",
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/paper/orders" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, { orders: store.orders || [] });
      return;
    }

    if (requestUrl.pathname === "/api/paper/portfolio" && request.method === "GET") {
      try {
        sendJson(response, 200, await getPortfolioSummary());
      } catch (error) {
        sendJson(response, 502, {
          error: error instanceof Error ? error.message : "Portfolio valuation failed",
        });
      }
      return;
    }

    if (requestUrl.pathname === "/api/paper/ledger" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, store.ledger);
      return;
    }

    if (requestUrl.pathname === "/api/paper/snapshots" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, store.dailySnapshots);
      return;
    }

    if (requestUrl.pathname === "/api/alerts" && request.method === "GET") {
      const store = normalizePaperStore(await readPaperStore());
      sendJson(response, 200, {
        alerts: store.alerts,
        events: store.alertEvents,
        alertEvents: store.alertEvents,
      });
      return;
    }

    if (requestUrl.pathname === "/api/alerts" && request.method === "POST") {
      const body = await readJsonBody(request);
      const symbol = validateSymbol(body.symbol);
      const type = String(body.type || "PRICE").toUpperCase();
      if (!["PRICE", "VOLATILITY", "VOLUME"].includes(type)) {
        sendJson(response, 400, { error: "Invalid alert" });
        return;
      }
      if (body.condition !== undefined && !["ABOVE", "BELOW"].includes(body.condition)) throw new InputValidationError("Invalid alert condition");
      if (body.webhookUrl !== undefined && body.webhookUrl !== "") {
        const webhookUrl = new URL(body.webhookUrl);
        if (!["http:", "https:"].includes(webhookUrl.protocol)) throw new InputValidationError("Invalid webhook URL");
      }
      const result = await withPaperStore((store) => {
        const alert = {
          id: randomUUID(), symbol, type,
          condition: body.condition === "BELOW" ? "BELOW" : "ABOVE",
          target: Number(body.target) || 0,
          volatilityThreshold: Number(body.volatilityThreshold ?? body.vol) || 0,
          volumeThreshold: Number(body.volumeThreshold) || 0,
          enabled: true,
          oneTime: Boolean(body.oneTime),
          recurring: !Boolean(body.oneTime),
          webhookUrl: typeof body.webhookUrl === "string" ? body.webhookUrl : "",
          createdAt: new Date().toISOString(),
        };
        if ((type === "PRICE" && alert.target <= 0) || (type === "VOLATILITY" && alert.volatilityThreshold <= 0) || (type === "VOLUME" && alert.volumeThreshold <= 0)) {
          throw new Error("Alert threshold must be positive");
        }
        store.alerts.unshift(alert);
        return { alert, alerts: store.alerts };
      });
      sendJson(response, 201, result);
      return;
    }

    if (requestUrl.pathname.startsWith("/api/alerts/") && request.method === "DELETE") {
      const alertId = validateUuid(requestUrl.pathname.split("/").pop(), "alert id");
      const result = await withPaperStore((store) => {
        const before = store.alerts.length;
        store.alerts = store.alerts.filter((alert) => alert.id !== alertId);
        if (store.alerts.length === before) throw new Error("Alert not found");
        return { alerts: store.alerts };
      });
      sendJson(response, 200, result);
      return;
    }

    if (requestUrl.pathname.startsWith("/api/alerts/") && request.method === "PATCH") {
      const alertId = validateUuid(requestUrl.pathname.split("/").pop(), "alert id");
      const body = await readJsonBody(request);
      if (body.enabled !== undefined && typeof body.enabled !== "boolean") throw new InputValidationError("Invalid enabled value");
      if (body.oneTime !== undefined && typeof body.oneTime !== "boolean") throw new InputValidationError("Invalid oneTime value");
      const result = await withPaperStore((store) => {
        const alert = store.alerts.find((item) => item.id === alertId);
        if (!alert) throw new Error("Alert not found");
        if (typeof body.enabled === "boolean") alert.enabled = body.enabled;
        if (typeof body.oneTime === "boolean") {
          alert.oneTime = body.oneTime;
          alert.recurring = !body.oneTime;
        }
        return { alert };
      });
      sendJson(response, 200, result);
      return;
    }

    if (requestUrl.pathname === "/api/alerts/evaluate" && request.method === "POST") {
      sendJson(response, 200, { events: await evaluateAlerts() });
      return;
    }

    if (requestUrl.pathname.startsWith("/api/paper/orders/") && request.method === "DELETE") {
      try {
        const result = await cancelPaperOrder(validateUuid(requestUrl.pathname.split("/").pop(), "order id"));
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, 400, {
          error: error instanceof Error ? error.message : "Cancel failed",
        });
      }
      return;
    }

    if (request.method !== "GET") {
      sendJson(response, 405, { error: "Method not allowed" });
      return;
    }

    await serveStaticFile(response, requestUrl.pathname);
  } catch (error) {
    const isInputError = error instanceof InputValidationError || error instanceof SyntaxError;
    const statusCode = isInputError ? 400 : 502;
    logRequestError(request, new URL(request.url || "/", "http://localhost"), error, statusCode);
    sendJson(response, statusCode, {
      error: isInputError ? (error instanceof Error ? error.message : "Invalid request") : "Market data service unavailable",
      ...(isInputError ? {} : { details: error instanceof Error ? error.message : "Unknown error" }),
    });
  }
});

server.listen(port, () => {
  logger.info({
    event: "server.start",
    service: "crypto-quant-pro",
    port,
    protocol: isProduction ? "https" : "http",
    url: `${isProduction ? "https" : "http"}://localhost:${port}`,
  });
});

const limitMonitor = setInterval(() => {
  fillEligibleLimitOrders().catch((error) => {
    logger.error({
      event: "paper.limit_monitor.error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  });
}, 2000);

limitMonitor.unref();

const alertMonitor = setInterval(() => {
  evaluateAlerts().catch((error) => {
    logger.error({
      event: "alert.monitor.error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  });
}, 5000);

alertMonitor.unref();

let shutdownInProgress = false;

async function gracefulShutdown(signal = "SIGTERM") {
  if (shutdownInProgress) return;
  shutdownInProgress = true;

  logger.warn({
    event: "server.shutdown",
    signal,
    message: "Starting graceful shutdown",
  });

  try {
    for (const connection of futuresConnections.values()) {
      if (connection.retryTimer) clearTimeout(connection.retryTimer);
      if (connection.socket && connection.socket.readyState !== connection.socket.CLOSED) {
        connection.socket.close();
      }
      connection.subscribers.clear();
    }
    futuresConnections.clear();
    futuresLiveState.clear();
    clearInterval(limitMonitor);
    clearInterval(alertMonitor);

    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    logger.info({
      event: "server.shutdown.complete",
      signal,
      service: "crypto-quant-pro",
    });
  } catch (error) {
    logger.error({
      event: "server.shutdown.error",
      signal,
      error: error instanceof Error ? error.message : "Unknown shutdown error",
    });
  } finally {
    process.exitCode = 0;
    process.exit(0);
  }
}

process.once("SIGTERM", () => {
  void gracefulShutdown("SIGTERM");
});

process.once("SIGINT", () => {
  void gracefulShutdown("SIGINT");
});

