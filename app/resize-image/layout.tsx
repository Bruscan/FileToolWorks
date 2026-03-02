import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image Resizer | Resize Photos Online Free (No Signup)",
  description: "Resize images by percentage or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, keeps quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/resize-image",
  },
  openGraph: {
    title: "Image Resizer",
    description: "Resize images to specific dimensions. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer",
    description: "Resize images to specific dimensions. Free, no signup.",
  },
};

const faqs = [
    { question: "Why resize images?", answer: "Resizing images reduces file size for faster website loading, easier email sharing, and better social media compatibility. Smaller images also save storage space on your device." },
    { question: "What is the difference between percentage and custom size?", answer: "Percentage resizing scales the image proportionally (75% makes it 3/4 the original size). Custom size lets you specify exact pixel dimensions, with an option to keep the aspect ratio." },
    { question: "What does &quot;keep aspect ratio&quot; mean?", answer: "Keep aspect ratio maintains the original proportions of your image, preventing distortion. When enabled, changing width automatically adjusts height and vice versa." },
    { question: "Are my images uploaded to a server?", answer: "No. All resizing happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Which output format should I choose?", answer: "JPG is best for photos with smaller file sizes. PNG is best for images with transparency or text. WebP offers the best compression with high quality but may not work on older browsers." },
    { question: "Can I resize multiple images at once?", answer: "Yes. Upload multiple images and they will all be resized with the same settings. You can download them individually or all at once." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image Resizer"
        description="Resize images by percentage or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, keeps quality. Free forever, no signup required."
        slug="resize-image"
        faqs={faqs}
        rating={4.8}
        ratingCount={104892}
      />
      {children}
    </>
  );
}
