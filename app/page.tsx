import Link from "next/link";

const tableTypes = [
  {
    name: "Round Tables",
    description: "The classic wedding layout. Seats 6-12 guests around a circular table.",
    seats: "6-12 seats",
  },
  {
    name: "Banquet Tables",
    description: "Long rectangular tables for formal dinners and larger parties.",
    seats: "6-12 seats",
  },
  {
    name: "Head Table",
    description: "Single-sided seating for the wedding party, facing the guests.",
    seats: "Up to 10",
  },
  {
    name: "Sweetheart Table",
    description: "An intimate table for just the couple — the center of attention.",
    seats: "2 seats",
  },
  {
    name: "Kids' Table",
    description: "A smaller round table sized just right for younger guests.",
    seats: "4-8 seats",
  },
];

const features = [
  {
    title: "Drag-and-Drop Floor Plan",
    description:
      "Place tables anywhere on your floor plan. Move them around until the layout is perfect.",
  },
  {
    title: "Guest Management",
    description:
      "Add guests one by one or import a CSV. Drag names onto tables to assign seats.",
  },
  {
    title: "Multiple Table Types",
    description:
      "Round, rectangular, head, sweetheart, and kids' tables — all the layouts you need.",
  },
  {
    title: "PDF Export",
    description:
      "Download a print-ready PDF of your seating chart to share with your venue and vendors.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Nav */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-stone-800">
            Wedding Seating Chart Maker
          </h1>
          <Link
            href="/editor"
            className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
          >
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-4xl font-serif font-bold text-stone-800 sm:text-5xl">
          Plan your perfect seating chart
        </h2>
        <p className="mt-4 text-lg text-stone-500 max-w-2xl mx-auto">
          Drag-and-drop tables onto your floor plan, assign guests, and export a
          beautiful PDF to share with your venue. Free to use, no account needed.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/editor"
            className="rounded-lg bg-stone-800 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700"
          >
            Create Your Seating Chart
          </Link>
        </div>
      </section>

      {/* Table Types */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h3 className="text-2xl font-serif font-bold text-stone-800 text-center">
          Every table type you need
        </h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tableTypes.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-stone-200 bg-white p-5"
            >
              <h4 className="text-base font-semibold text-stone-800">{t.name}</h4>
              <p className="mt-1 text-sm text-stone-500">{t.description}</p>
              <p className="mt-2 text-xs text-stone-400">{t.seats}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h3 className="text-2xl font-serif font-bold text-stone-800 text-center">
          Everything you need to plan your reception
        </h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-stone-200 bg-white p-6">
              <h4 className="text-base font-semibold text-stone-800">{f.title}</h4>
              <p className="mt-2 text-sm text-stone-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-stone-800">
            Built for couples and planners
          </h3>
          <p className="mt-3 text-stone-500 max-w-xl mx-auto">
            Whether you&apos;re a bride mapping out 200 guests or a wedding planner managing
            multiple events, our seating chart maker adapts to your needs. Start for free
            with up to 3 tables, or upgrade to Pro for unlimited tables, premium PDF
            layouts, and saved floor plans.
          </p>
          <div className="mt-6">
            <Link
              href="/editor"
              className="inline-block rounded-lg bg-stone-800 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h3 className="text-3xl font-serif font-bold text-stone-800">
          Your seating chart, sorted
        </h3>
        <p className="mt-3 text-stone-500">
          No sign-up required. Start in seconds.
        </p>
        <div className="mt-6">
          <Link
            href="/editor"
            className="inline-block rounded-lg bg-stone-800 px-8 py-3 text-base font-medium text-white hover:bg-stone-700"
          >
            Create Free Seating Chart
          </Link>
        </div>
      </section>

      {/* Footer */}
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
