"use client";

import { useState } from "react";
import { sendUniversal } from "@/lib/sendUniversal";

export default function TarotReg() {
  const [cards, setCards] = useState(["", "", "", "", ""]);
  const [notas, setNotas] = useState("");
  const [status, setStatus] =
    useState<"idle" | "ok" | "offline">("idle");

  function setCard(index: number, value: string) {
    const next = [...cards];
    next[index] = value;
    setCards(next);
  }

  async function send() {
    const payload = {
      c1: cards[0],
      c2: cards[1],
      c3: cards[2],
      c4: cards[3],
      c5: cards[4],
      notas,
    };

    const r = await sendUniversal("tarot", payload);

    setCards(["", "", "", "", ""]);
    setNotas("");
    setStatus(r.offline ? "offline" : "ok");
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <h1 className="text-xl mb-6 text-white/80">Registro de Tarot</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {cards.map((c, i) => (
          <input
            key={i}
            value={c}
            onChange={(e) => setCard(i, e.target.value)}
            placeholder={`Carta ${i + 1}`}
            className="rounded-xl bg-neutral-900 p-3 border border-neutral-800
              focus:outline-none focus:border-cyan-400/60"
          />
        ))}
      </div>

      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Notas de la tirada…"
        className="w-full h-32 rounded-xl bg-neutral-900 p-4 border border-neutral-800
          focus:outline-none focus:border-cyan-400/60"
      />

      <button
        onClick={send}
        className="mt-4 px-6 py-2 rounded-lg bg-cyan-500/20
          border border-cyan-400/30 hover:bg-cyan-500/30 transition"
      >
        Guardar tirada
      </button>

      {status === "ok" && (
        <p className="mt-3 text-cyan-400">✔ Tirada guardada</p>
      )}
      {status === "offline" && (
        <p className="mt-3 text-yellow-400">
          📴 Guardada offline (se enviará luego)
        </p>
      )}
    </main>
  );
}
