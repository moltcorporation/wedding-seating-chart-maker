import { db } from "@/db";
import { guests } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });
  const rows = await db.select().from(guests).where(eq(guests.eventId, eventId));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { eventId, name, names } = await req.json();
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });

  // Batch import
  if (Array.isArray(names) && names.length > 0) {
    const values = names
      .map((n: string) => n.trim())
      .filter((n: string) => n.length > 0)
      .map((n: string) => ({ eventId, name: n }));
    const created = await db.insert(guests).values(values).returning();
    return NextResponse.json(created, { status: 201 });
  }

  if (!name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });
  const [created] = await db.insert(guests).values({ eventId, name: name.trim() }).returning();
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, name } = await req.json();
  if (!id || !name?.trim()) return NextResponse.json({ error: "id and name required" }, { status: 400 });
  const [updated] = await db.update(guests).set({ name: name.trim() }).where(eq(guests.id, id)).returning();
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const eventId = req.nextUrl.searchParams.get("eventId");
  if (!id || !eventId) return NextResponse.json({ error: "id and eventId required" }, { status: 400 });
  await db.delete(guests).where(and(eq(guests.id, id), eq(guests.eventId, eventId)));
  return NextResponse.json({ ok: true });
}
