import { getDictionary, type Locale } from "@/lib/i18n";
import { jsonLd } from "@/lib/seo";
import type { Dictionary } from "@/lib/i18n";

type ToolKey = keyof Dictionary["tools"];

export default async function ToolJsonLd({
  toolKey,
  locale,
}: {
  toolKey: ToolKey;
  locale: string;
}) {
  const dict = await getDictionary(locale as Locale);
  const t = dict.tools[toolKey];
  const data = jsonLd(t.page_title, t.seo_desc, `/${locale}/tools/${toolKey}`);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
