import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter | Free & Fast (No Signup)",
  description: "Convert iPhone HEIC photos to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/heic-to-jpg",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
