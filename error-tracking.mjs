const errorCategories = {
  validation: { category: "validation", severity: "warning" },
  auth: { category: "auth", severity: "warning" },
  security: { category: "security", severity: "error" },
  upstream_exchange: { category: "upstream_exchange", severity: "error" },
  dependency: { category: "dependency", severity: "error" },
  operational: { category: "operational", severity: "error" },
};

function inferCategory(message = "", stage = "") {
  const normalized = `${message} ${stage}`.toLowerCase();

  if (/invalid|malformed|validation|missing|required/.test(normalized)) return "validation";
  if (/security|emergency|suspicious|forbidden|blocked/.test(normalized)) return "security";
  if (/auth|session|token|mfa|unauthorized/.test(normalized)) return "auth";
  if (/binance|exchange|gateway|502|timeout|upstream|network/.test(normalized)) return "upstream_exchange";
  if (/module|dependency|import|missing .*package/.test(normalized)) return "dependency";
  return "operational";
}

export function classifyError(error, context = {}) {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  const stage = context.stage || "";
  const categoryKey = inferCategory(message, stage);
  const { category, severity } = errorCategories[categoryKey] || errorCategories.operational;

  return {
    category,
    severity,
    stage,
    message,
    occurredAt: new Date().toISOString(),
  };
}

export function buildErrorReport(error, context = {}) {
  const details = classifyError(error, context);
  return {
    ...details,
    requestId: context.requestId ?? null,
    userId: context.userId ?? null,
    route: context.route ?? null,
    metadata: context.metadata ?? {},
  };
}
