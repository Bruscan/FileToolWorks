import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Audio for Discord | Free Online Audio Compressor",
  description:
    "Compress audio files to fit Discord's file size limits. Free, browser-based, no signup. Reduce MP3, WAV, FLAC under 10MB or 50MB for Discord uploads.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-audio-for-discord",
  },
  openGraph: {
    title: "Compress Audio for Discord | Free Online",
    description:
      "Shrink audio files to fit Discord file size limits. Free browser-based compressor. No signup, no upload to servers.",
    type: "website",
    images: [
      {
        url: "/api/og?title=Compress%20Audio%20for%20Discord&description=Fit%20Discord%20file%20size%20limits&category=audio",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Audio for Discord",
    description:
      "Free browser-based audio compressor for Discord. Get under 10MB or 50MB limits.",
  },
};

const faqs = [
  {
    question: "What is Discord's audio file size limit?",
    answer:
      "Free Discord users can upload files up to 10MB. Nitro Basic subscribers get 50MB, and Nitro users get 500MB. Most WAV and FLAC files exceed the 10MB free limit and need compression.",
  },
  {
    question: "What bitrate should I use for Discord audio?",
    answer:
      "128kbps works well for music shared on Discord. For voice recordings or podcasts, 64kbps is fine. 192kbps is best if you want higher fidelity and have Nitro Basic or Nitro.",
  },
  {
    question: "Will compressing my audio reduce quality?",
    answer:
      "Converting to MP3 is lossy compression, but at 128kbps most listeners cannot hear a difference for casual listening on Discord. If you need lossless quality, share a cloud link instead.",
  },
  {
    question: "Is my audio file uploaded to a server?",
    answer:
      "No. The compressor runs entirely in your browser using WebAssembly (FFmpeg). Your audio files never leave your device. Nothing is stored or transmitted to any server.",
  },
  {
    question: "What audio formats can I compress?",
    answer:
      "MP3, WAV, FLAC, AAC, OGG, and M4A. The output is always MP3 format, which Discord plays inline without requiring users to download.",
  },
  {
    question: "How much smaller will my audio file get?",
    answer:
      "WAV files typically shrink 80-90% when compressed to 128kbps MP3. A 50MB WAV becomes roughly 5MB. FLAC files shrink 60-70%. MP3 files already compressed may shrink 30-50% depending on original bitrate.",
  },
];

export default function CompressAudioForDiscordLayout({
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
            name: "How to Compress Audio for Discord",
            description:
              "Step-by-step guide to compressing audio files to fit Discord's file size limits using a free browser-based tool.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Open the audio compressor",
                text: "Go to the free audio compressor tool at FileToolWorks.",
                url: "https://www.filetoolworks.com/compress-audio",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Upload your audio file",
                text: "Drag and drop your audio file or click to browse. Accepts MP3, WAV, FLAC, AAC, OGG, and M4A.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Choose a Discord-friendly bitrate",
                text: "Select 128kbps for music or 64kbps for voice recordings. This keeps the output under Discord's 10MB free limit for most files.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Compress and download",
                text: "Click Compress and wait for processing. Download the compressed MP3 and upload it to Discord.",
              },
            ],
            tool: {
              "@type": "HowToTool",
              name: "FileToolWorks Audio Compressor",
              url: "https://www.filetoolworks.com/compress-audio",
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
