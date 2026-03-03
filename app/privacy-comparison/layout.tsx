import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Converter Privacy Comparison - Who Uploads Your Files?",
  description:
    "Factual comparison of how 15+ file converters handle your data. See which upload files to servers, which process locally, and how to verify safety yourself.",
  alternates: {
    canonical: "https://www.filetoolworks.com/privacy-comparison",
  },
  openGraph: {
    title: "File Converter Privacy Comparison - Who Uploads Your Files?",
    description:
      "Factual comparison of how 15+ file converters handle your data. See which upload to servers vs process locally.",
    url: "https://www.filetoolworks.com/privacy-comparison",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
