import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Format Comparisons - 150+ Formats Compared Side by Side",
  description:
    "Compare 150+ file formats side by side. Audio, image, video, document, and archive format comparisons with detailed breakdowns. Find the right format for your project.",
  alternates: {
    canonical: "/compare",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
