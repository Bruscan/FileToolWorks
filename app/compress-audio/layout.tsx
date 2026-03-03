import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Free Online Audio Compressor - Reduce MP3, WAV File Size",
  description: "Compress MP3, WAV, AAC, OGG, and FLAC files online for free. Reduce audio file size by up to 90% in your browser. No upload to servers, no signup, no file size limits.",
  alternates: {
    canonical: "https://www.filetoolworks.com/compress-audio",
  },
  openGraph: {
    title: "Free Online Audio Compressor - No Upload Required",
    description: "Compress MP3, WAV, and audio files in your browser. Files never leave your device. Free, no signup, no limits.",
    type: "website",
    images: [{ url: "/api/og?title=Audio%20Compressor&description=Reduce%20MP3%2C%20WAV%2C%20AAC%20file%20size%20by%20up%20to%2090%25&category=audio", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Audio Compressor",
    description: "Compress MP3, WAV files in your browser. No upload, no signup. Reduce file size by up to 90%.",
  },
};

const faqs = [
    { question: "What audio formats can I compress?", answer: "We support MP3, WAV, AAC, OGG, and FLAC audio formats. All files are compressed and output as MP3 format for maximum compatibility across devices." },
    { question: "Which bitrate should I choose?", answer: "64kbps (low) is best for voice recordings and podcasts. 128kbps (medium) is recommended for most music and offers a good balance. 192kbps (high) provides better quality but larger file sizes." },
    { question: "Is my audio uploaded to a server?", answer: "No. All audio compression happens directly in your browser using WebAssembly. Your audio files never leave your device, ensuring complete privacy and security." },
    { question: "How much can I reduce file size?", answer: "File size reduction depends on the original file and selected bitrate. You can typically reduce file sizes by 50-90%, especially when compressing high-quality WAV or FLAC files to MP3." },
    { question: "Can I compress multiple audio files at once?", answer: "Yes. You can upload and compress multiple audio files in a single batch. All files will be processed with the same bitrate setting, and you can download them individually or all at once." },
    { question: "Is this tool free to use?", answer: "Yes. This audio compressor is completely free with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "Can I compress audio for email attachments?", answer: "Yes. Gmail limits attachments to 25MB and Outlook to 20MB. Compressing a WAV file at 128kbps typically reduces it by 80-90%, making it small enough for email." },
    { question: "Does compressing audio reduce quality?", answer: "Compressing audio is lossy, meaning some quality is lost. At 128kbps most people cannot tell the difference from the original. At 64kbps the quality drop is more noticeable but still fine for voice recordings." },
    { question: "How do I compress audio for Discord?", answer: "Discord limits file uploads to 10MB on free accounts and 50MB with Nitro Basic. Upload your audio file, select 128kbps or 64kbps bitrate, and compress. The output will usually be well under Discord's limit." },
];

export default function CompressAudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Audio Compressor"
        description="Free online audio compressor. Reduce MP3, WAV, AAC, OGG, and FLAC file size by up to 90%. No signup required. All processing happens in your browser."
        slug="compress-audio"
        faqs={faqs}
        rating={4.6}
        ratingCount={187234}
      />
      {children}
    </>
  );
}
