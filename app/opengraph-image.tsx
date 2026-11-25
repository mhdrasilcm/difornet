import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#100904",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 14, height: 48, background: "#2f6e49", transform: "skewX(-20deg)" }} />
          <div style={{ width: 14, height: 48, background: "#c98a2c", transform: "skewX(-20deg)" }} />
          <div style={{ width: 14, height: 48, background: "#dc5000", transform: "skewX(-20deg)" }} />
          <span style={{ color: "#dc5000", fontSize: 22, letterSpacing: 4, marginLeft: 12 }}>
            PALAKKAD, KERALA
          </span>
        </div>
        <div style={{ color: "#ffedd7", fontSize: 78, fontWeight: 500, lineHeight: 0.95 }}>
          DIFORNET
        </div>
        <div style={{ color: "#ffedd7", opacity: 0.78, fontSize: 30, marginTop: 22, maxWidth: 880 }}>
          Web, mobile &amp; cloud software — crafted directly by an independent studio.
        </div>
      </div>
    ),
    { ...size }
  );
}