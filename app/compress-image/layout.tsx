import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image Compressor | Reduce File Size Without Losing Quality (Free)",
  description: "Compress JPG, PNG, and WebP images instantly. Reduce file size by up to 90% while maintaining quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-image",
  },
  openGraph: {
    title: "Image Compressor",
    description: "Reduce image file size without losing quality. Free.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor",
    description: "Reduce image file size without losing quality. Free.",
  },
};

const faqs = [
    { question: "How much can I compress an image?", answer: "Compression results vary by image type and content. Typically, you can reduce file size by 40-90% depending on the compression level and original image quality. Photos with gradients compress more than images with text or sharp edges." },
    { question: "Will compressing affect image quality?", answer: "Yes, but minimally if you choose High or Maximum compression. Low compression reduces file size significantly but may introduce visible artifacts. We recommend testing different levels to find the best balance for your needs." },
    { question: "What is the difference between compression levels?", answer: "Low (0.5) creates the smallest files with visible quality loss. Medium (0.7) balances size and quality well. High (0.85) maintains good quality with moderate compression. Maximum (0.92) preserves near-original quality with minimal size reduction." },
    { question: "Are my images uploaded to a server?", answer: "No. All compression happens directly in your browser using JavaScript and the Canvas API. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Which output format should I choose?", answer: "JPG is best for photos and images with many colors. PNG is ideal for images with transparency or text. WebP offers better compression than JPG while maintaining quality, but may have limited support on older browsers. Choose &quot;Same&quot; to keep the original format." },
    { question: "Can I compress multiple images at once?", answer: "Yes. Upload as many images as you want and they will all be compressed with the same settings. You can download them individually or all at once using the Download All button." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image Compressor"
        description="Compress JPG, PNG, and WebP images instantly. Reduce file size by up to 90% while maintaining quality. Free forever, no signup required."
        slug="compress-image"
        faqs={faqs}
        rating={4.8}
        ratingCount={102348}
      />
      {children}
    </>
  );
}
