import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Image | Crop Photos to Any Size or Ratio Online Free",
  description: "Crop images to preset ratios (1:1, 16:9, 4:3, 3:2) or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, free forever, no signup required.",
  alternates: {
    canonical: "/crop-image",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
