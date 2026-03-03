import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Online-Convert - Free Alternative",
  description:
    "Compare FileToolWorks and Online-Convert. Browser-based processing with no file uploads, no daily limits, and no signup. See the full comparison.",
  alternates: {
    canonical: "https://www.filetoolworks.com/vs/online-convert",
  },
  openGraph: {
    title: "FileToolWorks vs Online-Convert - Free Alternative",
    description:
      "Compare FileToolWorks and Online-Convert. Browser-based, no uploads, no limits.",
    url: "https://www.filetoolworks.com/vs/online-convert",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
