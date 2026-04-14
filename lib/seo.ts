import type { Metadata } from "next";

const SITE_NAME = "DevToolBox";
const BASE_URL = "https://zhujiuyin.com";

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
