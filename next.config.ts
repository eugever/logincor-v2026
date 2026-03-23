import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source maps en producción — corrige el error "DevTools failed to load source map"
  productionBrowserSourceMaps: true,

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
    ];
  },
};

export default nextConfig;
