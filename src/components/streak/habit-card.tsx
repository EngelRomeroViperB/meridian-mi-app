"use client";

import { Pencil, Trash2 } from "lucide-react";

import { StreakBadge } from "./streak-badge";
import { HabitHistory } from "./habit-history";
import { useLocale } from "@/lib/hooks/use-locale";
import { getTodayStringBogota, subtractDays } from "@/lib/utils/date";
import { cn } from "@/lib/utils/classnames";
import type { Habit } from "@/lib/types/domain";

interface HabitCardProps {
  habit: Habit;
  onToggleToday: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  isToggling?: boolean;
}

function calculateStreaks(logs: string[]): { current: number; best: number } {
  if (logs.length === 0) return { current: 0, best: 0 };

  const sorted = [...logs].sort((a, b) => b.localeCompare(a));
  const today = getTodayStringBogota();
  const yesterday = subtractDays(today, 1);

  let current = 0;
  let best = 0;
  let streak = 0;
  let prev: string | null = null;

  for (const date of sorted) {
    if (prev === null) {
      if (date === today || date === yesterday) {
        streak = 1;
        if (date === today) current = 1;
      } else {
        break;
      }
    } else {
      const expected = subtractDays(prev, 1);
      if (date === expected) {
        streak++;
        if (current > 0) current++;
      } else {
        break;
      }
    }
    prev = date;
    best = Math.max(best, streak);
  }

  best = Math.max(best, streak);
  return { current, best };
}

export function HabitCard({ habit, onToggleToday, onEdit, onDelete, isToggling }: HabitCardProps) {
  const { t } = useLocale();
  const today = getTodayStringBogota();
  const logs = habit.logs ?? [];
  const doneToday = logs.includes(today);
  const { current, best } = calculateStreaks(logs);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{habit.emoji}</span>
          <p className="font-medium">{habit.name}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(habit)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-700 hover:text-white"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-900/30 hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <StreakBadge count={current} label={t("streak.currentStreak")} size="sm" />
        <StreakBadge count={best} label={t("streak.bestStreak")} size="sm" />
      </div>

      <div className="mb-3">
        <HabitHistory logs={logs} />
      </div>

      <button
        onClick={() => onToggleToday(habit.id, today)}
        disabled={isToggling}
        className={cn(
          "w-full rounded-xl py-2.5 text-sm font-medium transition",
          doneToday
            ? "bg-green-800/50 text-green-300 border border-green-800"
            : "bg-accent text-white hover:opacity-90"
        )}
      >
        {doneToday ? t("streak.completedToday") : t("streak.checkToday")}
      </button>
    </div>
  );
}
