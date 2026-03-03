import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs PowerCompress - Free Alternative Comparison",
  description:
    "Compare FileToolWorks and PowerCompress for free browser-based file compression. Both are client-side and free, but FileToolWorks has 40+ tools vs PowerCompress's 10.",
  alternates: {
    canonical: "/vs/powercompress",
  },
  openGraph: {
    title: "FileToolWorks vs PowerCompress - Free Alternative Comparison",
    description:
      "Compare FileToolWorks and PowerCompress. Both free, both browser-based. See which has more tools and features.",
    url: "https://www.filetoolworks.com/vs/powercompress",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
