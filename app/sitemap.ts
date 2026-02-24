import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://forcecalendar.org";
  const lastUpdated = "2026-02-24";

  return [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/core`,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/interface`,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
