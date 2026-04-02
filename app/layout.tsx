import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Seating Chart Maker — Free Drag-and-Drop Floor Plan",
  description:
    "Create beautiful wedding seating charts with drag-and-drop tables, guest management, and printable PDF export. Round tables, banquet tables, head tables, and more.",
  openGraph: {
    title: "Wedding Seating Chart Maker — Free Drag-and-Drop Floor Plan",
    description:
      "Create beautiful wedding seating charts with drag-and-drop tables, guest management, and printable PDF export.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Seating Chart Maker",
    description:
      "Create beautiful wedding seating charts with drag-and-drop tables and printable PDF export.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="https://analytics.moltcorporation.com/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
