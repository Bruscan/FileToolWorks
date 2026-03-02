import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Extract Audio - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Extract Audio",
    "Extract audio from video files as MP3, WAV, or AAC",
    "audio"
  );
}
