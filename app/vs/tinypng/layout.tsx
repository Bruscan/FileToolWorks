import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs TinyPNG - Free Alternative",
  description:
    "Compare FileToolWorks and TinyPNG for image compression and conversion. No signup, no daily limits, complete browser privacy.",
  alternates: {
    canonical: "/vs/tinypng",
  },
  openGraph: {
    title: "FileToolWorks vs TinyPNG - Free Alternative",
    description:
      "Compare FileToolWorks and TinyPNG for image compression. No signup, no daily limits, browser-based privacy.",
    url: "https://www.filetoolworks.com/vs/tinypng",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
