"use client";

import { useEffect, useState } from "react";

type Entry = {
  type: string;
  date: string;
  time: string;
  data: any[];
};

const TYPES = [
  { key: "registroLibre", label: "Registro libre" },
  { key: "ideas", label: "Ideas" },
  { key: "mejoras", label: "Mejoras" },
  { key: "memory", label: "Memorias" },
  { key: "suenos", label: "Sueños" },
  { key: "clase", label: "Clase" },
  { key: "irruptivos", label: "Irruptivos" },
  { key: "temas", label: "Temas" },
  { key: "tarot", label: "Tarot" },
  { key: "calculadora", label: "Calculadora" },
];

export default function Timeline() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
}

  useEffect(() => {
    fetch("/api/read-log?type=all")
      .then(r => r.json())
      .then(setRows);
  }, []);

  function toggleType(type: string) {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

const filteredRows = rows
  .filter(r => activeTypes.has(r.type))
  .filter(r => {
    if (fromDate && r.date < fromDate) return false;
    if (toDate && r.date > toDate) return false;
    return true;
  })
  .sort((a, b) =>
  `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
);


const metrics = TYPES.map(t => ({
  type: t.key,
  label: t.label,
  count: rows.filter(r => r.type === t.key).length,
}));


  return (
    <main className="p-8 bg-neutral-950 text-white">
      <h1 className="text-xl mb-4">Registro unificado</h1>

<div className="flex flex-wrap gap-2 mb-4">
  <button
    onClick={() => setActiveTypes(new Set(TYPES.map(t => t.key)))}
    className="text-xs px-3 py-1 rounded border border-neutral-700 text-white/60 hover:text-white"
  >
    Activar todos
  </button>

  <button
    onClick={() => setActiveTypes(new Set())}
    className="text-xs px-3 py-1 rounded border border-neutral-700 text-white/60 hover:text-white"
  >
    Limpiar
  </button>
</div>


<div className="flex flex-wrap gap-3 mb-6">
  <input
    type="date"
    onChange={e => setFromDate(e.target.value || null)}
    className="bg-neutral-900 border border-neutral-700 rounded px-3 py-1 text-xs"
  />

  <input
    type="date"
    onChange={e => setToDate(e.target.value || null)}
    className="bg-neutral-900 border border-neutral-700 rounded px-3 py-1 text-xs"
  />
</div>


<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
  {metrics.map(m => (
    <div
      key={m.type}
      className="bg-neutral-900 rounded p-3 text-xs"
    >
      <div className="text-white/50">{m.label}</div>
      <div className="text-lg text-cyan-400">{m.count}</div>
    </div>
  ))}
</div>




      {/* filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TYPES.map(t => {
          const active = activeTypes.has(t.key);
          return (
            <button
              key={t.key}
              onClick={() => toggleType(t.key)}
              className={[
                "px-3 py-1 rounded-full text-xs border transition",
                active
                  ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                  : "bg-neutral-900 border-neutral-700 text-white/40 hover:text-white/70",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

{rows.length === 0 && (
  <p className="text-white/40 mb-4">
    Cargando registros…
  </p>
)}

{rows.length > 0 && filteredRows.length === 0 && (
  <p className="text-white/40 mb-4">
    No hay registros para los filtros seleccionados.
  </p>
)}

      <div className="grid gap-4 md:grid-cols-2">
        {filteredRows.map((r, i) => (
          <div key={i} className="bg-neutral-900 p-4 rounded-xl">
            <div className="text-xs text-white/50 mb-1">
              [{r.type}] {r.date} {r.time}
            </div>
            <div className="text-sm">
              {r.data.join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
