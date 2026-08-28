# CryptoQuant Pro Roadmap

Този чеклист е работният план за превръщане на прототипа в надеждна платформа с реални market data и paper trading. Отбелязваме задачите една по една след реална имплементация и проверка.

## 1. Market Data

- [x] Binance REST ticker за начални цени
- [x] Binance WebSocket ticker за live цени
- [x] Binance REST klines за исторически свещи
- [x] Binance WebSocket klines за текущата свещ
- [x] Binance depth snapshot за началния order book
- [x] Binance WebSocket depth stream за live bids/asks
- [x] Binance WebSocket trade stream за recent trades
- [x] Timeframe контролите да сменят реалните Binance интервали
- [x] Market connection статус: `CONNECTING`, `LIVE`, `ERROR`, `DISCONNECTED`
- [x] Реален market volume, market cap, BTC dominance и Fear & Greed
- [x] Единен reconnect механизъм с exponential backoff
- [x] Stale data detection и timestamp за всеки feed
- [x] Ясни loading/error състояния във всички market панели

## 2. Paper Trading Engine

- [x] Backend paper state
- [x] MARKET ордери с текуща Binance цена
- [x] LIMIT ордери със статус `OPEN`
- [x] Автоматично изпълнение на достигнати LIMIT ордери
- [x] Статуси `FILLED`, `CANCELED`, `REJECTED`
- [x] Комисиона `0.10%`
- [x] USD резервиране за BUY LIMIT ордери
- [x] Asset резервиране за SELL LIMIT ордери
- [x] Освобождаване на резерви при cancel
- [x] Отделна история на `orders` и `trades`
- [x] Atomic запис на paper store
- [x] Serialized операции за предотвратяване на balance race conditions
- [x] Реализиран P&L (`realizedPnl`)
- [x] Нереализиран P&L (`unrealizedPnl`)
- [x] Такси (`totalFees`)
- [x] Portfolio valuation endpoint
- [x] Paper order history в UI
- [x] Автоматично обновяване на paper state в UI
- [x] Partial fills
- [x] Slippage и spread модел
- [x] Binance symbol filters: min quantity, tick size и min notional
- [x] Максимален размер на ордер
- [x] Дневен лимит на paper обема
- [x] Отделен portfolio transaction ledger
- [x] Реална дневна P&L история със snapshots
- [x] Unit и integration тестове за engine-а

## 3. Alerts

- [x] Backend проверка на ABOVE/BELOW аларми
- [x] Volatility аларми от реални candles
- [x] Volume аларми от реални market данни
- [x] Cooldown срещу повтарящи се известия
- [x] One-time и recurring аларми
- [x] История на задействаните аларми
- [x] In-app известия от backend
- [x] Email, push или webhook известия (webhook)

## 4. Futures Quant Analytics и Signal Engine

Този етап използва логиката от `for_add/1index.html`, но я пренася в отделни backend слоеве. Futures анализът остава отделен от Spot market data и paper execution.

### Futures Market Data

- [x] Binance Futures REST provider (`fapi.binance.com`)
- [x] Binance Futures WebSocket provider (`fstream.binance.com`)
- [x] Futures ticker и mark price
- [x] Funding rate и funding timestamp
- [x] Open Interest snapshot
- [x] Open Interest history за реален OI delta
- [x] Long/Short account ratio
- [x] Futures order book snapshot
- [x] Futures order book incremental updates
- [x] Futures klines за всички аналитични timeframe-и
- [x] Futures data статуси: `COLLECTING`, `LIVE`, `STALE`, `ERROR`
- [x] Futures WebSocket reconnect с exponential backoff
- [x] Timestamp и source за всеки Futures feed

### Indicator Engine

- [x] ATR(14) от реални Futures klines
- [x] ATR-based stop loss според timeframe профила
- [x] Реален OI delta спрямо 5-минутна история
- [x] Funding pressure анализ
- [x] Long/Short ratio анализ
- [x] Spread calculation и spread guard
- [x] Orderbook price bucketing
- [x] Сумиране на съседни orderbook нива в ценови коридори
- [x] Ask wall и bid wall анализ
- [x] Cluster size и cluster age tracking
- [x] Spoof-risk detection без единичен ордер да определя сигнала
- [x] Indicator snapshots с timestamp

### Strategy и Risk Engine

- [x] Scalp профил: 1-5m
- [x] Intraday профил: 15m-1h
- [x] Swing профил: 4h-1d
- [x] Strategy signal: `LONG`, `SHORT`, `WAITING`
- [x] Конфигурируеми max spread и max funding правила
- [x] Risk/reward изчисление
- [x] Entry, stop и target нива
- [x] Position sizing според риска
- [x] Signal readiness проверки
- [x] Signal confidence и причина
- [x] Защита от сигнал при недостатъчна OI history
- [x] Отделяне на signal engine от order execution

### API и UI интеграция

