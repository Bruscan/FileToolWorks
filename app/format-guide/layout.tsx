import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "What File Format Should I Use? Interactive Guide",
  description:
    "Answer 3 quick questions to find the best file format for your needs. Covers image, audio, video, and document formats with conversion tool recommendations.",
  alternates: {
    canonical: "/format-guide",
  },
  openGraph: {
    title: "What File Format Should I Use? Interactive Guide",
    description:
      "Answer 3 quick questions to find the best image, audio, video, or document format for your needs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What File Format Should I Use?",
    description:
      "Interactive guide to choosing the right file format. Answer 3 questions, get a recommendation.",
  },
};

const faqs = [
  {
    question: "How does the format guide work?",
    answer:
      "You pick a category (image, audio, video, or document), answer 2-3 questions about your use case, and get a specific format recommendation with an explanation of why it fits your needs.",
  },
  {
    question: "What image format should I use for the web?",
    answer:
      "WebP is the best choice for web images in most cases. It offers 25-35% smaller files than JPG with similar quality and supports transparency. Use PNG only when you need pixel-perfect lossless quality or transparency with older browser support.",
  },
  {
    question: "What audio format is best for streaming?",
    answer:
      "AAC at 128-256kbps is ideal for streaming. It offers better quality than MP3 at the same bitrate and is supported by all modern devices. For podcasts, MP3 at 128kbps remains the safest choice for maximum compatibility.",
  },
  {
    question: "What video format works on all devices?",
    answer:
      "MP4 with H.264 video and AAC audio is the most universally compatible video format. It plays on virtually every device, browser, and media player. Use it whenever you need maximum compatibility.",
  },
  {
    question: "When should I use lossless vs lossy formats?",
    answer:
      "Use lossless formats (PNG, FLAC, WAV) when you need to edit files later or preserve every detail. Use lossy formats (JPG, MP3, MP4) for sharing, streaming, and storage savings. Lossy files are 50-90% smaller with minimal visible or audible difference.",
  },
  {
    question: "Is this guide free to use?",
    answer:
      "Yes, completely free with no signup required. The guide runs in your browser and gives instant recommendations based on your answers.",
  },
];

export default function FormatGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="File Format Guide"
        description="Interactive guide to choosing the right file format. Answer a few questions about your use case and get a personalized format recommendation."
        slug="format-guide"
        faqs={faqs}
        rating={4.8}
        ratingCount={76543}
      />
      {children}
    </>
  );
}
