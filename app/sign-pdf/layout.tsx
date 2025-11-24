import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign PDF Online - Add Signature to PDF Documents | FileToolWorks",
  description:
    "Sign PDF documents online for free. Draw or upload your signature, position it anywhere on the PDF, and download instantly. No signup required. Fast, secure, and private.",
  keywords:
    "sign pdf, pdf signature, sign documents online, e-signature, electronic signature, add signature to pdf, pdf signer, online signature, digital signature",
  openGraph: {
    title: "Sign PDF Online - Add Signature to PDF Documents",
    description:
      "Sign PDF documents online for free. Draw or upload your signature, position it anywhere on the PDF, and download instantly.",
    type: "website",
  },
  alternates: {
    canonical: "/sign-pdf",
  },
};

export default function SignPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
