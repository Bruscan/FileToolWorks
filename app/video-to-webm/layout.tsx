import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Video to WebM Converter - Free Online Tool",
  description: "Convert videos to WebM format for web use. Free online video converter supporting MP4, AVI, MOV, MKV, and all video formats. VP9 codec optimized for HTML5 video.",
  alternates: {
    canonical: "https://www.filetoolworks.com/video-to-webm",
  },
  openGraph: {
    title: "Video to WebM Converter - Free Online Tool",
    description: "Convert videos to WebM format for web use. Free online video converter supporting all video formats.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video to WebM",
    description: "Convert videos to WebM format for web. Free.",
  },
};

const faqs = [
    { question: "Why convert videos to WebM?", answer: "WebM is optimized for web use with excellent compression and quality. It is natively supported by all modern browsers and HTML5 video players. WebM files are typically smaller than equivalent quality MP4 files, making them ideal for web streaming and faster page loads." },
    { question: "What is the difference between WebM and MP4?", answer: "WebM uses VP9 video codec and Opus audio codec, providing better compression than MP4 at similar quality levels. WebM is royalty-free and open source, while MP4 uses licensed codecs. Both formats work well for web video, but WebM typically produces smaller files." },
    { question: "Do all browsers support WebM?", answer: "Yes, all modern browsers including Chrome, Firefox, Edge, Safari (version 14.1+), and Opera support WebM playback. WebM has become a standard format for HTML5 video on the web." },
    { question: "Are my videos uploaded to a server?", answer: "No. All conversion happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security." },
    { question: "What quality setting should I use?", answer: "For most web uses, Medium quality provides the best balance. High quality is recommended for archival or professional content where file size is less important. Low quality works well for background videos or when minimizing bandwidth usage is critical." },
    { question: "How long does conversion take?", answer: "Conversion time depends on video length, resolution, and your device performance. VP9 encoding (used by WebM) is more computationally intensive than H.264, so conversion may take longer than MP4. The tool shows progress during conversion." },
];

export default function VideoToWebMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Video to WebM Converter - Free Online Tool"
        description="Convert videos to WebM format for web use. Free online video converter supporting MP4, AVI, MOV, MKV, and all video formats. VP9 codec optimized for HTML5 video."
        slug="video-to-webm"
        faqs={faqs}
        rating={4.6}
        ratingCount={187234}
      />
      {children}
    </>
  );
}
