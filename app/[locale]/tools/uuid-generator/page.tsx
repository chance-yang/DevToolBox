"use client";

import { useState, useEffect } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

function makeUuids(n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(crypto.randomUUID());
  return out;
}

export default function UuidGeneratorPage() {
  const t = useDict().tools["uuid-generator"];
  const [count, setCount] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUuids(makeUuids(10));
  }, []);

  const formatted = uuids.map((u) => {
    let v = u;
    if (noHyphens) v = v.replace(/-/g, "");
    if (uppercase) v = v.toUpperCase();
    return v;
  });

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">{t.count_label}</label>
          <input
            type="number"
            min={1}
            max={500}
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(500, Number(e.target.value) || 1)))
            }
            className="w-24 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          {t.uppercase}
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={noHyphens}
            onChange={(e) => setNoHyphens(e.target.checked)}
          />
          {t.no_hyphens}
        </label>
        <button
          onClick={() => setUuids(makeUuids(count))}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t.generate}
        </button>
        <CopyButton text={formatted.join("\n")} />
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        {formatted.map((u, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 font-mono text-sm last:border-b-0 dark:border-zinc-700"
          >
            <span className="break-all">{u}</span>
            <CopyButton text={u} />
          </div>
        ))}
      </div>

      <ToolContent toolKey="uuid-generator" />
    </ToolLayout>
  );
}
