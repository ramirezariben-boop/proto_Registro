"use client";

import { useState } from "react";
import { sendUniversal } from "@/lib/sendUniversal";

export default function TemasReg() {
  const [tema, setTema] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] =
    useState<"idle" | "ok" | "offline">("idle");

  async function send() {
    if (!tema.trim() || !text.trim()) return;

    const r = await sendUniversal("temas", { tema, text });
    setTema("");
    setText("");
    setStatus(r.offline ? "offline" : "ok");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-xl mb-4 text-white/80">
        Pensamientos temáticos
      </h1>

      <input
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        placeholder="Tema (libro, disciplina, autor...)"
        className="block w-full mb-3 rounded-xl bg-neutral-900 p-3 border border-neutral-800 focus:outline-none focus:border-cyan-400/60"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Reflexión sobre el tema…"
        className="w-full h-60 rounded-xl bg-neutral-900 p-4
          border border-neutral-800 focus:outline-none focus:border-cyan-400/60"
      />

      <button
        onClick={send}
        className="mt-4 px-6 py-2 rounded-lg bg-cyan-500/20
          border border-cyan-400/30 hover:bg-cyan-500/30 transition"
      >
        Guardar pensamiento
      </button>

      {status === "ok" && (
        <p className="mt-3 text-cyan-400">✔ Guardado</p>
      )}
      {status === "offline" && (
        <p className="mt-3 text-yellow-400">
          📴 Guardado offline (se enviará luego)
        </p>
      )}
    </main>
  );
}
