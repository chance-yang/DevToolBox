"use client";

import AdSlot from "./AdSlot";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const DEFAULT_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_FOOTER;

type Props = {
  slot?: string;
  className?: string;
};

export default function AdBanner({ slot, className = "" }: Props) {
  const slotId = slot ?? DEFAULT_SLOT;
  if (!ADSENSE_CLIENT || ADSENSE_CLIENT === "ca-pub-XXXXXXXXXXXXXXXX" || !slotId) {
    return null;
  }
  return <AdSlot slot={slotId} className={className} style={{ minHeight: 90 }} />;
}
