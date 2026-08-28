function normalizeBinanceErrorPayload(error) {
  if (!error || typeof error !== "object") return {};
  if (error?.error && typeof error.error === "object") return normalizeBinanceErrorPayload(error.error);
  if (Array.isArray(error)) return normalizeBinanceErrorPayload(error[0] || {});
  return error;
}

export function mapBinanceError(error) {
  const payload = normalizeBinanceErrorPayload(error);
  const code = Number(payload.code ?? payload.errCode ?? 0);
  const message = String(payload.msg || payload.message || "").trim();

  if (!message && !code) return "Binance exchange request failed. Try again later.";

  const lower = `${code} ${message}`.toLowerCase();

  if (lower.includes("insufficient balance") || code === -2010) {
    return "Binance rejected the order: insufficient balance for this action.";
  }
  if (lower.includes("min_notional") || lower.includes("notional") || code === -1013) {
    return "Binance rejected the order: order value is below the minimum notional requirement.";
  }
  if (lower.includes("recvwindow") || lower.includes("timestamp") || lower.includes("window") || code === -1021) {
    return "Binance rejected the request: timestamp or request window is invalid.";
  }
  if (lower.includes("lot_size") || lower.includes("step_size") || lower.includes("filter failure")) {
    return "Binance rejected the order: order size does not satisfy the exchange filters.";
  }
  if (lower.includes("permission") || lower.includes("not authorized") || lower.includes("api key")) {
    return "Binance rejected the request: API permissions are not sufficient for this action.";
  }

  return "Binance exchange request failed. Try again later.";
}
