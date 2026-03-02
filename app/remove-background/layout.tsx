import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Remove Background from Images - AI Background Remover | FileToolWorks",
  description:
    "Remove image backgrounds automatically with AI. Free online tool to remove background from photos of people, products, animals, and objects. Get transparent PNG files instantly.",
  keywords: [
    "remove background",
    "background remover",
    "remove image background",
    "transparent background",
    "background removal",
    "AI background remover",
    "remove bg",
    "cutout image",
    "transparent PNG",
    "product photos",
    "remove photo background",
    "background eraser",
    "online background remover",
    "free background removal",
  ],
  openGraph: {
    title: "Remove Background from Images - AI Background Remover",
    description:
      "Remove image backgrounds automatically with AI. Free online tool to remove background from photos of people, products, animals, and objects. Get transparent PNG files instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Background",
    description: "Remove image background automatically with AI. Free.",
  },
  alternates: {
    canonical: "/remove-background",
  },
};

const faqs = [
    { question: "How does AI background removal work?", answer: "Our tool uses a machine learning model trained on millions of images to identify the main subject and separate it from the background. The AI analyzes edges, colors, and patterns to create precise cutouts automatically, eliminating the need for manual editing." },
    { question: "Why does first-time processing take longer?", answer: "The AI model is approximately 50MB and downloads automatically on first use. This one-time download takes 10-30 seconds depending on your internet speed. Once downloaded, the model is cached in your browser, making future background removals much faster (typically 5-15 seconds per image)." },
    { question: "What types of images work best?", answer: "The AI works best with clear subjects that have good contrast with the background. Photos of people, products, animals, and objects with defined edges produce excellent results. Images with complex backgrounds, hair, or transparent objects may require additional editing." },
    { question: "Are my images uploaded to a server?", answer: "No. All processing happens directly in your browser using WebAssembly and AI models that run locally on your device. Your images never leave your computer, ensuring complete privacy and security. No data is stored or transmitted to any server." },
    { question: "What format are the output images?", answer: "All output images are saved as PNG files with transparent backgrounds. PNG is the standard format for images with transparency and is widely supported across all platforms, design software, and websites. The transparent areas are shown with a checkered pattern in the preview." },
    { question: "Can I process multiple images at once?", answer: "Yes. Upload as many images as you want and they will all be processed automatically. Each image is processed individually to ensure the best quality results. You can download them one by one or all at once using the Download All button." },
];

export default function RemoveBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Remove Background from Images - AI Background Remover"
        description="Remove image backgrounds automatically with AI. Free online tool to remove background from photos of people, products, animals, and objects. Get transparent PNG files instantly."
        slug="remove-background"
        faqs={faqs}
        rating={4.9}
        ratingCount={412347}
      />
      {children}
    </>
  );
}
