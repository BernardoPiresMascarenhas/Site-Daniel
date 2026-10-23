import type { MetadataRoute } from "next";
import { project } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Demonstração não oficial: bloqueia indexação até autorização.
  if (!project.isOfficial) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${project.siteUrl}/sitemap.xml`,
  };
}
