import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Video for Discord | Free Online Video Compressor",
  description:
    "Compress videos to fit Discord's file size limits. Free, browser-based, no signup. Reduce video size under 10MB, 25MB, or 50MB for Discord uploads.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-video-for-discord",
  },
  openGraph: {
    title: "Compress Video for Discord | Free Online",
    description:
      "Shrink videos to fit Discord file size limits. Free browser-based compressor. No signup, no upload to servers.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Compress%20Video%20for%20Discord&description=Fit%20Discord%20file%20size%20limits&category=video",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Video for Discord",
    description:
      "Free browser-based video compressor for Discord. Get under 10MB, 25MB, or 50MB limits.",
  },
};

const faqs = [
  {
    question: "What is Discord's video file size limit?",
    answer:
      "Free Discord users can upload files up to 10MB (was 8MB before 2024). Nitro Basic subscribers get 50MB, and Nitro users get 500MB. Most people need to compress below 10MB.",
  },
  {
    question: "What settings should I use to compress video for Discord?",
    answer:
      "For a 10MB limit, use 480p resolution and Medium quality. For 50MB (Nitro Basic), 720p with Medium quality works well. Start with a short clip and test the output size before compressing longer videos.",
  },
  {
    question: "Will compressing my video reduce quality?",
    answer:
      "Yes, but modern H.264 compression preserves visual quality well. At 720p Medium quality, most viewers cannot tell the difference from the original. Lower resolution and quality settings produce smaller files with more visible compression.",
  },
  {
    question: "Is my video uploaded to a server?",
    answer:
      "No. The compressor runs entirely in your browser using WebAssembly (FFmpeg). Your video files never leave your device. Nothing is stored or transmitted to any server.",
  },
  {
    question: "What video formats work with this compressor?",
    answer:
      "MP4, MOV, AVI, MKV, WebM, FLV, and most other video formats. The output is always MP4 (H.264), which Discord supports natively.",
  },
  {
    question: "How long does compression take?",
    answer:
      "It depends on the video length and your device. A 30-second clip typically compresses in 10-30 seconds. Longer videos take proportionally longer. The browser does all the work locally.",
  },
];

export default function CompressVideoForDiscordLayout({
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
            name: "How to Compress Video for Discord",
            description:
              "Step-by-step guide to compressing videos to fit Discord's file size limits using a free browser-based tool.",
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
                name: "Choose Discord-friendly settings",
                text: "Select 480p or 720p resolution and Medium quality. This keeps the file under Discord's 10MB or 50MB limits.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Compress and download",
                text: "Click Compress and wait for processing. Download the compressed MP4 and upload it to Discord.",
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
