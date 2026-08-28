import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright",
  timeout: 30000,
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:3000/health",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: process.env.BROWSER_BASE_URL || "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
  },
});