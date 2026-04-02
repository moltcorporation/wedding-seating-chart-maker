import Link from "next/link";

const COUPLES_PRO_URL = "https://buy.stripe.com/4gM4gzcW78Ol9LD5Eg3Nm0F";
const PLANNER_PRO_URL = "https://buy.stripe.com/eVqcN5f4f7Kh8Hz5Eg3Nm0G";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying things out",
    features: [
      "1 floor plan",
      "Up to 3 tables",
      "Round & banquet tables",
      "Guest list management",
      "CSV import",
      "PDF export (watermarked)",
    ],
    cta: "Start Free",
    href: "/editor",
    highlight: false,
  },
  {
    name: "Couples Pro",
    price: "$9.99",
    period: "one-time",
    description: "Everything you need for your wedding",
    features: [
      "Unlimited tables",
      "Unlimited guests",
      "All table types (head, sweetheart, kids)",
      "Multiple floor plans",
      "No watermark on PDF",
      "High-res PDF export",
    ],
    cta: "Get Couples Pro",
    href: COUPLES_PRO_URL,
    highlight: true,
  },
  {
    name: "Planner Pro",
    price: "$4.99",
    period: "/month",
    description: "For wedding planners managing multiple events",
    features: [
      "Everything in Couples Pro",
      "Unlimited events",
      "Batch PDF export",
      "Priority support",
    ],
    cta: "Get Planner Pro",
    href: PLANNER_PRO_URL,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-bold text-stone-800">
            Wedding Seating Chart Maker
          </Link>
          <Link
            href="/editor"
            className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
          >
            Open Editor
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-4xl font-serif font-bold text-stone-800">
          Simple, honest pricing
        </h2>
        <p className="mt-4 text-lg text-stone-500 max-w-xl mx-auto">
          Start free. Upgrade when you need more tables, table types, or events.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-stone-800 bg-white shadow-lg ring-1 ring-stone-800"
                  : "border-stone-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="mb-3 inline-block self-start rounded-full bg-stone-800 px-3 py-0.5 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-serif font-bold text-stone-800">
                {plan.name}
              </h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-stone-800">{plan.price}</span>
                <span className="ml-1 text-sm text-stone-500">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-stone-500">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="mt-0.5 text-stone-400">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-medium ${
                  plan.highlight
                    ? "bg-stone-800 text-white hover:bg-stone-700"
                    : "border border-stone-300 text-stone-700 hover:bg-stone-50"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
          <h3 className="text-xl font-serif font-bold text-stone-800">
            Already purchased?
          </h3>
          <p className="mt-2 text-sm text-stone-500">
            Enter the email you used at checkout in the editor to unlock Pro features.
          </p>
          <Link
            href="/editor"
            className="mt-4 inline-block rounded-lg bg-stone-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
          >
            Go to Editor
          </Link>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <p className="text-sm text-stone-400">
            Wedding Seating Chart Maker &mdash; Free drag-and-drop seating charts for your reception.
          </p>
        </div>
      </footer>
    </div>
  );
}
