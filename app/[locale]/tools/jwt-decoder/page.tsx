"use client";

import { useState, useMemo, useEffect } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

function base64UrlDecode(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return decodeURIComponent(
    Array.from(atob(s))
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

interface DecodeResult {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decode(token: string): DecodeResult {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("invalid");
  return {
    header: JSON.parse(base64UrlDecode(parts[0])),
    payload: JSON.parse(base64UrlDecode(parts[1])),
    signature: parts[2],
  };
}

const TIME_CLAIMS = ["exp", "iat", "nbf"] as const;

export default function JwtDecoderPage() {
  const t = useDict().tools["jwt-decoder"];
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const result = useMemo<DecodeResult | null>(() => {
    if (!input.trim()) return null;
    try {
      return decode(input);
    } catch {
      return null;
    }
  }, [input]);

  function handleDecode() {
    try {
      decode(input);
      setError("");
    } catch {
      setError(t.decode_error);
    }
  }

  const expClaim = result?.payload?.exp;
  const [now, setNow] = useState(() => 0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  const isExpired =
    typeof expClaim === "number" && now > 0 ? expClaim * 1000 < now : false;

  function formatClaim(value: unknown) {
    if (typeof value === "number") {
      const ms = value > 1e12 ? value : value * 1000;
      return new Date(ms).toLocaleString();
    }
    return String(value);
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          placeholder={t.input_placeholder}
          rows={6}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs leading-relaxed outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDecode}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t.decode}
        </button>
        <button
          onClick={() => {
            setInput("");
            setError("");
          }}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          {t.clear}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Section title={t.header} value={JSON.stringify(result.header, null, 2)} />
          <Section title={t.payload} value={JSON.stringify(result.payload, null, 2)} />
          <Section title={t.signature} value={result.signature} mono />
          {TIME_CLAIMS.some((c) => c in result.payload) && (
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              {TIME_CLAIMS.map((claim) =>
                claim in result.payload ? (
                  <div
                    key={claim}
                    className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5 last:border-b-0 dark:border-zinc-700"
                  >
                    <span className="text-sm text-zinc-500">
                      {claim === "exp" ? t.expires_at : claim === "iat" ? t.issued_at : t.not_before}
                    </span>
                    <span className="font-mono text-sm">
                      {formatClaim(result.payload[claim])}
                    </span>
                  </div>
                ) : null,
              )}
              {isExpired && (
                <div className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
                  {t.expired_warning}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ToolContent toolKey="jwt-decoder" />
    </ToolLayout>
  );
}

function Section({ title, value, mono }: { title: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        {value && <CopyButton text={value} />}
      </div>
      <pre
        className={`overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs leading-relaxed dark:border-zinc-700 dark:bg-zinc-900 ${mono ? "font-mono break-all whitespace-pre-wrap" : ""}`}
      >
        {value}
      </pre>
    </div>
  );
}
