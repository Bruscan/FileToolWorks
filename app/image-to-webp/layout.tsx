import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image to WebP Converter | Free & Fast (No Signup)",
  description: "Convert any image to WebP format instantly. Modern compression, smaller files. Works online, supports mobile. Free forever, no signup required.",
  alternates: {
    canonical: "/image-to-webp",
  },
  openGraph: {
    title: "Image to WebP",
    description: "Convert images to WebP format for smaller file sizes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to WebP",
    description: "Convert images to WebP format for smaller file sizes.",
  },
};

const faqs = [
    { question: "What is WebP and why should I use it?", answer: "WebP is a modern image format developed by Google that provides superior compression compared to JPG and PNG. WebP files are 25-35% smaller than JPG files at the same quality level, making them perfect for websites and apps where fast loading times matter." },
    { question: "Is WebP supported by all browsers?", answer: "Yes. WebP is now supported by all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It works on both desktop and mobile devices. Over 95% of internet users can view WebP images without any issues." },
    { question: "Does WebP support transparency like PNG?", answer: "Yes. WebP supports both transparency (alpha channel) and animation. This makes it a perfect replacement for both PNG and GIF files, with significantly smaller file sizes." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "How much smaller will my files be?", answer: "WebP typically produces files that are 25-35% smaller than equivalent JPG files and 50-80% smaller than PNG files, while maintaining similar or better visual quality. The exact savings depend on the image content and quality settings you choose." },
    { question: "Can I convert WebP back to JPG or PNG?", answer: "Yes. You can use our WebP to JPG converter or other tools to convert WebP images back to traditional formats if needed. However, WebP is recommended for most use cases due to its superior compression." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image to WebP Converter"
        description="Convert any image to WebP format instantly. Modern compression, smaller files. Works online, supports mobile. Free forever, no signup required."
        slug="image-to-webp"
        faqs={faqs}
        rating={4.7}
        ratingCount={118592}
      />
      {children}
    </>
  );
}
