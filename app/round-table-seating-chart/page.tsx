import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Round Table Seating Chart for Weddings - Free Layout Maker",
  description:
    "Create round table seating charts for your wedding reception. Drag and drop circular tables for 6-12 guests, assign seats, and download a printable PDF floor plan.",
  openGraph: {
    title: "Round Table Seating Chart for Weddings",
    description:
      "Free round table seating chart maker. Drag-and-drop layout, guest assignment, printable PDF.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many guests can sit at a round wedding table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard 60-inch round table seats 8-10 guests comfortably. Smaller 48-inch rounds fit 6, and large 72-inch rounds can seat up to 12. Leave enough elbow room for comfortable dining.",
      },
    },
    {
      "@type": "Question",
      name: "How do you arrange round tables at a wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Space tables at least 5-6 feet apart for comfortable movement. Place them in a grid or staggered pattern, leaving clear paths to the dance floor, bar, and restrooms. Our drag-and-drop editor lets you try different arrangements instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How many round tables do I need for my wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide your guest count by the seats per table. For 8-top rounds: 100 guests need about 13 tables. For 10-top rounds: 100 guests need 10 tables. Always round up and add one extra table for flexibility.",
      },
    },
  ],
};

export default function RoundTableSeatingChartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage
        title="Round Table Seating Chart for Weddings"
        subtitle="The most popular reception layout — plan your round table arrangement with our free drag-and-drop tool."
        content={`
          <p>Round tables are the go-to choice for wedding receptions, and for good reason. They encourage face-to-face conversation, fit naturally into almost any venue shape, and create an elegant, balanced look across the room. Whether you're planning an intimate 50-person dinner or a 300-guest celebration, round tables offer the versatility to make it work.</p>

          <h2>Choosing the Right Round Table Size</h2>
          <p>Round tables come in three standard sizes. A 48-inch round is perfect for smaller groupings of 6 guests — ideal for kids' tables or intimate conversation groups. The 60-inch round is the industry standard, seating 8-10 guests with comfortable elbow room for a plated dinner. For larger gatherings, 72-inch rounds accommodate up to 12 guests, though 10 is often more comfortable if you're serving a multi-course meal.</p>

          <h2>Spacing and Floor Plan Layout</h2>
          <p>Proper spacing makes the difference between a comfortable reception and a cramped one. Allow 5-6 feet between table edges for guests to push back chairs and for servers to move freely. Leave wider paths (8-10 feet) along main traffic routes to the dance floor, bar, buffet, and restrooms. A typical ballroom fits about 15-18 standard rounds for a 150-guest reception.</p>
          <p>Our drag-and-drop floor plan editor lets you experiment with spacing and arrangement before committing. Move tables around, see the guest count update in real time, and try different configurations — grid, staggered, curved — until you find the layout that works for your specific venue dimensions.</p>

          <h2>Assigning Guests to Round Tables</h2>
          <p>The beauty of round tables is that every seat has the same view. There's no "bad seat" like at a rectangular table. Group guests by relationship — family at one table, college friends at another, work colleagues at a third. For couples who don't know many other guests, seat them with friendly, outgoing people who will make conversation easy. Always assign specific seats (not just tables) so guests know exactly where to go.</p>

          <p>When your layout is set and every guest is placed, export a printable PDF that shows the full floor plan, table names, and guest assignments. Hand it to your venue coordinator, share it with your caterer for place card setup, or display it at the reception entrance.</p>
        `}
        faqs={[
          {
            question: "How many guests sit at a round table?",
            answer:
              "Standard 60-inch rounds seat 8-10. Smaller 48-inch rounds fit 6; large 72-inch rounds fit up to 12.",
          },
          {
            question: "How do you arrange round tables?",
            answer:
              "Space tables 5-6 feet apart. Use a grid or staggered pattern with clear paths to the dance floor and bar. Our editor lets you try layouts instantly.",
          },
          {
            question: "How many round tables for 100 guests?",
            answer:
              "About 10-13 tables depending on size (8-top vs 10-top). Round up and add one extra for flexibility.",
          },
        ]}
        relatedPages={[
          { href: "/wedding-seating-chart-template", label: "Seating Chart Templates" },
          { href: "/wedding-seating-chart-ideas", label: "Seating Chart Ideas" },
          { href: "/head-table-seating", label: "Head Table Seating" },
          { href: "/wedding-reception-seating", label: "Reception Seating Guide" },
        ]}
      />
    </>
  );
}
