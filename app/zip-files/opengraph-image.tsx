import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "ZIP Files - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "ZIP Files",
    "Compress files into a ZIP archive",
    "compression"
  );
}
