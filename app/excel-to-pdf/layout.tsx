import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

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
  twitter: {
    card: "summary_large_image",
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format. Free.",
  },
  alternates: {
    canonical: "/excel-to-pdf",
  },
};

const faqs = [
    { question: "What Excel formats are supported?", answer: "We support both .xls (Excel 97-2003) and .xlsx (Excel 2007 and later) file formats. Both formats will be converted to PDF with proper formatting." },
    { question: "Which sheet gets converted to PDF?", answer: "The converter uses the first sheet (leftmost tab) in your Excel workbook. If you need a different sheet converted, move it to the first position before converting." },
    { question: "Are my files uploaded to a server?", answer: "No. All conversion happens directly in your browser using JavaScript. Your Excel files never leave your device, ensuring complete privacy and security." },
    { question: "Will formulas and formatting be preserved?", answer: "The PDF will show the calculated values from formulas (not the formulas themselves). Basic formatting like cell content is preserved. Complex formatting like colors and borders may vary." },
    { question: "Is there a file size limit?", answer: "Since processing happens in your browser, there are no server-side limits. However, very large spreadsheets with thousands of rows may take longer to process depending on your device." },
    { question: "Can I convert password-protected Excel files?", answer: "No. Password-protected or encrypted Excel files cannot be converted. You will need to remove the password protection in Excel first before converting to PDF." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Excel to PDF Converter - Free Online Tool"
        description="Convert Excel spreadsheets to PDF instantly. Free Excel to PDF converter for .xls and .xlsx files. No signup required, completely private and secure."
        slug="excel-to-pdf"
        faqs={faqs}
        rating={4.5}
        ratingCount={234128}
      />
      {children}
    </>
  );
}
