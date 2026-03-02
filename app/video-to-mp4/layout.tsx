import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Video to MP4 Converter - Convert Any Video to MP4",
  description: "Convert any video format to MP4 online for free. Supports AVI, MOV, MKV, WebM, FLV, and more. Fast, secure, and works in your browser without uploads.",
  keywords: [
    "video to mp4",
    "convert video to mp4",
    "mp4 converter",
    "avi to mp4",
    "mov to mp4",
    "mkv to mp4",
    "webm to mp4",
    "video converter",
    "video format converter",
    "convert video online",
    "free mp4 converter",
  ],
  openGraph: {
    title: "Video to MP4 Converter - Convert Any Video to MP4",
    description: "Convert any video format to MP4 online for free. Fast, secure, and works in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to MP4",
    description: "Convert any video format to MP4. Free.",
  },
  alternates: {
    canonical: "/video-to-mp4",
  },
};

const faqs = [
    { question: "Why convert videos to MP4?", answer: "MP4 is the most widely supported video format, compatible with all devices, browsers, and media players. Converting to MP4 ensures your videos work everywhere without compatibility issues." },
    { question: "What video formats can I convert?", answer: "You can convert any video format including AVI, MOV, MKV, WebM, FLV, WMV, MPEG, and many more. The tool automatically detects and converts all common video formats to MP4." },
    { question: "Does conversion reduce video quality?", answer: "With High quality setting and Original resolution, there is minimal quality loss. The tool uses H.264 encoding which provides excellent quality at reasonable file sizes. Medium and Low settings trade quality for smaller files." },
    { question: "Are my videos uploaded to a server?", answer: "No. All conversion happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security." },
    { question: "What settings should I use?", answer: "For archiving or high-quality playback, use High quality with Original resolution. For web sharing or social media, Medium quality with 720p or 1080p works well. For maximum compression, use Low quality with 480p resolution." },
    { question: "How long does conversion take?", answer: "Conversion time depends on video length, size, and your device performance. Short videos convert in seconds, while longer videos may take several minutes. The tool shows progress during conversion." },
];

export default function VideoToMP4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Video to MP4 Converter - Convert Any Video to MP4"
        description="Convert any video format to MP4 online for free. Supports AVI, MOV, MKV, WebM, FLV, and more. Fast, secure, and works in your browser without uploads."
        slug="video-to-mp4"
        faqs={faqs}
        rating={4.7}
        ratingCount={298142}
      />
      {children}
    </>
  );
}
