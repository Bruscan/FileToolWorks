import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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

const faqs = [
    { question: "What audio formats can I trim?", answer: "We support MP3, WAV, AAC, and OGG audio formats. The output file will be in the same format as your input file, preserving the original quality." },
    { question: "How do I know what times to use?", answer: "After uploading, we display the total duration of your audio file. You can use this to determine the start and end times. Enter times in seconds (for example, 30.5 for 30.5 seconds)." },
    { question: "Is my audio file uploaded to a server?", answer: "No. All trimming happens directly in your browser using WebAssembly. Your audio file never leaves your device, ensuring complete privacy and security." },
    { question: "Does trimming reduce audio quality?", answer: "No. We use codec copying which means the audio is trimmed without re-encoding. This preserves the original quality and makes the process much faster." },
    { question: "Is there a file size limit?", answer: "There is no hard limit, but larger audio files may take longer to process and require more browser memory. For best performance, we recommend files under 100MB." },
    { question: "Is this tool free to use?", answer: "Yes. This audio trimmer is completely free with no hidden charges, subscriptions, or signup required. Trim as many audio files as you need." },
];

export default function TrimAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Audio Trimmer"
        description="Cut and trim audio files online. Supports MP3, WAV, AAC, and OGG. Fast, free, and secure. Set start and end times to trim audio instantly."
        slug="trim-audio"
        faqs={faqs}
        rating={4.7}
        ratingCount={165432}
      />
      {children}
    </>
  );
}
