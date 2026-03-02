import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "HEIC to JPG - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "HEIC to JPG",
    "Convert iPhone photos to JPG format",
    "image"
  );
}
