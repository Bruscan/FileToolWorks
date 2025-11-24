import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to WebM Converter - Free Online Tool | FileToolWorks",
  description: "Convert videos to WebM format for web use. Free online video converter supporting MP4, AVI, MOV, MKV, and all video formats. VP9 codec optimized for HTML5 video.",
  alternates: {
    canonical: "/video-to-webm",
  },
  openGraph: {
    title: "Video to WebM Converter - Free Online Tool",
    description: "Convert videos to WebM format for web use. Free online video converter supporting all video formats.",
    type: "website",
  },
};

export default function VideoToWebMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
