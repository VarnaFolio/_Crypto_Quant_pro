import { createHmac, timingSafeEqual } from "node:crypto";

export function validatePaymentAmount(value) {
  const amount = Number(value);
  if (!Number.isInteger(amount) || amount < 50 || amount > 100000000) throw new Error("Payment amount must be 50-100000000 cents");
  return amount;
}

export function verifyStripeWebhookSignature(payload, header, secret, toleranceSeconds = 300, now = Date.now()) {
  const parts = Object.fromEntries(String(header || "").split(",").map((part) => part.split("=")));
  const timestamp = Number(parts.t);
  const signature = parts.v1;
  if (!Number.isFinite(timestamp) || !signature || Math.abs(now / 1000 - timestamp) > toleranceSeconds) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}