import { getDictionary, type Locale } from "@/lib/i18n";
import { toolMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.legal.privacy;
  return toolMeta(t.title, t.title, `/${locale}/privacy`);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.legal.privacy;

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t.updated}</p>
      </header>
      <div className="space-y-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {t.sections.map((s) => (
          <section key={s.heading} className="space-y-2">
            <h2 className="text-base font-semibold text-foreground">{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
