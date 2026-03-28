"use client";

import { useEffect } from "react";
import { WifiOff } from "lucide-react";

import { useLocale } from "@/lib/hooks/use-locale";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import { useSyncStore } from "@/lib/store/sync-store";
import { syncPendingQueue } from "@/lib/offline/sync-manager";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const { t } = useLocale();
  const { isSyncing, pendingCount } = useSyncStore();

  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      void syncPendingQueue();
    }
  }, [isOnline, pendingCount]);

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className="flex items-center gap-2 bg-yellow-900/30 px-4 py-2 text-sm text-yellow-300 border-b border-yellow-900/50">
      <WifiOff size={14} className="shrink-0" />
      {!isOnline ? (
        <span>{t("offline.banner")}</span>
      ) : isSyncing ? (
        <span>{t("offline.syncing")}</span>
      ) : (
        <span>{t("offline.syncPending", { count: pendingCount })}</span>
      )}
    </div>
  );
}
