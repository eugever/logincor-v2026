"use client";

import { useState, useEffect } from "react";

const API_URL = "/api/solicitar-retiro";
const BRAND   = "#E94E1B";
const DARK    = "#02012B";

type TipoCarga = "bulto" | "pallet" | "perfil" | "otro" | null;

interface FormState {
  remitente_nombre: string;
  calle: string;
  numero: string;
  localidad: string;
  remitente_telefono: string;
  horario: string;
  destinatario_nombre: string;
  destinatario_tel: string;
  tipo_carga: TipoCarga;
  tipo_carga_detalle: string;
  kg: string;
  dimension_especial: boolean | null;
  notes: string;
}

const EMPTY: FormState = {
  remitente_nombre: "", calle: "", numero: "", localidad: "",
  remitente_telefono: "", horario: "",
  destinatario_nombre: "", destinatario_tel: "",
  tipo_carga: null, tipo_carga_detalle: "", kg: "",
  dimension_especial: null, notes: "",
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RetiroModal({ open, onClose }: Props) {
  const [form,    setForm]    = useState<FormState>(EMPTY);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [code,    setCode]    = useState("");

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const set = (key: keyof FormState, val: FormState[keyof FormState]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const validate = (): string | null => {
    if (!form.remitente_nombre.trim()) return "Ingresá el nombre o razón social del remitente";
    if (!form.calle.trim())            return "Ingresá la calle";
    if (!form.numero.trim())           return "Ingresá el número";
    if (!form.localidad.trim())        return "Ingresá la localidad";
    const tel = form.remitente_telefono.replace(/\D/g, "");
    if (tel.length !== 10)             return "El teléfono del remitente debe tener 10 dígitos (sin 0 ni 15)";
    if (tel.startsWith("0"))           return "El teléfono del remitente no debe comenzar con 0";
    if (tel.startsWith("15"))          return "El teléfono del remitente no debe comenzar con 15";
    if (!form.horario.trim())          return "Ingresá el horario disponible para el retiro";
    if (!form.destinatario_nombre.trim()) return "Ingresá el nombre o razón social del destinatario";
    const telD = form.destinatario_tel.replace(/\D/g, "");
    if (telD.length !== 10)            return "El teléfono del destinatario debe tener 10 dígitos";
    if (telD.startsWith("0"))          return "El teléfono del destinatario no debe comenzar con 0";
    if (!form.tipo_carga)              return "Seleccioná el tipo de carga";
    if (form.tipo_carga === "otro" && !form.tipo_carga_detalle.trim())
                                       return "Describí el tipo de carga";
    if (!form.kg || parseFloat(form.kg) <= 0) return "Ingresá el peso en KG";
    if (form.dimension_especial === null) return "Indicá si tiene dimensiones especiales";
    return null;
  };

  const handleSubmit = async () => {
    setError("");
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          remitente_nombre:    form.remitente_nombre.trim(),
          calle:               form.calle.trim(),
          numero:              form.numero.trim(),
          localidad:           form.localidad.trim(),
          remitente_telefono:  form.remitente_telefono.replace(/\D/g, ""),
          horario:             form.horario.trim(),
          destinatario_nombre: form.destinatario_nombre.trim(),
          destinatario_tel:    form.destinatario_tel.replace(/\D/g, ""),
          tipo_carga:          form.tipo_carga,
          tipo_carga_detalle:  form.tipo_carga_detalle.trim() || null,
          kg:                  parseFloat(form.kg),
          dimension_especial:  form.dimension_especial,
          notes:               form.notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setCode(data.code);
        setForm(EMPTY);
      } else {
        setError(data.error || "Error al procesar la solicitud. Intentá nuevamente.");
      }
    } catch {
      setError("Error de conexión. Verificá tu internet e intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCode("");
    setError("");
    setForm(EMPTY);
    onClose();
  };

  const inputCls = "w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-orange-500 transition-colors";
  const inputStyle = { borderColor: "rgba(255,255,255,0.12)" };

  const RadioBtn = ({
    label, active, onClick,
  }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
      style={{
        border: `1.5px solid ${active ? BRAND : "rgba(255,255,255,0.12)"}`,
        background: active ? "rgba(233,78,27,0.12)" : "transparent",
        color: active ? BRAND : "#94a3b8",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{ background: DARK, maxHeight: "92vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            background: "linear-gradient(135deg, #0a0920 0%, #02012B 100%)",
            borderBottom: `2px solid ${BRAND}`,
          }}
        >
          <div>
            <h2 className="text-lg font-black text-white">
              🚚 Solicitá tu <span style={{ color: BRAND }}>retiro</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Completá los datos y te contactamos a la brevedad
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {code ? (
            /* ── Éxito ── */
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <div className="text-2xl font-black mb-2" style={{ color: BRAND }}>{code}</div>
              <p className="text-zinc-300 text-sm mb-2 font-semibold">
                ¡Tu solicitud fue recibida correctamente!
              </p>
              <p className="text-zinc-500 text-sm mb-8">
                El equipo de LOGINCOR se pondrá en contacto a la brevedad para coordinar el retiro.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: BRAND }}
              >
                Cerrar
              </button>
            </div>
          ) : (
            /* ── Formulario ── */
            <>
              {error && (
                <div
                  className="mb-5 px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#fca5a5",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {/* REMITENTE */}
              <div
                className="rounded-xl p-5 mb-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>
                  📍 Datos del retiro (remitente)
                </p>
                <div className="mb-3">
                  <label className="block text-xs text-zinc-400 mb-1">
                    Nombre o razón social <span style={{ color: BRAND }}>*</span>
                  </label>
                  <input
                    className={inputCls} style={inputStyle}
                    placeholder="Ej: Juan García / Empresa SA"
                    value={form.remitente_nombre}
                    onChange={(e) => set("remitente_nombre", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs text-zinc-400 mb-1">
                      Calle <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="San Martín"
                      value={form.calle}
                      onChange={(e) => set("calle", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Número <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="1234"
                      value={form.numero}
                      onChange={(e) => set("numero", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Localidad <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="Córdoba"
                      value={form.localidad}
                      onChange={(e) => set("localidad", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Teléfono <span style={{ color: BRAND }}>*</span>{" "}
                      <span className="text-zinc-600">(10 dígitos, sin 0 ni 15)</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="3516123456" maxLength={10} type="tel"
                      value={form.remitente_telefono}
                      onChange={(e) => set("remitente_telefono", e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Horario disponible <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="Ej: 9:00 a 13:00"
                      value={form.horario}
                      onChange={(e) => set("horario", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* DESTINATARIO */}
              <div
                className="rounded-xl p-5 mb-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>
                  🎯 Datos del destinatario
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Nombre o razón social <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="María López / Empresa SA"
                      value={form.destinatario_nombre}
                      onChange={(e) => set("destinatario_nombre", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Teléfono <span style={{ color: BRAND }}>*</span>{" "}
                      <span className="text-zinc-600">(10 dígitos)</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="3516654321" maxLength={10} type="tel"
                      value={form.destinatario_tel}
                      onChange={(e) => set("destinatario_tel", e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>
              </div>

              {/* CARGA */}
              <div
                className="rounded-xl p-5 mb-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>
                  📦 Datos de la carga
                </p>

                <div className="mb-4">
                  <label className="block text-xs text-zinc-400 mb-2">
                    Tipo de carga <span style={{ color: BRAND }}>*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["bulto", "pallet", "perfil", "otro"] as TipoCarga[]).map((t) => (
                      <RadioBtn
                        key={t!}
                        label={t!.charAt(0).toUpperCase() + t!.slice(1)}
                        active={form.tipo_carga === t}
                        onClick={() => set("tipo_carga", t)}
                      />
                    ))}
                  </div>
                </div>

                {form.tipo_carga === "otro" && (
                  <div className="mb-4">
                    <label className="block text-xs text-zinc-400 mb-1">
                      Describí el tipo de carga <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      placeholder="Ej: Tambores, Rollos, Bidones..."
                      value={form.tipo_carga_detalle}
                      onChange={(e) => set("tipo_carga_detalle", e.target.value)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">
                      Peso en KG <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      className={inputCls} style={inputStyle}
                      type="number" min="0.1" step="0.1" placeholder="Ej: 250"
                      value={form.kg}
                      onChange={(e) => set("kg", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-2">
                      ¿Tiene dimensiones especiales? <span style={{ color: BRAND }}>*</span>
                    </label>
                    <div className="flex gap-2">
                      <RadioBtn label="Sí"  active={form.dimension_especial === true}  onClick={() => set("dimension_especial", true)} />
                      <RadioBtn label="No"  active={form.dimension_especial === false} onClick={() => set("dimension_especial", false)} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Observaciones adicionales
                  </label>
                  <textarea
                    className={inputCls + " resize-none"}
                    style={{ ...inputStyle, minHeight: 72 }}
                    placeholder="Instrucciones especiales, horarios, etc."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-black text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: BRAND }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Enviando solicitud...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Solicitar retiro
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
