import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unzip Files Online - Free ZIP Extractor | FileToolWorks",
  description:
    "Extract files from ZIP archives online. Free ZIP extractor with no file size limits. View all files, check sizes, and download individually or all at once. Secure and private.",
  keywords:
    "unzip files, extract zip, zip extractor, unzip online, extract files from zip, free zip extractor, open zip file",
  openGraph: {
    title: "Unzip Files Online - Free ZIP Extractor",
    description:
      "Extract files from ZIP archives instantly. Free, secure, and no file size limits.",
    type: "website",
  },
  alternates: {
    canonical: "/unzip-files",
  },
};

export default function UnzipFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
