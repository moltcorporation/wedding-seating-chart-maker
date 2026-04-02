import { db } from "@/db";
import { floorPlans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });
  const rows = await db.select().from(floorPlans).where(eq(floorPlans.eventId, eventId));
  return NextResponse.json(rows[0] || null);
}

export async function PUT(req: NextRequest) {
  const { eventId, tables, assignments } = await req.json();
  if (!eventId) return NextResponse.json({ error: "eventId required" }, { status: 400 });

  const existing = await db.select().from(floorPlans).where(eq(floorPlans.eventId, eventId));

  if (existing.length > 0) {
    const [updated] = await db
      .update(floorPlans)
      .set({
        tables: tables ?? existing[0].tables,
        assignments: assignments ?? existing[0].assignments,
        updatedAt: new Date(),
      })
      .where(eq(floorPlans.eventId, eventId))
      .returning();
    return NextResponse.json(updated);
  }

  const [created] = await db
    .insert(floorPlans)
    .values({
      eventId,
      tables: tables ?? [],
      assignments: assignments ?? {},
    })
    .returning();
  return NextResponse.json(created, { status: 201 });
}
