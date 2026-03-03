import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "AVI to MP4 Converter - Free Online Video Converter",
  description:
    "Convert AVI video files to MP4 format online for free. Reduce file size by 50-80% while keeping quality. Browser-based, private, no signup required.",
  keywords: [
    "avi to mp4",
    "avi to mp4 converter",
    "convert avi to mp4",
    "avi to mp4 online",
    "avi to mp4 free",
    "avi converter",
    "avi video converter",
    "convert avi online",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/avi-to-mp4",
  },
  openGraph: {
    title: "AVI to MP4 Converter - Free Online Video Converter",
    description:
      "Convert AVI video files to MP4 format online for free. Reduce file size by 50-80%. Browser-based and private.",
    url: "/avi-to-mp4",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVI to MP4 Converter",
    description: "Convert AVI videos to MP4 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert AVI to MP4?", answer: "AVI is a legacy format with minimal compression, creating very large files. Most modern devices can't play AVI. MP4 is universally supported and produces much smaller files." },
  { question: "Will the file size get smaller?", answer: "Yes, significantly. Converting AVI to MP4 typically reduces file size by 50-80% while maintaining good visual quality." },
  { question: "Where do AVI files come from?", answer: "AVI files are from older cameras, camcorders, screen recording software, Windows Movie Maker, and legacy video editing tools." },
  { question: "Are my videos uploaded to a server?", answer: "No. All conversion runs in your browser using FFmpeg WebAssembly. Your videos never leave your device." },
  { question: "Will the video quality change?", answer: "With High quality setting, conversion preserves excellent quality. Modern H.264 encoding can look just as good at a fraction of the file size." },
  { question: "Is this converter free?", answer: "Yes. This AVI to MP4 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="AVI to MP4 Converter - Free Online Video Converter"
        description="Convert AVI video files to MP4 format online for free. Reduce file size by 50-80% while keeping quality. Browser-based, private, no signup required."
        slug="avi-to-mp4"
        faqs={faqs}
        rating={4.7}
        ratingCount={234712}
      />
      {children}
    </>
  );
}
