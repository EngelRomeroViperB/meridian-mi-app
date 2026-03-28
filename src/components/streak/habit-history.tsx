"use client";

import { getTodayStringBogota, subtractDays } from "@/lib/utils/date";
import { cn } from "@/lib/utils/classnames";

interface HabitHistoryProps {
  logs: string[];
  days?: number;
}

export function HabitHistory({ logs, days = 14 }: HabitHistoryProps) {
  const today = getTodayStringBogota();
  const logSet = new Set(logs);

  const dates = Array.from({ length: days }, (_, i) => subtractDays(today, days - 1 - i));

  return (
    <div className="flex gap-1 flex-wrap">
      {dates.map((date) => {
        const done = logSet.has(date);
        const isToday = date === today;
        return (
          <div
            key={date}
            title={date}
            className={cn(
              "h-4 w-4 rounded",
              done
                ? "bg-accent"
                : isToday
                ? "border-2 border-accent bg-transparent"
                : "bg-zinc-800"
            )}
          />
        );
      })}
    </div>
  );
}
