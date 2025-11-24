import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF | Reduce PDF File Size Online (Free)",
  description: "Compress PDF files online for free. Reduce PDF file size by up to 90% while maintaining quality. Fast, secure, and works in your browser.",
  alternates: {
    canonical: "/compress-pdf",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
