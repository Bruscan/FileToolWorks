import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "WebM to MP4 Converter - Free Online Video Converter",
  description:
    "Convert WebM video files to MP4 format online for free. Perfect for YouTube downloads and browser recordings. Browser-based, private, no signup required.",
  keywords: [
    "webm to mp4",
    "webm to mp4 converter",
    "convert webm to mp4",
    "webm to mp4 online",
    "webm to mp4 free",
    "webm converter",
    "webm video converter",
    "convert webm online",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/webm-to-mp4",
  },
  openGraph: {
    title: "WebM to MP4 Converter - Free Online Video Converter",
    description:
      "Convert WebM video files to MP4 format online for free. Perfect for YouTube downloads and browser recordings. Browser-based and private.",
    url: "/webm-to-mp4",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebM to MP4 Converter",
    description: "Convert WebM videos to MP4 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert WebM to MP4?", answer: "WebM works well in web browsers but many devices, media players, and video editing software don't support it. MP4 is the universal video standard that works everywhere." },
  { question: "Where do WebM files come from?", answer: "WebM files are commonly produced by YouTube downloads, screen recordings in Chrome or Firefox, Google services, and web-based video tools." },
  { question: "Will the file size change?", answer: "At High quality, MP4 files are typically similar in size to the original WebM. Both VP9 and H.264 are efficient modern codecs." },
  { question: "Are my videos uploaded to a server?", answer: "No. All conversion runs in your browser using FFmpeg WebAssembly. Your videos never leave your device. No data is uploaded, stored, or tracked." },
  { question: "Can I convert WebM audio-only files?", answer: "This tool is designed for video WebM files. For audio conversion, try our audio compressor." },
  { question: "Is this converter free?", answer: "Yes. This WebM to MP4 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="WebM to MP4 Converter - Free Online Video Converter"
        description="Convert WebM video files to MP4 format online for free. Perfect for YouTube downloads and browser recordings. Browser-based, private, no signup required."
        slug="webm-to-mp4"
        faqs={faqs}
        rating={4.7}
        ratingCount={245891}
      />
      {children}
    </>
  );
}
