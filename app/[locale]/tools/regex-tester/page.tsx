"use client";

import { useState, useMemo } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolContent from "@/components/tools/ToolContent";

export default function RegexTesterPage() {
  const t = useDict().tools["regex-tester"];
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const result = useMemo(() => {
    if (!pattern) return { matches: [], error: "" };
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups: string[] }[] = [];
      let m: RegExpExecArray | null;
      if (flags.includes("g")) {
        while ((m = re.exec(text)) !== null) { matches.push({ match: m[0], index: m.index, groups: m.slice(1) }); if (m[0].length === 0) re.lastIndex++; }
      } else {
        m = re.exec(text);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
      return { matches, error: "" };
    } catch (e: unknown) { return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" }; }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!pattern || result.error || result.matches.length === 0) return null;
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const parts: { text: string; highlight: boolean }[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        if (m.index > lastIndex) parts.push({ text: text.slice(lastIndex, m.index), highlight: false });
        parts.push({ text: m[0], highlight: true });
        lastIndex = m.index + m[0].length;
        if (m[0].length === 0) { re.lastIndex++; if (re.lastIndex > text.length) break; }
      }
      if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex), highlight: false });
      return parts;
    } catch { return null; }
  }, [pattern, flags, text, result]);

  const flagOptions = ["g", "i", "m", "s", "u"] as const;

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.pattern}</label>
        <div className="flex flex-1 items-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <span className="pl-3 text-sm text-zinc-400">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder={t.pattern_placeholder} className="flex-1 bg-transparent px-1 py-2 text-sm outline-none" />
          <span className="pr-3 text-sm text-zinc-400">/{flags}</span>
        </div>
        <div className="flex gap-3 text-sm">
          {flagOptions.map((f) => (
            <label key={f} className="flex items-center gap-1">
              <input type="checkbox" checked={flags.includes(f)} onChange={(e) => setFlags(e.target.checked ? flags + f : flags.replace(f, ""))} className="accent-blue-600" />{f}
            </label>
          ))}
        </div>
      </div>
      {result.error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">{result.error}</div>}
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.test_string}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.test_placeholder} rows={6} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900" />
      </div>
      {highlighted && highlighted.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.highlighted}</label>
          <pre className="whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed dark:border-zinc-700 dark:bg-zinc-900">
            {highlighted.map((part, i) => part.highlight ? <mark key={i} className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-800">{part.text}</mark> : <span key={i}>{part.text}</span>)}
          </pre>
        </div>
      )}
      {result.matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.matches} ({result.matches.length})</label>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900"><tr><th className="px-3 py-2 font-medium">#</th><th className="px-3 py-2 font-medium">{t.match}</th><th className="px-3 py-2 font-medium">{t.index}</th><th className="px-3 py-2 font-medium">{t.groups}</th></tr></thead>
              <tbody>{result.matches.map((m, i) => (
                <tr key={i} className="border-t border-zinc-200 dark:border-zinc-700"><td className="px-3 py-2 text-zinc-400">{i + 1}</td><td className="px-3 py-2 font-mono">{m.match}</td><td className="px-3 py-2">{m.index}</td><td className="px-3 py-2 font-mono text-zinc-500">{m.groups.length > 0 ? m.groups.join(", ") : "-"}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
      <ToolContent toolKey="regex-tester" />
    </ToolLayout>
  );
}
