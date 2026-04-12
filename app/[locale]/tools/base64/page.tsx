"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";

export default function Base64Page() {
  const t = useDict().tools.base64;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function encode() {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))); setError(""); }
    catch { setError(t.encode_error); setOutput(""); }
  }
  function decode() {
    try { setOutput(decodeURIComponent(escape(atob(input.trim())))); setError(""); }
    catch { setError(t.decode_error); setOutput(""); }
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.input}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.input_placeholder} rows={10} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t.output}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly rows={10} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">{error}</div>}
      <div className="flex flex-wrap gap-2">
        <button onClick={encode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t.encode}</button>
        <button onClick={decode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t.decode}</button>
        <button onClick={() => { setInput(output); setOutput(""); }} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.swap}</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.clear}</button>
      </div>
      <section className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
        <h2 className="text-base font-semibold text-foreground">{t.faq_title}</h2>
        <p>{t.faq_text}</p>
      </section>
    </ToolLayout>
  );
}
