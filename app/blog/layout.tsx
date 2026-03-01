import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | FileToolWorks - File Conversion Tips and Guides",
  description:
    "Practical guides on file conversion, image formats, audio compression, PDF editing, and video processing. No fluff, just answers.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
