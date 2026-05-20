import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          borderRadius: 36,
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "Georgia, serif",
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: 5,
              lineHeight: 1,
            }}
          >
            LYL
          </span>
          <span
            style={{
              width: 102,
              height: 3,
              backgroundColor: "#C9A96E",
              borderRadius: 999,
            }}
          />
          <span
            style={{
              color: "#F8F6F1",
              fontFamily: "Arial, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 3,
              lineHeight: 1,
            }}
          >
            REALTY
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
