import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "JPG to PNG Converter | Free & Fast (No Signup)",
  description: "Convert JPG images to PNG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/jpg-to-png",
  },
  openGraph: {
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format with transparency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter",
    description: "Convert JPG images to PNG format with transparency.",
  },
};

const faqs = [
    { question: "Why convert JPG to PNG?", answer: "PNG format supports transparency and provides lossless compression, making it ideal for graphics, logos, and images that need transparent backgrounds. PNG is also better for images with text or sharp edges." },
    { question: "Will the image quality improve?", answer: "Converting JPG to PNG will not improve the original quality, but it will prevent further quality loss. PNG uses lossless compression, so once converted, you can edit and save the image multiple times without degradation." },
    { question: "Are my images uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security." },
    { question: "Is this tool free to use?", answer: "Yes. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I convert multiple JPG files at once?", answer: "Yes. Upload multiple JPG files and they will all be converted to PNG. You can download them individually or all at once using the Download All button." },
    { question: "Will the PNG file be larger than the JPG?", answer: "Usually yes. PNG uses lossless compression while JPG uses lossy compression. The PNG file will typically be larger because it preserves more image data, but you can reduce the size by choosing a smaller resize option." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="JPG to PNG Converter"
        description="Convert JPG images to PNG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="jpg-to-png"
        faqs={faqs}
        rating={4.6}
        ratingCount={142857}
      />
      {children}
    </>
  );
}
