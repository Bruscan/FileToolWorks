import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Zamzar - Free Alternative",
  description:
    "Compare FileToolWorks and Zamzar for free online file conversion. No 50MB limit, no 2-file cap, no signup. See the full comparison.",
  alternates: {
    canonical: "/vs/zamzar",
  },
  openGraph: {
    title: "FileToolWorks vs Zamzar - Free Alternative",
    description:
      "Compare FileToolWorks and Zamzar for free online file conversion. No 50MB limit, no 2-file cap, no signup.",
    url: "https://www.filetoolworks.com/vs/zamzar",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
