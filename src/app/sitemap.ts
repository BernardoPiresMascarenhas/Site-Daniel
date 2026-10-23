import type { MetadataRoute } from "next";
import { project } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: project.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${project.siteUrl}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
