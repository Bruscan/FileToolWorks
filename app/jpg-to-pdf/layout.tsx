import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "JPG to PDF Converter | Free & Fast (No Signup)",
  description: "Convert JPG and JPEG images to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/jpg-to-pdf",
  },
  openGraph: {
    title: "JPG to PDF Converter | Free & Fast",
    description: "Convert JPG to PDF instantly. Free, secure, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF format. Free, no signup.",
  },
};

const faqs = [
    { question: "Why only JPG files?", answer: "This tool is specifically optimized for JPG and JPEG files, the most common photo format. For other image formats like PNG, HEIC, or WebP, please use our general Image to PDF converter." },
    { question: "Is there a file size limit?", answer: "No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device." },
    { question: "Are my photos uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your photos never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I convert multiple JPGs to one PDF?", answer: "Yes. Upload multiple JPG images and they will all be combined into a single PDF file. Each image becomes one page in the PDF." },
    { question: "What PDF quality can I expect?", answer: "High quality. You can choose between compressed (smaller file size) or original quality. Both options produce professional-looking PDFs suitable for printing and sharing." },
];

export default function JpgToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="JPG to PDF Converter"
        description="Convert JPG and JPEG images to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="jpg-to-pdf"
        faqs={faqs}
        rating={4.7}
        ratingCount={128456}
      />
      {children}
    </>
  );
}
