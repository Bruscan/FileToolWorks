import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Unzip Files Online - Free ZIP Extractor | FileToolWorks",
  description:
    "Extract files from ZIP archives online. Free ZIP extractor with no file size limits. View all files, check sizes, and download individually or all at once. Secure and private.",
  keywords:
    "unzip files, extract zip, zip extractor, unzip online, extract files from zip, free zip extractor, open zip file",
  openGraph: {
    title: "Unzip Files Online - Free ZIP Extractor",
    description:
      "Extract files from ZIP archives instantly. Free, secure, and no file size limits.",
    type: "website",
  },
  alternates: {
    canonical: "/unzip-files",
  },
};

const faqs = [
    { question: "How do I extract files from a ZIP archive?", answer: "Simply upload your ZIP file, click &quot;Extract Files&quot;, and all contents will be extracted. You can then download individual files or all files at once." },
    { question: "Are my files uploaded to a server?", answer: "No. All extraction happens directly in your browser using JavaScript. Your files never leave your device, ensuring complete privacy and security." },
    { question: "What file types can be inside the ZIP?", answer: "All file types are supported. ZIP archives can contain any type of file including documents, images, videos, audio files, and more." },
    { question: "Is there a file size limit?", answer: "Since processing happens in your browser, the limit depends on your device memory. Most modern computers can easily handle ZIP files up to several GB." },
    { question: "Will folder structure be preserved?", answer: "Yes. The tool displays the full path of each file in the archive, preserving the original folder structure. File names show the complete path from the ZIP root." },
    { question: "Can I extract password-protected ZIP files?", answer: "Currently, password-protected or encrypted ZIP files are not supported. Only standard ZIP archives can be extracted. Remove the password protection before uploading." },
];

export default function UnzipFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Unzip Files Online - Free ZIP Extractor"
        description="Extract files from ZIP archives online. Free ZIP extractor with no file size limits. View all files, check sizes, and download individually or all at once. Secure and private."
        slug="unzip-files"
        faqs={faqs}
        rating={4.7}
        ratingCount={189423}
      />
      {children}
    </>
  );
}
