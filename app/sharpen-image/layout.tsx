import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Sharpen Image | Enhance Image Details Online Free",
  description: "Sharpen and enhance image details with adjustable intensity. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required.",
  alternates: {
    canonical: "/sharpen-image",
  },
};

const faqs = [
    { question: "When should I sharpen images?", answer: "Sharpen images when they look soft or blurry, especially after resizing or when photos lack detail. Sharpening enhances edges and makes images appear crisper and more defined." },
    { question: "What is the difference between low, medium, and high intensity?", answer: "Low intensity provides subtle enhancement without artifacts. Medium offers balanced sharpening for most images. High intensity creates maximum detail but may introduce noise or halos in some images." },
    { question: "Can sharpening fix out of focus images?", answer: "Sharpening can enhance edges and details but cannot fix severely out of focus or blurry images. It works best on images that are slightly soft or need edge enhancement." },
    { question: "Are my images uploaded to a server?", answer: "No. All sharpening happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Which output format should I choose?", answer: "PNG is best for images with text or graphics. JPG is ideal for photos and offers smaller file sizes. WebP provides the best compression with high quality, but may not be supported by older software." },
    { question: "Can I sharpen multiple images at once?", answer: "Yes. Upload multiple images and they will all be sharpened with the same settings. You can download them individually or all at once." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Sharpen Image"
        description="Sharpen and enhance image details with adjustable intensity. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required."
        slug="sharpen-image"
        faqs={faqs}
        rating={4.5}
        ratingCount={98342}
      />
      {children}
    </>
  );
}
