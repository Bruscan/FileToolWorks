import { ImageResponse } from "next/og";

const categoryColors: Record<string, { bg: string; accent: string }> = {
  image: { bg: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", accent: "#60a5fa" },
  pdf: { bg: "linear-gradient(135deg, #5f1e1e 0%, #dc2626 100%)", accent: "#f87171" },
  video: { bg: "linear-gradient(135deg, #3b1e5f 0%, #7c3aed 100%)", accent: "#a78bfa" },
  audio: { bg: "linear-gradient(135deg, #1e5f3a 0%, #059669 100%)", accent: "#34d399" },
  document: { bg: "linear-gradient(135deg, #1e3a5f 0%, #0369a1 100%)", accent: "#38bdf8" },
  compression: { bg: "linear-gradient(135deg, #3a3a3a 0%, #525252 100%)", accent: "#a3a3a3" },
};

const categoryLabels: Record<string, string> = {
  image: "Image Tool",
  pdf: "PDF Tool",
  video: "Video Tool",
  audio: "Audio Tool",
  document: "Document Tool",
  compression: "File Tool",
};

export function createToolOGImage(
  name: string,
  description: string,
  category: string
) {
  const colors = categoryColors[category] || categoryColors.image;
  const label = categoryLabels[category] || "Online Tool";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: colors.bg,
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              padding: "6px 16px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {label}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "26px",
              opacity: 0.85,
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              F
            </div>
            <div style={{ fontSize: "22px", fontWeight: 600 }}>
              FileToolWorks
            </div>
          </div>
          <div style={{ fontSize: "18px", opacity: 0.7 }}>
            Free - No signup - Works in browser
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
