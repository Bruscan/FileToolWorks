import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Video Trimmer | Cut Video Clips Online (Free)",
  description: "Trim and cut video clips online. Set start and end times, keep original quality. Free, fast, no signup required. Works in your browser.",
  alternates: {
    canonical: "https://www.filetoolworks.com/trim-video",
  },
  openGraph: {
    title: "Video Trimmer",
    description: "Cut and trim video clips online. Free, no upload.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Trimmer",
    description: "Cut and trim video clips online. Free, no upload.",
  },
};

const faqs = [
    { question: "How do I trim a video?", answer: "Upload your video, enter the start time (when to begin) and end time (when to stop). You can use seconds (like 30) or MM:SS format (like 1:30). Click Trim Video to create your trimmed clip." },
    { question: "Does trimming reduce video quality?", answer: "No. This tool uses codec copy mode, which means the video is not re-encoded. The trimmed video keeps the exact same quality, resolution, and format as the original." },
    { question: "Are my videos uploaded to a server?", answer: "No. All processing happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security." },
    { question: "What time formats can I use?", answer: "You can enter times in two formats: seconds (like 45 or 90.5) or minutes and seconds (like 1:30 or 2:15). The tool accepts both formats for start and end times." },
    { question: "Is there a file size limit?", answer: "No. Since processing happens in your browser, there are no server-imposed file size limits. However, very large files may take longer to process depending on your device performance." },
    { question: "Can I trim multiple videos at once?", answer: "Yes. You can upload multiple videos and apply the same trim settings to all of them. Each video will be processed and available for download individually or as a batch." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Video Trimmer"
        description="Trim and cut video clips online. Set start and end times, keep original quality. Free, fast, no signup required. Works in your browser."
        slug="trim-video"
        faqs={faqs}
        rating={4.8}
        ratingCount={143276}
      />
      {children}
    </>
  );
}
