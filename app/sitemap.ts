import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { locales, defaultLocale } from "@/lib/i18n";
import { BASE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-04-21");

function languagesFor(rest: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}${rest}`;
  }
  languages["x-default"] = `${BASE_URL}/${defaultLocale}${rest}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: languagesFor("") },
    });

    for (const tool of tools) {
      entries.push({
        url: `${BASE_URL}/${locale}${tool.path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: languagesFor(tool.path) },
      });
    }
  }

  return entries;
}
