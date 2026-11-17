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
          background: "#fbf7f0",
          borderRadius: 6,
          padding: 6,
        }}
      >
        <div
          style={{
            width: 4,
            height: 18,
            background: "#1f6e43",
            transform: "skewX(-20deg)",
          }}
        />
        <div
          style={{
            width: 4,
            height: 18,
            background: "#d99b26",
            transform: "skewX(-20deg)",
          }}
        />
        <div
          style={{
            width: 4,
            height: 18,
            background: "#c84b31",
            transform: "skewX(-20deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}