import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Adobe Acrobat - Free Alternative",
  description:
    "Compare FileToolWorks and Adobe Acrobat Online. 100% free PDF tools with no signup, no file limits, and browser-based privacy.",
  alternates: {
    canonical: "https://www.filetoolworks.com/vs/adobe-acrobat",
  },
  openGraph: {
    title: "FileToolWorks vs Adobe Acrobat - Free Alternative",
    description:
      "Compare FileToolWorks and Adobe Acrobat Online. 100% free PDF tools with no signup and no file limits.",
    url: "https://www.filetoolworks.com/vs/adobe-acrobat",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
