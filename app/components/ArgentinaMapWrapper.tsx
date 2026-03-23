"use client";

import dynamic from "next/dynamic";

const ArgentinaMap = dynamic(() => import("./ArgentinaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center">
      <span className="text-zinc-500 text-sm font-mono animate-pulse-slow">Cargando mapa…</span>
    </div>
  ),
});

export default function ArgentinaMapWrapper() {
  return <ArgentinaMap />;
}
