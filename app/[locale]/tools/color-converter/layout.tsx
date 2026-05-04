import { toolMeta } from "@/lib/seo";
import { getDictionary, type Locale } from "@/lib/i18n";
import ToolJsonLd from "@/components/seo/ToolJsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.tools["color-converter"];
  return toolMeta(t.page_title, t.seo_desc, `/${locale}/tools/color-converter`);
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ToolJsonLd toolKey="color-converter" locale={locale} />
      {children}
    </>
  );
}
