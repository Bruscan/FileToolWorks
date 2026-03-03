import { Metadata } from "next";

export const metadata: Metadata = {
  title: "40+ Free Online File Tools - No Upload, Browser-Based, Private",
  description:
    "Browse 40+ free online file tools. Convert, compress, edit, and merge images, PDFs, videos, audio, and documents. No upload to servers, no signup, all processing in your browser for complete privacy.",
  alternates: {
    canonical: "https://www.filetoolworks.com/tools",
  },
  openGraph: {
    title: "40+ Free Online File Tools - No Upload, Browser-Based, Private",
    description:
      "Browse 40+ free online file tools. Convert, compress, edit, and merge files. No upload to servers, no signup, all processing in your browser for complete privacy.",
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
