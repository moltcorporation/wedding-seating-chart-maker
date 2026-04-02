import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Wedding Reception Seating Chart - Free Floor Plan & Guest Layout",
  description:
    "Plan your entire wedding reception seating layout with our free tool. Arrange tables, assign 50-300+ guests, and download a printable PDF floor plan for your venue.",
  openGraph: {
    title: "Wedding Reception Seating Chart",
    description:
      "Plan your reception seating layout. Drag-and-drop tables, assign guests, export printable PDF.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When should I start my wedding reception seating chart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start planning your general layout 6-8 weeks before the wedding, after most RSVPs are in. Finalize specific seat assignments 1-2 weeks before the event, leaving room for last-minute changes.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need assigned seating at my wedding reception?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assigned seating is strongly recommended for sit-down dinners. It prevents the awkwardness of guests searching for seats, ensures tables fill evenly for catering, and helps you manage social dynamics. Even casual receptions benefit from at least assigned tables (if not specific seats).",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle plus-ones and late RSVPs in my seating chart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keep 1-2 extra seats per table or one reserve table for flexibility. Our tool lets you add guests right up to the event and reassign seats instantly. Update and reprint your PDF as changes come in.",
      },
    },
  ],
};

export default function WeddingReceptionSeatingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage
        title="Wedding Reception Seating Chart"
        subtitle="Plan your complete reception layout — from the first table placement to the final guest assignment."
        content={`
          <p>Your wedding reception seating chart does more than tell guests where to sit. It controls the flow of your event, shapes conversations, prevents social disasters, and directly affects how smoothly catering and service run. A well-planned seating chart is invisible — guests simply enjoy themselves. A poorly planned one creates confusion, empty tables, and awkward groupings that guests remember for years.</p>

          <h2>Start with Your Venue Floor Plan</h2>
          <p>Before assigning a single guest, map out your physical space. Identify where the head table or sweetheart table will go, where the dance floor sits, and where the bar, DJ booth, and restrooms are located. Leave clear traffic lanes — guests need to move between tables without squeezing. Our editor gives you an open canvas to place tables exactly where your venue allows.</p>

          <h2>Build Your Table Layout</h2>
          <p>Most receptions use a mix of table types. Round tables (seating 8-10) form the bulk of the layout, a head table or sweetheart table anchors the wedding party, and a kids' table keeps younger guests engaged with their peers. Count your confirmed RSVPs, divide by seats per table, add one or two extra tables for flexibility, and start placing them on your floor plan.</p>

          <h2>Assign Guests Strategically</h2>
          <p>Group guests by relationship and social comfort. Family tables near the front, friend groups together, and work colleagues who know each other at the same table. Seat couples together (obviously) and give single guests a table with others their age. Place elderly guests away from speakers and near accessible exits. If two guests don't get along, physical distance is your friend — put them on opposite sides of the room.</p>

          <h2>The Final Details</h2>
          <p>Finalize your chart 1-2 weeks before the wedding. Print one copy for the venue coordinator, one for the caterer (they need to know table counts and any dietary notes), and a display copy for the reception entrance. Our PDF export includes the full floor plan overview and a per-table guest list — everything your vendors need in one document.</p>

          <p>Changes are inevitable. Last-minute RSVPs, no-shows, and family drama will all happen. The advantage of a digital seating chart is that you can update and reprint in minutes, not hours. Keep the editor open on your phone during the final week and adjust as needed.</p>
        `}
        faqs={[
          {
            question: "When should I start my seating chart?",
            answer:
              "Start the general layout 6-8 weeks before the wedding after most RSVPs are in. Finalize seats 1-2 weeks before, leaving room for changes.",
          },
          {
            question: "Do I need assigned seating?",
            answer:
              "Strongly recommended for sit-down dinners. It prevents awkward seat-hunting, ensures even table fill for catering, and lets you manage social dynamics.",
          },
          {
            question: "How do I handle last-minute changes?",
            answer:
              "Keep 1-2 extra seats per table. Our tool lets you add guests and reassign seats instantly, then reprint the updated PDF.",
          },
        ]}
        relatedPages={[
          { href: "/wedding-seating-chart-template", label: "Seating Chart Templates" },
          { href: "/wedding-seating-chart-ideas", label: "Seating Chart Ideas" },
          { href: "/round-table-seating-chart", label: "Round Table Layouts" },
          { href: "/head-table-seating", label: "Head Table Seating" },
        ]}
      />
    </>
  );
}
