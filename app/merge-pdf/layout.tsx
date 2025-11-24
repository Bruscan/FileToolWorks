import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF | Combine PDFs Free & Fast (No Signup)",
  description: "Merge multiple PDF files into one instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/merge-pdf",
  },
};

export default function MergePDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
