"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type Props = {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
}: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (!ADSENSE_CLIENT || ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* noop */
    }
  }, []);

  if (!ADSENSE_CLIENT || ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX") return null;

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
