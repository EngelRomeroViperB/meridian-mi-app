"use client";

import { X } from "lucide-react";

import { useLocale } from "@/lib/hooks/use-locale";

interface ConfirmDialogProps {
  open: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmDialog({ open, message, onConfirm, onCancel, isLoading }: ConfirmDialogProps) {
  const { t } = useLocale();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-8 lg:items-center lg:pb-0">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-surface p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-2">
          <p className="text-sm text-zinc-300">{message ?? t("common.confirmDelete")}</p>
          <button
            onClick={onCancel}
            className="shrink-0 rounded-lg p-1 text-zinc-500 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-zinc-700 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-700 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {isLoading ? t("common.loading") : t("common.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
