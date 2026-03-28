"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/classnames";
import { createHabitSchema, type CreateHabitInput } from "@/lib/validations/habit.schema";
import type { Habit } from "@/lib/types/domain";

const EMOJI_SUGGESTIONS = ["✅", "💪", "📚", "🏃", "💧", "🧘", "🌱", "🎯", "⭐", "🔥"];

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateHabitInput) => Promise<void>;
  initialData?: Habit | null;
  isLoading?: boolean;
}

export function HabitForm({ open, onClose, onSubmit, initialData, isLoading }: HabitFormProps) {
  const { t } = useLocale();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CreateHabitInput>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: { emoji: "✅", active: true }
  });

  const selectedEmoji = watch("emoji");

  useEffect(() => {
    if (open && initialData) {
      reset({ name: initialData.name, emoji: initialData.emoji, active: initialData.active });
    } else if (open) {
      reset({ name: "", emoji: "✅", active: true });
    }
  }, [open, initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 lg:items-center lg:pb-0">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-surface p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{initialData ? t("streak.editHabit") : t("streak.addHabit")}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">{t("streak.habitName")}</label>
            <input
              type="text"
              placeholder={t("streak.habitName")}
              className="w-full rounded-xl border border-zinc-700 bg-background px-3 py-2.5 text-sm placeholder:text-zinc-500 focus:border-accent focus:outline-none"
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-300">{t("streak.emoji")}</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_SUGGESTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setValue("emoji", emoji)}
                  className={cn(
                    "h-9 w-9 rounded-xl text-lg transition",
                    selectedEmoji === emoji
                      ? "border-2 border-accent bg-accent/10"
                      : "border border-zinc-700 bg-background hover:border-zinc-500"
                  )}
                >
                  {emoji}
                </button>
              ))}
              <input
                type="text"
                maxLength={4}
                placeholder="✏️"
                className="h-9 w-9 rounded-xl border border-zinc-700 bg-background text-center text-lg focus:border-accent focus:outline-none"
                {...register("emoji")}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-zinc-700 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800">
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? t("common.loading") : t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
