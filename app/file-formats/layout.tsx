import { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Format Reference Guide | 60+ Formats Explained",
  description:
    "Complete reference for 60+ file formats. Audio, video, image, document, and archive formats with extensions, use cases, and free conversion tools.",
  alternates: {
    canonical: "https://www.filetoolworks.com/file-formats",
  },
  openGraph: {
    title: "File Format Reference Guide | 60+ Formats Explained",
    description:
      "Complete reference for 60+ file formats. Audio, video, image, document, and archive formats with extensions, use cases, and free conversion tools.",
    url: "https://www.filetoolworks.com/file-formats",
    siteName: "FileToolWorks",
    type: "website",
  },
};

export default function FileFormatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "File Format Reference Guide - 60+ Formats Explained",
    description:
      "Complete reference for 60+ file formats including audio, video, image, document, and archive formats.",
    url: "https://www.filetoolworks.com/file-formats",
    author: {
      "@type": "Organization",
      name: "FileToolWorks",
      url: "https://www.filetoolworks.com",
    },
    publisher: {
      "@type": "Organization",
      name: "FileToolWorks",
      url: "https://www.filetoolworks.com",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.filetoolworks.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "File Format Reference",
        item: "https://www.filetoolworks.com/file-formats",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
