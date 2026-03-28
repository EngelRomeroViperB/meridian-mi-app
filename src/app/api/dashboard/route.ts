import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { fetchDashboardStats } from "@/lib/db/queries/dashboard";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  try {
    const stats = await fetchDashboardStats(supabase, user.id);
    return NextResponse.json({ data: stats, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}
