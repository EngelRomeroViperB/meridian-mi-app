import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createHabitSchema, updateHabitSchema } from "@/lib/validations/habit.schema";
import { createHabit, deleteHabit, fetchHabits, fetchHabitLogs, updateHabit } from "@/lib/db/queries/habits";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const includeLogs = request.nextUrl.searchParams.get("logs") === "true";

  try {
    const habits = await fetchHabits(supabase, user.id);
    if (includeLogs) {
      const logs = await fetchHabitLogs(supabase, user.id, 60);
      const logsByHabit = logs.reduce<Record<string, string[]>>((acc, log) => {
        if (!acc[log.habit_id]) acc[log.habit_id] = [];
        acc[log.habit_id]!.push(log.date);
        return acc;
      }, {});
      const habitsWithLogs = habits.map((h) => ({ ...h, logs: logsByHabit[h.id] ?? [] }));
      return NextResponse.json({ data: habitsWithLogs, error: null });
    }
    return NextResponse.json({ data: habits, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = createHabitSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ data: null, error: parsed.error.message }, { status: 422 });

  try {
    const row = await createHabit(supabase, user.id, parsed.data);
    return NextResponse.json({ data: row, error: null }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ data: null, error: "Missing id" }, { status: 400 });

  const body: unknown = await request.json();
  const parsed = updateHabitSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ data: null, error: parsed.error.message }, { status: 422 });

  try {
    const row = await updateHabit(supabase, user.id, id, parsed.data);
    return NextResponse.json({ data: row, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ data: null, error: "Missing id" }, { status: 400 });

  try {
    await deleteHabit(supabase, user.id, id);
    return NextResponse.json({ data: null, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}
