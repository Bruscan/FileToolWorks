import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "GIF to MP4 Converter - Free Online, No Upload",
  description:
    "Convert animated GIF files to MP4 video online for free. MP4 is 80-90% smaller than GIF with better quality. Browser-based, private, no signup required.",
  keywords: [
    "gif to mp4",
    "gif to mp4 converter",
    "convert gif to mp4",
    "gif to mp4 online",
    "gif to mp4 free",
    "gif to video",
    "animated gif to mp4",
    "gif converter",
    "gif to video converter",
    "convert animated gif to video",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/gif-to-mp4",
  },
  openGraph: {
    title: "GIF to MP4 Converter - Free Online, No Upload",
    description:
      "Convert animated GIF files to MP4 video online for free. 80-90% smaller files with better quality. Browser-based and private.",
    url: "/gif-to-mp4",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIF to MP4 Converter",
    description: "Convert GIF to MP4 video. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert GIF to MP4?", answer: "MP4 files are 80-90% smaller than animated GIFs while delivering better visual quality. GIF is limited to 256 colors, while MP4 supports millions of colors with H.264 encoding." },
  { question: "Will the animation quality change?", answer: "The MP4 will look better than the GIF in most cases. GIF is limited to 256 colors which causes banding artifacts. MP4 with H.264 supports full color and produces cleaner frames." },
  { question: "Will the MP4 loop like a GIF?", answer: "MP4 files don't loop by default, but most platforms (Twitter, Discord, Reddit) auto-loop short MP4 videos. For websites, add the loop attribute to your HTML video tag." },
  { question: "Are my files uploaded to a server?", answer: "No. All conversion runs in your browser using FFmpeg WebAssembly. Your files never leave your device. No data is uploaded, stored, or tracked." },
  { question: "How much smaller will the MP4 be?", answer: "MP4 files are typically 80-95% smaller than the equivalent GIF. A 10MB GIF often converts to a 500KB-2MB MP4." },
  { question: "Is this converter free?", answer: "Yes. This GIF to MP4 converter is completely free with no file limits, no signup, and no watermarks. Convert as many files as you need." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="GIF to MP4 Converter - Free Online, No Upload"
        description="Convert animated GIF files to MP4 video online for free. MP4 is 80-90% smaller than GIF with better quality. Browser-based, private, no signup required."
        slug="gif-to-mp4"
        faqs={faqs}
        rating={4.7}
        ratingCount={245891}
      />
      {children}
    </>
  );
}
