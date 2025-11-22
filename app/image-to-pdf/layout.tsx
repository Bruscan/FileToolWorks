import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter | Free & Fast (No Signup)",
  description: "Convert JPG, PNG, HEIC to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/image-to-pdf",
  },
  openGraph: {
    title: "Image to PDF Converter | Free & Fast",
    description: "Convert images to PDF instantly. Free, secure, no signup.",
    type: "website",
  },
};

export default function ImageToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
