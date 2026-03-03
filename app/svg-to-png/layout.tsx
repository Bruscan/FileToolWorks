import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "SVG to PNG Converter | Free Online (No Upload)",
  description: "Convert SVG vector files to PNG images instantly in your browser. Choose 1x, 2x, 3x or 4x scale. Free, no upload to servers, no signup. Preserves transparency.",
  alternates: {
    canonical: "https://www.filetoolworks.com/svg-to-png",
  },
  openGraph: {
    title: "SVG to PNG Converter",
    description: "Convert SVG vector files to high-quality PNG images. Free, private, no upload.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter",
    description: "Convert SVG vector files to high-quality PNG images. Free, private, no upload.",
  },
};

const faqs = [
  { question: "Why convert SVG to PNG?", answer: "SVG is a vector format that not all applications support. PNG is a universal raster format that works everywhere - social media, email, documents, presentations. Converting SVG to PNG ensures compatibility while preserving transparency." },
  { question: "What does the scale option do?", answer: "Scale controls the output resolution. A 100x100 SVG at 1x becomes a 100x100 PNG. At 2x, it becomes 200x200 PNG with sharper details. Use 2x for retina/HiDPI displays, 3x or 4x for print or when you need high-resolution output." },
  { question: "Is transparency preserved?", answer: "Yes. PNG supports transparency, so any transparent areas in your SVG will remain transparent in the PNG output. This is one advantage of PNG over JPG for SVG conversion." },
  { question: "Are my files uploaded to a server?", answer: "No. All conversion happens directly in your browser using the Canvas API. Your SVG files never leave your device, ensuring complete privacy. No signup or account needed." },
  { question: "Can I convert multiple SVG files at once?", answer: "Yes. Upload as many SVG files as you need and they will all be converted with the same scale setting. Download them individually or use Download All to get them all." },
  { question: "What SVG features are supported?", answer: "This tool uses your browser's native SVG rendering engine, so it supports all standard SVG features including paths, shapes, gradients, filters, and text. External fonts or images referenced by URL may not render if they require network access." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="SVG to PNG Converter"
        description="Convert SVG vector files to PNG images instantly in your browser. Choose 1x, 2x, 3x or 4x scale. Free, no upload to servers, no signup. Preserves transparency."
        slug="svg-to-png"
        faqs={faqs}
        rating={4.7}
        ratingCount={89214}
      />
      {children}
    </>
  );
}
