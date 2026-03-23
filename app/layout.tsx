import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import WhatsAppButton from "./components/WhatsAppButton";
import MicroConversions from "./components/MicroConversions";
import "./globals.css";

const eurostar = localFont({
  src: "./fonts/eurostar.ttf",
  variable: "--font-eurostar",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://logincor.com.ar"),
  title: {
    default: "LOGINCOR | Transporte Buenos Aires → Córdoba en 24hs",
    template: "%s | LOGINCOR",
  },
  description:
    "Empresa líder en transporte de cargas de Buenos Aires a Córdoba en 24hs. Envíos puerta a puerta para particulares, e-commerce e industrias. Flota con Plataforma Hidráulica, Seguimiento Satelital, Fulfillment y avisos por WhatsApp en cada etapa del envío.",
  keywords: [
    "transporte de cargas Buenos Aires Córdoba",
    "envíos 24 horas Buenos Aires Córdoba",
    "envíos particulares Buenos Aires Córdoba",
    "logística para emprendedores Argentina",
    "transporte desde Buenos Aires a Córdoba",
    "logística industrial Argentina",
    "rastreo satelital flota transporte",
    "seguimiento satelital envíos",
    "envíos e-commerce Argentina",
    "fulfillment Córdoba Argentina",
    "plataforma hidráulica descarga domicilio",
    "pala hidráulica descarga pallets",
    "transporte pallets sin rampa",
    "seguro de carga Federación Patronal",
    "avisos WhatsApp seguimiento envío",
    "sistema web logística cuenta corriente",
    "remitos firmados digitales",
    "centro de distribución Córdoba",
    "depósito Buenos Aires logística",
    "depósito Rosario transporte cargas",
  ],
  alternates: {
    canonical: "https://logincor.com.ar",
  },
  openGraph: {
    siteName: "LOGINCOR",
    title: "LOGINCOR | Transporte Buenos Aires → Córdoba en 24hs",
    description:
      "Empresa líder en transporte de cargas de Buenos Aires a Córdoba. Envíos 24hs puerta a puerta, Seguimiento Satelital, Plataforma Hidráulica y avisos por WhatsApp en cada etapa.",
    type: "website",
    locale: "es_AR",
    url: "https://logincor.com.ar",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOGINCOR | Transporte Buenos Aires → Córdoba en 24hs",
    description:
      "Envíos 24hs puerta a puerta. Seguimiento Satelital, Plataforma Hidráulica y avisos por WhatsApp en cada etapa del envío.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} ${eurostar.variable} h-full`}
    >
      {/* Preconnect hints — el browser abre conexión TCP/TLS antes de que los
          scripts pidan los recursos, reduciendo latencia de los píxeles. */}
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://analytics.tiktok.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className="min-h-full text-zinc-100 antialiased" style={{ background: '#02012B' }}>

        {/* ── TRACKING ────────────────────────────────────────────────────────────
            Estrategias de carga:
              afterInteractive → async, tras hidratación  (Google — crítico)
              lazyOnload       → idle time del browser    (Meta, TikTok — no críticos)

            Consent Mode v2 se inicializa ANTES que cualquier gtag('config').
            Argentina no requiere banner de consentimiento, pero el modo v2 es
            obligatorio para Google Ads Enhanced Conversions a partir de 2024.
        ───────────────────────────────────────────────────────────────────────── */}

        {/* 1. Google — Consent Mode v2 + GA4 + Ads (afterInteractive) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11470719177"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}

          // ── Consent Mode v2 — debe ir ANTES de gtag('config') ──
          // Valores 'granted' por defecto (Argentina, sin GDPR).
          // Un CMP puede llamar gtag('consent','update',{...}) para revocar.
          gtag('consent', 'default', {
            ad_storage:           'granted',
            analytics_storage:    'granted',
            ad_user_data:         'granted',
            ad_personalization:   'granted',
            wait_for_update:      500
          });

          gtag('js', new Date());
          gtag('config', 'AW-11470719177', { anonymize_ip: true });
          gtag('config', 'G-VK0RHEFQHB',  { anonymize_ip: true });
        `}</Script>

        {/* 2. Meta Pixel (lazyOnload — idle, no bloquea render) */}
        <Script id="meta-pixel" strategy="lazyOnload">{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];
            if(s&&s.parentNode){s.parentNode.insertBefore(t,s);}else{b.head.appendChild(t);}
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1177893059018204');
          fbq('track','PageView');
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1177893059018204&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* 3. TikTok Pixel (lazyOnload — idle, no bloquea render) */}
        <Script id="tiktok-pixel" strategy="lazyOnload">{`
          !function(w,d,t){
            w.TiktokAnalyticsObject=t;
            var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){
              var e=ttq._i[t]||[];
              for(var n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
              return e;
            };
            ttq.load=function(e,n){
              var r="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;
              ttq._t=ttq._t||{};ttq._t[e]=+new Date;
              ttq._o=ttq._o||{};ttq._o[e]=n||{};
              var s=d.createElement("script");
              s.type="text/javascript";s.async=!0;
              s.src=r+"?sdkid="+e+"&lib="+t;
              var f=d.getElementsByTagName("script")[0];
              if(f&&f.parentNode){f.parentNode.insertBefore(s,f);}else{d.head.appendChild(s);}
            };
            ttq.load('D70P1O3C77U0CH2O13H0');
            ttq.page();
          }(window,document,'ttq');
        `}</Script>

        {children}
        <WhatsAppButton />
        <MicroConversions />
      </body>
    </html>
  );
}
