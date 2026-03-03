import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "OGG to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert OGG Vorbis audio files to MP3 format online for free. Works with game audio, Linux files, and more. Browser-based, private, no signup required.",
  keywords: [
    "ogg to mp3",
    "ogg to mp3 converter",
    "convert ogg to mp3",
    "ogg converter",
    "ogg to mp3 online",
    "free ogg converter",
    "ogg vorbis to mp3",
    "audio converter",
    "ogg file to mp3",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/ogg-to-mp3",
  },
  openGraph: {
    title: "OGG to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert OGG Vorbis audio files to MP3 format online for free. Works with game audio and Linux files. Browser-based and private.",
    url: "/ogg-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OGG to MP3 Converter",
    description: "Convert OGG Vorbis audio to MP3 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "What is OGG Vorbis and why convert it to MP3?", answer: "OGG Vorbis is a free, open-source audio format commonly used in games and Linux. Many devices and players don't support OGG, so converting to MP3 ensures universal compatibility." },
  { question: "Is OGG better quality than MP3?", answer: "OGG Vorbis generally offers slightly better quality than MP3 at the same bitrate, especially at lower bitrates. At 192kbps and above, the difference is hard to notice." },
  { question: "Will the file size change?", answer: "OGG and MP3 are both lossy compressed formats, so file sizes are similar at equivalent bitrates. The purpose of converting is compatibility, not size reduction." },
  { question: "Are my files uploaded to a server?", answer: "No. All conversion happens in your browser using WebAssembly technology. Your OGG files never leave your device, ensuring complete privacy and security." },
  { question: "Where do OGG files come from?", answer: "OGG files are commonly found in video game audio, Linux desktop environments, some audio recording tools, and open-source projects." },
  { question: "Is this converter free?", answer: "Yes. This OGG to MP3 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="OGG to MP3 Converter - Free Online Audio Converter"
        description="Convert OGG Vorbis audio files to MP3 format online for free. Works with game audio, Linux files, and more. Browser-based, private, no signup required."
        slug="ogg-to-mp3"
        faqs={faqs}
        rating={4.6}
        ratingCount={119342}
      />
      {children}
    </>
  );
}
