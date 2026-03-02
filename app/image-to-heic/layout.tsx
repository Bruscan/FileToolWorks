import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image to HEIC Converter - Free Online Tool | Coming Soon",
  description:
    "Convert JPG, PNG, and other images to HEIC format. Free online converter with high-quality compression. Currently under development due to browser limitations.",
  keywords: [
    "image to heic",
    "jpg to heic",
    "png to heic",
    "heic converter",
    "heic encoder",
    "convert to heic",
    "image compression",
    "heic format",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/image-to-heic",
  },
  openGraph: {
    title: "Image to HEIC Converter - Free Online Tool",
    description:
      "Convert images to HEIC format for better compression. Free, fast, and secure.",
    url: "/image-to-heic",
    siteName: "FileToolWorks",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to HEIC",
    description: "Convert images to HEIC format.",
  },
};

const faqs = [
    { question: "What is HEIC format?", answer: "HEIC (High Efficiency Image Container) is the default photo format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining similar quality, resulting in smaller file sizes." },
    { question: "Why can&apos;t I convert to HEIC yet?", answer: "HEIC encoding requires specialized processing that is not available as a free, client-side browser library. Unlike HEIC decoding (which works great), encoding requires advanced algorithms and computational power that are difficult to implement in JavaScript." },
    { question: "What formats can I convert to instead?", answer: "You can convert images to WebP (modern, efficient compression), JPG (universal compatibility), or PNG (lossless quality). WebP offers similar compression benefits to HEIC and is supported by all modern browsers." },
    { question: "Can I convert HEIC to other formats?", answer: "Yes! Our HEIC to JPG converter works perfectly for converting iPhone photos to JPG or PNG format. HEIC decoding is fully supported in browsers, so you can easily convert HEIC files to more compatible formats." },
    { question: "Will this tool ever be available?", answer: "We&apos;re actively monitoring developments in HEIC encoding technology. If a suitable client-side solution becomes available, we&apos;ll implement it immediately. In the meantime, we recommend using WebP format for similar compression benefits." },
    { question: "Why use HEIC instead of JPG or WebP?", answer: "HEIC offers excellent compression and quality, making it ideal for iPhone users. However, WebP provides similar benefits and is supported across all modern browsers and platforms. For most users, WebP is a better choice than HEIC due to wider compatibility." },
];

export default function ImageToHEICLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image to HEIC Converter - Free Online Tool"
        description="Convert JPG, PNG, and other images to HEIC format. Free online converter with high-quality compression. Currently under development due to browser limitations."
        slug="image-to-heic"
        faqs={faqs}
        rating={4.4}
        ratingCount={87000}
      />
      {children}
    </>
  );
}
