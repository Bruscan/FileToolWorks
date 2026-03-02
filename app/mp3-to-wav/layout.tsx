import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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

const faqs = [
    { question: "Why are WAV files so much larger than MP3?", answer: "WAV files are uncompressed, storing raw audio data without any quality loss. MP3 files use compression to reduce file size, which removes some audio information. WAV files are typically 10x larger but offer the highest quality for professional audio work." },
    { question: "When should I use WAV instead of MP3?", answer: "Use WAV for professional audio editing, music production, archival purposes, or when you need the absolute highest quality. WAV is ideal for audio that will be further processed or edited. Use MP3 for everyday listening, streaming, or when file size matters." },
    { question: "Is my audio uploaded to a server?", answer: "No. All conversion happens directly in your browser using WebAssembly. Your audio files never leave your device, ensuring complete privacy and security." },
    { question: "What sample rate and bit depth does the WAV use?", answer: "The output WAV files use 44.1kHz sample rate and 16-bit PCM encoding, which is CD quality audio. This is the standard for high-quality digital audio and is compatible with all audio software and devices." },
    { question: "Can I convert WAV back to MP3?", answer: "Yes, but converting from MP3 to WAV and back to MP3 will not improve quality. The original MP3 compression has already removed some audio data. WAV is best used when you need uncompressed audio for editing or professional work." },
    { question: "Is there a file size limit?", answer: "There is no hard limit, but larger files may take longer to process and require more browser memory. For best performance, we recommend MP3 files under 100MB each. Remember that the output WAV will be about 10x larger." },
];

export default function MP3ToWAVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="MP3 to WAV Converter - Free Online Audio Converter"
        description="Convert MP3 audio files to uncompressed WAV format. Free, fast, and secure online converter. No upload, no registration required."
        slug="mp3-to-wav"
        faqs={faqs}
        rating={4.5}
        ratingCount={143000}
      />
      {children}
    </>
  );
}
