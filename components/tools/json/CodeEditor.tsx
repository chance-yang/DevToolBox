"use client";

import { useRef, useCallback } from "react";

export default function CodeEditor({
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: { line: number; message: string } | null;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lineCount = Math.max(value.split("\n").length, 50);
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newVal = value.substring(0, start) + "  " + value.substring(end);
        onChange(newVal);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
    },
    [value, onChange],
  );

  return (
    <div className="relative flex h-full overflow-hidden bg-white dark:bg-zinc-950">
      {/* Line numbers */}
      <div
        ref={gutterRef}
        className="shrink-0 select-none overflow-hidden border-r border-zinc-200 bg-zinc-50 py-2 text-right dark:border-zinc-800 dark:bg-zinc-900"
        style={{ width: 44 }}
      >
        {lines.map((n) => (
          <div
            key={n}
            className={`px-2 font-mono text-xs leading-[1.5rem] ${
              error && error.line === n
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "text-zinc-400"
            }`}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onKeyDown={readOnly ? undefined : handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent px-3 py-2 font-mono text-sm leading-[1.5rem] outline-none placeholder:text-zinc-400"
        style={{ tabSize: 2 }}
      />
    </div>
  );
}
