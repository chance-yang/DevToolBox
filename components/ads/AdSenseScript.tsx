import Script from "next/script";

/**
 * Replace ca-pub-XXXXXXXXXXXXXXXX with your real AdSense publisher ID
 * after your AdSense account is approved.
 */
const ADSENSE_ID = "ca-pub-XXXXXXXXXXXXXXXX";

export default function AdSenseScript() {
  if (ADSENSE_ID === "ca-pub-XXXXXXXXXXXXXXXX") return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
