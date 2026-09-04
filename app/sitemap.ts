import type { MetadataRoute } from "next";
import { getGuideLevels } from "../data/guides";

const siteUrl = "https://mushroom-conflict-guide.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePages = getGuideLevels().map((level) => ({
    url: `${siteUrl}/guides/${level}`,
  }));

  return [{ url: siteUrl }, ...guidePages];
}
