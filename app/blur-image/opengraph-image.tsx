import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Blur Image - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Blur Image",
    "Apply blur effect to images",
    "image"
  );
}
