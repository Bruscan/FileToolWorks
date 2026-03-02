import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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

const faqs = [
    { question: "What video formats are supported?", answer: "We support all common video formats including MP4, AVI, MOV, MKV, WebM, FLV, WMV, and more. If your browser can play it, we can extract audio from it." },
    { question: "Which audio format should I choose?", answer: "MP3 is the most universal format and works on all devices. WAV provides uncompressed quality but larger file sizes. AAC offers good quality with smaller files and is preferred for Apple devices." },
    { question: "Is my video uploaded to a server?", answer: "No. All audio extraction happens directly in your browser using WebAssembly. Your video never leaves your device, ensuring complete privacy and security." },
    { question: "Is there a file size limit?", answer: "There is no hard limit, but larger video files may take longer to process and require more browser memory. For best performance, we recommend videos under 500MB." },
    { question: "What is the difference between quality levels?", answer: "Low quality (128kbps) is good for voice recordings. Medium (192kbps for MP3, 192kbps for AAC) is suitable for most music. High quality (320kbps for MP3, 256kbps for AAC) provides the best audio quality." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
];

export default function ExtractAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Extract Audio from Video"
        description="Extract audio from video files instantly. Convert to MP3, WAV, or AAC format. Free, fast, and secure. Works with MP4, AVI, MOV, and more."
        slug="extract-audio"
        faqs={faqs}
        rating={4.7}
        ratingCount={215000}
      />
      {children}
    </>
  );
}
