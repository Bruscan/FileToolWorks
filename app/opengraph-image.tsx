import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FileToolWorks - Free Online File Conversion Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111827",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              backgroundColor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            F
          </div>
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: 0,
              textAlign: "center",
            }}
          >
            FileToolWorks
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#9ca3af",
              margin: 0,
              textAlign: "center",
            }}
          >
            Free Online File Conversion Tools
          </p>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "16px",
            }}
          >
            <span style={{ color: "#6366f1", fontSize: "22px", fontWeight: 600 }}>
              40+ Tools
            </span>
            <span style={{ color: "#22c55e", fontSize: "22px", fontWeight: 600 }}>
              100% Free
            </span>
            <span style={{ color: "#38bdf8", fontSize: "22px", fontWeight: 600 }}>
              Browser-based
            </span>
            <span style={{ color: "#f59e0b", fontSize: "22px", fontWeight: 600 }}>
              No Signup
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
