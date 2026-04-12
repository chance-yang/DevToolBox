import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { DictProvider } from "@/lib/DictContext";
import AppShell from "./AppShell";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <DictProvider dict={dict}>
      <AppShell locale={locale}>{children}</AppShell>
    </DictProvider>
  );
}
