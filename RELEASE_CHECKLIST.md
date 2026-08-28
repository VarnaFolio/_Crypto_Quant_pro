# Release Checklist

## Automated gates

- [ ] CI is green on the release commit.
- [ ] `npm test` passes with zero failures.
- [ ] `node --check server.mjs` passes.
- [ ] `node --check config.mjs` passes.
- [ ] Playwright smoke tests pass against the release image.
- [ ] Paper acceptance and load smoke tests pass in the target environment.
- [ ] Database backup and restore have been verified for the release.

## Production configuration

- [ ] `NODE_ENV=production` is set.
- [ ] `SESSION_SECRET` is generated, stored in a secret manager, and not committed.
- [ ] `CORS_ORIGIN` is an explicit HTTPS origin.
- [ ] TLS certificates are present and have a renewal plan.
- [ ] `PAPER_STORAGE=postgres` and `DATABASE_URL` point to the intended database.
- [ ] `BINANCE_WITHDRAWALS_ENABLED=false` is enforced.
- [ ] `REAL_TRADING_ENABLED=false` unless the business owner explicitly approves activation.
- [ ] `BINANCE_SANDBOX_MODE=true` is used for validation.
- [ ] Monitoring, alert routing, and backup workflow are enabled.

## Operational readiness

- [ ] Rollback image/tag is available.
- [ ] Health endpoint responds through the reverse proxy.
- [ ] WebSocket and SSE streams work through Nginx.
- [ ] Emergency stop has been tested and the operator knows how to enable it.
- [ ] Database restore owner and recovery time objective are documented.
- [ ] Real trading is enabled only after a separate approval and a successful sandbox run.
