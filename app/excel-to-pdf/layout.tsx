import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel to PDF Converter - Free Online Tool | FileToolWorks",
  description:
    "Convert Excel spreadsheets to PDF instantly. Free Excel to PDF converter for .xls and .xlsx files. No signup required, completely private and secure.",
  keywords: [
    "excel to pdf",
    "convert excel to pdf",
    "xlsx to pdf",
    "xls to pdf",
    "spreadsheet to pdf",
    "excel converter",
    "free excel to pdf",
    "online excel to pdf converter",
  ],
  openGraph: {
    title: "Excel to PDF Converter - Free Online Tool",
    description:
      "Convert Excel spreadsheets to PDF instantly. Free, fast, and secure.",
    type: "website",
  },
  alternates: {
    canonical: "/excel-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
