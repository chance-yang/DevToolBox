"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

export default function UrlEncoderPage() {
  const t = useDict().tools["url-encoder"];
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"component" | "full">("component");

  function encode() { setOutput(mode === "component" ? encodeURIComponent(input) : encodeURI(input)); }
  function decode() {
    try { setOutput(mode === "component" ? decodeURIComponent(input) : decodeURI(input)); }
    catch { setOutput(t.decode_error); }
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-1.5"><input type="radio" name="mode" checked={mode === "component"} onChange={() => setMode("component")} className="accent-blue-600" />encodeURIComponent</label>
        <label className="flex items-center gap-1.5"><input type="radio" name="mode" checked={mode === "full"} onChange={() => setMode("full")} className="accent-blue-600" />encodeURI</label>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.input}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.input_placeholder} rows={8} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t.output}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly rows={8} className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={encode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t.encode}</button>
        <button onClick={decode} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t.decode}</button>
        <button onClick={() => { setInput(output); setOutput(""); }} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.swap}</button>
        <button onClick={() => { setInput(""); setOutput(""); }} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.clear}</button>
      </div>
      <ToolContent toolKey="url-encoder" />
    </ToolLayout>
  );
}
