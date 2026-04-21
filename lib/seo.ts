import type { Metadata } from "next";
import { locales, defaultLocale } from "@/lib/i18n";

const SITE_NAME = "DevToolBox";
const BASE_URL = "https://zhujiuyin.com";

function buildLanguageAlternates(path: string) {
  const match = path.match(/^\/[^/]+(\/.*)?$/);
  const rest = match?.[1] ?? "";
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}${rest}`;
  }
  languages["x-default"] = `${BASE_URL}/${defaultLocale}${rest}`;
  return languages;
}

export function toolMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} - Free Online Tool | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    keywords: [title.toLowerCase(), "online tool", "free", "developer tool"],
    openGraph: {
      title: fullTitle,
      description,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: buildLanguageAlternates(path),
    },
  };
}

export function homeMeta(description: string, path: string): Metadata {
  return {
    description,
    openGraph: {
      title: SITE_NAME,
      description,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: buildLanguageAlternates(path),
    },
  };
}

export function jsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${BASE_URL}${url}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export { SITE_NAME, BASE_URL };
