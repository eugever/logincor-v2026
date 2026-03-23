"use client";

/**
 * MicroConversions — único archivo de tracking del lado cliente.
 * Centraliza TODOS los event listeners para evitar JS duplicado.
 * Corre una sola vez tras la hidratación (useEffect sin deps).
 */

import { useEffect } from "react";
import { track } from "@/app/lib/tracking";

export default function MicroConversions() {
  useEffect(() => {
    // ── Helpers ────────────────────────────────────────────────────────────
    const on = (selector: string, handler: () => void) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) =>
        el.addEventListener("click", handler)
      );
    };

    // ── Botones CTA (Contact — evento estándar + conversión AW) ────────────
    const fireCTA = () => {
      const w = window as any;
      if (w.gtag) w.gtag("event", "conversion", { send_to: "AW-11470719177" });
      if (w.fbq)  w.fbq("track", "Contact");
      if (w.ttq)  w.ttq.track("Contact");
    };
    document.getElementById("cta-llamar")?.addEventListener("click", fireCTA);
    document.getElementById("cta-consulta")?.addEventListener("click", fireCTA);

    // ── Micro-conversiones de clics ─────────────────────────────────────────
    on('a[href^="tel:"]',                   () => track("Contact_Phone"));
    on('a[href*="logincor.sytes.net"]',     () => track("TrackShipment"));
    on('a[href*="google.com/maps"]',        () => track("ViewLocation"));

    // ── Scroll depth: 50% y 90% ────────────────────────────────────────────
    const fired = { s50: false, s90: false };
    const onScroll = () => {
      const pct =
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
      if (!fired.s50 && pct >= 50) { fired.s50 = true; track("Scroll_50"); }
      if (!fired.s90 && pct >= 90) { fired.s90 = true; track("Scroll_90"); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Tiempo de permanencia activa: 60 segundos ──────────────────────────
    const timer = setTimeout(() => track("HighEngagement_Time"), 60_000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
