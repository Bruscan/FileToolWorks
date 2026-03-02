import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Format Comparisons - 150+ Formats Compared Side by Side",
  description:
    "Compare 150+ file formats side by side. Audio, image, video, document, and archive format comparisons with detailed breakdowns. Find the right format for your project.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compare",
  },
  openGraph: {
    title: "File Format Comparisons - 150+ Formats Compared Side by Side",
    description:
      "Compare 150+ file formats side by side. Audio, image, video, document, and archive format comparisons with detailed breakdowns.",
    url: "https://www.filetoolworks.com/compare",
    type: "website",
    siteName: "FileToolWorks",
  },
  twitter: {
    card: "summary_large_image",
    title: "File Format Comparisons - 150+ Formats Compared",
    description:
      "Compare 150+ file formats side by side. Audio, image, video, document, and archive format comparisons.",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
