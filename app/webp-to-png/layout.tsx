import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "WebP to PNG Converter | Free & Fast (No Signup)",
  description: "Convert WebP images to PNG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/webp-to-png",
  },
  openGraph: {
    title: "WebP to PNG Converter",
    description: "Convert WebP images to PNG format. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to PNG Converter",
    description: "Convert WebP images to PNG format. Free, no signup.",
  },
};

const faqs = [
    { question: "What is WebP format?", answer: "WebP is a modern image format developed by Google that provides superior compression for images on the web. While it offers smaller file sizes, not all software and devices support WebP yet." },
    { question: "Why convert WebP to PNG?", answer: "PNG is universally supported and provides lossless quality, making it perfect for images with transparency or when you need the highest quality. Converting WebP to PNG ensures compatibility everywhere while preserving all image details." },
    { question: "Will the image quality be affected?", answer: "No. PNG is a lossless format, meaning the converted image will maintain perfect quality without any compression artifacts. The only change is the file format itself." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Can PNG files be larger than WebP?", answer: "Yes. Since PNG is lossless and WebP uses advanced compression, PNG files are often larger. However, PNG offers maximum quality and universal compatibility." },
    { question: "Is there a file size limit?", answer: "No. Since conversion happens in your browser, there are no server-imposed file size limits. The only limit is your device memory and browser capability." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="WebP to PNG Converter"
        description="Convert WebP images to PNG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="webp-to-png"
        faqs={faqs}
        rating={4.7}
        ratingCount={102847}
      />
      {children}
    </>
  );
}
