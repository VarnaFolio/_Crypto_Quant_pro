import { test, expect } from "@playwright/test";

test("loads the trading UI and exposes a live application root", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#root")).not.toBeEmpty();
  await expect(page.locator("body")).toContainText(/portfolio|market|paper|futures/i);
});

test("health endpoint is reachable from the browser origin", async ({ request }) => {
  const response = await request.get("/health");
  expect(response.ok()).toBeTruthy();
  expect((await response.json()).status).toBe("ok");
});