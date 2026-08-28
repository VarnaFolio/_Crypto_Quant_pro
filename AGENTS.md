# Crypto Quant Pro Agent Instructions

This repository is a Node.js ESM crypto platform with futures analytics, paper trading, and a web UI.

## Mission

- Act as a senior crypto developer.
- Keep changes small and modular.
- Prefer concise commits, thorough reviews, and tested code.

## Fast Start

- Install dependencies: `npm install`
- Start server: `npm start`
- Run tests: `npm test`

Before opening a PR:

- Run `npm test` and keep failing tests at zero.
- Verify critical API paths manually when touching `server.mjs`.

## Code Boundaries

- `server.mjs`: API routes, Binance integration, SSE streams, paper engine orchestration.
- `futures-indicators.mjs`: pure indicator and analytics helpers.
- `paper-engine.test.mjs`: paper trading behavior coverage.
- `futures-indicators.test.mjs`: indicator math and risk helper coverage.
- `TODO.md`: roadmap and reliability/security priorities.
- `.github/agents/code-review.agent.md`: review quality bar.
- `.github/agents/swagger.agent.md`: OpenAPI and endpoint spec guidance.

Keep reusable trading logic out of route handlers when possible. Prefer pure functions in focused modules.

## Crypto Engineering Standards

### Security and Secrets

- Never hardcode secrets, keys, tokens, wallet mnemonics, or private endpoints.
- Use environment variables for sensitive config and fail safely when missing.
- Redact secrets from logs, errors, snapshots, and tests.
- Treat all user and webhook inputs as untrusted and validate strictly.

### Exchange Integration

- Follow Binance REST and WebSocket semantics exactly.
- Implement robust error handling: timeouts, retries with backoff, and clear error mapping.
- Respect API rate limits and avoid bursty fan-out requests.
- Guard against stale market data before generating signals or fills.

### Wallet and Address Handling

- Enforce strict address validation and checksum rules per chain.
- Reject malformed addresses early with explicit errors.
- Never auto-correct a failed checksum silently.

### Signals and Quant Logic

- Signal rules must be reproducible, deterministic, and backtestable.
- Separate data collection from signal calculation from execution.
- Keep strategy assumptions explicit and configurable.
- Preserve deterministic outputs for identical inputs.

### Technical Analysis Requirements

When implementing chart and signal features, rely on standard TA methods and clearly define parameters for:

- RSI
- MACD
- EMA
- OBV
- Divergence detection

Document defaults and make them testable.

## Testing and Review Expectations

- Add or update tests for any changed trading rule, indicator formula, or execution branch.
- For bug fixes, include a regression test that fails before and passes after the fix.
- Prioritize review findings in this order: correctness, risk controls, security, reliability, maintainability.
- Flag non-deterministic logic in quant code unless intentionally stochastic and documented.

## API and Modularity Guidelines

- Keep route handlers thin: parse and validate input, call domain logic, return response.
- Keep quant helpers side-effect free where feasible.
- Avoid hidden global coupling; pass dependencies explicitly.
- Avoid large mixed-purpose functions. Split by responsibility.

## Operational Reliability

- Prefer explicit connection state transitions for stream-based feeds.
- Use bounded in-memory history and atomic persistence patterns.
- Keep reconnection and cooldown logic observable and testable.

## Related Customizations

- Code review agent: see [code-review.agent.md](.github/agents/code-review.agent.md)
- Swagger agent: see [swagger.agent.md](.github/agents/swagger.agent.md)

## Scope Rule

These instructions define repository-wide defaults. For task-specific workflows, create focused customizations under `.github/` instead of expanding this file with long procedural detail.
