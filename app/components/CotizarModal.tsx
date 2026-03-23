"use client";

import { useState } from "react";

interface Props {
  localidad: string;
  salidas: string;
  entrega: string;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "543513117484";

export default function CotizarModal({ localidad, salidas, entrega, onClose }: Props) {
  const [step, setStep] = useState<"info" | "form">("info");
  const [form, setForm] = useState({
    origen: "",
    carga: "",
    valor: "",
    peso: "",
    alto: "",
    ancho: "",
    largo: "",
  });

  const field = (key: keyof typeof form, label: string, placeholder: string, suffix?: string, type = "text") => (
    <div>
      <label className="block text-xs text-zinc-400 mb-1 font-mono uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-orange-500 transition-colors"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        />
        {suffix && <span className="text-zinc-400 text-sm font-mono">{suffix}</span>}
      </div>
    </div>
  );

  const sendWhatsApp = () => {
    // Conversión en los tres sistemas de medición
    if (typeof window !== "undefined") {
      if ((window as any).gtag)  (window as any).gtag("event", "conversion", { send_to: "AW-11470719177" });
      if ((window as any).fbq)   (window as any).fbq("track", "Lead");
      if ((window as any).ttq)   (window as any).ttq.track("Contact");
    }
    const msg = [
      `🚚 *Solicitud de cotización — LOGINCOR*`,
      ``,
      `📍 *Destino:* ${localidad}`,
      `🕐 *Entrega estimada:* ${entrega}`,
      `📅 *Días de salida:* ${salidas}`,
      ``,
      `📌 *Origen:* ${form.origen}`,
      `📦 *Tipo de carga:* ${form.carga}`,
      `💰 *Valor declarado:* $${form.valor}`,
      `⚖️ *Peso aprox.:* ${form.peso} kg`,
      `📐 *Dimensiones:* ${form.alto}cm (alto) × ${form.ancho}cm (ancho) × ${form.largo}cm (largo)`,
      ``,
      `Por favor contáctarme para confirmar la cotización. ¡Gracias!`,
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const isFormValid = Object.values(form).every((v) => v.trim() !== "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,1,43,0.85)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#07063a", border: "1px solid rgba(233,78,27,0.35)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "#E94E1B" }}>
              {step === "info" ? "Destino seleccionado" : "Cotizá tu envío"}
            </p>
            <h3 className="font-brand text-xl font-black text-white">{localidad}</h3>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors text-xl leading-none">✕</button>
        </div>

        {step === "info" ? (
          /* Info panel */
          <div className="px-6 py-6 flex flex-col gap-5">
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(233,78,27,0.1)", border: "1px solid rgba(233,78,27,0.2)" }}>
              <div className="text-3xl font-black leading-none" style={{ color: "#E94E1B", fontFamily: "var(--font-eurostar, sans-serif)" }}>{entrega}</div>
              <div>
                <div className="text-white font-semibold text-sm">Tiempo de entrega estimado</div>
                <div className="text-zinc-400 text-xs">Córdoba → {localidad}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-zinc-400 text-xs">Días de salida</div>
                <div className="text-white text-sm font-medium">{salidas}</div>
              </div>
            </div>
            {entrega.includes("*") && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(255,193,7,0.08)", border: "1px solid rgba(255,193,7,0.2)" }}>
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#f59e0b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-xs" style={{ color: "#fbbf24" }}>
                  Los tiempos de entrega pueden verse afectados por condiciones climáticas en la región.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Puerta a puerta", "Retiro y entrega"],
                ["Carga asegurada", "Seguro incluido"],
                ["Rastreo en tiempo real", "GPS satelital"],
                ["Lunes a sábado", "Horario laboral"],
              ].map(([title, sub]) => (
                <div key={title} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="text-white font-medium text-xs">{title}</div>
                  <div className="text-zinc-500 text-xs">{sub}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep("form")}
              className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#E94E1B" }}
            >
              Cotizar envío a {localidad} →
            </button>
          </div>
        ) : (
          /* Quote form */
          <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {field("origen", "¿Desde dónde enviás?", "Ej: Av. Colón 123, Córdoba")}
            {field("carga", "¿Qué carga es?", "Ej: Electrodomésticos, ropa, repuestos...")}
            {field("valor", "Valor declarado", "0", "$", "number")}
            {field("peso", "Peso aproximado", "0", "kg", "number")}

            <div>
              <label className="block text-xs text-zinc-400 mb-1 font-mono uppercase tracking-wider">Dimensiones (cm)</label>
              <div className="grid grid-cols-3 gap-2">
                {(["alto", "ancho", "largo"] as const).map((dim) => (
                  <div key={dim}>
                    <input
                      type="number"
                      placeholder="0"
                      value={form[dim]}
                      onChange={(e) => setForm((f) => ({ ...f, [dim]: e.target.value }))}
                      className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-orange-500 transition-colors text-center"
                      style={{ borderColor: "rgba(255,255,255,0.15)" }}
                    />
                    <div className="text-center text-xs text-zinc-500 mt-1 capitalize">{dim}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setStep("info")}
                className="flex-1 py-3 rounded-xl font-semibold text-zinc-400 transition-colors hover:text-white text-sm"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                ← Volver
              </button>
              <button
                onClick={sendWhatsApp}
                disabled={!isFormValid}
                className="flex-1 py-3 rounded-xl font-bold text-white transition-opacity text-sm flex items-center justify-center gap-2 disabled:opacity-40"
                style={{ background: "#25D366" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
