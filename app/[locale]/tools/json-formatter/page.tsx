"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useDict } from "@/lib/DictContext";
import CopyButton from "@/components/tools/CopyButton";
import CodeEditor from "@/components/tools/json/CodeEditor";
import JsonTreeView from "@/components/tools/json/JsonTreeView";

const SAMPLE = `{
  "name": "DevToolBox",
  "version": 1,
  "description": "Free online developer tools",
  "features": ["json", "base64", "url", "regex", "timestamp"],
  "config": {
    "theme": "auto",
    "language": "en"
  },
  "nested": {
    "level1": {
      "level2": {
        "data": [1, 2, 3],
        "active": true
      }
    }
  }
}`;

type ViewMode = "tree" | "formatted" | "minified";

function parseErrorLocation(err: string): number | null {
  const match = err.match(/position\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

export default function JsonFormatterPage() {
  const t = useDict().tools["json-formatter"];
  const [input, setInput] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("tree");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [escapeUnicode, setEscapeUnicode] = useState(false);

  const [splitPercent, setSplitPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPercent(Math.max(20, Math.min(80, pct)));
    }
    function onMouseUp() {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const parsed = useMemo(() => {
    const src = input.trim();
    if (!src) return { ok: true as const, data: null, formatted: "" };
    try {
      let data = JSON.parse(src);
      if (sortKeys) data = sortObject(data);
      const formatted = escapeUnicode
        ? unicodeEscape(JSON.stringify(data, null, indent))
        : JSON.stringify(data, null, indent);
      return { ok: true as const, data, formatted };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const pos = parseErrorLocation(msg);
      let line: number | null = null;
      if (pos !== null) line = src.substring(0, pos).split("\n").length;
      return { ok: false as const, message: msg, line };
    }
  }, [input, indent, sortKeys, escapeUnicode]);

  const handleFormat = useCallback(() => {
    if (!input.trim()) { setInput(SAMPLE); return; }
    if (parsed.ok && parsed.data !== null) setInput(parsed.formatted);
  }, [input, parsed]);
  const handleMinify = useCallback(() => {
    if (parsed.ok && parsed.data !== null) setInput(JSON.stringify(parsed.data));
  }, [parsed]);
  const handleClear = useCallback(() => setInput(""), []);
  const handleSample = useCallback(() => setInput(SAMPLE), []);
  const handleUnescape = useCallback(() => {
    try { setInput(JSON.stringify(JSON.parse(input), null, indent)); } catch { /* */ }
  }, [input, indent]);

  const copyText = useMemo(() => {
    if (!parsed.ok) return input;
    if (viewMode === "minified" && parsed.data !== null) return JSON.stringify(parsed.data);
    return parsed.formatted || input;
  }, [parsed, viewMode, input]);

  const errorInfo = useMemo(() => {
    if (parsed.ok) return null;
    return { line: parsed.line ?? 0, message: parsed.message };
  }, [parsed]);

  const charCount = input.length;
  const lineCount = input ? input.split("\n").length : 0;

  return (
    <div className="flex h-[calc(100vh-2.5rem)] flex-col overflow-hidden">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-zinc-200 bg-white px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-950">
        <button onClick={handleFormat} className="rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700">{t.format}</button>
        <button onClick={handleMinify} disabled={!parsed.ok || parsed.data === null} className="rounded bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-40">{t.minify}</button>
        <button onClick={handleUnescape} disabled={!parsed.ok || parsed.data === null} className="rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.unescape}</button>
        <button onClick={handleClear} className="rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.clear}</button>
        <button onClick={handleSample} className="rounded border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">{t.sample}</button>
        <CopyButton text={copyText} />
        <div className="mx-2 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
        <label className="flex items-center gap-1 text-xs text-zinc-500">
          <input type="checkbox" checked={escapeUnicode} onChange={(e) => setEscapeUnicode(e.target.checked)} className="accent-blue-600" />
          {t.escape_unicode}
        </label>
        <label className="flex items-center gap-1 text-xs text-zinc-500">
          <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} className="accent-blue-600" />
          {t.sort_keys}
        </label>
        <label className="flex items-center gap-1 text-xs text-zinc-500">
          {t.indent}
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="rounded border border-zinc-200 bg-white px-1 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-800">
            <option value={2}>2</option><option value={4}>4</option><option value={8}>8</option>
          </select>
        </label>
        <div className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
          {input.trim() && (
            <>
              {parsed.ok ? (
                <span className="flex items-center gap-0.5 text-green-600 dark:text-green-400">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {t.valid}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-red-500">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  {t.error}
                </span>
              )}
              <span>{lineCount} {t.lines}</span>
              <span>{charCount.toLocaleString()} {t.chars}</span>
            </>
          )}
        </div>
      </div>

      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        <div className="flex flex-col overflow-hidden" style={{ width: `${splitPercent}%` }}>
          <div className="flex shrink-0 items-center border-b border-zinc-200 bg-zinc-50 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-medium text-zinc-500">{t.editor}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={input} onChange={setInput} placeholder={t.editor_placeholder} error={errorInfo} />
          </div>
        </div>

        <div onMouseDown={onMouseDown} className="shrink-0 cursor-col-resize bg-zinc-200 transition-colors hover:bg-blue-400 active:bg-blue-500 dark:bg-zinc-700 dark:hover:bg-blue-600" style={{ width: 4 }} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-medium text-zinc-500">{t.result}</span>
            <div className="flex rounded border border-zinc-200 text-xs dark:border-zinc-700">
              {([["tree", "Tree"], ["formatted", "Formatted"], ["minified", "Minified"]] as const).map(([mode, label]) => (
                <button key={mode} onClick={() => setViewMode(mode)} className={`px-2 py-0.5 transition-colors first:rounded-l last:rounded-r ${viewMode === mode ? "bg-blue-600 text-white" : "bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-zinc-50 p-3 dark:bg-zinc-900">
            {!input.trim() ? (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">{t.placeholder}</div>
            ) : !parsed.ok ? (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm dark:border-red-800 dark:bg-red-950">
                <div className="font-medium text-red-700 dark:text-red-300">{t.parse_error}</div>
                <div className="mt-1 font-mono text-xs text-red-600 dark:text-red-400">{parsed.message}</div>
                {parsed.line && <div className="mt-1 text-xs text-red-500">{t.near_line} {parsed.line}</div>}
              </div>
            ) : viewMode === "tree" ? (
              <JsonTreeView data={parsed.data} />
            ) : viewMode === "formatted" ? (
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{parsed.formatted}</pre>
            ) : (
              <pre className="whitespace-pre-wrap break-all font-mono text-sm leading-relaxed">{parsed.data !== null ? JSON.stringify(parsed.data) : ""}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function sortObject(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>).sort().reduce((acc, key) => {
      acc[key] = sortObject((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>);
  }
  return obj;
}

function unicodeEscape(str: string): string {
  return str.replace(/[\u007F-\uFFFF]/g, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
}
