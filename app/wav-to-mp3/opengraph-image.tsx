import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "WAV to MP3 - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "WAV to MP3",
    "Convert WAV audio to MP3 format",
    "audio"
  );
}
