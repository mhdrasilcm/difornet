import { ImageResponse } from "next/og";

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
          background: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#34d399",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#34d399",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Based in Palakkad, Kerala
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 960,
          }}
        >
          DiforNet
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            opacity: 0.75,
            fontSize: 32,
            marginTop: 20,
            maxWidth: 900,
          }}
        >
          Web, mobile, Android & embedded software — built by a one-person
          studio.
        </div>
      </div>
    ),
    { ...size }
  );
}
