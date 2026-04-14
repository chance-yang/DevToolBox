import { getDictionary, type Locale } from "@/lib/i18n";
import { toolMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.legal.about;
  return toolMeta(t.title, t.intro, `/${locale}/about`);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict.legal.about;

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-2">{t.intro}</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{t.mission_title}</h2>
        <p>{t.mission_body}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{t.features_title}</h2>
        <ul className="list-disc space-y-1 pl-5">
          {t.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{t.contact_title}</h2>
        <p>{t.contact_body}</p>
      </section>
    </article>
  );
}
