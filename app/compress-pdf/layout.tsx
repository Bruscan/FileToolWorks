import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Compress PDF | Reduce PDF File Size Online (Free)",
  description: "Compress PDF files online for free. Reduce PDF file size by up to 90% while maintaining quality. Fast, secure, and works in your browser.",
  alternates: {
    canonical: "/compress-pdf",
  },
};

const faqs = [
    { question: "How much can I compress a PDF file?", answer: "PDF compression typically reduces file size by 10 to 30 percent depending on the content and compression level. PDFs with many images compress more than text-only documents. Low compression gives maximum size reduction but may reduce quality. Maximum compression preserves quality while still reducing file size by around 10 percent." },
    { question: "Will compressing affect PDF quality?", answer: "It depends on the compression level. Maximum and High compression maintain excellent quality with minimal visible changes. Medium compression offers a good balance. Low compression reduces file size significantly but may introduce visible artifacts in images or reduce text clarity. We recommend starting with High compression and adjusting if needed." },
    { question: "Are my PDF files uploaded to a server?", answer: "No. All compression happens directly in your browser using JavaScript and pdf-lib. Your PDFs never leave your device, ensuring complete privacy and security. Files are processed locally on your computer and deleted when you close the page." },
    { question: "What types of PDFs can I compress?", answer: "You can compress any standard PDF file including documents, forms, ebooks, and presentations. PDFs with many images or high-resolution graphics compress more effectively than text-only documents. Password-protected PDFs cannot be compressed without the password." },
    { question: "Can I compress multiple PDFs at once?", answer: "Yes. Upload as many PDF files as you want and they will all be compressed with the same settings. You can download them individually or all at once using the Download All button. This saves time when processing multiple files." },
    { question: "Which compression level should I choose?", answer: "For most users, High compression (default) offers the best balance of quality and file size reduction. Use Maximum if quality is critical and file size is less important. Use Medium or Low for maximum size reduction when sharing files via email or uploading to websites with file size limits." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Compress PDF"
        description="Compress PDF files online for free. Reduce PDF file size by up to 90% while maintaining quality. Fast, secure, and works in your browser."
        slug="compress-pdf"
        faqs={faqs}
        rating={4.7}
        ratingCount={145892}
      />
      {children}
    </>
  );
}
