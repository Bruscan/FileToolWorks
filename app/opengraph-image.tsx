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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #3b82f6 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              fontSize: "36px",
            }}
          >
            F
          </div>
          <div style={{ fontSize: "28px", fontWeight: 600, opacity: 0.9 }}>
            FileToolWorks
          </div>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Free Online File Tools
        </div>
        <div
          style={{
            fontSize: "26px",
            opacity: 0.85,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Convert, compress, and edit files directly in your browser. No upload, no signup.
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["Image", "PDF", "Video", "Audio"].map((cat) => (
            <div
              key={cat}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
