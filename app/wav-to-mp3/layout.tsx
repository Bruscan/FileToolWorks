import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert WAV audio files to MP3 format online for free. Reduce file size by up to 90% while maintaining audio quality. Fast, secure, and no signup required.",
  keywords: [
    "wav to mp3",
    "wav to mp3 converter",
    "convert wav to mp3",
    "audio converter",
    "wav converter",
    "mp3 converter",
    "compress wav",
    "wav to mp3 online",
    "free audio converter",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/wav-to-mp3",
  },
  openGraph: {
    title: "WAV to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert WAV audio files to MP3 format online for free. Reduce file size by up to 90% while maintaining audio quality.",
    url: "/wav-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAV to MP3",
    description: "Convert WAV audio to MP3 format. Free.",
  },
};

const faqs = [
    { question: "Why convert WAV to MP3?", answer: "WAV files are uncompressed and very large. MP3 files use compression to reduce file size by up to 90% while maintaining good audio quality. This makes them easier to share, email, and store." },
    { question: "Which bitrate should I choose?", answer: "128kbps is good for most uses and provides a good balance between quality and file size. 192kbps offers better quality for music. 320kbps is the highest quality MP3 format and sounds nearly identical to the original WAV." },
    { question: "Will I lose audio quality?", answer: "MP3 is a lossy format, so some audio data is removed during compression. However, at 192kbps or 320kbps, the difference is barely noticeable to most listeners. WAV files contain more data but are much larger." },
    { question: "Is my audio uploaded to a server?", answer: "No. All audio conversion happens directly in your browser using WebAssembly technology. Your WAV files never leave your device, ensuring complete privacy and security." },
    { question: "How much smaller will my files be?", answer: "MP3 files are typically 80-90% smaller than WAV files. A 50 MB WAV file might become 5 MB as an MP3 at 128kbps, or 8 MB at 192kbps. The exact size depends on the bitrate you choose." },
    { question: "Is this tool free to use?", answer: "Yes. This WAV to MP3 converter is completely free with no hidden charges, subscriptions, or signup required. Convert as many files as you need." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="WAV to MP3 Converter - Free Online Audio Converter"
        description="Convert WAV audio files to MP3 format online for free. Reduce file size by up to 90% while maintaining audio quality. Fast, secure, and no signup required."
        slug="wav-to-mp3"
        faqs={faqs}
        rating={4.6}
        ratingCount={167432}
      />
      {children}
    </>
  );
}
