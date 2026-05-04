"use client";

import { useState, useEffect } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";
import { md5Hex } from "@/lib/md5";

const SHA_ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function computeAll(input: string) {
  const data = new TextEncoder().encode(input);
  const out: Record<string, string> = { MD5: md5Hex(input) };
  for (const algo of SHA_ALGOS) {
    const buf = await crypto.subtle.digest(algo, data);
    out[algo] = bufToHex(buf);
  }
  return out;
}

export default function HashGeneratorPage() {
  const t = useDict().tools["hash-generator"];
  const [input, setInput] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [hashes, setHashes] = useState<Record<string, string>>({
    MD5: "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-384": "",
    "SHA-512": "",
  });

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHashes({ MD5: "", "SHA-1": "", "SHA-256": "", "SHA-384": "", "SHA-512": "" });
      return;
    }
    computeAll(input).then((out) => {
      if (!cancelled) setHashes(out);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.input_placeholder}
          rows={5}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          {t.uppercase}
        </label>
        <button
          onClick={() => setInput("")}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          {t.clear}
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        {(["MD5", ...SHA_ALGOS] as const).map((algo) => {
          const value = uppercase ? hashes[algo].toUpperCase() : hashes[algo];
          return (
            <div
              key={algo}
              className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 last:border-b-0 dark:border-zinc-700"
            >
              <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-500">
                {algo}
              </span>
              <span className="flex-1 break-all font-mono text-xs">{value || "—"}</span>
              {value && <CopyButton text={value} />}
            </div>
          );
        })}
      </div>

      <ToolContent toolKey="hash-generator" />
    </ToolLayout>
  );
}
