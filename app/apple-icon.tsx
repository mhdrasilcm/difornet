import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#fbf7f0",
        }}
      >
        <div
          style={{
            width: 24,
            height: 100,
            background: "#1f6e43",
            transform: "skewX(-20deg)",
          }}
        />
        <div
          style={{
            width: 24,
            height: 100,
            background: "#d99b26",
            transform: "skewX(-20deg)",
          }}
        />
        <div
          style={{
            width: 24,
            height: 100,
            background: "#c84b31",
            transform: "skewX(-20deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}