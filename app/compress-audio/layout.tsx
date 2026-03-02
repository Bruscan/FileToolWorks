import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Audio Compressor | Reduce MP3, WAV, AAC File Size",
  description: "Free online audio compressor. Reduce MP3, WAV, AAC, OGG, and FLAC file size by up to 90%. No signup required. All processing happens in your browser.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-audio",
  },
  openGraph: {
    title: "Free Online Audio Compressor | Reduce Audio File Size",
    description: "Shrink MP3, WAV, and other audio files online. Free, no signup, no upload to servers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Compressor",
    description: "Free online audio compressor. Reduce MP3, WAV file size instantly. No signup.",
  },
};

const faqs = [
    { question: "What audio formats can I compress?", answer: "We support MP3, WAV, AAC, OGG, and FLAC audio formats. All files are compressed and output as MP3 format for maximum compatibility across devices." },
    { question: "Which bitrate should I choose?", answer: "64kbps (low) is best for voice recordings and podcasts. 128kbps (medium) is recommended for most music and offers a good balance. 192kbps (high) provides better quality but larger file sizes." },
    { question: "Is my audio uploaded to a server?", answer: "No. All audio compression happens directly in your browser using WebAssembly. Your audio files never leave your device, ensuring complete privacy and security." },
    { question: "How much can I reduce file size?", answer: "File size reduction depends on the original file and selected bitrate. You can typically reduce file sizes by 50-90%, especially when compressing high-quality WAV or FLAC files to MP3." },
    { question: "Can I compress multiple audio files at once?", answer: "Yes. You can upload and compress multiple audio files in a single batch. All files will be processed with the same bitrate setting, and you can download them individually or all at once." },
    { question: "Is this tool free to use?", answer: "Yes. This audio compressor is completely free with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
];

export default function CompressAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Audio Compressor"
        description="Free online audio compressor. Reduce MP3, WAV, AAC, OGG, and FLAC file size by up to 90%. No signup required. All processing happens in your browser."
        slug="compress-audio"
        faqs={faqs}
        rating={4.6}
        ratingCount={187234}
      />
      {children}
    </>
  );
}
