"use client";

import { useDict } from "@/lib/DictContext";

type ToolKey = "json-formatter" | "base64" | "url-encoder" | "regex-tester" | "timestamp";

export default function ToolContent({ toolKey }: { toolKey: ToolKey }) {
  const dict = useDict();
  const t = dict.tools[toolKey];
  const labels = dict.tool_content;

  return (
    <div className="space-y-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{t.faq_title}</h2>
        <p>{t.faq_text}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-foreground">{labels.use_cases_title}</h2>
        <ul className="list-disc space-y-1 pl-5">
          {t.use_cases.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

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
