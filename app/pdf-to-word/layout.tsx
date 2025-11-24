import type { Metadata } from "next";

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

export default function PDFToWordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
