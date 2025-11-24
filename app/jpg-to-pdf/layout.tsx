import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Converter | Free & Fast (No Signup)",
  description: "Convert JPG and JPEG images to PDF instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/jpg-to-pdf",
  },
  openGraph: {
    title: "JPG to PDF Converter | Free & Fast",
    description: "Convert JPG to PDF instantly. Free, secure, no signup.",
    type: "website",
  },
};

export default function JpgToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
