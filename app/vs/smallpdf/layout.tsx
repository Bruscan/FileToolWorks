import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Smallpdf - Free Alternative",
  description:
    "Compare FileToolWorks and Smallpdf. No 2-task daily limit, no signup, no file size cap. See which free PDF and file tool is right for you.",
  alternates: {
    canonical: "/vs/smallpdf",
  },
  openGraph: {
    title: "FileToolWorks vs Smallpdf - Free Alternative",
    description:
      "Compare FileToolWorks and Smallpdf. No 2-task daily limit, no signup, no file size cap.",
    url: "https://www.filetoolworks.com/vs/smallpdf",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
