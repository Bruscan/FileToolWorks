import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor | Reduce File Size Without Losing Quality (Free)",
  description: "Compress JPG, PNG, and WebP images instantly. Reduce file size by up to 90% while maintaining quality. Free forever, no signup required.",
  alternates: {
    canonical: "/compress-image",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
