import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Video for Email | Free Online Video Compressor",
  description:
    "Compress videos to fit email attachment limits. Free, browser-based, no signup. Reduce video size under 25MB for Gmail or 20MB for Outlook.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-video-for-email",
  },
  openGraph: {
    title: "Compress Video for Email | Free Online",
    description:
      "Shrink videos to fit Gmail and Outlook attachment limits. Free browser-based compressor. No signup, no upload to servers.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Compress%20Video%20for%20Email&description=Fit%20Gmail%20and%20Outlook%20attachment%20limits&category=video",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Video for Email",
    description:
      "Free browser-based video compressor for email. Get under 25MB for Gmail or 20MB for Outlook.",
  },
};

const faqs = [
  {
    question: "What is the email attachment size limit for Gmail?",
    answer:
      "Gmail allows attachments up to 25MB. For larger files, Gmail automatically offers to share via Google Drive instead. Compressing your video to under 25MB lets you send it as a regular attachment.",
  },
  {
    question: "What is Outlook's video attachment limit?",
    answer:
      "Outlook.com allows up to 20MB per attachment. Microsoft Exchange accounts may have a 10MB limit set by your organization. Compress to under 20MB for maximum compatibility.",
  },
  {
    question: "What settings should I use to compress video for email?",
    answer:
      "Use 720p resolution and Medium quality for short clips (under 1 minute). For longer videos, use 480p and Medium quality. If the file is still too large, trim the video first.",
  },
  {
    question: "Is my video uploaded to a server?",
    answer:
      "No. The compressor runs entirely in your browser using WebAssembly (FFmpeg). Your video files never leave your device. Nothing is stored or transmitted to any server.",
  },
  {
    question: "What video format is best for email?",
    answer:
      "MP4 with H.264 encoding is the most compatible format. Our compressor always outputs MP4, which plays on all devices and email clients including Gmail, Outlook, Yahoo Mail, and Apple Mail.",
  },
  {
    question: "How long does compression take?",
    answer:
      "It depends on the video length and your device. A 30-second clip typically compresses in 10-30 seconds. Longer videos take proportionally longer. The browser does all the work locally.",
  },
];

export default function CompressVideoForEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Compress Video for Email",
            description:
              "Step-by-step guide to compressing videos to fit email attachment size limits using a free browser-based tool.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Open the video compressor",
                text: "Go to the free video compressor tool at FileToolWorks.",
                url: "https://www.filetoolworks.com/compress-video",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Upload your video",
                text: "Drag and drop your video file or click to browse. Accepts MP4, MOV, AVI, MKV, and other formats.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Choose email-friendly settings",
                text: "Select 720p or 480p resolution and Medium quality. This keeps the file under 25MB for Gmail or 20MB for Outlook.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Compress and attach",
                text: "Click Compress and wait for processing. Download the compressed MP4 and attach it to your email.",
              },
            ],
            tool: {
              "@type": "HowToTool",
              name: "FileToolWorks Video Compressor",
              url: "https://www.filetoolworks.com/compress-video",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      {children}
    </>
  );
}
