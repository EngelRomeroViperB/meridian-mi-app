import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { toggleHabitLog } from "@/lib/db/queries/habits";

const toggleHabitLogSchema = z.object({
  habit_id: z.string().uuid("Invalid habit_id"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = toggleHabitLogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ data: null, error: parsed.error.message }, { status: 422 });
  }

  try {
    const result = await toggleHabitLog(supabase, user.id, parsed.data.habit_id, parsed.data.date);
    return NextResponse.json({ data: { action: result }, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}
