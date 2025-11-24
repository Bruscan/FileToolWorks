import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Compressor | Reduce MP3, WAV, AAC File Size",
  description: "Compress audio files and reduce bitrate instantly. Convert to MP3 with custom bitrate settings. Free, fast, and secure.",
  alternates: {
    canonical: "/compress-audio",
  },
  openGraph: {
    title: "Audio Compressor | Reduce Audio File Size",
    description: "Compress audio files instantly. Free, secure, no signup.",
    type: "website",
  },
};

export default function CompressAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
