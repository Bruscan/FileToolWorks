import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Compress Video Online - Free Video Compressor | FileToolWorks",
  description: "Compress video files online for free. Reduce video file size while maintaining quality. Supports MP4, MOV, AVI, WebM. No upload required, works in your browser.",
  keywords: [
    "compress video",
    "video compressor",
    "reduce video size",
    "compress mp4",
    "video file size reducer",
    "compress video online",
    "free video compressor",
    "shrink video file",
    "video compression tool",
    "reduce video file size online",
  ],
  openGraph: {
    title: "Compress Video Online - Free Video Compressor",
    description: "Reduce video file size while maintaining quality. Free, fast, and secure video compression in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "/compress-video",
  },
};

const faqs = [
    { question: "Why compress video files?", answer: "Compressing videos reduces file size, making them easier to share via email, messaging apps, and social media. Smaller files also upload faster and take up less storage space." },
    { question: "How much can I compress a video?", answer: "Compression depends on your settings. Low quality with 480p resolution can reduce file size by 70-90%, while high quality with original resolution may only reduce by 20-40%. The tool shows exact file size comparison." },
    { question: "Will compression reduce video quality?", answer: "Yes, compression always involves some quality loss. However, with medium or high quality settings, the difference is often imperceptible for most viewing purposes. Low quality setting is best for file size reduction when quality is less important." },
    { question: "Are my videos uploaded to a server?", answer: "No. All compression happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security." },
    { question: "What settings should I use?", answer: "For social media and messaging, use medium quality with 720p or 480p resolution. For archiving or situations where quality matters, use high quality with original resolution. Experiment to find the right balance for your needs." },
    { question: "What format is the output video?", answer: "All compressed videos are output as MP4 files using the H.264 codec, which is widely supported across all devices and platforms. The audio is encoded as AAC at 128kbps for good quality and small size." },
];

export default function CompressVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Compress Video Online - Free Video Compressor"
        description="Compress video files online for free. Reduce video file size while maintaining quality. Supports MP4, MOV, AVI, WebM. No upload required, works in your browser."
        slug="compress-video"
        faqs={faqs}
        rating={4.7}
        ratingCount={198442}
      />
      {children}
    </>
  );
}
