import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Wedding Seating Chart Ideas - Creative Layouts & Arrangement Tips",
  description:
    "Discover creative wedding seating chart ideas for every venue style. Round tables, long tables, mixed layouts, and expert tips for seating arrangements that keep guests happy.",
  openGraph: {
    title: "Wedding Seating Chart Ideas",
    description:
      "Creative seating chart ideas for every wedding venue style. Tips, layouts, and free tools.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you arrange a wedding seating chart?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by grouping guests into categories: family, college friends, work colleagues, etc. Place the wedding party at or near the head table, seat parents and close family nearby, then fill remaining tables by social group. Keep known conflicts apart and seat singles near people their age.",
      },
    },
    {
      "@type": "Question",
      name: "How many guests fit at a round wedding table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard round tables seat 8 to 10 guests comfortably. Smaller 48-inch rounds fit 6, while large 72-inch rounds can accommodate 12. Your venue coordinator can confirm which sizes are available.",
      },
    },
    {
      "@type": "Question",
      name: "Should the bride and groom sit at a head table or sweetheart table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both are popular choices. A head table seats the wedding party together, while a sweetheart table gives the couple a private moment. Many couples choose a sweetheart table with the wedding party at nearby round tables.",
      },
    },
  ],
};

export default function WeddingSeatingChartIdeasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage
        title="Wedding Seating Chart Ideas"
        subtitle="Creative layouts and practical tips to help you seat every guest perfectly."
        content={`
          <p>The seating chart is one of the most stressful parts of wedding planning — and one of the most impactful. A thoughtful arrangement keeps conversation flowing, avoids awkward silences, and makes your reception feel seamless. Here are proven ideas to help you create a seating plan that works for your venue, your guest list, and your sanity.</p>

          <h2>Classic Round Table Layout</h2>
          <p>The most popular reception layout for a reason. Round tables seat 8-10 guests each, encouraging conversation across the table. Place them in a grid or staggered pattern with clear walking paths. This layout works in ballrooms, barns, and tented receptions alike. Assign tables by social group — college friends at one, cousins at another — and let the natural chemistry do the rest.</p>

          <h2>Long Banquet Style</h2>
          <p>Long tables create a dramatic, communal atmosphere reminiscent of European dinner parties. They work beautifully in narrow venues like wine cellars, lofts, or tented spaces. Guests can talk to the people across from them and beside them, creating a more intimate feel. Mix in a shorter head table at the front for the wedding party to anchor the room.</p>

          <h2>Mixed Table Layout</h2>
          <p>Combine round tables for general guests with a long head table for the wedding party and a sweetheart table for the couple. This hybrid approach gives you the social benefits of rounds with the visual impact of a prominent head table. It also adds visual variety to the room, which photographs beautifully.</p>

          <h2>Practical Seating Tips</h2>
          <p>Start by listing everyone, then group them: immediate family, extended family, college friends, work friends, neighbors, plus-ones. Seat parents and grandparents near the couple. Keep groups of friends together — they'll have more fun. Place kids' tables near their parents but give them their own space. And always have a few open seats for last-minute RSVPs or shuffles.</p>

          <p>Our drag-and-drop seating chart editor lets you try all these layouts before committing. Move tables around, swap guests between seats, and export the final plan as a printable PDF — no erasing, no sticky notes, no starting over.</p>
        `}
        faqs={[
          {
            question: "How do you arrange a wedding seating chart?",
            answer:
              "Group guests by relationship (family, friends, colleagues). Place the wedding party near the front, seat parents close by, then fill tables by social group. Separate known conflicts.",
          },
          {
            question: "How many guests fit at a round table?",
            answer:
              "Standard rounds seat 8-10. Smaller 48-inch rounds fit 6; large 72-inch rounds fit 12. Check with your venue for available sizes.",
          },
          {
            question: "Head table or sweetheart table?",
            answer:
              "Both work well. A head table keeps the wedding party together; a sweetheart table gives the couple privacy. Many couples choose a sweetheart table with the party at nearby rounds.",
          },
        ]}
        relatedPages={[
          { href: "/wedding-seating-chart-template", label: "Seating Chart Templates" },
          { href: "/round-table-seating-chart", label: "Round Table Layouts" },
          { href: "/head-table-seating", label: "Head Table Seating" },
          { href: "/wedding-reception-seating", label: "Reception Seating Guide" },
        ]}
      />
    </>
  );
}
