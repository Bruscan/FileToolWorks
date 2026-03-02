import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PDF to Text Converter - Extract Text from PDF Files Online Free",
  description:
    "Extract text from PDF files instantly with our free online PDF to text converter. No upload, no signup. Process your PDFs directly in your browser with complete privacy.",
  keywords: [
    "pdf to text",
    "extract text from pdf",
    "pdf text extractor",
    "pdf to txt",
    "convert pdf to text",
    "pdf text converter",
    "free pdf text extraction",
    "online pdf to text",
  ],
  openGraph: {
    title: "PDF to Text Converter - Extract Text from PDF Files",
    description:
      "Extract text from PDF files instantly. Free online tool with no upload required.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Text",
    description: "Extract text from PDF files instantly. Free.",
  },
  alternates: {
    canonical: "/pdf-to-text",
  },
};

const faqs = [
    { question: "Does this tool support OCR for scanned PDFs?", answer: "No. This tool extracts existing text from digital PDFs only. If your PDF is a scanned image or contains no selectable text, the extraction will be empty. For scanned documents, you need an OCR (Optical Character Recognition) tool." },
    { question: "Are my files uploaded to a server?", answer: "No. All text extraction happens directly in your browser using JavaScript. Your PDF never leaves your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Will the formatting be preserved?", answer: "No. This tool extracts plain text only. Fonts, colors, tables, and layout formatting are not preserved. The output is a simple text file with the content from each page." },
    { question: "Can I extract text from password-protected PDFs?", answer: "Currently, this tool does not support password-protected PDFs. You will need to remove the password protection before extracting text." },
    { question: "What format is the output file?", answer: "The extracted text is saved as a plain text file (.txt) that can be opened in any text editor or word processor. Each page is labeled with a page number separator." },
];

export default function PDFToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PDF to Text Converter - Extract Text from PDF Files Online Free"
        description="Extract text from PDF files instantly with our free online PDF to text converter. No upload, no signup. Process your PDFs directly in your browser with complete privacy."
        slug="pdf-to-text"
        faqs={faqs}
        rating={4.6}
        ratingCount={241000}
      />
      {children}
    </>
  );
}
