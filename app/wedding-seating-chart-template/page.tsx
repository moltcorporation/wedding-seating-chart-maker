import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Free Wedding Seating Chart Template - Drag & Drop Layout Maker",
  description:
    "Free wedding seating chart templates with round tables, banquet tables, head tables, and more. Drag and drop your layout, assign guests, and download a printable PDF.",
  openGraph: {
    title: "Free Wedding Seating Chart Template",
    description:
      "Drag-and-drop wedding seating chart templates. Assign guests, export printable PDF.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best wedding seating chart template?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best template depends on your venue and guest count. Round table layouts work for most receptions, while banquet-style layouts suit long halls. Our tool lets you mix table types to create the perfect arrangement.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the wedding seating chart template?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every table can be repositioned on the floor plan by dragging. You can add, remove, and resize tables, assign guests to specific seats, and export the final layout as a PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Is the wedding seating chart template free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can create a seating chart with up to 3 tables completely free. Pro unlocks unlimited tables, premium PDF layouts, and saved floor plans.",
      },
    },
  ],
};

export default function WeddingSeatingChartTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage
        title="Wedding Seating Chart Templates"
        subtitle="Start with a professionally designed template and customize every detail for your reception."
        content={`
          <p>Planning your wedding reception seating doesn't have to mean wrestling with spreadsheets or moving sticky notes on a poster board. Our free wedding seating chart templates give you a drag-and-drop floor plan editor with every table type you need — round tables, banquet tables, head tables, sweetheart tables, and kids' tables — all ready to arrange and fill with your guest list.</p>

          <h2>How Our Templates Work</h2>
          <p>Each template starts with an empty floor plan canvas. Add the table types your venue requires, then drag them into position until the layout feels right. The grid snaps help you maintain even spacing, and you can see your entire guest count at a glance — assigned and unassigned — in the sidebar panel.</p>
          <p>Once your tables are placed, add your guest list and drag names from the panel onto specific seats. The visual layout updates in real time, so you can immediately see whether Aunt Margaret is safely two tables away from Uncle Dave. When everything looks perfect, export a clean, print-ready PDF to share with your venue coordinator and caterer.</p>

          <h2>Choosing the Right Template Layout</h2>
          <p>The right seating arrangement depends on your venue shape, guest count, and the atmosphere you want. Round tables create an intimate, social setting where every guest can see everyone else at the table — ideal for receptions of 50 to 200 guests. Banquet-style tables feel more formal and maximize seating in narrow venues. A mix of both often works best: rounds for general guests, a head table for the wedding party, and a sweetheart table for the newlyweds.</p>
          <p>Our editor supports all these combinations. Start with one table type and add others as needed. There's no fixed template to fight against — you build the layout that matches your specific venue and vision.</p>

          <h2>From Template to Printed Chart</h2>
          <p>After assigning all your guests, download the PDF. The exported chart shows table names, guest names at each seat, and an overview of the full floor plan. Print it for your venue's event manager, post it at the reception entrance, or share it digitally with your wedding party so everyone knows where to sit.</p>
        `}
        faqs={[
          {
            question: "What is the best wedding seating chart template?",
            answer:
              "It depends on your venue and guest count. Round tables work for most receptions; banquet layouts suit long halls. Our tool lets you mix table types freely.",
          },
          {
            question: "Can I customize the template?",
            answer:
              "Yes. Reposition tables by dragging, add or remove tables, assign guests to specific seats, and export as PDF.",
          },
          {
            question: "Is it free?",
            answer:
              "Yes. Create a seating chart with up to 3 tables for free. Pro unlocks unlimited tables and premium PDF layouts.",
          },
        ]}
        relatedPages={[
          { href: "/wedding-seating-chart-ideas", label: "Seating Chart Ideas" },
          { href: "/round-table-seating-chart", label: "Round Table Layouts" },
          { href: "/head-table-seating", label: "Head Table Seating" },
          { href: "/wedding-reception-seating", label: "Reception Seating Guide" },
        ]}
      />
    </>
  );
}
