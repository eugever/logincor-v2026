import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Headers de seguridad — mejoran el score de Best Practices en Lighthouse
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Evita que el browser infiera el tipo MIME incorrecto
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Protege contra clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Controla qué info de referrer se envía a terceros
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restringe acceso a cámara/micrófono/geolocalización
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // HTML pages: no CDN cache, always fresh
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;
