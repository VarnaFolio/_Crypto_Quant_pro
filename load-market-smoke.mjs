const baseUrl = process.env.LOAD_BASE_URL;
const requestCount = Number(process.env.LOAD_REQUESTS || 50);
const concurrency = Number(process.env.LOAD_CONCURRENCY || 10);

if (!baseUrl) {
  console.log("Skipped market load smoke test: LOAD_BASE_URL is not configured");
  process.exit(0);
}

const startedAt = Date.now();
let nextRequest = 0;
let failures = 0;

async function worker() {
  while (true) {
    const index = nextRequest++;
    if (index >= requestCount) return;
    try {
      const response = await fetch(`${baseUrl}/api/market/ticker?symbol=BTCUSDT`);
      if (!response.ok) failures += 1;
      await response.arrayBuffer();
    } catch {
      failures += 1;
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));
const durationMs = Date.now() - startedAt;
console.log(JSON.stringify({ requestCount, concurrency, failures, durationMs }));
if (failures > 0) process.exitCode = 1;