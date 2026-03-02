import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Video to WebM - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Video to WebM",
    "Convert videos to WebM format for web",
    "video"
  );
}
