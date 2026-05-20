import { ImageResponse } from "next/og";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A2E",
          borderRadius: 4,
          padding: 3,
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontFamily: "Georgia, serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          LYL
        </span>
      </div>
    ),
    { ...size },
  );
}
