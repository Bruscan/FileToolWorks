import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blur Image - Apply Blur Effect Online Free | FileToolWorks",
  description:
    "Apply blur effect to images instantly. Free online tool to blur photos with adjustable intensity from 0-20px. Perfect for censoring, background effects, and privacy protection. No signup required.",
  keywords: [
    "blur image",
    "blur photo",
    "blur picture online",
    "image blur tool",
    "photo blur effect",
    "blur background",
    "censor image",
    "blur faces",
    "privacy blur",
    "blur online free",
  ],
  alternates: {
    canonical: "/blur-image",
  },
  openGraph: {
    title: "Blur Image - Apply Blur Effect Online Free",
    description:
      "Apply blur effect to images with adjustable intensity. Free, fast, and secure browser-based tool.",
    type: "website",
    url: "/blur-image",
  },
};

export default function BlurImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
