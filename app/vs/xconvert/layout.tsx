import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs XConvert - Free Alternative",
  description:
    "Compare FileToolWorks and XConvert for audio compression and file conversion. Browser-based privacy, no signup, no daily limits.",
  alternates: {
    canonical: "/vs/xconvert",
  },
  openGraph: {
    title: "FileToolWorks vs XConvert - Free Alternative",
    description:
      "Compare FileToolWorks and XConvert. Browser-based privacy, no signup, no limits.",
    url: "https://www.filetoolworks.com/vs/xconvert",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
