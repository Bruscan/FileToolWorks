import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Rotate Image | Flip & Rotate Photos Online Free",
  description: "Rotate images 90°, 180°, 270° and flip horizontally or vertically. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/rotate-image",
  },
  openGraph: {
    title: "Rotate Image",
    description: "Rotate and flip images instantly. Free online tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image",
    description: "Rotate and flip images instantly. Free online tool.",
  },
};

const faqs = [
    { question: "Why rotate images?", answer: "Photos taken on smartphones or cameras sometimes have incorrect orientation. Rotating fixes this issue. You may also need to rotate images to match specific design requirements or platform guidelines." },
    { question: "What does 90° CW and 90° CCW mean?", answer: "CW means clockwise (turns right), and CCW means counterclockwise (turns left). 90° CW rotates the image to the right by a quarter turn, while 90° CCW rotates it to the left by a quarter turn." },
    { question: "What is the difference between flip and rotate?", answer: "Rotate turns the image by an angle (90°, 180°, 270°). Flip creates a mirror image by reversing the image horizontally (left to right), vertically (top to bottom), or both." },
    { question: "Are my images uploaded to a server?", answer: "No. All rotation and flipping happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Does rotating reduce image quality?", answer: "Rotating at 90°, 180°, or 270° does not reduce quality as these are lossless operations. However, the quality setting for JPG and WebP formats will affect the final file size and quality during export." },
    { question: "Can I rotate multiple images at once?", answer: "Yes. Upload multiple images and they will all be rotated and flipped with the same settings. You can download them individually or all at once." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Rotate Image"
        description="Rotate images 90°, 180°, 270° and flip horizontally or vertically. Supports JPG, PNG, WebP. Fast, secure, works in browser. No signup required."
        slug="rotate-image"
        faqs={faqs}
        rating={4.7}
        ratingCount={124387}
      />
      {children}
    </>
  );
}
