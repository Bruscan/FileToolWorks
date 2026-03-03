import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Converter Privacy & Safety Comparison 2026 - Who Uploads Your Files?",
  description:
    "Compare 21 file converters on privacy and safety. See which upload files to servers, which process locally in your browser, and how to verify safety yourself.",
  alternates: {
    canonical: "https://www.filetoolworks.com/privacy-comparison",
  },
  openGraph: {
    title: "File Converter Privacy & Safety Comparison 2026 - Who Uploads Your Files?",
    description:
      "Compare 21 file converters on privacy and safety. See which upload to servers vs process locally in your browser.",
    url: "https://www.filetoolworks.com/privacy-comparison",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
