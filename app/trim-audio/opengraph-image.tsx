import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Audio Trimmer - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Audio Trimmer",
    "Cut and trim audio files online",
    "audio"
  );
}
