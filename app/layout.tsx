import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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
      <body className="min-h-full text-zinc-100 antialiased" style={{ background: '#02012B' }}>
        {children}
      </body>
    </html>
  );
}
