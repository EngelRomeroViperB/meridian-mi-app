import { getAllQueueItems, removeQueueItem, getQueueCount } from "./storage";
import { useSyncStore } from "@/lib/store/sync-store";

let isSyncRunning = false;

export async function syncPendingQueue(): Promise<void> {
  if (isSyncRunning) return;
  isSyncRunning = true;

  const store = useSyncStore.getState();
  store.setIsSyncing(true);

  try {
    const items = await getAllQueueItems();
    items.sort((a, b) => a.createdAt - b.createdAt);

    for (const item of items) {
      try {
        const res = await fetch(item.url, {
          method: item.method,
          headers: { "Content-Type": "application/json" },
          body: item.body ? JSON.stringify(item.body) : undefined
        });

        if (res.ok || res.status === 409) {
          await removeQueueItem(item.id);
        }
      } catch {
        break;
      }
    }
  } finally {
    const remaining = await getQueueCount();
    store.setPendingCount(remaining);
    store.setIsSyncing(false);
    isSyncRunning = false;
  }
}
