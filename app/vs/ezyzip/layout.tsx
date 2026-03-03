import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs ezyZip - Free Alternative Comparison",
  description:
    "Compare FileToolWorks and ezyZip. FileToolWorks is 100% free with 40+ tools. ezyZip has broader archive support but uses a freemium model with ads.",
  alternates: {
    canonical: "/vs/ezyzip",
  },
  openGraph: {
    title: "FileToolWorks vs ezyZip - Free Alternative Comparison",
    description:
      "Compare FileToolWorks and ezyZip for free online file conversion. See features, pricing, and privacy differences.",
    url: "https://www.filetoolworks.com/vs/ezyzip",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
