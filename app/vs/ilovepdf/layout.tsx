import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs iLovePDF - Free Alternative",
  description:
    "Compare FileToolWorks and iLovePDF for PDF tools. No signup, no daily limits, all processing in your browser. See the full comparison.",
  alternates: {
    canonical: "https://www.filetoolworks.com/vs/ilovepdf",
  },
  openGraph: {
    title: "FileToolWorks vs iLovePDF - Free Alternative",
    description:
      "Compare FileToolWorks and iLovePDF for PDF tools. No signup, no daily limits, all processing in your browser.",
    url: "https://www.filetoolworks.com/vs/ilovepdf",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
