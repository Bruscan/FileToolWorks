import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sharpen Image | Enhance Image Details Online Free",
  description: "Sharpen and enhance image details with adjustable intensity. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required.",
  alternates: {
    canonical: "/sharpen-image",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
