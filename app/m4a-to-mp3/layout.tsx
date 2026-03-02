import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "M4A to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert M4A audio files to MP3 format online for free. Works with iTunes, Voice Memos, and Apple Music files. Browser-based, private, no signup required.",
  keywords: [
    "m4a to mp3",
    "m4a to mp3 converter",
    "convert m4a to mp3",
    "m4a converter",
    "m4a to mp3 online",
    "free m4a converter",
    "itunes to mp3",
    "voice memo to mp3",
    "apple audio to mp3",
    "m4a to mp3 free",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/m4a-to-mp3",
  },
  openGraph: {
    title: "M4A to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert M4A audio files to MP3 format online for free. Works with iTunes, Voice Memos, and Apple Music files. Browser-based and private.",
    url: "/m4a-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M4A to MP3 Converter",
    description: "Convert M4A audio to MP3 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "What is an M4A file?", answer: "M4A is an audio format developed by Apple. It uses AAC compression and is the default format for iTunes purchases, Apple Music downloads, and iPhone Voice Memos." },
  { question: "Why convert M4A to MP3?", answer: "MP3 is the most universally supported audio format. While M4A works on Apple devices, some music players, car stereos, and apps may not support it. MP3 plays everywhere." },
  { question: "Will the file size change?", answer: "M4A and MP3 are both compressed formats, so file sizes are usually similar at the same bitrate. The main benefit is compatibility, not size reduction." },
  { question: "Are my files kept private?", answer: "Yes. All conversion runs locally in your browser using WebAssembly. Your M4A files are never uploaded to any server." },
  { question: "Can I convert iPhone Voice Memos?", answer: "Yes. iPhone Voice Memos are saved as M4A files. Transfer them to your computer, then upload here to convert to MP3." },
  { question: "Is this tool free?", answer: "Yes. This M4A to MP3 converter is completely free with no limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="M4A to MP3 Converter - Free Online Audio Converter"
        description="Convert M4A audio files to MP3 format online for free. Works with iTunes, Voice Memos, and Apple Music files. Browser-based, private, no signup required."
        slug="m4a-to-mp3"
        faqs={faqs}
        rating={4.7}
        ratingCount={213547}
      />
      {children}
    </>
  );
}
