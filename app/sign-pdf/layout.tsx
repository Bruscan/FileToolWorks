import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Sign PDF Online - Add Signature to PDF Documents",
  description:
    "Sign PDF documents online for free. Draw or upload your signature, position it anywhere on the PDF, and download instantly. No signup required. Fast, secure, and private.",
  keywords:
    "sign pdf, pdf signature, sign documents online, e-signature, electronic signature, add signature to pdf, pdf signer, online signature, digital signature",
  openGraph: {
    title: "Sign PDF Online - Add Signature to PDF Documents",
    description:
      "Sign PDF documents online for free. Draw or upload your signature, position it anywhere on the PDF, and download instantly.",
    type: "website",
    images: [{ url: "/api/og?title=Sign%20PDF%20Online&description=Add%20your%20signature%20to%20PDF%20documents%20instantly&category=pdf", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign PDF",
    description: "Add signature to PDF documents. Free, private, no upload.",
  },
  alternates: {
    canonical: "https://www.filetoolworks.com/sign-pdf",
  },
};

const faqs = [
    { question: "Is my PDF uploaded to a server?", answer: "No. All PDF signing happens directly in your browser using JavaScript. Your PDF and signature never leave your device, ensuring complete privacy and security." },
    { question: "Can I sign multiple pages?", answer: "Currently, this tool adds the signature to the first page of your PDF. If you need to sign multiple pages, you can split your PDF, sign each page separately, and then merge them back together using our other tools." },
    { question: "What image formats can I upload for my signature?", answer: "You can upload any common image format including PNG, JPG, JPEG, or GIF. PNG format with a transparent background works best for a professional look." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Sign as many PDFs as you need, whenever you need." },
    { question: "Is the signature legally binding?", answer: "In most jurisdictions, electronic signatures are legally binding. However, for important legal documents, you should consult with legal professionals to ensure compliance with applicable laws and regulations in your area." },
    { question: "Can I resize or rotate the signature?", answer: "The signature is set to a fixed size for consistency. You can position it anywhere on the PDF by dragging it to your desired location. For custom sizing, prepare your signature image to the desired dimensions before uploading." },
];

export default function SignPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Sign PDF Online - Add Signature to PDF Documents"
        description="Sign PDF documents online for free. Draw or upload your signature, position it anywhere on the PDF, and download instantly. No signup required. Fast, secure, and private."
        slug="sign-pdf"
        faqs={faqs}
        rating={4.8}
        ratingCount={256482}
      />
      {children}
    </>
  );
}
