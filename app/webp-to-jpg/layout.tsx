import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "WebP to JPG Converter | Free & Fast (No Signup)",
  description: "Convert WebP images to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/webp-to-jpg",
  },
  openGraph: {
    title: "WebP to JPG Converter",
    description: "Convert WebP images to JPG format. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP to JPG Converter",
    description: "Convert WebP images to JPG format. Free, no signup.",
  },
};

const faqs = [
    { question: "What is WebP format?", answer: "WebP is a modern image format developed by Google that provides superior compression for images on the web. While it offers smaller file sizes, not all software and devices support WebP yet." },
    { question: "Why convert WebP to JPG?", answer: "JPG is universally supported across all devices, software, and platforms. Converting WebP to JPG ensures your images can be viewed and edited anywhere without compatibility issues." },
    { question: "Will the image quality be affected?", answer: "You can control the output quality. The Best setting (0.92) maintains very high quality similar to the original WebP. Lower settings reduce file size but may show some quality loss." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Can I convert to PNG instead of JPG?", answer: "Yes. In the Options section, you can choose between JPG and PNG output formats. PNG is better if you need transparency support or lossless quality." },
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
        name="WebP to JPG Converter"
        description="Convert WebP images to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="webp-to-jpg"
        faqs={faqs}
        rating={4.8}
        ratingCount={104573}
      />
      {children}
    </>
  );
}