- [x] `GET /api/analysis/:symbol?timeframe=...`
- [x] `GET /api/analysis/:symbol/indicators`
- [x] `GET /api/analysis/:symbol/signal`
- [x] Signal cards в отделен UI таб
- [x] Scalp/Intraday/Swing selector
- [x] Indicator values и timestamps в UI
- [x] READY/BLOCKED/WAITING състояния
- [x] Ясно обозначение `SPOT` срещу `FUTURES`
- [x] Signal history в UI
- [x] Backend signal refresh без `Math.random()`

### Backtesting и Validation

- [x] Исторически Futures klines за backtesting
- [x] Backtest на ATR stop и target
- [x] Backtest на OI delta правила
- [x] Backtest на orderbook bucket правила при налични snapshots
- [x] Такси, spread и slippage в backtest
- [x] Win rate от реални paper trades
- [x] Profit factor и max drawdown
- [x] Walk-forward validation
- [x] Минимален брой сделки преди signal confidence
- [x] Unit тестове за всички индикатори
- [x] Integration тестове за Futures provider
- [x] Acceptance тест за Scalp/Intraday/Swing сигналите

## 5. AI Quant

- [x] Gemini заявките да минават през backend
- [x] API ключът да остане само в environment/secret storage
- [x] AI анализът да използва реален market snapshot
- [x] Реален чат вместо шаблонни отговори
- [x] Loading, error и rate-limit състояния
- [x] AI предложенията да имат timestamp и snapshot reference
- [x] Risk engine да одобрява или отказва AI предложения
- [x] AI auto-trading да бъде изключен по подразбиране
- [x] Премахване на `Math.random()` от AI execution логиката
- [x] Реален win rate от trade history

## 6. Database и Persistence

- [x] Избор и настройка на PostgreSQL
- [x] Database migrations
- [x] Таблица за users
- [x] Таблици за balances и positions
- [x] Таблици за orders и trades
- [x] Таблици за alerts и alert events
- [x] Таблица за market snapshots
- [x] Database transactions за ордери и резерви
- [x] Backup и restore процедура
- [x] Премахване на `paper-store.json` след миграция

## 7. Authentication и Security

- [x] User registration/login
- [x] Session management и logout
- [x] MFA вместо локален PIN
- [x] Password hashing
- [x] Rate limiting
- [x] Input validation на всички API endpoints
- [x] CORS policy за production
- [x] Audit log
- [x] HTTPS configuration
- [x] Secrets management
- [x] Проверка, че exchange API ключовете нямат withdrawal права
- [x] Emergency stop механизъм

## 8. Payments и Web3

- [x] Payment provider integration
- [x] Payment intent flow
- [x] Webhook verification
- [x] Idempotency защита за плащания
- [x] Ledger-based crediting на депозити
- [x] MetaMask provider integration
- [x] WalletConnect integration
- [x] Phantom integration
- [x] Account/network change handling
- [x] Transaction confirmation и rejected transaction state
- [x] Премахване на фиктивния wallet адрес и баланс

## 9. Real Trading

- [x] Binance account API integration само през backend
- [x] Реални account balances
- [x] Реални order endpoints
- [x] Feature flag за real trading
- [x] Real trading изключен по подразбиране
- [x] Двойно потвърждение за real order
- [x] Максимална сума на ордер
- [x] Дневен лимит
- [x] Duplicate order protection
- [x] Exchange error mapping
- [x] Order reconciliation с Binance
- [x] Пълен audit trail
- [x] Kill switch / emergency stop
- [x] Sandbox/testnet validation преди production

## 10. Reliability и Deployment

- [x] Health endpoint
- [x] Structured application logging
- [x] Error tracking
- [x] Monitoring и alerts
- [x] WebSocket reconnect metrics
- [x] Graceful shutdown
- [x] Docker image
- [x] Production environment configuration
- [x] Reverse proxy и HTTPS
- [x] CI pipeline
- [x] Database backup automation

## 11. Testing и Release Gates

- [x] Syntax check за `app.js`
- [x] Syntax check за `server.mjs`
- [x] API smoke test за ticker, klines и depth
- [x] API smoke test за paper state и orders
- [x] LIMIT lifecycle test: `OPEN -> CANCELED`
- [x] Portfolio endpoint test
- [x] Unit тестове за average price, fees и P&L
- [x] Test за insufficient balance
- [x] Test за reserved cash/assets
- [x] Test за concurrent orders
- [x] Test за LIMIT auto-fill
- [x] Test за WebSocket reconnect
- [x] Browser тестове с Playwright
- [x] Security тестове
- [x] Load тестове за market data потоците
- [x] Paper trading acceptance test
- [x] Release checklist преди real trading

## Current Next Task

- [x] Risk engine approval преди AI paper order
- [x] Премахване на `Math.random()` от AI execution логиката
- [x] Реален win rate от trade history
- [x] Ясни loading/error състояния във всички market панели
- [x] Collector за исторически OI snapshots
- [x] Collector за исторически orderbook snapshots
- [x] Натрупване на достатъчно история за OI/orderbook backtest
- [x] Backtest на OI delta и orderbook bucket правилата
