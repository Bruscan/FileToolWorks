import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Free Online Tools - File Converter, Compressor, Editor",
  description:
    "Browse 40+ free online file tools. Convert, compress, edit, and merge images, PDFs, videos, audio, and documents. No signup required. Works in your browser.",
  alternates: {
    canonical: "https://www.filetoolworks.com/tools",
  },
  openGraph: {
    title: "All Free Online Tools - File Converter, Compressor, Editor",
    description:
      "Browse 40+ free online file tools. Convert, compress, edit, and merge images, PDFs, videos, audio, and documents. No signup required.",
    url: "https://www.filetoolworks.com/tools",
    type: "website",
    siteName: "FileToolWorks",
  },
  twitter: {
    card: "summary_large_image",
    title: "40+ Free Online File Tools - FileToolWorks",
    description:
      "Convert, compress, edit, and merge images, PDFs, videos, audio, and documents. No signup required.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
