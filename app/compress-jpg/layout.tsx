import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Compress JPG | Reduce JPEG File Size Online Free",
  description: "Compress JPG and JPEG images online for free. Reduce file size by up to 90% without losing quality. No upload, no signup - runs in your browser.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-jpg",
  },
  openGraph: {
    title: "Compress JPG Online Free",
    description: "Reduce JPEG file size by up to 90% without losing quality. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress JPG Online Free",
    description: "Reduce JPEG file size by up to 90% without losing quality. Free, no signup.",
  },
};

const faqs = [
  { question: "How much can I compress a JPG file?", answer: "Typically 40-90% file size reduction depending on the quality setting and original image. Photos with gradients and smooth tones compress more effectively than images with sharp edges or text." },
  { question: "Will compressing my JPG reduce image quality?", answer: "JPG compression is lossy, so there is always some quality reduction. However, at High (0.85) or Best (0.92) quality, the difference is virtually invisible to the human eye. Lower settings produce smaller files but with visible artifacts." },
  { question: "Are my JPG files uploaded to a server?", answer: "No. All compression happens in your browser using JavaScript. Your images never leave your device. We never see, store, or access your files." },
  { question: "What is the best quality setting for JPG compression?", answer: "For most uses, High (0.85) offers the best balance between file size and quality. Use Best (0.92) when quality is critical, like for print or portfolio images. Good (0.7) works well for web thumbnails and social media." },
  { question: "Can I compress multiple JPG files at once?", answer: "Yes. Upload as many JPG files as you want and they will all be compressed with the same settings. Download individually or use the Download All button for batch processing." },
  { question: "What is the difference between JPG and JPEG?", answer: "JPG and JPEG are the same format. The only difference is the file extension length. Windows originally limited extensions to 3 characters (.jpg) while Mac and Linux used .jpeg. Both are fully interchangeable." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Compress JPG"
        description="Compress JPG and JPEG images online for free. Reduce file size by up to 90% without losing quality. No upload, no signup - runs in your browser."
        slug="compress-jpg"
        faqs={faqs}
        rating={4.7}
        ratingCount={234567}
      />
      {children}
    </>
  );
}
