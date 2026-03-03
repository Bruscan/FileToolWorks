import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is My File Converter Safe? Free Safety Checker",
  description:
    "Check if your file converter is safe with our free safety checker. Based on the FBI warning about malicious file converters. Score any tool on 10 safety criteria.",
  keywords: [
    "is my file converter safe",
    "safe file converter",
    "file converter safety",
    "FBI file converter warning",
    "file converter malware",
    "safe online converter",
    "is convertio safe",
    "is zamzar safe",
    "is freeconvert safe",
    "file converter security check",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/is-my-converter-safe",
  },
  openGraph: {
    title: "Is My File Converter Safe? Free Safety Checker",
    description:
      "Check if your file converter is safe. Based on the FBI warning about malicious converters. Score any tool on 10 criteria.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is My File Converter Safe?",
    description:
      "Free safety checker for file converters. Based on FBI warning about malicious tools.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
