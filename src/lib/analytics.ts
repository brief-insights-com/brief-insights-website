export const CONSENT_KEY = "briefinsights_cookie_consent";
export type ConsentValue = "accepted" | "declined";

export function getConsent(): ConsentValue | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
}

export function loadMetricool() {
  if (document.querySelector('script[src*="tracker.metricool.com"]')) return;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://tracker.metricool.com/resources/be.js";
  script.onload = () => {
    (window as unknown as Record<string, { t: (o: object) => void }>)
      .beTracker?.t({ hash: "8a694952f7e2ab6f8b95fb4fbb38e513" });
  };
  document.head.appendChild(script);
}
