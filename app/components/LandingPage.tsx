import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface LandingPageProps {
  title: string;
  subtitle: string;
  content: string;
  faqs: FAQ[];
  relatedPages: { href: string; label: string }[];
}

export default function LandingPage({
  title,
  subtitle,
  content,
  faqs,
  relatedPages,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-bold text-stone-800">
            Wedding Seating Chart Maker
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="text-sm font-medium text-stone-600 hover:text-stone-800"
            >
              Pricing
            </Link>
            <Link
              href="/editor"
              className="rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-serif font-bold text-stone-800 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-stone-500">{subtitle}</p>

        <div
          className="mt-8 prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-10 rounded-xl border border-stone-200 bg-white p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-stone-800">
            Ready to Plan Your Seating Chart?
          </h2>
          <p className="mt-2 text-stone-500">
            Drag-and-drop tables, assign guests, and export a beautiful PDF.
            Free to use, no account needed.
          </p>
          <Link
            href="/editor"
            className="mt-4 inline-block rounded-lg bg-stone-800 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700"
          >
            Create Your Seating Chart
          </Link>
        </div>

        {faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-stone-800">
              Frequently Asked Questions
            </h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <dt className="text-base font-semibold text-stone-800">
                    {faq.question}
                  </dt>
                  <dd className="mt-1 text-sm text-stone-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <nav className="mt-12 border-t border-stone-200 pt-6">
          <h2 className="text-lg font-serif font-bold text-stone-800">
            More Seating Chart Guides
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {relatedPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm text-stone-600 hover:text-stone-800 hover:underline"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <p className="text-sm text-stone-400">
            Wedding Seating Chart Maker &mdash; Free drag-and-drop seating
            charts for your reception.
          </p>
        </div>
      </footer>
    </div>
  );
}
