import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MP3 to WAV Converter - Free Online Audio Converter",
  description: "Convert MP3 audio files to uncompressed WAV format. Free, fast, and secure online converter. No upload, no registration required.",
  keywords: [
    "mp3 to wav",
    "mp3 to wav converter",
    "convert mp3 to wav",
    "audio converter",
    "wav converter",
    "uncompressed audio",
    "free audio converter",
    "online mp3 converter",
  ],
  openGraph: {
    title: "MP3 to WAV Converter - Free Online Audio Converter",
    description: "Convert MP3 audio files to uncompressed WAV format. Free, fast, and secure.",
    type: "website",
  },
  alternates: {
    canonical: "/mp3-to-wav",
  },
};

export default function MP3ToWAVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
