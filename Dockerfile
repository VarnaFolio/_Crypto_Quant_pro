FROM node:22-bookworm-slim AS dependencies

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev && npm cache clean --force

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY server.mjs app.js index.html styles.css futures-indicators.mjs binance-errors.mjs config.mjs db.mjs error-tracking.mjs logger.mjs monitoring.mjs payments.mjs ./

USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/health').then(response => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1))"

CMD ["node", "server.mjs"]