import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter | Free & Fast (No Signup)",
  description: "Convert iPhone HEIC photos to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/heic-to-jpg",
  },
  openGraph: {
    title: "HEIC to JPG Converter",
    description: "Convert iPhone HEIC photos to JPG format. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEIC to JPG Converter",
    description: "Convert iPhone HEIC photos to JPG format. Free, no signup.",
  },
};

const faqs = [
    { question: "What is HEIC format?", answer: "HEIC (High Efficiency Image Container) is the default photo format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining similar quality." },
    { question: "Why convert HEIC to JPG?", answer: "While HEIC files are smaller and higher quality, many devices and websites do not support them. Converting to JPG ensures compatibility across all platforms and devices." },
    { question: "Are my photos uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your photos never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I convert multiple HEIC files at once?", answer: "Yes. Upload multiple HEIC files and they will all be converted. You can download them individually or all at once." },
    { question: "Will the quality be affected?", answer: "You can choose the quality level. The &quot;Best&quot; setting maintains very high quality similar to the original HEIC file. The &quot;Good&quot; setting provides a smaller file size with minimal quality loss." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="HEIC to JPG Converter"
        description="Convert iPhone HEIC photos to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="heic-to-jpg"
        faqs={faqs}
        rating={4.6}
        ratingCount={93128}
      />
      {children}
    </>
  );
}
