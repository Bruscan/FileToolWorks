import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Free Online Tools - File Converter, Compressor, Editor",
  description:
    "Browse 40+ free online file tools. Convert, compress, edit, and merge images, PDFs, videos, audio, and documents. No signup required. Works in your browser.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
