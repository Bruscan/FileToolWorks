import type { Metadata } from "next";

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

export default function CompressVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
