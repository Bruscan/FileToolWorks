import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Background from Images - AI Background Remover | FileToolWorks",
  description:
    "Remove image backgrounds automatically with AI. Free online tool to remove background from photos of people, products, animals, and objects. Get transparent PNG files instantly.",
  keywords: [
    "remove background",
    "background remover",
    "remove image background",
    "transparent background",
    "background removal",
    "AI background remover",
    "remove bg",
    "cutout image",
    "transparent PNG",
    "product photos",
    "remove photo background",
    "background eraser",
    "online background remover",
    "free background removal",
  ],
  openGraph: {
    title: "Remove Background from Images - AI Background Remover",
    description:
      "Remove image backgrounds automatically with AI. Free online tool to remove background from photos of people, products, animals, and objects. Get transparent PNG files instantly.",
    type: "website",
  },
  alternates: {
    canonical: "/remove-background",
  },
};

export default function RemoveBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
