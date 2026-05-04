"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useDict } from "@/lib/DictContext";
import ToolLayout from "@/components/tools/ToolLayout";
import ToolContent from "@/components/tools/ToolContent";

type ECLevel = "L" | "M" | "Q" | "H";

export default function QrCodePage() {
  const t = useDict().tools["qr-code"];
  const [input, setInput] = useState("https://zhujiuyin.com");
  const [size, setSize] = useState(256);
  const [ec, setEc] = useState<ECLevel>("M");
  const [svg, setSvg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!input) return;
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(canvas, input, {
        errorCorrectionLevel: ec,
        width: size,
        margin: 2,
      }).catch(() => {});
    }
    QRCode.toString(input, {
      errorCorrectionLevel: ec,
      type: "svg",
      margin: 2,
    })
      .then(setSvg)
      .catch(() => setSvg(""));
  }, [input, ec, size]);

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  }

  function downloadSvg() {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolLayout title={t.page_title} description={t.page_desc}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium">{t.size}</label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                <option value={128}>128 px</option>
                <option value={256}>256 px</option>
                <option value={384}>384 px</option>
                <option value={512}>512 px</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium">{t.ec_level}</label>
              <select
                value={ec}
                onChange={(e) => setEc(e.target.value as ECLevel)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              >
                <option value="L">{t.ec_low}</option>
                <option value="M">{t.ec_medium}</option>
                <option value="Q">{t.ec_quartile}</option>
                <option value="H">{t.ec_high}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadPng}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t.download_png}
            </button>
            <button
              onClick={downloadSvg}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              {t.download_svg}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <canvas ref={canvasRef} />
        </div>
      </div>

      <ToolContent toolKey="qr-code" />
    </ToolLayout>
  );
}
