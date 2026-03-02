import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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
    canonical: "https://www.filetoolworks.com/html-to-pdf",
  },
};

const faqs = [
    { question: "What HTML features are supported?", answer: "Most standard HTML and CSS features are supported, including text, images, colors, backgrounds, and basic layouts. Complex JavaScript animations or interactive elements may not render correctly in the PDF." },
    { question: "Can I convert web pages from URLs?", answer: "Currently, this tool only supports HTML files or code input. To convert a web page, save it as an HTML file first (File &gt; Save As in your browser), then upload it here." },
    { question: "Are external images and stylesheets supported?", answer: "External resources (images, CSS files) should work if they are publicly accessible. For best results, use inline styles and embedded images (data URLs) or ensure external resources have CORS enabled." },
    { question: "Is my HTML code uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your HTML code never leaves your device, ensuring complete privacy and security." },
    { question: "What if my HTML is too long for one page?", answer: "The tool automatically splits content across multiple PDF pages when needed. Long HTML documents will be divided into multiple pages to fit the selected page size." },
    { question: "Does this tool cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
];

export default function HtmlToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="HTML to PDF Converter - Free Online Tool"
        description="Convert HTML and web pages to PDF online. Free, fast, and secure HTML to PDF converter. Upload HTML files or paste code directly. No signup required."
        slug="html-to-pdf"
        faqs={faqs}
        rating={4.5}
        ratingCount={167234}
      />
      {children}
    </>
  );
}
