import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Remove Background - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Remove Background",
    "Remove image background automatically with AI",
    "image"
  );
}
