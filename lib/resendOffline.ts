import { getOfflineQueue, clearOfflineQueue } from "./offline";

export async function resendOfflineQueue() {
  const queue = getOfflineQueue();
  if (!queue.length) return;

  for (const entry of queue) {
    try {
      await fetch("/api/universal-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: entry.type,
          ...entry.payload,
        }),
      });
    } catch {
      return; // si falla uno, no borramos nada
    }
  }

  clearOfflineQueue();
}
