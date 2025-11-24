import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to JPG Converter | Free & Fast (No Signup)",
  description: "Convert PDF pages to JPG images instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/pdf-to-jpg",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
