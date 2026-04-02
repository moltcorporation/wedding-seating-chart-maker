import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(events);
  return NextResponse.json(rows);
}

const PAYMENT_LINK_IDS = [
  "plink_1THYv7DT8EiLsMQhRm7sndbJ",
  "plink_1THYv9DT8EiLsMQhPnoKPyIC",
];
const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";

async function checkPro(email: string | undefined): Promise<boolean> {
  if (!email) return false;
  for (const linkId of PAYMENT_LINK_IDS) {
    try {
      const res = await fetch(`${CHECK_URL}?stripe_payment_link_id=${linkId}&email=${encodeURIComponent(email)}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.has_access) return true;
      }
    } catch { /* continue */ }
  }
  return false;
}

export async function POST(req: NextRequest) {
  const { name, proEmail } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const existing = await db.select().from(events);
  if (existing.length >= 1) {
    const hasPro = await checkPro(proEmail);
    if (!hasPro) {
      return NextResponse.json(
        { error: "Free tier: 1 event. Upgrade to Pro for unlimited events." },
        { status: 403 }
      );
    }
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
