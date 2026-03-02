import { createToolOGImage } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Crop Image - Free Online Tool | FileToolWorks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return createToolOGImage(
    "Crop Image",
    "Crop images to preset ratios or custom dimensions",
    "image"
  );
}
