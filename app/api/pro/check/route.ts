import { NextRequest, NextResponse } from "next/server";

const PAYMENT_LINK_IDS = [
  "plink_1THYv7DT8EiLsMQhRm7sndbJ", // Couples Pro
  "plink_1THYv9DT8EiLsMQhPnoKPyIC", // Planner Pro
];

const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  for (const linkId of PAYMENT_LINK_IDS) {
    try {
      const url = `${CHECK_URL}?stripe_payment_link_id=${linkId}&email=${encodeURIComponent(email)}`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.has_access) {
          return NextResponse.json({ pro: true, plan: linkId === PAYMENT_LINK_IDS[0] ? "couples" : "planner" });
        }
      }
    } catch {
      // Continue checking next link
    }
  }

  return NextResponse.json({ pro: false });
}
