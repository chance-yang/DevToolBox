import AdBanner from "@/components/ads/AdBanner";

export default function ToolLayout({
  title,
  description,
  children,
  jsonLd,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  jsonLd?: Record<string, unknown>;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="space-y-4">{children}</div>

      <AdBanner className="w-full" />
    </div>
  );
}
