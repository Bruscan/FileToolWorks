import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF | Free & Fast (No Signup)",
  description: "Split PDF into separate pages or ranges instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/split-pdf",
  },
};

export default function SplitPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
