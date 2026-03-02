import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FileToolWorks vs CloudConvert - Free Alternative",
  description:
    "Compare FileToolWorks and CloudConvert. Unlimited free conversions, no account needed, files never leave your device. Full comparison.",
  alternates: {
    canonical: "/vs/cloudconvert",
  },
  openGraph: {
    title: "FileToolWorks vs CloudConvert - Free Alternative",
    description:
      "Compare FileToolWorks and CloudConvert. Unlimited free conversions, no account needed, files never leave your device.",
    url: "https://www.filetoolworks.com/vs/cloudconvert",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
