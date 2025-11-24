import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate Image | Flip & Rotate Photos Online Free",
  description: "Rotate images 90°, 180°, 270° and flip horizontally or vertically. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required.",
  alternates: {
    canonical: "/rotate-image",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
