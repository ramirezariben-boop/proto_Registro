import { saveOffline } from "./offline";

export async function sendUniversal(
  type: string,
  payload: any
): Promise<{ ok: boolean; offline?: boolean }> {
  try {
    const res = await fetch("/api/universal-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...payload }),
    });

    const json = await res.json();

    if (json.offline) {
      saveOffline(type, payload);
      return { ok: false, offline: true };
    }

    return { ok: true };
  } catch {
    saveOffline(type, payload);
    return { ok: false, offline: true };
  }
}
