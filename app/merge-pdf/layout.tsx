import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Merge PDF | Combine PDFs Free & Fast (No Signup)",
  description: "Merge multiple PDF files into one instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "https://www.filetoolworks.com/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document. Free.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document. Free.",
  },
};

const faqs = [
    { question: "How many PDF files can I merge at once?", answer: "You can merge as many PDF files as you want. There is no limit to the number of files. All processing happens in your browser, so the only limitation is your device memory." },
    { question: "Is there a file size limit?", answer: "No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device capabilities." },
    { question: "Are my PDF files uploaded to a server?", answer: "No. All merging happens directly in your browser using JavaScript. Your PDF files never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Merge as many PDFs as you need, whenever you need." },
    { question: "Will the quality of my PDFs be preserved?", answer: "Yes. The merging process preserves the original quality of all your PDF files. Text, images, and formatting remain exactly as they were in the original documents." },
    { question: "Can I change the order of PDFs before merging?", answer: "Yes. Use the up and down arrow buttons next to each file to reorder them. The numbers show the order in which PDFs will be merged. Arrange them however you like before clicking merge." },
];

export default function MergePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Merge PDF"
        description="Merge multiple PDF files into one instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="merge-pdf"
        faqs={faqs}
        rating={4.8}
        ratingCount={156234}
      />
      {children}
    </>
  );
}
