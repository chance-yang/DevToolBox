"use client";

const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX";

/**
 * Ad banner — only renders when a real AdSense ID is configured.
 * Replace the ADSENSE_ID above with your real publisher ID after approval.
 */
export default function AdBanner({ className = "" }: { className?: string }) {
  if (ADSENSE_ID === "ca-pub-XXXXXXXXXXXXXXXX") return null;

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
      style={{ minHeight: 90 }}
    >
      {/* Replace with real ad unit code after AdSense approval */}
      Ad Space
    </div>
  );
}
