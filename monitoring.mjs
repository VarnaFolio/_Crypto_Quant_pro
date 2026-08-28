export function createMonitor({ service = "crypto-quant-pro", startedAt = Date.now() } = {}) {
  const state = {
    service,
    startedAt,
    totalEvents: 0,
    websocketReconnects: 0,
    lastReconnectAt: null,
    errorCounts: { validation: 0, auth: 0, security: 0, upstream_exchange: 0, dependency: 0, operational: 0 },
    warningCounts: { validation: 0, auth: 0, security: 0, upstream_exchange: 0, dependency: 0, operational: 0 },
    events: [],
  };

  return {
    record(event = {}) {
      const category = event.category || "operational";
      const severity = String(event.severity || "info").toLowerCase();
      state.totalEvents += 1;
      const recordedEvent = {
        ...event,
        category,
        severity,
        recordedAt: new Date().toISOString(),
      };
      state.events.push(recordedEvent);

      if (event.event === "websocket.reconnect" || event.event === "ws.reconnect") {
        state.websocketReconnects += 1;
        state.lastReconnectAt = recordedEvent.recordedAt;
      }

      if (severity === "error") {
        state.errorCounts[category] = (state.errorCounts[category] || 0) + 1;
      }
      if (severity === "warning") {
        state.warningCounts[category] = (state.warningCounts[category] || 0) + 1;
      }
      return state;
    },
    snapshot() {
      const totalErrors = Object.values(state.errorCounts).reduce((sum, value) => sum + value, 0);
      const totalWarnings = Object.values(state.warningCounts).reduce((sum, value) => sum + value, 0);
      return {
        service: state.service,
        uptimeSeconds: Math.max(0, Math.round((Date.now() - state.startedAt) / 1000)),
        status: totalErrors > 0 || totalWarnings > 0 ? "degraded" : "healthy",
        totalEvents: state.totalEvents,
        websocketReconnects: state.websocketReconnects,
        lastReconnectAt: state.lastReconnectAt,
        errorCounts: state.errorCounts,
        warningCounts: state.warningCounts,
        lastEvent: state.events.at(-1) || null,
      };
    },
  };
}

export function getDefaultMonitorSummary() {
  const monitor = createMonitor();
  return { ...monitor.snapshot(), errorCounts: Object.keys(monitor.snapshot().errorCounts), service: "crypto-quant-pro" };
}

export const monitor = createMonitor();
