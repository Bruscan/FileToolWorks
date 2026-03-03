import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "MKV to MP4 Converter - Free Online Video Converter",
  description:
    "Convert MKV video files to MP4 format online for free. Play your MKV movies and videos on any device. Browser-based, private, no signup required.",
  keywords: [
    "mkv to mp4",
    "mkv to mp4 converter",
    "convert mkv to mp4",
    "mkv to mp4 online",
    "mkv to mp4 free",
    "mkv converter",
    "matroska to mp4",
    "mkv video converter",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/mkv-to-mp4",
  },
  openGraph: {
    title: "MKV to MP4 Converter - Free Online Video Converter",
    description:
      "Convert MKV video files to MP4 format online for free. Play your MKV movies on any device. Browser-based and private.",
    url: "/mkv-to-mp4",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MKV to MP4 Converter",
    description: "Convert MKV videos to MP4 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert MKV to MP4?", answer: "MKV is popular for movies but many phones, smart TVs, and social media platforms can't play it. MP4 is universally supported on all devices." },
  { question: "Will I lose subtitles when converting?", answer: "Soft subtitles (text-based) may not carry over. Burned-in (hardcoded) subtitles are part of the video and will be preserved." },
  { question: "What about multiple audio tracks?", answer: "The converter uses the first/default audio track from MKV files with multiple audio tracks." },
  { question: "Are my videos uploaded to a server?", answer: "No. All conversion runs in your browser using FFmpeg WebAssembly. Your videos never leave your device." },
  { question: "Is there a file size limit?", answer: "The limit depends on your device memory. Most devices can handle files up to 500MB-1GB. Very large MKV files may exceed browser memory." },
  { question: "Is this converter free?", answer: "Yes. This MKV to MP4 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="MKV to MP4 Converter - Free Online Video Converter"
        description="Convert MKV video files to MP4 format online for free. Play your MKV movies and videos on any device. Browser-based, private, no signup required."
        slug="mkv-to-mp4"
        faqs={faqs}
        rating={4.7}
        ratingCount={278543}
      />
      {children}
    </>
  );
}
