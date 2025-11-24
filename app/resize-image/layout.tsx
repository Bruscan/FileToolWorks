import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer | Resize Photos Online Free (No Signup)",
  description: "Resize images by percentage or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, keeps quality. Free forever, no signup required.",
  alternates: {
    canonical: "/resize-image",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
