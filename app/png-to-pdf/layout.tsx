import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PNG to PDF Converter | Free Online (No Upload)",
  description: "Convert PNG images to PDF documents instantly in your browser. Combine multiple PNGs into one PDF. Free, no upload to servers, no signup needed.",
  alternates: {
    canonical: "https://www.filetoolworks.com/png-to-pdf",
  },
  openGraph: {
    title: "PNG to PDF Converter",
    description: "Convert PNG images to PDF documents. Combine multiple PNGs into one PDF. Free and private.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to PDF Converter",
    description: "Convert PNG images to PDF documents. Combine multiple PNGs into one PDF. Free and private.",
  },
};

const faqs = [
  { question: "Can I combine multiple PNG images into one PDF?", answer: "Yes. Upload multiple PNG files and they will each become a page in the output PDF. Use the arrow buttons to reorder pages before converting." },
  { question: "Is the image quality preserved?", answer: "Yes. PNG images are embedded in the PDF at their original resolution. The output PDF maintains the full quality of your original images." },
  { question: "Are my files uploaded to a server?", answer: "No. The entire conversion process runs in your browser using JavaScript. Your PNG files never leave your device. No signup or account needed." },
  { question: "What page sizes are available?", answer: "You can choose between A4 (210 x 297mm, international standard) and US Letter (8.5 x 11 inches, North American standard). Both support portrait and landscape orientation." },
  { question: "Is transparency preserved in the PDF?", answer: "PNG transparency is embedded as-is in the PDF. However, how transparency appears depends on the PDF viewer. Most viewers will display transparent areas as white." },
  { question: "What if I have other image formats too?", answer: "This tool accepts PNG files only. If you have JPG, WebP, or other formats, use our Image to PDF tool which accepts all image formats." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PNG to PDF Converter"
        description="Convert PNG images to PDF documents instantly in your browser. Combine multiple PNGs into one PDF. Free, no upload to servers, no signup needed."
        slug="png-to-pdf"
        faqs={faqs}
        rating={4.8}
        ratingCount={134892}
      />
      {children}
    </>
  );
}
