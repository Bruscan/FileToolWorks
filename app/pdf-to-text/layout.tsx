import { Metadata } from "next";

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
  alternates: {
    canonical: "/pdf-to-text",
  },
};

export default function PDFToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
