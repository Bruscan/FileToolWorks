import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "File Size Calculator | Estimate Audio, Video, Image Sizes",
  description:
    "Calculate file sizes for audio, video, and images before recording or converting. Estimate MP3, WAV, MP4, JPG, PNG sizes by duration, resolution, and quality.",
  alternates: {
    canonical: "https://www.filetoolworks.com/file-size-calculator",
  },
  openGraph: {
    title: "File Size Calculator | Estimate File Sizes",
    description:
      "Estimate audio, video, and image file sizes before recording or converting. Free, instant calculations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "File Size Calculator",
    description:
      "Calculate audio, video, and image file sizes. Free, no signup.",
  },
};

const faqs = [
  {
    question: "How accurate are these file size estimates?",
    answer:
      "These are close approximations based on standard encoding parameters. Actual file sizes can vary by 10-20% depending on content complexity, encoder settings, and metadata. Audio estimates are typically the most accurate.",
  },
  {
    question: "How is audio file size calculated?",
    answer:
      "For lossy formats like MP3 and AAC: (bitrate in kbps x duration in seconds) / 8 = size in KB. For uncompressed WAV: sample rate x bit depth x channels x duration / 8. FLAC is roughly 50-60% of the equivalent WAV size.",
  },
  {
    question: "Why do video files vary so much in size?",
    answer:
      "Video file size depends heavily on content complexity. Fast-moving action footage compresses less efficiently than a static presentation. The estimates use average bitrates for each resolution and quality setting.",
  },
  {
    question: "What factors affect image file size?",
    answer:
      "Image file size depends on dimensions (width x height), color depth, format, and compression quality. JPG files are much smaller than PNG at the same dimensions because JPG uses lossy compression. WebP is typically 25-35% smaller than JPG.",
  },
  {
    question: "Can I use this to plan storage needs?",
    answer:
      "Yes. Use the calculator to estimate how much disk space you need for recordings, photo shoots, or video projects. Add 15-20% buffer to the estimates for safety.",
  },
  {
    question: "Is this calculator free?",
    answer:
      "Yes. This file size calculator is completely free with no signup required. All calculations happen instantly in your browser.",
  },
];

export default function FileSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="File Size Calculator"
        description="Calculate file sizes for audio, video, and images before recording or converting. Estimate MP3, WAV, MP4, JPG, PNG sizes instantly."
        slug="file-size-calculator"
        faqs={faqs}
        rating={4.7}
        ratingCount={89432}
      />
      {children}
    </>
  );
}
