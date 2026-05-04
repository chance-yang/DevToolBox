"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

type Base = 2 | 8 | 10 | 16 | "auto";

function detectBase(input: string): { base: 2 | 8 | 10 | 16; raw: string; sign: number } | null {
  const s = input.trim();
  if (!s) return null;
  let sign = 1;
  let body = s;
  if (body.startsWith("-")) {
    sign = -1;
    body = body.slice(1);
  }
  if (/^0b[01]+$/i.test(body)) return { base: 2, raw: body.slice(2), sign };
  if (/^0o[0-7]+$/i.test(body)) return { base: 8, raw: body.slice(2), sign };
  if (/^0x[0-9a-f]+$/i.test(body)) return { base: 16, raw: body.slice(2), sign };
  if (/^[0-9]+$/.test(body)) return { base: 10, raw: body, sign };
  return null;
}

function parseInBase(input: string, base: 2 | 8 | 10 | 16): number | null {
  const s = input.trim();
  if (!s) return null;
  let sign = 1;
  let body = s;
  if (body.startsWith("-")) {
    sign = -1;
    body = body.slice(1);
  }
  body = body.replace(/^0b/i, "").replace(/^0o/i, "").replace(/^0x/i, "");
  const n = Number.parseInt(body, base);
  if (Number.isNaN(n)) return null;
  return sign * n;
}

export default function NumberBasePage() {
  const t = useDict().tools["number-base"];
  const [input, setInput] = useState("255");
  const [forced, setForced] = useState<Base>("auto");

  let value: number | null = null;
  let error = "";

  if (input.trim()) {
    if (forced === "auto") {
      const det = detectBase(input);
      if (det) {
        const parsed = parseInBase(input, det.base);
        value = parsed;
      } else {
        error = t.parse_error;
      }
    } else {
      value = parseInBase(input, forced);
      if (value === null) error = t.parse_error;
    }
    if (value !== null && !Number.isSafeInteger(value)) {
      error = t.out_of_range;
      value = null;
    }
  }

  const sign = value !== null && value < 0 ? "-" : "";
  const abs = value === null ? null : Math.abs(value);

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-sm font-medium">{t.input_label}</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.input_placeholder}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">{t.force_base}</label>
          <select
            value={forced}
            onChange={(e) => {
              const v = e.target.value;
              setForced(v === "auto" ? "auto" : (Number(v) as Base));
            }}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="auto">{t.auto_detect}</option>
            <option value="2">{t.binary}</option>
            <option value="8">{t.octal}</option>
            <option value="10">{t.decimal}</option>
            <option value="16">{t.hex}</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {abs !== null && (
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          {[
            [t.binary, sign + abs.toString(2)],
            [t.octal, sign + abs.toString(8)],
            [t.decimal, sign + abs.toString(10)],
            [t.hex, sign + abs.toString(16)],
          ].map(([label, v]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 last:border-b-0 dark:border-zinc-700"
            >
              <span className="w-32 shrink-0 text-xs uppercase tracking-wider text-zinc-500">
                {label}
              </span>
              <span className="flex-1 break-all font-mono text-sm">{v}</span>
              <CopyButton text={v} />
            </div>
          ))}
        </div>
      )}

      <ToolContent toolKey="number-base" />
    </ToolLayout>
  );
}
