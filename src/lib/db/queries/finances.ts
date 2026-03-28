import type { SupabaseClient } from "@supabase/supabase-js";

import type { FinanceRow } from "@/lib/types/database";
import type { CreateFinanceInput, UpdateFinanceInput } from "@/lib/validations/finance.schema";

export async function fetchFinances(
  supabase: SupabaseClient,
  userId: string,
  filters?: { project?: string; channel?: string }
): Promise<FinanceRow[]> {
  const project = filters?.project?.trim();
  const channel = filters?.channel?.trim();

  let query = supabase
    .from("finances")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (project) {
    query = query.eq("project", project);
  }

  if (channel) {
    query = query.eq("channel", channel);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as FinanceRow[];
}

export async function createFinance(
  supabase: SupabaseClient,
  userId: string,
  input: CreateFinanceInput
): Promise<FinanceRow> {
  const { data, error } = await supabase
    .from("finances")
    .insert({ ...input, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data as FinanceRow;
}

export async function updateFinance(
  supabase: SupabaseClient,
  userId: string,
  id: string,
  input: UpdateFinanceInput
): Promise<FinanceRow> {
  const { data, error } = await supabase
    .from("finances")
    .update(input)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data as FinanceRow;
}

export async function deleteFinance(
  supabase: SupabaseClient,
  userId: string,
  id: string
): Promise<void> {
  const { error } = await supabase.from("finances").delete().eq("id", id).eq("user_id", userId);
  if (error) throw error;
}
