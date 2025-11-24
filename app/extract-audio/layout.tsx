import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract Audio from Video | Free MP3, WAV, AAC Converter",
  description: "Extract audio from video files instantly. Convert to MP3, WAV, or AAC format. Free, fast, and secure. Works with MP4, AVI, MOV, and more.",
  alternates: {
    canonical: "/extract-audio",
  },
  openGraph: {
    title: "Extract Audio from Video | Free MP3 Converter",
    description: "Extract audio from video files instantly. Free, secure, no signup.",
    type: "website",
  },
};

export default function ExtractAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
