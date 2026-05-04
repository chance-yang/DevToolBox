"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

function tokenize(input: string): string[] {
  if (!input) return [];
  // Split on separators or before uppercase boundaries.
  const replaced = input
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  return replaced
    .split(/[\s_\-./]+/)
    .map((w) => w.trim())
    .filter(Boolean);
}

function toCamel(words: string[]): string {
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}
function toPascal(words: string[]): string {
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join("");
}
function toSnake(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join("_");
}
function toKebab(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join("-");
}
function toConstant(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join("_");
}
function toTitle(words: string[]): string {
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}
function toSentence(words: string[]): string {
  if (words.length === 0) return "";
  return (
    words[0][0].toUpperCase() +
    words[0].slice(1).toLowerCase() +
    (words.length > 1 ? " " + words.slice(1).map((w) => w.toLowerCase()).join(" ") : "")
  );
}

export default function CaseConverterPage() {
  const t = useDict().tools["case-converter"];
  const [input, setInput] = useState("Hello world from DevToolBox");

  const words = tokenize(input);
  const rows: { label: string; value: string }[] = [
    { label: t.camel, value: toCamel(words) },
    { label: t.pascal, value: toPascal(words) },
    { label: t.snake, value: toSnake(words) },
    { label: t.kebab, value: toKebab(words) },
    { label: t.constant, value: toConstant(words) },
    { label: t.title, value: toTitle(words) },
    { label: t.sentence, value: toSentence(words) },
    { label: t.lower, value: input.toLowerCase() },
    { label: t.upper, value: input.toUpperCase() },
  ];

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.input_placeholder}
          rows={3}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-2.5 last:border-b-0 dark:border-zinc-700"
          >
            <span className="w-36 shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-500">
              {row.label}
            </span>
            <span className="flex-1 break-all font-mono text-sm">{row.value}</span>
            {row.value && <CopyButton text={row.value} />}
          </div>
        ))}
      </div>

      <ToolContent toolKey="case-converter" />
    </ToolLayout>
  );
}
