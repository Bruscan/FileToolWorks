import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word to PDF Converter - Free Online DOC to PDF Tool | FileToolWorks",
  description:
    "Convert Word documents to PDF format instantly. Free online Word to PDF converter supporting DOC and DOCX files. Fast, secure, and works directly in your browser with no uploads.",
  keywords:
    "word to pdf, doc to pdf, docx to pdf, convert word to pdf, word document to pdf, microsoft word to pdf, online word converter, free word to pdf",
  openGraph: {
    title: "Word to PDF Converter - Free Online Tool",
    description:
      "Convert Word documents to PDF format instantly. Supports DOC and DOCX files. No signup required.",
    type: "website",
    url: "/word-to-pdf",
  },
  alternates: {
    canonical: "/word-to-pdf",
  },
};

export default function WordToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
