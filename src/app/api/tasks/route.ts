import { NextResponse } from "next/server";

function moduleRemovedResponse() {
  return NextResponse.json(
    { data: null, error: "Tasks module was removed" },
    { status: 410 }
  );
}

export async function GET() {
  return moduleRemovedResponse();
}

export async function POST() {
  return moduleRemovedResponse();
}

export async function PATCH() {
  return moduleRemovedResponse();
}

export async function DELETE() {
  return moduleRemovedResponse();
}
