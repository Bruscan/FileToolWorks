import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs HandBrake - Free Online Alternative",
  description:
    "Compare FileToolWorks and HandBrake for video conversion and compression. No download needed, works in your browser instantly.",
  alternates: {
    canonical: "/vs/handbrake",
  },
  openGraph: {
    title: "FileToolWorks vs HandBrake - Free Online Alternative",
    description:
      "Compare FileToolWorks and HandBrake for video tools. No download, works in your browser instantly.",
    url: "https://www.filetoolworks.com/vs/handbrake",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
