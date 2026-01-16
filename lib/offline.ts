export type OfflineEntry = {
  type: string;
  payload: any;
  savedAt: number;
};

const KEY = "offlineQueue";

export function saveOffline(type: string, payload: any) {
  const queue: OfflineEntry[] =
    JSON.parse(localStorage.getItem(KEY) ?? "[]");

  queue.push({ type, payload, savedAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(queue));
}

export function getOfflineQueue(): OfflineEntry[] {
  return JSON.parse(localStorage.getItem(KEY) ?? "[]");
}

export function clearOfflineQueue() {
  localStorage.removeItem(KEY);
}
