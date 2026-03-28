import { create } from "zustand";

interface SyncState {
  isSyncing: boolean;
  pendingCount: number;
  setIsSyncing: (v: boolean) => void;
  setPendingCount: (n: number) => void;
}

export const useSyncStore = create<SyncState>()((set) => ({
  isSyncing: false,
  pendingCount: 0,
  setIsSyncing: (v) => set({ isSyncing: v }),
  setPendingCount: (n) => set({ pendingCount: n })
}));
