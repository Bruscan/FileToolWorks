import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Blur Image - Apply Blur Effect Online Free",
  description:
    "Apply blur effect to images instantly. Free online tool to blur photos with adjustable intensity from 0-20px. Perfect for censoring, background effects, and privacy protection. No signup required.",
  keywords: [
    "blur image",
    "blur photo",
    "blur picture online",
    "image blur tool",
    "photo blur effect",
    "blur background",
    "censor image",
    "blur faces",
    "privacy blur",
    "blur online free",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/blur-image",
  },
  openGraph: {
    title: "Blur Image - Apply Blur Effect Online Free",
    description:
      "Apply blur effect to images with adjustable intensity. Free, fast, and secure browser-based tool.",
    type: "website",
    url: "/blur-image",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur Image",
    description: "Apply blur effect to images. Free online tool.",
  },
};

const faqs = [
    { question: "Why blur images?", answer: "Blurring images is useful for censoring sensitive information like license plates, faces, or personal details. It can also create artistic background effects, highlight specific areas by blurring the rest, or add privacy protection to screenshots." },
    { question: "How much blur should I use?", answer: "For subtle background effects, use 2-5px. For moderate privacy protection, use 8-12px. For complete censoring of text or faces, use 15-20px. Use the real-time preview to find the right amount for your needs." },
    { question: "Can I blur only part of an image?", answer: "This tool applies uniform blur across the entire image. For selective blur (blurring only specific areas), you will need image editing software like Photoshop or GIMP that supports masks and layer editing." },
    { question: "Are my images uploaded to a server?", answer: "No. All image blurring happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security. Nothing is uploaded or stored on any server." },
    { question: "Does blurring reduce image quality?", answer: "The blur effect itself does not reduce quality, but it does make the image less sharp by design. The quality setting for JPG and WebP formats will affect the final file size and compression level during export." },
    { question: "Can I blur multiple images at once?", answer: "Yes. Upload multiple images and they will all be blurred with the same intensity setting. You can download them individually or use the &quot;Download All&quot; button for batch processing." },
];

export default function BlurImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Blur Image - Apply Blur Effect Online Free"
        description="Apply blur effect to images instantly. Free online tool to blur photos with adjustable intensity from 0-20px. Perfect for censoring, background effects, and privacy protection. No signup required."
        slug="blur-image"
        faqs={faqs}
        rating={4.6}
        ratingCount={134256}
      />
      {children}
    </>
  );
}
