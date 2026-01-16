"use client";

import { useEffect, useState } from "react";

export default function IdeasView() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/read-log?type=ideas")
      .then(r => r.json())
      .then(setRows);
  }, []);

  return (
    <main className="p-8 bg-neutral-950 text-white">
      <h1 className="text-xl mb-4">Ideas registradas</h1>

      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li key={i} className="bg-neutral-900 p-4 rounded">
            {r[2]}
          </li>
        ))}
      </ul>
    </main>
  );
}
