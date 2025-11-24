import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to HEIC Converter - Free Online Tool | Coming Soon",
  description:
    "Convert JPG, PNG, and other images to HEIC format. Free online converter with high-quality compression. Currently under development due to browser limitations.",
  keywords: [
    "image to heic",
    "jpg to heic",
    "png to heic",
    "heic converter",
    "heic encoder",
    "convert to heic",
    "image compression",
    "heic format",
  ],
  alternates: {
    canonical: "/image-to-heic",
  },
  openGraph: {
    title: "Image to HEIC Converter - Free Online Tool",
    description:
      "Convert images to HEIC format for better compression. Free, fast, and secure.",
    url: "/image-to-heic",
    siteName: "FileToolWorks",
    locale: "en_US",
    type: "website",
  },
};

export default function ImageToHEICLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
