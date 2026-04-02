import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Head Table Seating Chart - Wedding Party Layout & Arrangement",
  description:
    "Plan your wedding head table seating arrangement. Traditional vs modern layouts, who sits where, plus a sweetheart table alternative. Free drag-and-drop tool.",
  openGraph: {
    title: "Head Table Seating Chart for Weddings",
    description:
      "Plan your head table arrangement. Traditional and modern layouts with free drag-and-drop tool.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who sits at the head table at a wedding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditionally: the couple in the center, maid of honor and best man on either side, then alternating bridesmaids and groomsmen. Modern variations include spouses and partners of the wedding party, or just the couple at a sweetheart table.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a head table and a sweetheart table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A head table seats the entire wedding party (typically 6-12 people) at a long, single-sided table facing guests. A sweetheart table seats only the couple (2 people) at a small table, with the wedding party at nearby round tables.",
      },
    },
    {
      "@type": "Question",
      name: "Which side does the bride sit on at the head table?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditionally, the bride sits to the groom's left. Her attendants sit to her left, and his attendants sit to his right. However, many couples today choose whatever arrangement feels most natural to them.",
      },
    },
  ],
};

export default function HeadTableSeatingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage
        title="Head Table Seating Chart"
        subtitle="Plan the perfect head table arrangement for your wedding party — traditional, modern, or sweetheart style."
        content={`
          <p>The head table is the centerpiece of your reception — literally and figuratively. It's where the wedding party sits, where toasts are given, and where every photographer's lens points during dinner. Getting the seating right sets the tone for the entire evening. Here's how to plan yours.</p>

          <h2>Traditional Head Table Layout</h2>
          <p>The classic arrangement seats the wedding party at a long table facing the guests, with seating on one side only. The couple sits in the center, with the maid of honor next to the groom and the best man next to the bride. Bridesmaids and groomsmen alternate on either side. This layout typically seats 6-12 people depending on your party size.</p>
          <p>The advantage of a traditional head table is its visual impact — it creates a clear focal point in the room and gives the wedding party an unobstructed view of the dance floor and all the guests. The downside is that it can feel a bit formal, and partners of the wedding party members are seated elsewhere.</p>

          <h2>Modern Head Table Variations</h2>
          <p>Many couples today modify the traditional arrangement. A popular option is including the spouses and partners of wedding party members at the head table, creating a longer but more inclusive setup. Another approach is a U-shaped or L-shaped head table that wraps around the couple, giving a more intimate feel while keeping the party close.</p>
          <p>Some couples skip the head table entirely in favor of a sweetheart table — a small table for just the two of them. The wedding party sits at the nearest round tables with their partners, keeping everyone close while giving the couple their own spotlight. This is especially popular for larger wedding parties where a single head table would be impractically long.</p>

          <h2>Placement in the Room</h2>
          <p>Position your head table where it's visible to the most guests — typically centered against a wall or near the dance floor. Elevating it on a riser adds visibility in larger venues. Make sure there's room behind it for the wedding party to access their seats without squeezing past the entire room.</p>
          <p>Our seating chart editor includes dedicated head table and sweetheart table options. Place them on your floor plan, add the wedding party and key family members, then arrange the remaining round tables around them. Export the full layout as a PDF for your venue coordinator.</p>
        `}
        faqs={[
          {
            question: "Who sits at the head table?",
            answer:
              "Traditionally: couple in the center, maid of honor and best man beside them, then alternating attendants. Modern setups include partners or use a sweetheart table instead.",
          },
          {
            question: "Head table vs sweetheart table?",
            answer:
              "Head tables seat the full wedding party (6-12 people). Sweetheart tables seat just the couple, with the party at nearby rounds. Choose based on party size and vibe.",
          },
          {
            question: "Which side does the bride sit on?",
            answer:
              "Traditionally the bride sits to the groom's left, but many couples today choose whatever feels natural.",
          },
        ]}
        relatedPages={[
          { href: "/wedding-seating-chart-template", label: "Seating Chart Templates" },
          { href: "/wedding-seating-chart-ideas", label: "Seating Chart Ideas" },
          { href: "/round-table-seating-chart", label: "Round Table Layouts" },
          { href: "/wedding-reception-seating", label: "Reception Seating Guide" },
        ]}
      />
    </>
  );
}
