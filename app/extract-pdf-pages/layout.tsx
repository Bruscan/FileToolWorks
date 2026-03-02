import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Extract PDF Pages - Free Online PDF Page Extractor",
  description:
    "Extract specific pages from PDF documents instantly. Select pages with checkboxes or ranges like 1,3,5-7. Free, secure, no signup. Works in your browser.",
  keywords: [
    "extract pdf pages",
    "pdf page extractor",
    "remove pdf pages",
    "select pdf pages",
    "pdf page selector",
    "extract pages from pdf",
    "pdf page tool",
    "free pdf extractor",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/extract-pdf-pages",
  },
  openGraph: {
    title: "Extract PDF Pages - Free Online PDF Page Extractor",
    description:
      "Extract specific pages from PDF documents instantly. Select pages with checkboxes or ranges. Free, secure, no signup.",
    type: "website",
    url: "/extract-pdf-pages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages - Free Online PDF Page Extractor",
    description:
      "Extract specific pages from PDF documents instantly. Select pages with checkboxes or ranges. Free, secure, no signup.",
  },
};

const faqs = [
    { question: "How do I extract specific pages from a PDF?", answer: "Upload your PDF, select the pages you want to keep by clicking their checkboxes, and click Extract Pages. You can select pages individually or use the range input for faster selection (e.g., 1,3,5-7)." },
    { question: "Can I extract non-consecutive pages?", answer: "Yes. You can select any combination of pages. Use the checkboxes to click individual pages or enter ranges separated by commas (e.g., 1,5,10-15,20) to select non-consecutive pages quickly." },
    { question: "Is there a limit on the number of pages I can extract?", answer: "No. You can extract as few as one page or as many pages as you need from your PDF. Since processing happens in your browser, there are no server-side restrictions." },
    { question: "Are my PDF files uploaded to a server?", answer: "No. All page extraction happens directly in your browser using pdf-lib. Your files never leave your device, ensuring complete privacy and security." },
    { question: "Will the extracted pages maintain their original quality?", answer: "Yes. Extraction is a lossless process. The pages in your new PDF will have exactly the same quality, formatting, fonts, and images as the original document." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Extract pages from as many PDFs as you need." },
];

export default function ExtractPDFPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Extract PDF Pages - Free Online PDF Page Extractor"
        description="Extract specific pages from PDF documents instantly. Select pages with checkboxes or ranges like 1,3,5-7. Free, secure, no signup. Works in your browser."
        slug="extract-pdf-pages"
        faqs={faqs}
        rating={4.7}
        ratingCount={178000}
      />
      {children}
    </>
  );
}
