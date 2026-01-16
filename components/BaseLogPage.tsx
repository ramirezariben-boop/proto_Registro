"use client";

import { useState } from "react";
import { sendUniversal } from "@/lib/sendUniversal";

type Props = {
  title: string;
  type: string;
  placeholder?: string;
  heightClass?: string; // ej: "h-60" o "h-[70vh]"
  buttonText?: string;
};

export default function BaseLogPage({
  title,
  type,
  placeholder = "Escribe aquí…",
  heightClass = "h-60",
  buttonText = "Guardar",
}: Props) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "offline">("idle");

  async function send() {
    if (!text.trim()) return;

    const r = await sendUniversal(type, { text });
    setText("");
    setStatus(r.offline ? "offline" : "ok");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-xl mb-4 text-white/80">{title}</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full ${heightClass} rounded-xl bg-neutral-900 p-4 border border-neutral-800
          focus:outline-none focus:border-cyan-400/60`}
        placeholder={placeholder}
      />

      <button
        onClick={send}
        className="mt-4 px-6 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30
          hover:bg-cyan-500/30 transition"
      >
        {buttonText}
      </button>

      {status === "ok" && <p className="mt-3 text-cyan-400">✔ Guardado</p>}
      {status === "offline" && (
        <p className="mt-3 text-yellow-400">📴 Guardado offline (se reenviará)</p>
      )}
    </main>
  );
}
