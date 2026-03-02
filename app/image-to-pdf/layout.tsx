import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image to PDF Converter | Free & Fast (No Signup)",
  description: "Convert JPG, PNG, HEIC to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/image-to-pdf",
  },
  openGraph: {
    title: "Image to PDF Converter | Free & Fast",
    description: "Convert images to PDF instantly. Free, secure, no signup.",
    type: "website",
    images: [{ url: "/api/og?title=Image%20to%20PDF&description=Convert%20JPG%2C%20PNG%2C%20HEIC%20to%20PDF%20instantly&category=image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter",
    description: "Convert JPG, PNG, HEIC to PDF instantly. Free, no signup.",
  },
};

const faqs = [
    { question: "What image formats are supported?", answer: "We support all common image formats including JPG, PNG, HEIC, WebP, GIF, BMP, and TIFF." },
    { question: "Is there a file size limit?", answer: "No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I convert multiple images to one PDF?", answer: "Yes. Upload multiple images and they will all be combined into a single PDF file. Each image becomes one page in the PDF." },
    { question: "What PDF quality can I expect?", answer: "High quality. You can choose between compressed (smaller file size) or original quality. Both options produce professional-looking PDFs suitable for printing and sharing." },
];

export default function ImageToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image to PDF Converter"
        description="Convert JPG, PNG, HEIC to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="image-to-pdf"
        faqs={faqs}
        rating={4.8}
        ratingCount={284592}
      />
      {children}
    </>
  );
}
