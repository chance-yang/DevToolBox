"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolContent from "@/components/tools/ToolContent";
import { HTTP_STATUS_CODES, categoryOf } from "@/lib/http-status";

const CATEGORIES = ["1xx", "2xx", "3xx", "4xx", "5xx"] as const;

export default function HttpStatusPage() {
  const t = useDict().tools["http-status"];
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale === "zh" ? "zh" : "en") as "en" | "zh";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HTTP_STATUS_CODES;
    return HTTP_STATUS_CODES.filter((c) => {
      if (String(c.code).startsWith(q)) return true;
      if (q.endsWith("xx") && categoryOf(c.code) === q) return true;
      if (c.name.en.toLowerCase().includes(q)) return true;
      if (c.name.zh.includes(query.trim())) return true;
      if (c.description.en.toLowerCase().includes(q)) return true;
      if (c.description.zh.includes(query.trim())) return true;
      return false;
    });
  }, [query]);

  const grouped = useMemo(() => {
    const out: Record<string, typeof HTTP_STATUS_CODES> = {};
    for (const cat of CATEGORIES) out[cat] = [];
    for (const c of filtered) out[categoryOf(c.code)].push(c);
    return out;
  }, [filtered]);

  const categoryLabel: Record<(typeof CATEGORIES)[number], string> = {
    "1xx": t.category_1xx,
    "2xx": t.category_2xx,
    "3xx": t.category_3xx,
    "4xx": t.category_4xx,
    "5xx": t.category_5xx,
  };

  const categoryColor: Record<(typeof CATEGORIES)[number], string> = {
    "1xx": "text-zinc-500",
    "2xx": "text-green-600 dark:text-green-400",
    "3xx": "text-blue-600 dark:text-blue-400",
    "4xx": "text-amber-600 dark:text-amber-400",
    "5xx": "text-red-600 dark:text-red-400",
  };

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.search_label}</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search_placeholder}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          {t.no_results}
        </div>
      ) : (
        CATEGORIES.map((cat) =>
          grouped[cat].length > 0 ? (
            <section key={cat} className="space-y-2">
              <h2 className={`text-sm font-semibold ${categoryColor[cat]}`}>
                {categoryLabel[cat]}
              </h2>
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                {grouped[cat].map((c) => (
                  <div
                    key={c.code}
                    className="border-b border-zinc-200 px-4 py-3 last:border-b-0 dark:border-zinc-700"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-base font-semibold ${categoryColor[cat]}`}>
                        {c.code}
                      </span>
                      <span className="text-sm font-medium">{c.name[locale]}</span>
                    </div>
                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {c.description[locale]}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null,
        )
      )}

      <ToolContent toolKey="http-status" />
    </ToolLayout>
  );
}
