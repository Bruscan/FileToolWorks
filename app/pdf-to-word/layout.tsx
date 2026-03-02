import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PDF to Word Converter | Free & Fast (No Signup)",
  description: "Convert PDF files to Word DOCX format instantly. Extract text from PDF to editable Word documents. Free forever, no signup required.",
  alternates: {
    canonical: "/pdf-to-word",
  },
  openGraph: {
    title: "PDF to Word Converter | Free & Fast",
    description: "Convert PDF to Word DOCX instantly. Free, secure, no signup.",
    type: "website",
  },
};

const faqs = [
    { question: "What PDF files can I convert?", answer: "This tool works best with PDFs that contain text. Scanned PDFs or image-based PDFs may not convert properly as they require OCR (optical character recognition) which is not included in this tool." },
    { question: "Will formatting be preserved?", answer: "Basic text formatting is preserved, but complex layouts, images, tables, and advanced formatting may not transfer perfectly. This tool focuses on extracting and preserving the text content from your PDF." },
    { question: "Is my PDF uploaded to a server?", answer: "Yes, for better conversion quality, your PDF is temporarily sent to our server for processing. However, your file is never stored and is immediately deleted after conversion. We do not keep any copies of your documents." },
    { question: "Is there a file size limit?", answer: "The maximum file size is 50MB. Files larger than this cannot be processed. Most PDFs are well under this limit, but very large documents with many images may exceed it." },
    { question: "Can I edit the Word file after conversion?", answer: "Yes. The output is a standard DOCX file that can be opened and edited in Microsoft Word, Google Docs, LibreOffice, and other word processors that support the DOCX format." },
    { question: "Does this work on mobile devices?", answer: "Yes. This tool works on all modern browsers including mobile Safari, Chrome, and Firefox. However, processing large PDFs on mobile devices may be slower due to limited memory and processing power." },
];

export default function PDFToWordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PDF to Word Converter"
        description="Convert PDF files to Word DOCX format instantly. Extract text from PDF to editable Word documents. Free forever, no signup required."
        slug="pdf-to-word"
        faqs={faqs}
        rating={4.7}
        ratingCount={187423}
      />
      {children}
    </>
  );
}
