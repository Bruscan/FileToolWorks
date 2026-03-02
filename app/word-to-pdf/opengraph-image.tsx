import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Word to PDF - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Word to PDF",
    "Convert Word documents to PDF format",
    "document"
  );
}
