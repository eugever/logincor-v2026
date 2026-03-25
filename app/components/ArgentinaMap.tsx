"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import CotizarModal from "./CotizarModal";
import { track } from "@/app/lib/tracking";
import { Locality, COVERED_PROVINCES, PROVINCE_LOCALITIES } from "@/app/lib/localities";
export type { Locality };

const GEO_URL = "/argentina-provinces.json";


const CORDOBA_COORDS: [number, number] = [-64.22, -31.42];
const MALVINAS_COORDS: [number, number] = [-59.5, -51.7];

// Manual offsets for provinces where auto-centroid causes label overlap
const LABEL_OFFSETS: Record<string, [number, number]> = {
  "Salta":             [0,  8],
  "Jujuy":             [0, -4],
  "Formosa":           [0,  6],
  "Misiones":          [0,  0],
  "Corrientes":        [0,  4],
  "Buenos Aires":      [0,  8],
  "Entre Ríos":        [0,  0],
  "La Pampa":          [0,  4],
};

const STATS = [
  { value: "+1.000", label: "Localidades cubiertas" },
  { value: "22",     label: "Provincias" },
  { value: "24hs",   label: "Entrega Córdoba–Buenos Aires" },
  { value: "98%",    label: "On-time delivery" },
];

export default function ArgentinaMap() {
  const mapActiveRef = useRef(false);
  const [tooltip, setTooltip]             = useState<string | null>(null);
  const [tooltipPos, setTooltipPos]       = useState({ x: 0, y: 0 });
  const [clickedProvince, setClicked]     = useState<string | null>(null);
  const [selectedLocalidad, setSelected]  = useState<Locality | null>(null);
  const [locTooltipPos, setLocTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [mounted, setMounted]             = useState(false);
  useEffect(() => setMounted(true), []);

  const localities = clickedProvince ? (PROVINCE_LOCALITIES[clickedProvince] ?? []) : [];

  return (
    <>
      {selectedLocalidad && (
        <CotizarModal
          localidad={selectedLocalidad.name}
          salidas={selectedLocalidad.salidas}
          entrega={selectedLocalidad.entrega}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Tooltip localidades — portal al body para evitar clipping por transforms */}
      {mounted && locTooltipPos && createPortal(
        <div
          className="pointer-events-none px-3 py-1.5 rounded-lg text-xs font-bold text-white"
          style={{
            position: "fixed",
            left: locTooltipPos.x,
            top: locTooltipPos.y - 44,
            transform: "translateX(-50%)",
            background: "#E94E1B",
            boxShadow: "0 0 20px rgba(233,78,27,0.8)",
            whiteSpace: "nowrap",
            zIndex: 9999,
          }}
        >
          Hacé clic para cotizar tu envío
        </div>,
        document.body
      )}

      {/* Contenedor principal con borde compartido */}
      <div
        className="flex flex-col lg:flex-row"
        style={{
          border: "1px solid rgba(233,78,27,0.35)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
        }}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "svg") setClicked(null);
        }}
      >

        {/* Map */}
        <div
          className="relative w-full lg:w-[700px] lg:flex-shrink-0 lg:flex-grow-0"
          onMouseEnter={() => { mapActiveRef.current = true; }}
          onMouseLeave={() => { mapActiveRef.current = false; }}
        >
          {tooltip && (
            <div
              className="pointer-events-none absolute z-10 px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-xl"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 44,
                background: "#E94E1B",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              {tooltip}
            </div>
          )}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 600, center: [-65, -37] }}
            width={500}
            height={620}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <ZoomableGroup zoom={1} minZoom={1} maxZoom={5} filterZoomEvent={() => mapActiveRef.current}>
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const name: string = geo.properties.NAME_1;
                    const isCordoba  = name === "Córdoba";
                    const isCovered  = COVERED_PROVINCES.has(name);
                    const isClicked  = name === clickedProvince;
                    const hasLocalities = !!PROVINCE_LOCALITIES[name];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          if (hasLocalities) {
                            setClicked(name === clickedProvince ? null : name);
                            track("MapInteraction");
                          }
                        }}
                        onMouseEnter={(e) => {
                          const label = hasLocalities
                            ? `${name} — hacé clic para ver localidades`
                            : isCovered ? name : `${name} — sin cobertura`;
                          setTooltip(label);
                          setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
                        }}
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
                        }}
                        onMouseLeave={() => {
                          setTooltip(null);
                        }}
                        style={{
                          default: {
                            fill: isCordoba
                              ? "#E94E1B"
                              : isClicked
                              ? "rgba(233,78,27,0.7)"
                              : isCovered
                              ? "rgba(233,78,27,0.4)"
                              : "rgba(255,255,255,0.05)",
                            stroke: "#02012B",
                            strokeWidth: 0.8,
                            outline: "none",
                          },
                          hover: {
                            fill: isCordoba
                              ? "#ff6535"
                              : isCovered
                              ? "rgba(233,78,27,0.65)"
                              : "rgba(255,255,255,0.13)",
                            stroke: "#02012B",
                            strokeWidth: 0.8,
                            outline: "none",
                            cursor: hasLocalities || isCovered ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* Province name labels */}
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const name: string = geo.properties.NAME_1;
                    if (name === "Ciudad de Buenos Aires") return null;
                    const isCovered = COVERED_PROVINCES.has(name);
                    const centroid = geoCentroid(geo) as [number, number];
                    const words = name.split(" ");
                    const [dx, dy] = LABEL_OFFSETS[name] ?? [0, 0];
                    return (
                      <Marker key={`lbl-${geo.rsmKey}`} coordinates={centroid}>
                        <text
                          textAnchor="middle"
                          x={dx}
                          y={dy}
                          style={{
                            fontSize: 5,
                            fontWeight: 700,
                            fill: isCovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
                            fontFamily: "monospace",
                            pointerEvents: "none",
                            letterSpacing: 0.2,
                            textTransform: "uppercase",
                          }}
                        >
                          {words.map((word, i) => (
                            <tspan key={i} x="0" dy={i === 0 ? 0 : "1.3em"}>{word}</tspan>
                          ))}
                        </text>
                      </Marker>
                    );
                  })
                }
              </Geographies>

              {/* Islas Malvinas */}
              <Marker coordinates={MALVINAS_COORDS}>
                {/* Isla Soledad (Este) */}
                <ellipse cx={6} cy={0} rx={5} ry={3.5} fill="rgba(233,78,27,0.3)" stroke="rgba(233,78,27,0.7)" strokeWidth={0.6} />
                {/* Isla Gran Malvina (Oeste) */}
                <ellipse cx={-5} cy={1} rx={4} ry={3} fill="rgba(233,78,27,0.3)" stroke="rgba(233,78,27,0.7)" strokeWidth={0.6} />
                <text
                  textAnchor="middle"
                  x={1}
                  y={-8}
                  style={{ fontSize: 4.5, fontWeight: 800, fill: "rgba(255,255,255,0.75)", fontFamily: "monospace", letterSpacing: 0.3, pointerEvents: "none" }}
                >
                  ISLAS MALVINAS
                </text>
                <text
                  textAnchor="middle"
                  x={1}
                  y={-4}
                  style={{ fontSize: 3.5, fontWeight: 600, fill: "rgba(233,78,27,0.9)", fontFamily: "monospace", letterSpacing: 0.2, pointerEvents: "none" }}
                >
                  (ARGENTINA)
                </text>
              </Marker>

              {/* Córdoba origin */}
              <Marker coordinates={CORDOBA_COORDS}>
                <circle r={5} fill="#fff" stroke="#E94E1B" strokeWidth={2} />
                <circle r={12} fill="rgba(255,255,255,0.1)" />
              </Marker>

            </ZoomableGroup>
          </ComposableMap>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "#E94E1B" }} />
              <span className="text-xs text-zinc-400">Casa Central</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(233,78,27,0.4)" }} />
              <span className="text-xs text-zinc-400">Con cobertura</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }} />
              <span className="text-xs text-zinc-400">Sin cobertura</span>
            </div>
          </div>
        </div>

        {/* Divider: horizontal en mobile, vertical en desktop */}
        <div className="hidden lg:block" style={{ width: "1px", background: "rgba(233,78,27,0.2)", flexShrink: 0 }} />
        <div className="block lg:hidden" style={{ height: "1px", background: "rgba(233,78,27,0.2)" }} />

        {/* Side panel */}
        <div
          className="w-full lg:flex-1"
          style={{ minWidth: 0, display: "flex", flexDirection: "column", alignSelf: "flex-start" }}
        >
          {clickedProvince && localities.length > 0 ? (
            <>
              {/* Header */}
              <div className="px-4 py-3" style={{ background: "rgba(233,78,27,0.15)", borderBottom: "1px solid rgba(233,78,27,0.25)" }}>
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Localidades</p>
                <p className="text-white font-bold text-sm">{clickedProvince}</p>
              </div>
              {/* List con scroll */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: localities.length > 6 ? "1fr 1fr" : "1fr",
                  overflowY: "auto",
                  maxHeight: "60vh",
                }}
              >
                {localities.map((loc, i) => {
                  const cols = localities.length > 6 ? 2 : 1;
                  return (
                  <button
                    key={loc.name}
                    onClick={() => { setSelected(loc); track("ViewLocation"); }}
                    onMouseEnter={(e) => setLocTooltipPos({ x: e.clientX, y: e.clientY })}
                    onMouseMove={(e) => setLocTooltipPos({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setLocTooltipPos(null)}
                    className="flex items-center justify-between px-3 py-2.5 text-left hover:bg-white/5 transition-colors group"
                    style={{
                      borderTop: i >= cols ? "1px solid rgba(255,255,255,0.06)" : undefined,
                      borderLeft: cols === 2 && i % 2 === 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                    }}
                  >
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium group-hover:text-orange-400 transition-colors truncate">{loc.name}</div>
                    </div>
                    <svg className="w-3 h-3 text-zinc-600 group-hover:text-orange-400 transition-colors flex-shrink-0 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  );
                })}
              </div>
              {/* Footer */}
              <div className="px-4 py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
                <p className="text-zinc-500 text-xs">Hacé clic en una localidad para cotizar</p>
              </div>
            </>
          ) : (
            /* Default stats */
            <div className="flex flex-col gap-3 p-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="text-3xl font-black leading-none mb-1" style={{ color: "#E94E1B", fontFamily: "var(--font-eurostar, sans-serif)" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-zinc-400 leading-snug">{s.label}</div>
                </div>
              ))}
              <div className="rounded-xl p-4 flex flex-col gap-2" style={{ background: "#E94E1B" }}>
                <p className="text-white text-xs font-semibold leading-snug">¿Tu localidad no aparece? Consultanos.</p>
                <a
                  href="#contacto"
                  className="inline-block text-center text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-sm transition-opacity hover:opacity-80"
                  style={{ background: "#02012B", color: "#fff" }}
                >
                  Cotizar →
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
