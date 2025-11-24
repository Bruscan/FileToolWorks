import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Trimmer | Cut and Trim Audio Files Online",
  description: "Cut and trim audio files online. Supports MP3, WAV, AAC, and OGG. Fast, free, and secure. Set start and end times to trim audio instantly.",
  alternates: {
    canonical: "/trim-audio",
  },
  openGraph: {
    title: "Audio Trimmer | Cut and Trim Audio Online",
    description: "Trim audio files instantly. Free, secure, no signup required.",
    type: "website",
  },
};

export default function TrimAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
