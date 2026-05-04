"use client";

import { useState } from "react";
import yaml from "js-yaml";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

type Direction = "json2yaml" | "yaml2json";

export default function JsonYamlPage() {
  const t = useDict().tools["json-yaml"];
  const [direction, setDirection] = useState<Direction>("json2yaml");
  const [source, setSource] = useState(
    '{\n  "name": "DevToolBox",\n  "tools": ["json", "yaml"],\n  "free": true\n}',
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function convert(text: string, dir: Direction, ind: number) {
    if (!text.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      if (dir === "json2yaml") {
        const obj = JSON.parse(text);
        setOutput(yaml.dump(obj, { indent: ind, lineWidth: 120 }));
      } else {
        const obj = yaml.load(text);
        setOutput(JSON.stringify(obj, null, ind));
      }
      setError("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`${dir === "json2yaml" ? t.json_error : t.yaml_error}: ${msg}`);
      setOutput("");
    }
  }

  function handleSourceChange(v: string) {
    setSource(v);
    convert(v, direction, indent);
  }

  function handleDirChange(d: Direction) {
    setDirection(d);
    convert(source, d, indent);
  }

  function handleSwap() {
    if (!output) return;
    setSource(output);
    const newDir: Direction = direction === "json2yaml" ? "yaml2json" : "json2yaml";
    setDirection(newDir);
    convert(output, newDir, indent);
  }

  function handleIndent(v: number) {
    setIndent(v);
    convert(source, direction, v);
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleDirChange("json2yaml")}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${direction === "json2yaml" ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"}`}
        >
          {t.to_yaml}
        </button>
        <button
          onClick={() => handleDirChange("yaml2json")}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${direction === "yaml2json" ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"}`}
        >
          {t.to_json}
        </button>
        <button
          onClick={handleSwap}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          {t.swap}
        </button>
        <button
          onClick={() => {
            setSource("");
            setOutput("");
            setError("");
          }}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          {t.clear}
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span>{t.indent}:</span>
          <select
            value={indent}
            onChange={(e) => handleIndent(Number(e.target.value))}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t.input_label}</label>
          <textarea
            value={source}
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder={
              direction === "json2yaml" ? t.input_placeholder_json : t.input_placeholder_yaml
            }
            rows={14}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t.output_label}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            rows={14}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed outline-none dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <ToolContent toolKey="json-yaml" />
    </ToolLayout>
  );
}
