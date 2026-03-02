import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "MP3 Compressor | Reduce MP3 File Size Online Free",
  description: "Free online MP3 compressor. Reduce MP3 file size by up to 90% without re-uploading to any server. Choose bitrate from 64kbps to 320kbps. No signup needed.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-mp3",
  },
  openGraph: {
    title: "Free MP3 Compressor Online | Reduce MP3 File Size",
    description: "Compress MP3 files instantly in your browser. Choose your bitrate, reduce file size by up to 90%. Free, private, no signup.",
    type: "website",
    images: [{ url: "/api/og?title=MP3%20Compressor&description=Reduce%20MP3%20file%20size%20by%20up%20to%2090%25&category=audio", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MP3 Compressor",
    description: "Free online MP3 compressor. Reduce MP3 file size instantly. No signup, no upload.",
  },
};

const faqs = [
  { question: "How do I compress an MP3 file?", answer: "Upload your MP3 file, choose a bitrate (lower bitrate means smaller file), and click Compress. The compressed MP3 downloads instantly. Everything runs in your browser." },
  { question: "What bitrate should I use for MP3 compression?", answer: "64kbps works for voice and podcasts. 128kbps is good for most music. 192kbps keeps near-original quality. 320kbps is the maximum MP3 quality, useful when you want slight size reduction from unoptimized MP3s." },
  { question: "Does compressing an MP3 reduce audio quality?", answer: "Yes, lowering the bitrate removes some audio data. The difference is subtle at 128kbps and above for most listeners. For lossless compression, consider converting to FLAC instead." },
  { question: "Is my MP3 file uploaded to a server?", answer: "No. All compression runs in your browser using WebAssembly (FFmpeg). Your MP3 files never leave your device." },
  { question: "How much smaller will my MP3 get?", answer: "It depends on the original bitrate. A 320kbps MP3 compressed to 128kbps will be roughly 60% smaller. A 192kbps file compressed to 64kbps will shrink by about 65-70%." },
  { question: "Can I compress multiple MP3 files at once?", answer: "Yes. Upload several MP3 files and compress them all in one batch with the same bitrate. Download individually or all at once." },
];

export default function CompressMp3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="MP3 Compressor"
        description="Free online MP3 compressor. Reduce MP3 file size by up to 90% without re-uploading to any server. Choose bitrate from 64kbps to 320kbps. No signup needed."
        slug="compress-mp3"
        faqs={faqs}
        rating={4.7}
        ratingCount={203847}
      />
      {children}
    </>
  );
}
