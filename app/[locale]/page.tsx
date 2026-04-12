import { tools, getToolsByCategory } from "@/lib/tools";
import { getDictionary, type Locale } from "@/lib/i18n";
import ToolCard from "@/components/ui/ToolCard";
import AdBanner from "@/components/ads/AdBanner";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const grouped = getToolsByCategory();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{dict.site.name}</h1>
        <p className="text-zinc-500 dark:text-zinc-400">{dict.site.tagline}</p>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="space-y-3">
          <h2 className="text-lg font-semibold">
            {(dict.categories as Record<string, string>)[category] ?? category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((tool) => {
              const toolKey = tool.path.replace("/tools/", "") as keyof typeof dict.tools;
              const toolDict = dict.tools[toolKey];
              return (
                <ToolCard
                  key={tool.path}
                  tool={tool}
                  locale={locale}
                  name={toolDict?.name}
                  description={toolDict?.description}
                />
              );
            })}
          </div>
        </section>
      ))}

      <AdBanner />

      <section className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
        <h2 className="text-lg font-semibold text-foreground">
          {dict.site.about_title}
        </h2>
        <p>{dict.site.about_p1}</p>
        <p>
          {dict.site.about_p2_prefix} {tools.length} {dict.site.about_p2_suffix}
        </p>
      </section>
    </div>
  );
}
