import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
  description:
    "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
  keywords: [
    "ppt to pdf",
    "powerpoint to pdf",
    "pptx to pdf converter",
    "convert ppt to pdf online",
    "free powerpoint to pdf",
    "presentation to pdf",
    "ppt converter",
    "powerpoint converter",
  ],
  openGraph: {
    title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
    description:
      "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PowerPoint to PDF Converter - Convert PPT to PDF Online Free",
    description:
      "Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly.",
  },
  alternates: {
    canonical: "https://www.filetoolworks.com/ppt-to-pdf",
  },
};

const faqs = [
    { question: "When will this tool be available?", answer: "We are actively developing server infrastructure for PowerPoint conversion. Join our waitlist above to receive an email notification when the tool launches." },
    { question: "Will the conversion be free?", answer: "Yes. Like all our tools, PowerPoint to PDF conversion will be completely free with no signup required. We may introduce optional premium features in the future for advanced users." },
    { question: "Why cannot this work in the browser?", answer: "PowerPoint files have complex structures including custom fonts, embedded media, animations, and transitions. There are no robust JavaScript libraries that can accurately parse and render PowerPoint presentations in browsers. Server-side processing with specialized engines is required for quality results." },
    { question: "Will my presentations be stored on your servers?", answer: "No. Just like our PDF to Word converter, your files will be processed and immediately deleted. We do not store any uploaded presentations or converted PDFs on our servers." },
    { question: "What PowerPoint formats will be supported?", answer: "We plan to support both modern PPTX files and legacy PPT files. The conversion will preserve formatting, fonts, images, charts, and layouts. Animations and transitions will be rendered as static slides." },
    { question: "Can I use alternative tools in the meantime?", answer: "Absolutely. We recommend using PowerPoint&apos;s built-in Save as PDF feature, Google Slides, or services like CloudConvert for your immediate conversion needs. See the &quot;Need to Convert PowerPoint Now?&quot; section above for detailed alternatives." },
];

export default function PPTToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="PowerPoint to PDF Converter - Convert PPT to PDF Online Free"
        description="Convert PowerPoint presentations to PDF online. Free PPT to PDF converter with formatting preservation. Transform PPTX files to high-quality PDF documents instantly."
        slug="ppt-to-pdf"
        faqs={faqs}
        rating={4.6}
        ratingCount={176842}
      />
      {children}
    </>
  );
}
