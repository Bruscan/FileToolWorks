import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const categoryColors: Record<string, { bg: string; accent: string }> = {
  audio: { bg: "#1e1b4b", accent: "#818cf8" },
  image: { bg: "#1a1a2e", accent: "#60a5fa" },
  pdf: { bg: "#1c1917", accent: "#f87171" },
  video: { bg: "#0c1222", accent: "#34d399" },
  document: { bg: "#1a1625", accent: "#c084fc" },
  compression: { bg: "#0f172a", accent: "#38bdf8" },
  default: { bg: "#111827", accent: "#6366f1" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Free Online File Tools";
  const description =
    searchParams.get("description") || "Convert, compress, and edit files in your browser";
  const category = searchParams.get("category") || "default";

  const colors = categoryColors[category] || categoryColors.default;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: colors.bg,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                backgroundColor: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              F
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#9ca3af",
                letterSpacing: "-0.02em",
              }}
            >
              FileToolWorks
            </span>
          </div>

          <h1
            style={{
              fontSize: title.length > 30 ? "56px" : "64px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#9ca3af",
              marginTop: "24px",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ color: "#d1d5db", fontSize: "20px" }}>Free</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ color: "#d1d5db", fontSize: "20px" }}>Private</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ color: "#d1d5db", fontSize: "20px" }}>
              Browser-based
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span style={{ color: "#d1d5db", fontSize: "20px" }}>
              No signup
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
