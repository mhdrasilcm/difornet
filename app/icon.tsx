import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          background: "#100904",
          borderRadius: 6,
          padding: 6,
        }}
      >
        <div style={{ width: 4, height: 18, background: "#2f6e49", transform: "skewX(-20deg)" }} />
        <div style={{ width: 4, height: 18, background: "#c98a2c", transform: "skewX(-20deg)" }} />
        <div style={{ width: 4, height: 18, background: "#dc5000", transform: "skewX(-20deg)" }} />
      </div>
    ),
    { ...size }
  );
}