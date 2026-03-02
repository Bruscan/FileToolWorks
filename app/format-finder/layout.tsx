import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Format Finder - What Format Should I Use?",
  description:
    "Answer 3 quick questions to find the best file format for your needs. Get recommendations for image, audio, video, and document formats with free conversion tools.",
  alternates: {
    canonical: "https://www.filetoolworks.com/format-finder",
  },
  openGraph: {
    title: "File Format Finder - What Format Should I Use?",
    description:
      "Answer 3 quick questions to find the best file format for your needs. Free interactive tool with instant format recommendations.",
    url: "https://www.filetoolworks.com/format-finder",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function FormatFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
