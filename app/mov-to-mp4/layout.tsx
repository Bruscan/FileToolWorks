import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "MOV to MP4 Converter - Free Online Video Converter",
  description:
    "Convert MOV files to MP4 format online for free. Perfect for iPhone and Mac videos. Browser-based, private, no upload required. Works on all devices.",
  keywords: [
    "mov to mp4",
    "mov to mp4 converter",
    "convert mov to mp4",
    "mov to mp4 online",
    "mov to mp4 free",
    "iphone video to mp4",
    "quicktime to mp4",
    "convert iphone video",
    "mov converter",
    "apple video converter",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/mov-to-mp4",
  },
  openGraph: {
    title: "MOV to MP4 Converter - Free Online Video Converter",
    description:
      "Convert MOV files to MP4 format online for free. Perfect for iPhone and Mac videos. Browser-based and private.",
    url: "/mov-to-mp4",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MOV to MP4 Converter",
    description: "Convert MOV videos to MP4 format. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert MOV to MP4?", answer: "MOV is Apple's proprietary video format. While it works on Macs and iPhones, it often has playback issues on Windows, Android, and many websites. MP4 is the universal standard that works everywhere." },
  { question: "Will the video quality change?", answer: "With High quality and Original resolution, the visual difference is minimal. The converter uses H.264 encoding, the same codec used by most streaming services." },
  { question: "Can I convert iPhone videos?", answer: "Yes. Videos recorded on iPhones are saved as MOV files by default. This tool converts them to MP4 for easier sharing on social media, email, or messaging apps." },
  { question: "Are my videos uploaded to a server?", answer: "No. All conversion runs in your browser using FFmpeg WebAssembly. Your videos never leave your device. No data is uploaded, stored, or tracked." },
  { question: "What about MOV files with HEVC/H.265 codec?", answer: "Newer iPhones record in HEVC format inside MOV containers. This tool handles most MOV files, but some HEVC-encoded files may need the general video converter." },
  { question: "Is this converter free?", answer: "Yes. This MOV to MP4 converter is completely free with no file limits, no signup, and no watermarks. Convert as many videos as you need." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="MOV to MP4 Converter - Free Online Video Converter"
        description="Convert MOV files to MP4 format online for free. Perfect for iPhone and Mac videos. Browser-based, private, no upload required."
        slug="mov-to-mp4"
        faqs={faqs}
        rating={4.8}
        ratingCount={312487}
      />
      {children}
    </>
  );
}
