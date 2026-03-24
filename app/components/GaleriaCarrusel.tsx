"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80&auto=format&fit=crop",
    alt: "Envío puerta a puerta — LOGINCOR entrega en domicilio en 24hs entre Buenos Aires y Córdoba",
    label: "Envíos 24hs",
    caption: "Retiro y entrega puerta a puerta. Buenos Aires → Córdoba en 24 horas.",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=80&auto=format&fit=crop",
    alt: "Camión de LOGINCOR en ruta transportando carga industrial por Argentina",
    label: "Logística Industrial",
    caption: "Flota propia para cargas de todo tipo. Desde una caja hasta un pallet completo.",
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=80&auto=format&fit=crop",
    alt: "Depósito LOGINCOR — almacenamiento y fulfillment en Córdoba",
    label: "Almacenamiento & Fulfillment",
    caption: "Depósito en Córdoba con control de stock, armado de pedidos y despacho directo.",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
    alt: "Rastreo satelital GPS en tiempo real de la flota LOGINCOR",
    label: "Rastreo Satelital",
    caption: "Seguimiento GPS en tiempo real. Sabés dónde está tu carga en todo momento.",
  },
  {
    src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400&q=80&auto=format&fit=crop",
    alt: "Camión en autopista — red logística LOGINCOR Buenos Aires Córdoba",
    label: "Cobertura Nacional",
    caption: "Más de 1.000 localidades en 19 provincias de Argentina.",
  },
];

const INTERVAL = 4500;

export default function GaleriaCarrusel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Images */}
      <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.label}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={i === 0}
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-10 md:pb-8">
          <span
            className="inline-block text-xs font-mono uppercase tracking-widest mb-1 px-2 py-0.5 rounded"
            style={{ background: "#E94E1B", color: "#fff" }}
          >
            {SLIDES[current].label}
          </span>
          <p className="text-white font-semibold text-base md:text-lg leading-snug max-w-xl">
            {SLIDES[current].caption}
          </p>
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(2,1,43,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110"
          style={{ background: "rgba(2,1,43,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 py-4">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a ${slide.label}`}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? "#E94E1B" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
