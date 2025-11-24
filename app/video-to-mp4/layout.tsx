import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to MP4 Converter - Convert Any Video to MP4 | FileToolWorks",
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
  alternates: {
    canonical: "/video-to-mp4",
  },
};

export default function VideoToMP4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
