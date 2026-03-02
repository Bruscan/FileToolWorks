import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Convertio - Free Alternative",
  description:
    "Compare FileToolWorks and Convertio. No signup, no file limits, browser-based privacy. See which free file converter is right for you.",
  alternates: {
    canonical: "/vs/convertio",
  },
  openGraph: {
    title: "FileToolWorks vs Convertio - Free Alternative",
    description:
      "Compare FileToolWorks and Convertio. No signup, no file limits, browser-based privacy.",
    url: "https://www.filetoolworks.com/vs/convertio",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
