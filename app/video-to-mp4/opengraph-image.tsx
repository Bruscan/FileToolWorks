import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Video to MP4 - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Video to MP4",
    "Convert any video format to MP4",
    "video"
  );
}
