import type { Metadata } from "next";

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
    canonical: "/extract-pdf-pages",
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

export default function ExtractPDFPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
