import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebP to PNG Converter | Free & Fast (No Signup)",
  description: "Convert WebP images to PNG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/webp-to-png",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
