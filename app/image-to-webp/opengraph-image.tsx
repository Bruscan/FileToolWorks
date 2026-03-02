import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Image to WebP - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Image to WebP",
    "Convert images to WebP format",
    "image"
  );
}
