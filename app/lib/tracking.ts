/**
 * Utilidad centralizada de tracking — dispara eventos en Google, Meta y TikTok.
 * Usa tipos declarados en app/types/tracking.d.ts (sin casteos `any`).
 */

// Eventos que Meta reconoce como estándar (usan 'track'); el resto usa 'trackCustom'.
const FB_STANDARD = new Set([
  "Lead", "Contact", "ViewContent", "Search", "Purchase",
  "CompleteRegistration", "FindLocation", "AddToCart",
]);

export function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  try {
    if (window.gtag) window.gtag("event", eventName, params ?? {});
  } catch { /* gtag no disponible aún */ }

  try {
    if (window.fbq) window.fbq(
      FB_STANDARD.has(eventName) ? "track" : "trackCustom",
      eventName,
      params,
    );
  } catch { /* fbq no disponible aún */ }

  try {
    if (window.ttq?.track) window.ttq.track(eventName, params);
  } catch { /* ttq no disponible aún */ }
}
