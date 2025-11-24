import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
  description:
    "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
  keywords: [
    "ppt to pdf",
    "powerpoint to pdf",
    "pptx to pdf converter",
    "convert ppt to pdf online",
    "free powerpoint to pdf",
    "presentation to pdf",
    "ppt converter",
    "powerpoint converter",
  ],
  openGraph: {
    title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
    description:
      "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
    description:
      "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
  },
  alternates: {
    canonical: "/ppt-to-pdf",
  },
};

export default function PPTToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
