import type { HabitRow, HabitLogRow } from "@/lib/types/database";
import type { Habit, HabitLog } from "@/lib/types/domain";

export function mapHabitRowToHabit(row: HabitRow, logs?: string[]): Habit {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    emoji: row.emoji,
    active: row.active,
    createdAt: row.created_at,
    logs
  };
}

export function mapHabitLogRowToHabitLog(row: HabitLogRow): HabitLog {
  return {
    id: row.id,
    habitId: row.habit_id,
    userId: row.user_id,
    date: row.date,
    createdAt: row.created_at
  };
}
