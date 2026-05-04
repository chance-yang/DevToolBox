"use client";

import { useDict } from "@/lib/DictContext";

type ToolKey =
  | "json-formatter"
  | "base64"
  | "url-encoder"
  | "regex-tester"
  | "timestamp"
  | "jwt-decoder"
  | "uuid-generator"
  | "hash-generator"
  | "color-converter"
  | "number-base"
  | "case-converter"
  | "json-yaml"
  | "cron-parser"
  | "http-status"
  | "qr-code";

interface ToolContentDict {
  faq_title: string;
  faq_text: string | string[];
  use_cases: string[];
  faq_list: { q: string; a: string }[];
  reference_table?: { rows: { key: string; value: string }[]; key_label: string; value_label: string };
  code_examples?: { lang: string; code: string }[];
  best_practices?: string[];
}

export default function ToolContent({ toolKey }: { toolKey: ToolKey }) {
  const dict = useDict();
  const t = dict.tools[toolKey] as unknown as ToolContentDict;
  const labels = dict.tool_content;

  const faqParagraphs = Array.isArray(t.faq_text) ? t.faq_text : [t.faq_text];

  return (
    <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{t.faq_title}</h2>
        {faqParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{labels.use_cases_title}</h2>
        <ul className="list-disc space-y-1 pl-5">
          {t.use_cases.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {t.best_practices && t.best_practices.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">{labels.best_practices_title}</h2>
          <ul className="list-disc space-y-1 pl-5">
            {t.best_practices.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {t.code_examples && t.code_examples.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">{labels.code_examples_title}</h2>
          <div className="space-y-3">
            {t.code_examples.map((ex, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {ex.lang}
                </div>
                <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-900">
                  <code>{ex.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {t.reference_table && t.reference_table.rows.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">{labels.reference_title}</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-3 py-2 font-medium text-foreground">{t.reference_table.key_label}</th>
                  <th className="px-3 py-2 font-medium text-foreground">{t.reference_table.value_label}</th>
                </tr>
              </thead>
              <tbody>
                {t.reference_table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-3 py-2 font-mono text-xs">{row.key}</td>
                    <td className="px-3 py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">{labels.faq_title}</h2>
        <div className="space-y-3">
          {t.faq_list.map((item) => (
            <div key={item.q} className="space-y-1">
              <div className="font-medium text-foreground">{item.q}</div>
              <div>{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
