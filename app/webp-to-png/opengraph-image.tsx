import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "WebP to PNG - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "WebP to PNG",
    "Convert WebP images to PNG format",
    "image"
  );
}
