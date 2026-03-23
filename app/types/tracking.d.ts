/**
 * Declaraciones globales para los píxeles de tracking.
 * Elimina los casteos `window as any` y provee tipos seguros en toda la app.
 */

type GtagConsentArg = {
  ad_storage?: "granted" | "denied";
  analytics_storage?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_personalization?: "granted" | "denied";
  wait_for_update?: number;
};

interface Window {
  dataLayer: unknown[];

  /** Google Analytics / Ads */
  gtag: (
    command: "event" | "config" | "set" | "js" | "consent",
    target: string | Date | "default" | "update",
    params?: Record<string, unknown> | GtagConsentArg
  ) => void;

  /** Meta Pixel */
  fbq: (
    action: "track" | "trackCustom" | "init" | "consent",
    event: string,
    params?: Record<string, unknown>
  ) => void;
  _fbq?: unknown;

  /** TikTok Pixel */
  ttq: {
    track: (event: string, params?: Record<string, unknown>) => void;
    page: () => void;
    load: (id: string) => void;
    identify: (params: Record<string, unknown>) => void;
  };

  TiktokAnalyticsObject: string;
}
