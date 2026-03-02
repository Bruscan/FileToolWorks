import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "PPT to PDF - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "PPT to PDF",
    "Convert PowerPoint presentations to PDF",
    "document"
  );
}
