"use client";

import { useState } from "react";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import CopyButton from "@/components/tools/CopyButton";
import ToolContent from "@/components/tools/ToolContent";

interface RGB {
  r: number;
  g: number;
  b: number;
}
interface HSL {
  h: number;
  s: number;
  l: number;
}

function parseHex(s: string): RGB | null {
  const m = s.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(m)) {
    return {
      r: parseInt(m[0] + m[0], 16),
      g: parseInt(m[1] + m[1], 16),
      b: parseInt(m[2] + m[2], 16),
    };
  }
  if (/^[0-9a-f]{6}$/i.test(m)) {
    return {
      r: parseInt(m.slice(0, 2), 16),
      g: parseInt(m.slice(2, 4), 16),
      b: parseInt(m.slice(4, 6), 16),
    };
  }
  return null;
}

function parseRgb(s: string): RGB | null {
  const m = s.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return null;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if ([r, g, b].some((v) => v < 0 || v > 255)) return null;
  return { r, g, b };
}

function parseHsl(s: string): HSL | null {
  const m = s.match(/hsla?\(\s*(-?\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*%\s*,?\s*(\d+(?:\.\d+)?)\s*%/i);
  if (!m) return null;
  return { h: Number(m[1]), s: Number(m[2]), l: Number(m[3]) };
}

function rgbToHex({ r, g, b }: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) * 60;
    else if (max === g1) h = ((b1 - r1) / d + 2) * 60;
    else h = ((r1 - g1) / d + 4) * 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = ln - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function relativeLuminance({ r, g, b }: RGB) {
  const lin = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(rgb1: RGB, rgb2: RGB) {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

function parseAny(s: string): RGB | null {
  if (s.trim().startsWith("#") || /^[0-9a-f]{3,6}$/i.test(s.trim())) return parseHex(s);
  if (s.toLowerCase().includes("rgb")) return parseRgb(s);
  if (s.toLowerCase().includes("hsl")) {
    const h = parseHsl(s);
    return h ? hslToRgb(h) : null;
  }
  return parseHex(s);
}

export default function ColorConverterPage() {
  const t = useDict().tools["color-converter"];
  const [input, setInput] = useState("#3b82f6");

  const rgb = parseAny(input);
  const hex = rgb ? rgbToHex(rgb) : "";
  const hsl = rgb ? rgbToHsl(rgb) : null;
  const cssHex = hex || "transparent";

  const cWhite = rgb ? contrast(rgb, { r: 255, g: 255, b: 255 }) : 0;
  const cBlack = rgb ? contrast(rgb, { r: 0, g: 0, b: 0 }) : 0;

  function badge(ratio: number, threshold: number) {
    return ratio >= threshold ? (
      <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
        {t.pass}
      </span>
    ) : (
      <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
        {t.fail}
      </span>
    );
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t.input_label}</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.input_placeholder}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      {!rgb ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {t.parse_error}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {t.preview}
            </div>
            <div
              className="aspect-video w-full rounded-lg border border-zinc-200 dark:border-zinc-700"
              style={{ backgroundColor: cssHex }}
            />
          </div>
          <div className="space-y-3 lg:col-span-2">
            <Row label={t.hex} value={hex} />
            <Row label={t.rgb} value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            <Row
              label={t.hsl}
              value={`hsl(${hsl!.h}, ${hsl!.s}%, ${hsl!.l}%)`}
            />
            <div className="space-y-2 pt-2">
              <div className="text-sm font-medium">{t.contrast_title}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <ContrastCell
                  label={t.vs_white}
                  ratio={cWhite}
                  bg="#ffffff"
                  fg={hex}
                  aaBadge={badge(cWhite, 4.5)}
                  aaaBadge={badge(cWhite, 7)}
                  aaLabel={t.aa_normal}
                  aaaLabel={t.aaa_normal}
                />
                <ContrastCell
                  label={t.vs_black}
                  ratio={cBlack}
                  bg="#000000"
                  fg={hex}
                  aaBadge={badge(cBlack, 4.5)}
                  aaaBadge={badge(cBlack, 7)}
                  aaLabel={t.aa_normal}
                  aaaLabel={t.aaa_normal}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <ToolContent toolKey="color-converter" />
    </ToolLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-2.5 dark:border-zinc-700">
      <span className="text-sm text-zinc-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{value}</span>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

function ContrastCell({
  label,
  ratio,
  bg,
  fg,
  aaBadge,
  aaaBadge,
  aaLabel,
  aaaLabel,
}: {
  label: string;
  ratio: number;
  bg: string;
  fg: string;
  aaBadge: React.ReactNode;
  aaaBadge: React.ReactNode;
  aaLabel: string;
  aaaLabel: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700">
      <div
        className="rounded-t-lg px-3 py-3 text-sm font-medium"
        style={{ backgroundColor: bg, color: fg }}
      >
        Aa — {label}
      </div>
      <div className="flex items-center justify-between px-3 py-2 text-xs">
        <span className="font-mono text-sm">{ratio.toFixed(2)}:1</span>
        <div className="flex items-center gap-2">
          <span>
            {aaLabel} {aaBadge}
          </span>
          <span>
            {aaaLabel} {aaaBadge}
          </span>
        </div>
      </div>
    </div>
  );
}
