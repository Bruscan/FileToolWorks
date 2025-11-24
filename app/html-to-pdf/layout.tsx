import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML to PDF Converter - Free Online Tool",
  description:
    "Convert HTML and web pages to PDF online. Free, fast, and secure HTML to PDF converter. Upload HTML files or paste code directly. No signup required.",
  keywords: [
    "html to pdf",
    "html converter",
    "web page to pdf",
    "convert html",
    "html to pdf converter",
    "online html converter",
    "free html to pdf",
  ],
  openGraph: {
    title: "HTML to PDF Converter - Free Online Tool",
    description:
      "Convert HTML and web pages to PDF online. Free, fast, and secure HTML to PDF converter.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to PDF Converter - Free Online Tool",
    description:
      "Convert HTML and web pages to PDF online. Free, fast, and secure HTML to PDF converter.",
  },
  alternates: {
    canonical: "/html-to-pdf",
  },
};

export default function HtmlToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
