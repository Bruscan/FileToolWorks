import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Crop Image | Crop Photos to Any Size or Ratio Online Free",
  description: "Crop images to preset ratios (1:1, 16:9, 4:3, 3:2) or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, free forever, no signup required.",
  alternates: {
    canonical: "/crop-image",
  },
  openGraph: {
    title: "Crop Image",
    description: "Crop images to preset ratios or custom dimensions. Free.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Image",
    description: "Crop images to preset ratios or custom dimensions. Free.",
  },
};

const faqs = [
    { question: "What are the preset aspect ratios used for?", answer: "Preset ratios help you crop images for specific uses. 1:1 (square) is perfect for profile pictures and Instagram posts. 4:3 is common for standard photos and presentations. 16:9 is ideal for YouTube thumbnails and widescreen displays. Free lets you crop to any custom dimensions without maintaining a ratio." },
    { question: "How do custom dimensions work?", answer: "Custom dimensions let you specify the exact pixel coordinates and size of your crop area. X and Y define the top-left starting point, while Width and Height define the crop area size in pixels." },
    { question: "Can I see the crop area before processing?", answer: "Yes. A blue rectangle overlay on your image preview shows exactly where the crop will be applied. This helps you visualize the final result before cropping." },
    { question: "Are my images uploaded to a server?", answer: "No. All cropping happens directly in your browser using JavaScript and HTML5 Canvas. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Which output format should I choose?", answer: "JPG is best for photos with smaller file sizes. PNG is best for images with transparency or text that need lossless quality. WebP offers excellent compression with high quality but may not work on older browsers." },
    { question: "What happens if my crop dimensions exceed the image size?", answer: "The tool automatically validates your crop dimensions to ensure they fit within the original image boundaries. Invalid dimensions are automatically adjusted to the maximum possible size." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Crop Image"
        description="Crop images to preset ratios (1:1, 16:9, 4:3, 3:2) or custom dimensions instantly. Supports JPG, PNG, WebP. Works online, free forever, no signup required."
        slug="crop-image"
        faqs={faqs}
        rating={4.8}
        ratingCount={156492}
      />
      {children}
    </>
  );
}
