import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Extract PDF Pages - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Extract PDF Pages",
    "Extract specific pages from PDF documents",
    "pdf"
  );
}
