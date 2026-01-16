"use client";

import { useState } from "react";
import { sendUniversal } from "@/lib/sendUniversal";

export default function CalculadoraC() {
  const [monto, setMonto] = useState("");
  const [persona, setPersona] = useState("");
  const [concepto, setConcepto] = useState("");
  const [status, setStatus] =
    useState<"idle" | "ok" | "offline">("idle");

  async function send() {
    if (!monto.trim() || !persona.trim()) return;

    const payload = {
      monto,
      persona,
      concepto,
    };

    const r = await sendUniversal("calculadora", payload);

    setMonto("");
    setPersona("");
    setConcepto("");
    setStatus(r.offline ? "offline" : "ok");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-xl mb-6 text-white/80">Calculadora provisional</h1>

      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto (MXN)"
        className="block w-full mb-3 rounded-xl bg-neutral-900 p-3
          border border-neutral-800 focus:outline-none focus:border-cyan-400/60"
      />

      <input
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
        placeholder="Persona"
        className="block w-full mb-3 rounded-xl bg-neutral-900 p-3
          border border-neutral-800 focus:outline-none focus:border-cyan-400/60"
      />

      <textarea
        value={concepto}
        onChange={(e) => setConcepto(e.target.value)}
        placeholder="Concepto / detalles…"
        className="block w-full h-32 rounded-xl bg-neutral-900 p-4
          border border-neutral-800 focus:outline-none focus:border-cyan-400/60"
      />

      <button
        onClick={send}
        className="mt-4 px-6 py-2 rounded-lg bg-cyan-500/20
          border border-cyan-400/30 hover:bg-cyan-500/30 transition"
      >
        Guardar registro
      </button>

      {status === "ok" && (
        <p className="mt-3 text-cyan-400">✔ Registro guardado</p>
      )}
      {status === "offline" && (
        <p className="mt-3 text-yellow-400">
          📴 Guardado offline (se enviará luego)
        </p>
      )}
    </main>
  );
}
