import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs FreeConvert - Free Alternative",
  description:
    "Compare FileToolWorks and FreeConvert. No daily limits, no file uploads, full privacy. See which free file converter is right for you.",
  alternates: {
    canonical: "/vs/freeconvert",
  },
  openGraph: {
    title: "FileToolWorks vs FreeConvert - Free Alternative",
    description:
      "Compare FileToolWorks and FreeConvert. No daily limits, no file uploads, full privacy.",
    url: "https://www.filetoolworks.com/vs/freeconvert",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
