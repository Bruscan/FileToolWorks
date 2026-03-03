import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Size Limits by Platform (2026) | Email, Discord, WhatsApp, Social Media",
  description:
    "Complete reference of file upload size limits for Gmail, Outlook, Discord, WhatsApp, Telegram, Slack, Instagram, TikTok, and 40+ more platforms. Updated for 2026.",
  alternates: {
    canonical: "https://www.filetoolworks.com/file-size-limits",
  },
  openGraph: {
    title: "File Size Limits by Platform (2026)",
    description:
      "The definitive guide to file upload size limits across 50+ platforms. Email, messaging, social media, cloud storage, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "File Size Limits by Platform (2026)",
    description:
      "Complete reference: upload limits for Gmail, Discord, WhatsApp, Instagram, and 40+ more platforms.",
  },
};

const faqs = [
  {
    question: "Which email provider has the largest attachment limit?",
    answer:
      "Most major email providers allow 25MB attachments (Gmail, Yahoo, iCloud Mail). ProtonMail also allows 25MB. For larger files, use cloud storage links or compress your files first.",
  },
  {
    question: "What is Discord's file upload limit?",
    answer:
      "Discord Free allows 10MB uploads. Discord Nitro Basic raises this to 50MB, and Discord Nitro allows up to 500MB per file.",
  },
  {
    question: "How can I send files that exceed the platform limit?",
    answer:
      "You have two options: compress the file to fit within the limit using a tool like our video compressor or audio compressor, or use a file sharing service like Google Drive or Dropbox and share a link instead.",
  },
  {
    question: "What is the largest file I can send on WhatsApp?",
    answer:
      "WhatsApp allows files up to 2GB. However, media (photos and videos) sent through the camera or gallery may be automatically compressed by WhatsApp.",
  },
  {
    question: "Do these limits apply to all file types?",
    answer:
      "Most platforms apply the same size limit regardless of file type. However, some platforms restrict certain file formats (for example, email providers may block executable files). Social media platforms typically only accept specific image and video formats.",
  },
  {
    question: "How often do platform limits change?",
    answer:
      "Platform file size limits change occasionally, usually increasing over time. We update this page regularly to reflect the latest limits. Discord, WhatsApp, and Telegram have all increased their limits in recent years.",
  },
];

export default function FileSizeLimitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
        name: "File Size Limits by Platform",
        item: "https://www.filetoolworks.com/file-size-limits",
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
