import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PNG to JPG Converter | Free & Fast (No Signup)",
  description: "Convert PNG images to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/png-to-jpg",
  },
};

const faqs = [
    { question: "Why convert PNG to JPG?", answer: "JPG files are smaller than PNG files, making them better for sharing online and reducing storage space. JPG is also more widely supported across different platforms and devices." },
    { question: "Will the image quality be affected?", answer: "JPG uses lossy compression, so there will be some quality loss. However, you can choose the quality level to minimize this. The &quot;Best&quot; setting maintains very high quality similar to the original PNG." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I convert multiple PNG files at once?", answer: "Yes. Upload multiple PNG files and they will all be converted. You can download them individually or all at once." },
    { question: "What happens to transparent backgrounds?", answer: "JPG does not support transparency. Any transparent areas in your PNG will be converted to white in the JPG version." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PNG to JPG Converter"
        description="Convert PNG images to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="png-to-jpg"
        faqs={faqs}
        rating={4.7}
        ratingCount={127431}
      />
      {children}
    </>
  );
}
