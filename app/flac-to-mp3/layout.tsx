import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "FLAC to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert FLAC audio files to MP3 format online for free. Reduce file size by 60-80% with customizable bitrate. Browser-based, private, no signup required.",
  keywords: [
    "flac to mp3",
    "flac to mp3 converter",
    "convert flac to mp3",
    "flac converter",
    "flac to mp3 online",
    "free flac converter",
    "flac to mp3 free",
    "audio converter",
    "lossless to mp3",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/flac-to-mp3",
  },
  openGraph: {
    title: "FLAC to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert FLAC audio files to MP3 format online for free. Reduce file size by 60-80% with customizable bitrate. Browser-based and private.",
    url: "/flac-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLAC to MP3 Converter",
    description: "Convert FLAC audio to MP3 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert FLAC to MP3?", answer: "FLAC is a lossless audio format that preserves full quality but creates large files (30-50 MB per song). MP3 files are 60-80% smaller and play on virtually every device, app, and music player." },
  { question: "What bitrate should I use for FLAC to MP3?", answer: "320kbps is the best choice if you want the closest quality to your FLAC originals. 192kbps offers a good balance between quality and size for music. 128kbps works fine for podcasts and voice recordings." },
  { question: "Will I lose audio quality converting FLAC to MP3?", answer: "Yes, some quality is lost because MP3 is a lossy format while FLAC is lossless. However, at 320kbps the difference is minimal and inaudible to most listeners on standard headphones and speakers." },
  { question: "Are my files uploaded to a server?", answer: "No. All conversion happens in your browser using WebAssembly technology. Your FLAC files never leave your device, ensuring complete privacy and security." },
  { question: "How much smaller will my files be?", answer: "A typical 30 MB FLAC file becomes about 7-10 MB as a 320kbps MP3, or 4-6 MB at 192kbps. The exact reduction depends on the audio content and bitrate you choose." },
  { question: "Is this converter free?", answer: "Yes. This FLAC to MP3 converter is completely free with no file limits, no signup, and no watermarks. Convert as many files as you need." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="FLAC to MP3 Converter - Free Online Audio Converter"
        description="Convert FLAC audio files to MP3 format online for free. Reduce file size by 60-80% with customizable bitrate. Browser-based, private, no signup required."
        slug="flac-to-mp3"
        faqs={faqs}
        rating={4.7}
        ratingCount={145891}
      />
      {children}
    </>
  );
}
