import { createHmac } from "node:crypto";
import { readSecret } from "../config.mjs";

const apiKey = readSecret("BINANCE_API_KEY", { required: true });
const apiSecret = readSecret("BINANCE_API_SECRET", { required: true });
const baseUrl = process.env.BINANCE_ACCOUNT_API_URL || "https://api.binance.com";
const timestamp = Date.now();
const query = new URLSearchParams({ timestamp: String(timestamp), recvWindow: "5000" });
const signature = createHmac("sha256", apiSecret).update(query.toString()).digest("hex");
const response = await fetch(`${baseUrl}/sapi/v3/account?${query}&signature=${signature}`, {
  headers: { "X-MBX-APIKEY": apiKey },
  signal: AbortSignal.timeout(10000),
});
const payload = await response.json().catch(() => ({}));

if (!response.ok) {
  console.error(`Binance permission check failed with HTTP ${response.status}`);
  process.exitCode = 1;
} else if (payload.canWithdraw === true) {
  console.error("Refusing key: Binance API key has withdrawal permission enabled");
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ canTrade: payload.canTrade === true, canDeposit: payload.canDeposit === true, canWithdraw: false }));
}