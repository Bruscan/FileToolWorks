import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs PDF24 - Free Alternative",
  description:
    "Compare FileToolWorks and PDF24 Tools. Browser-based privacy, no file uploads, plus image, video and audio tools PDF24 lacks.",
  alternates: {
    canonical: "https://www.filetoolworks.com/vs/pdf24",
  },
  openGraph: {
    title: "FileToolWorks vs PDF24 - Free Alternative",
    description:
      "Compare FileToolWorks and PDF24 Tools. Browser-based privacy, no file uploads, plus 30+ non-PDF tools.",
    url: "https://www.filetoolworks.com/vs/pdf24",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
