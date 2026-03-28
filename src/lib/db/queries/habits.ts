import type { SupabaseClient } from "@supabase/supabase-js";

import type { HabitRow, HabitLogRow } from "@/lib/types/database";
import type { CreateHabitInput, UpdateHabitInput } from "@/lib/validations/habit.schema";

export async function fetchHabits(
  supabase: SupabaseClient,
  userId: string
): Promise<HabitRow[]> {
  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .eq("active", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as HabitRow[];
}

export async function fetchHabitLogs(
  supabase: SupabaseClient,
  userId: string,
  days = 30
): Promise<HabitLogRow[]> {
  const from = new Date();
  from.setDate(from.getDate() - days);
  const fromStr = from.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("habit_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("date", fromStr)
    .order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as HabitLogRow[];
}

export async function createHabit(
  supabase: SupabaseClient,
  userId: string,
  input: CreateHabitInput
): Promise<HabitRow> {
  const { data, error } = await supabase
    .from("habits")
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as HabitRow;
}

export async function updateHabit(
  supabase: SupabaseClient,
  userId: string,
  id: string,
  input: UpdateHabitInput
): Promise<HabitRow> {
  const { data, error } = await supabase
    .from("habits")
    .update(input)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data as HabitRow;
}

export async function deleteHabit(
  supabase: SupabaseClient,
  userId: string,
  id: string
): Promise<void> {
  const { error } = await supabase.from("habits").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}

export async function toggleHabitLog(
  supabase: SupabaseClient,
  userId: string,
  habitId: string,
  date: string
): Promise<"created" | "deleted"> {
  const { data: existing, error: lookupError } = await supabase
    .from("habit_logs")
    .select("id")
    .eq("habit_id", habitId)
    .eq("user_id", userId)
    .eq("date", date)
    .maybeSingle();

  if (lookupError) throw lookupError;

  if (existing) {
    const { error: deleteError } = await supabase.from("habit_logs").delete().eq("id", existing.id);
    if (deleteError) throw deleteError;
    return "deleted";
  }

  const { error: insertError } = await supabase
    .from("habit_logs")
    .insert({ habit_id: habitId, user_id: userId, date });
  if (insertError) throw insertError;
  return "created";
}
