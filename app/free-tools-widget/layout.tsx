import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free File Converter Widgets - Embed on Your Website",
  description:
    "Add free file conversion tools to your website. Embeddable audio compressor, image converter, PDF tools, and more. No API key needed.",
  alternates: {
    canonical: "https://www.filetoolworks.com/free-tools-widget",
  },
  openGraph: {
    title: "Free File Converter Widgets for Your Website",
    description:
      "Embed free file conversion tools on your website. Audio compressor, image converter, PDF merger, and 30+ tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free File Converter Widgets",
    description:
      "Embed free file conversion tools on your website. No API key needed.",
  },
};

export default function FreeToolsWidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
