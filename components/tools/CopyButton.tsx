"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const dict = useDict();

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      {copied ? dict.common.copied : dict.common.copy}
    </button>
  );
}
