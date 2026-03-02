import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Video for WhatsApp | Free Online Video Compressor",
  description:
    "Compress videos to fit WhatsApp's 16MB file size limit. Free, browser-based, no signup. Reduce video size for WhatsApp sharing on iPhone and Android.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-video-for-whatsapp",
  },
  openGraph: {
    title: "Compress Video for WhatsApp | Free Online",
    description:
      "Shrink videos to fit WhatsApp file size limits. Free browser-based compressor. No signup, no upload to servers.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Compress%20Video%20for%20WhatsApp&description=Fit%20WhatsApp%20file%20size%20limits&category=video",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Video for WhatsApp",
    description:
      "Free browser-based video compressor for WhatsApp. Get under 16MB for easy sharing.",
  },
};

const faqs = [
  {
    question: "What is WhatsApp's video file size limit?",
    answer:
      "WhatsApp limits video attachments to 16MB on most platforms. Videos larger than 16MB cannot be sent directly as media messages. You can send larger files (up to 2GB) as document attachments, but they lose the inline preview.",
  },
  {
    question: "What settings should I use to compress video for WhatsApp?",
    answer:
      "For a 16MB limit, use 480p resolution and Medium quality. This keeps most 30-60 second clips well under the limit. For longer videos, drop to Low quality or trim the video first.",
  },
  {
    question: "Does WhatsApp compress videos automatically?",
    answer:
      "Yes, WhatsApp applies its own compression when you send a video, which can drastically reduce quality. Pre-compressing with controlled settings gives you a better result because you choose the quality level instead of letting WhatsApp decide.",
  },
  {
    question: "Is my video uploaded to a server?",
    answer:
      "No. The compressor runs entirely in your browser using WebAssembly (FFmpeg). Your video files never leave your device. Nothing is stored or transmitted to any server.",
  },
  {
    question: "Can I compress videos for WhatsApp on my phone?",
    answer:
      "Yes. The compressor works in any mobile browser (Chrome, Safari, Firefox). Open the tool, upload your video, compress, and share directly to WhatsApp. No app install needed.",
  },
  {
    question: "How long of a video can I send on WhatsApp after compressing?",
    answer:
      "At 480p Medium quality, you can fit roughly 30-60 seconds into 16MB. At Low quality, up to 2 minutes may fit. For longer clips, use the video trimmer to cut out the best part first.",
  },
];

export default function CompressVideoForWhatsAppLayout({
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
            name: "How to Compress Video for WhatsApp",
            description:
              "Step-by-step guide to compressing videos to fit WhatsApp's 16MB file size limit using a free browser-based tool.",
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
                name: "Choose WhatsApp-friendly settings",
                text: "Select 480p resolution and Medium quality to stay under WhatsApp's 16MB limit.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Compress and share",
                text: "Click Compress, download the MP4, and send it through WhatsApp.",
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
