import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "DevToolBox — Free online developer tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "32px",
            fontWeight: 600,
            color: "#60a5fa",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {"</>"}
          </div>
          DevToolBox
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
            maxWidth: "1000px",
          }}
        >
          Free online developer tools.
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#cbd5e1",
            lineHeight: 1.4,
            maxWidth: "1000px",
          }}
        >
          JSON · Base64 · JWT · Hash · QR · Cron · HTTP — all in your browser, no sign-up.
        </div>
      </div>
    ),
    { ...size },
  );
}
