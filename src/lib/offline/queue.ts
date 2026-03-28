import { enqueueItem, getQueueCount, type QueueItem } from "./storage";
import { useSyncStore } from "@/lib/store/sync-store";

export async function addToOfflineQueue(
  item: Omit<QueueItem, "id" | "createdAt">
): Promise<void> {
  const id = crypto.randomUUID();
  await enqueueItem({ ...item, id, createdAt: Date.now() });
  const count = await getQueueCount();
  useSyncStore.getState().setPendingCount(count);
}
