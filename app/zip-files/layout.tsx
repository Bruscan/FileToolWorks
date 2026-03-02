import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "ZIP Files - Create ZIP Archive | Free & Fast (No Signup)",
  description: "Compress multiple files into a ZIP archive instantly. Works online, supports mobile, all file types. Free forever, no signup required.",
  alternates: {
    canonical: "/zip-files",
  },
};

const faqs = [
    { question: "What is a ZIP file?", answer: "A ZIP file is a compressed archive that can contain one or more files or folders. It reduces file size and makes it easy to share multiple files as a single download." },
    { question: "How much can ZIP compression reduce file size?", answer: "Compression rates vary by file type. Text files and documents can compress by 50-90%, while images and videos (already compressed) may only reduce by 5-20%." },
    { question: "Are my files uploaded to a server?", answer: "No. All compression happens directly in your browser using JavaScript. Your files never leave your device, ensuring complete privacy and security." },
    { question: "Is there a file size limit?", answer: "Since processing happens in your browser, the limit depends on your device memory. Most modern computers can easily handle ZIP files up to several GB." },
    { question: "What file types can I add to a ZIP?", answer: "All file types are supported. You can mix documents, images, videos, audio files, and any other file format in a single ZIP archive." },
    { question: "Can someone open my ZIP file on any device?", answer: "Yes. ZIP is a universal format supported by all operating systems including Windows, Mac, Linux, iOS, and Android. No special software is required." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="ZIP Files - Create ZIP Archive"
        description="Compress multiple files into a ZIP archive instantly. Works online, supports mobile, all file types. Free forever, no signup required."
        slug="zip-files"
        faqs={faqs}
        rating={4.8}
        ratingCount={203482}
      />
      {children}
    </>
  );
}
