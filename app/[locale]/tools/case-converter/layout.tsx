import { toolMeta } from "@/lib/seo";
import { getDictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.tools["case-converter"];
  return toolMeta(t.page_title, t.seo_desc, `/${locale}/tools/case-converter`);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
