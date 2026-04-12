"use client";

import { useState, useEffect } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";

function formatDate(d: Date) {
  return {
    iso: d.toISOString(),
    utc: d.toUTCString(),
    local: d.toLocaleString(),
    unix: Math.floor(d.getTime() / 1000).toString(),
    unixMs: d.getTime().toString(),
  };
}

export default function TimestampPage() {
  const t = useDict().tools.timestamp;
  const [now, setNow] = useState<Date | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof formatDate> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => { setNow(new Date()); const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  function convert() {
    const val = input.trim();
    if (!val) { setError(t.empty_error); setResult(null); return; }
    const num = Number(val);
    if (!isNaN(num)) {
      const ms = val.length <= 10 ? num * 1000 : num;
      const d = new Date(ms);
      if (!isNaN(d.getTime())) { setResult(formatDate(d)); setError(""); return; }
    }
    const d = new Date(val);
    if (!isNaN(d.getTime())) { setResult(formatDate(d)); setError(""); return; }
    setError(t.parse_error); setResult(null);
  }

  function useNow() {
    const d = new Date();
    setInput(Math.floor(d.getTime() / 1000).toString());
    setResult(formatDate(d)); setError("");
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      {now && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="text-xs uppercase tracking-wider text-zinc-400">{t.current_time}</div>
          <div className="mt-1 font-mono text-lg">{Math.floor(now.getTime() / 1000)}</div>
          <div className="mt-0.5 text-sm text-zinc-500">{now.toISOString()}</div>
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && convert()} placeholder={t.input_placeholder} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900" />
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={convert} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t.convert}</button>
        <button onClick={useNow} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.use_now}</button>
        <button onClick={() => { setInput(""); setResult(null); setError(""); }} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.clear}</button>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">{error}</div>}
      {result && (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.results}</label>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
            {([
              [t.unix_s, result.unix],
              [t.unix_ms, result.unixMs],
              [t.iso, result.iso],
              [t.utc, result.utc],
              [t.local, result.local],
            ] as const).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5 last:border-b-0 dark:border-zinc-700">
                <span className="text-sm text-zinc-500">{label}</span>
                <div className="flex items-center gap-2"><span className="font-mono text-sm">{value}</span><CopyButton text={value} /></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <section className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-foreground">{t.faq_title}</h2>
        <p>{t.faq_text}</p>
      </section>
    </ToolLayout>
  );
}
