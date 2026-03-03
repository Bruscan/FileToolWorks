import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "AAC to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert AAC audio files to MP3 format online for free. Works with all AAC files from Apple, YouTube, and streaming. Browser-based, private, no signup required.",
  keywords: [
    "aac to mp3",
    "aac to mp3 converter",
    "convert aac to mp3",
    "aac converter",
    "aac to mp3 online",
    "free aac converter",
    "aac to mp3 free",
    "audio converter",
    "aac file to mp3",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/aac-to-mp3",
  },
  openGraph: {
    title: "AAC to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert AAC audio files to MP3 format online for free. Works with all AAC files. Browser-based and private.",
    url: "/aac-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAC to MP3 Converter",
    description: "Convert AAC audio to MP3 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "What is AAC and why convert it to MP3?", answer: "AAC (Advanced Audio Coding) is a compressed audio format used by Apple devices, YouTube, and streaming services. MP3 has universal compatibility and works on every device and media player." },
  { question: "What bitrate should I choose?", answer: "For music, 192kbps or 320kbps provides excellent quality. 128kbps is fine for spoken content like podcasts and audiobooks." },
  { question: "Will the file size change?", answer: "AAC and MP3 are both compressed formats, so the file size stays roughly the same at equivalent bitrates. The difference is minimal." },
  { question: "Are my files uploaded to a server?", answer: "No. All conversion happens in your browser using WebAssembly technology. Your AAC files never leave your device, ensuring complete privacy and security." },
  { question: "Can I convert M4A files here too?", answer: "M4A files use AAC encoding inside an MP4 container. Use our dedicated M4A to MP3 converter for M4A files." },
  { question: "Is this converter free?", answer: "Yes. This AAC to MP3 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="AAC to MP3 Converter - Free Online Audio Converter"
        description="Convert AAC audio files to MP3 format online for free. Works with all AAC files from Apple, YouTube, and streaming. Browser-based, private, no signup required."
        slug="aac-to-mp3"
        faqs={faqs}
        rating={4.6}
        ratingCount={132478}
      />
      {children}
    </>
  );
}
