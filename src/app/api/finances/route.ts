import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createFinanceSchema, updateFinanceSchema } from "@/lib/validations/finance.schema";
import { createFinance, deleteFinance, fetchFinances, updateFinance } from "@/lib/db/queries/finances";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const project = request.nextUrl.searchParams.get("project") ?? undefined;
  const channel = request.nextUrl.searchParams.get("channel") ?? undefined;

  try {
    const rows = await fetchFinances(supabase, user.id, { project, channel });
    return NextResponse.json({ data: rows, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ data: null, error: "Unauthorized" }, { status: 401 });

  const body: unknown = await request.json();
  const parsed = createFinanceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ data: null, error: parsed.error.message }, { status: 422 });

  try {
    const row = await createFinance(supabase, user.id, parsed.data);
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
  const parsed = updateFinanceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ data: null, error: parsed.error.message }, { status: 422 });

  try {
    const row = await updateFinance(supabase, user.id, id, parsed.data);
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
    await deleteFinance(supabase, user.id, id);
    return NextResponse.json({ data: null, error: null });
  } catch (err) {
    return NextResponse.json({ data: null, error: String(err) }, { status: 500 });
  }
}
