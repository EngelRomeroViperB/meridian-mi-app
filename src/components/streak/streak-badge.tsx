"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils/classnames";

interface StreakBadgeProps {
  count: number;
  label: string;
  size?: "sm" | "md";
}

export function StreakBadge({ count, label, size = "md" }: StreakBadgeProps) {
  const isActive = count > 0;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={cn(
          "flex items-center gap-1 rounded-xl font-semibold",
          size === "md" ? "px-3 py-1.5 text-base" : "px-2 py-1 text-sm",
          isActive
            ? "bg-orange-900/30 text-orange-400"
            : "bg-zinc-800 text-zinc-500"
        )}
      >
        <Flame size={size === "md" ? 16 : 14} className={isActive ? "text-orange-400" : "text-zinc-600"} />
        {count}
      </div>
      <p className="text-xs text-zinc-500">{label}</p>
    </div>
  );
}
