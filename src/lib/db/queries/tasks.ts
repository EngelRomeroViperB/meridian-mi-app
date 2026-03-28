import type { SupabaseClient } from "@supabase/supabase-js";

import type { TaskRow } from "@/lib/types/database";
import type { CreateTaskInput, UpdateTaskInput } from "@/lib/validations/task.schema";
import { getTodayStringBogota } from "@/lib/utils/date";

export async function fetchTasks(
  supabase: SupabaseClient,
  userId: string,
  filter?: "today" | "all"
): Promise<TaskRow[]> {
  let query = supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (filter === "today") {
    const today = getTodayStringBogota();
    query = query.gte("due_date", `${today}T00:00:00.000-05:00`).lte("due_date", `${today}T23:59:59.999-05:00`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as TaskRow[];
}

export async function createTask(
  supabase: SupabaseClient,
  userId: string,
  input: CreateTaskInput
): Promise<TaskRow> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as TaskRow;
}

export async function updateTask(
  supabase: SupabaseClient,
  userId: string,
  id: string,
  input: UpdateTaskInput
): Promise<TaskRow> {
  const { data, error } = await supabase
    .from("tasks")
    .update(input)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data as TaskRow;
}

export async function deleteTask(
  supabase: SupabaseClient,
  userId: string,
  id: string
): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}
