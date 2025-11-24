import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to WebP Converter | Free & Fast (No Signup)",
  description: "Convert any image to WebP format instantly. Modern compression, smaller files. Works online, supports mobile. Free forever, no signup required.",
  alternates: {
    canonical: "/image-to-webp",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
