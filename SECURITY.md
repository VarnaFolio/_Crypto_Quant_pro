# Security Configuration

Secrets are supplied through environment variables or the deployment platform's secret store. Do not commit `.env`, API keys, passwords, session secrets, private keys, certificates, or files under `backups/` or `certs/`.

Production requires `SESSION_SECRET` and an explicit HTTPS `CORS_ORIGIN`. PostgreSQL deployments also require `DATABASE_URL`. With direct Node HTTPS (`TLS_TERMINATION=node`), `TLS_KEY_PATH` and `TLS_CERT_PATH` are required; with the production Nginx compose deployment (`TLS_TERMINATION=proxy`), TLS certificates are mounted under `./tls` for Nginx instead. The server fails closed when these values are missing.

Generate a session secret with a cryptographically secure generator, for example:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

Use a managed secret store in production. Keep secret values out of logs, audit metadata, client payloads, source control, and database snapshots. Rotate credentials through the deployment platform rather than editing tracked files.

WalletConnect uses the public WalletConnect project ID in `window.__WALLETCONNECT_PROJECT_ID__`; never place private keys or signing secrets in this value. Configure it through the deployment's public frontend configuration before enabling the connector.

Real trading is disabled by default. Before any future real-trading integration, set `BINANCE_WITHDRAWALS_ENABLED=false` explicitly and use a Binance API key created without withdrawal permission. The server refuses startup if withdrawals are enabled or if real trading is enabled without both Binance credentials.

Verify a Binance key before use with `npm run verify-binance-permissions`. The command calls Binance's signed account endpoint and exits with an error when `canWithdraw` is true. It never prints the API key, secret, query signature, balances, or account payload.
