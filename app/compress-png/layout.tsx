import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Compress PNG | Reduce PNG File Size Online Free",
  description: "Compress PNG images online for free. Reduce file size while keeping transparency. No upload, no signup - runs entirely in your browser.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-png",
  },
  openGraph: {
    title: "Compress PNG Online Free",
    description: "Reduce PNG file size while keeping transparency. Free, no signup.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PNG Online Free",
    description: "Reduce PNG file size while keeping transparency. Free, no signup.",
  },
};

const faqs = [
  { question: "How does PNG compression work?", answer: "PNG uses lossless compression by default, so traditional compression keeps quality identical. Our tool reduces file size by stripping unnecessary metadata, optimizing the image data, and optionally resizing. You can also convert to JPG or WebP for much smaller files if you don't need transparency." },
  { question: "Will compressing my PNG lose transparency?", answer: "No. When you output as PNG, transparency is fully preserved. If you convert to JPG, transparency will be replaced with a white background since JPG does not support transparency." },
  { question: "Are my PNG files uploaded to a server?", answer: "No. All processing happens directly in your browser. Your images never leave your device. We never see, store, or access your files." },
  { question: "Why is my compressed PNG still large?", answer: "PNG is a lossless format, so it cannot be compressed as aggressively as JPG. For maximum size reduction, try resizing to 75% or 50%, or convert to JPG or WebP format. Our tool can also strip metadata which often reduces size by 5-15%." },
  { question: "Should I convert my PNG to JPG for smaller files?", answer: "If your image has no transparency and is a photo, converting to JPG will dramatically reduce file size (often 80-90% smaller). Use the output format option to convert. If you need transparency, keep PNG or try WebP." },
  { question: "Can I compress multiple PNG files at once?", answer: "Yes. Upload as many PNG files as you want and they will all be processed with the same settings. Download individually or use the Download All button." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Compress PNG"
        description="Compress PNG images online for free. Reduce file size while keeping transparency. No upload, no signup - runs entirely in your browser."
        slug="compress-png"
        faqs={faqs}
        rating={4.7}
        ratingCount={198432}
      />
      {children}
    </>
  );
}
