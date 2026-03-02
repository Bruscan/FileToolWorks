import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs Media.io - Free Alternative",
  description:
    "Compare FileToolWorks and Media.io for audio compression, video conversion, and image editing. No signup, no uploads, completely free.",
  alternates: {
    canonical: "/vs/media-io",
  },
  openGraph: {
    title: "FileToolWorks vs Media.io - Free Alternative",
    description:
      "Compare FileToolWorks and Media.io. No signup, no uploads, completely free.",
    url: "https://www.filetoolworks.com/vs/media-io",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
