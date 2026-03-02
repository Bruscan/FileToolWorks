import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "MP3 to WAV - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "MP3 to WAV",
    "Convert MP3 audio to WAV format",
    "audio"
  );
}
