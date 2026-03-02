import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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

const faqs = [
    { question: "What Word formats are supported?", answer: "This tool supports both DOC and DOCX files. DOCX (the newer format used by Word 2007 and later) works best and provides the most accurate conversion. Older DOC files are also supported but may have limited formatting preservation." },
    { question: "Will my document formatting be preserved?", answer: "Basic text formatting like bold, italic, paragraphs, and headings will be preserved. However, complex layouts, advanced styles, images, tables, headers, footers, and page numbers may not convert perfectly. This tool is best for simple text documents." },
    { question: "Is my document uploaded to a server?", answer: "No. All conversion happens directly in your browser using client-side JavaScript. Your Word document never leaves your device, ensuring complete privacy and security. No files are uploaded or stored on any server." },
    { question: "Is there a file size limit?", answer: "Since conversion happens in your browser, the main limit is your device&apos;s memory. Most standard Word documents (up to 50-100 pages) will convert without issues. Very large documents with many images may take longer or require more memory." },
    { question: "Can I convert protected or password-locked Word files?", answer: "No. Password-protected or encrypted Word documents cannot be converted. You must first remove the password protection in Microsoft Word or another word processor before converting to PDF." },
    { question: "Does this work on mobile devices?", answer: "Yes. This tool works on all modern browsers including mobile Safari, Chrome, and Firefox. However, converting large documents on mobile devices may be slower due to limited processing power and memory." },
];

export default function WordToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Word to PDF Converter - Free Online DOC to PDF Tool"
        description="Convert Word documents to PDF format instantly. Free online Word to PDF converter supporting DOC and DOCX files. Fast, secure, and works directly in your browser with no uploads."
        slug="word-to-pdf"
        faqs={faqs}
        rating={4.6}
        ratingCount={289234}
      />
      {children}
    </>
  );
}
