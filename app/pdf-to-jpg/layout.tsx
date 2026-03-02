import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PDF to JPG Converter | Free & Fast (No Signup)",
  description: "Convert PDF pages to JPG images instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images. Free online tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images. Free online tool.",
  },
};

const faqs = [
    { question: "What image formats are supported?", answer: "You can convert PDF pages to either JPG (JPEG) or PNG format. JPG is better for photos and offers smaller file sizes, while PNG is better for documents with text and graphics." },
    { question: "Is there a page limit?", answer: "No. You can convert PDFs with any number of pages. Each page will be converted to a separate image file that you can download individually or all at once." },
    { question: "Are my files uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your PDF never leaves your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "What quality settings should I use?", answer: "For most documents, High quality (default) provides a good balance between file size and image quality. Use Max quality for important documents or detailed graphics. Low quality is suitable for quick previews." },
    { question: "Can I convert password-protected PDFs?", answer: "Currently, this tool does not support password-protected PDFs. You will need to remove the password protection before converting." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PDF to JPG Converter"
        description="Convert PDF pages to JPG images instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="pdf-to-jpg"
        faqs={faqs}
        rating={4.7}
        ratingCount={156843}
      />
      {children}
    </>
  );
}
