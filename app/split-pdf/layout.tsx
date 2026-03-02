import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Split PDF | Free & Fast (No Signup)",
  description: "Split PDF into separate pages or ranges instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/split-pdf",
  },
  openGraph: {
    title: "Split PDF",
    description: "Split PDF into separate pages or ranges. Free online tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF",
    description: "Split PDF into separate pages or ranges. Free online tool.",
  },
};

const faqs = [
    { question: "How do I split a PDF into separate pages?", answer: "Upload your PDF, select Every Page as the split method, and click Split PDF. Each page will be saved as a separate PDF file and downloaded to your device automatically." },
    { question: "Can I extract specific pages from a PDF?", answer: "Yes. Select Extract Pages or Page Ranges and enter the page numbers you want (e.g., 1-3, 5, 7-10). Each range will become a separate PDF file." },
    { question: "Is there a file size limit?", answer: "No. Since all processing happens in your browser, there are no server-side limits. However, very large PDFs may take longer to process depending on your device." },
    { question: "Are my PDF files uploaded to a server?", answer: "No. All splitting happens directly in your browser using pdf-lib. Your files never leave your device, ensuring complete privacy and security." },
    { question: "What is the difference between split methods?", answer: "Every Page creates one PDF per page. Page Ranges lets you split by multiple ranges (e.g., 1-5, 6-10). Extract Pages is similar to ranges but focuses on extracting specific pages you want to keep." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Split as many PDFs as you need." },
];

export default function SplitPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Split PDF"
        description="Split PDF into separate pages or ranges instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="split-pdf"
        faqs={faqs}
        rating={4.7}
        ratingCount={124000}
      />
      {children}
    </>
  );
}
