"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolContent from "@/components/tools/ToolContent";
import { parseCron, nextRuns, explain } from "@/lib/cron";

export default function CronParserPage() {
  const t = useDict().tools["cron-parser"];
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale === "zh" ? "zh" : "en") as "en" | "zh";
  const [input, setInput] = useState("*/15 * * * *");

  const result = useMemo(() => {
    try {
      const fields = parseCron(input);
      return {
        ok: true as const,
        explanation: explain(input, locale),
        runs: nextRuns(fields, new Date(), 5),
        parts: input.trim().split(/\s+/),
      };
    } catch {
      return { ok: false as const };
    }
  }, [input, locale]);

  const fieldLabels = [t.minute, t.hour, t.day_of_month, t.month, t.day_of_week];

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.input_placeholder}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {!result.ok ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {t.parse_error}
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
            {result.explanation}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{t.fields_title}</div>
            <div className="grid grid-cols-5 gap-2">
              {result.parts.map((p, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 p-3 text-center dark:border-zinc-700">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">
                    {fieldLabels[i]}
                  </div>
                  <div className="mt-1 font-mono text-sm">{p}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{t.next_runs}</div>
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              {result.runs.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 text-sm last:border-b-0 dark:border-zinc-700"
                >
                  <span className="text-zinc-500">#{i + 1}</span>
                  <span className="font-mono">{d.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <ToolContent toolKey="cron-parser" />
    </ToolLayout>
  );
}
