import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import { validatePaymentAmount, verifyStripeWebhookSignature } from "./payments.mjs";

test("validates payment amount in cents", () => {
  assert.equal(validatePaymentAmount(500), 500);
  assert.throws(() => validatePaymentAmount(49), /Payment amount/);
  assert.throws(() => validatePaymentAmount(500.5), /Payment amount/);
});

test("verifies Stripe webhook signature and rejects stale or tampered payloads", () => {
  const payload = JSON.stringify({ type: "payment_intent.succeeded" });
  const secret = "whsec_test_secret";
  const now = 1700000000000;
  const timestamp = Math.floor(now / 1000);
  const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  assert.equal(verifyStripeWebhookSignature(payload, `t=${timestamp},v1=${signature}`, secret, 300, now), true);
  assert.equal(verifyStripeWebhookSignature(`${payload}x`, `t=${timestamp},v1=${signature}`, secret, 300, now), false);
  assert.equal(verifyStripeWebhookSignature(payload, `t=${timestamp - 301},v1=${signature}`, secret, 300, now), false);
});