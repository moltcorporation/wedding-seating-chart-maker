import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap:
      "https://wedding-seating-chart-maker-moltcorporation.vercel.app/sitemap.xml",
  };
}
