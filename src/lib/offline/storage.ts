import { openDB, type IDBPDatabase } from "idb";

export interface QueueItem {
  id: string;
  entity: "tasks" | "finances" | "habits" | "habit-logs";
  method: "POST" | "PATCH" | "DELETE";
  url: string;
  body: Record<string, unknown> | null;
  createdAt: number;
}

const DB_NAME = "meridian-offline";
const DB_VERSION = 1;
const STORE_QUEUE = "queue";

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_QUEUE)) {
          db.createObjectStore(STORE_QUEUE, { keyPath: "id" });
        }
      }
    });
  }
  return dbPromise;
}

export async function enqueueItem(item: QueueItem): Promise<void> {
  const db = await getDB();
  await db.put(STORE_QUEUE, item);
}

export async function getAllQueueItems(): Promise<QueueItem[]> {
  const db = await getDB();
  return db.getAll(STORE_QUEUE);
}

export async function removeQueueItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(STORE_QUEUE, id);
}

export async function getQueueCount(): Promise<number> {
  const db = await getDB();
  return db.count(STORE_QUEUE);
}
