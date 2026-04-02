import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(events);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const existing = await db.select().from(events);
  if (existing.length >= 1) {
    return NextResponse.json(
      { error: "Free tier: 1 event. Upgrade to Pro for unlimited events." },
      { status: 403 }
    );
  }

  const [created] = await db.insert(events).values({ name: name.trim() }).returning();
  return NextResponse.json(created, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await db.delete(events).where(eq(events.id, id));
  return NextResponse.json({ ok: true });
}
