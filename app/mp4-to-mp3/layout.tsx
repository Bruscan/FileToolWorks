import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "MP4 to MP3 Converter - Extract Audio from Video Free",
  description:
    "Convert MP4 video to MP3 audio online for free. Extract audio tracks from videos with customizable bitrate. Browser-based, private, no signup required.",
  keywords: [
    "mp4 to mp3",
    "mp4 to mp3 converter",
    "convert mp4 to mp3",
    "mp4 to mp3 online",
    "extract audio from mp4",
    "video to audio converter",
    "mp4 audio extractor",
    "mp4 to mp3 free",
    "video to mp3",
    "extract mp3 from video",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/mp4-to-mp3",
  },
  openGraph: {
    title: "MP4 to MP3 Converter - Extract Audio from Video Free",
    description:
      "Convert MP4 video to MP3 audio online for free. Extract audio tracks with customizable bitrate. Browser-based and private.",
    url: "/mp4-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MP4 to MP3 Converter",
    description: "Extract audio from MP4 videos as MP3. Free, private, browser-based.",
  },
};

const faqs = [
  { question: "Why convert MP4 to MP3?", answer: "MP4 files contain both video and audio. If you only need the audio, extracting it as MP3 removes the video data and dramatically reduces file size. A 100 MB video might produce a 5-10 MB MP3." },
  { question: "What bitrate should I choose?", answer: "320kbps for music and high-fidelity audio. 192kbps for a good balance of quality and file size. 128kbps for speech, podcasts, or when file size matters most." },
  { question: "Does the audio quality depend on the source video?", answer: "Yes. The output quality cannot exceed the source audio quality. The tool re-encodes audio at your selected bitrate from whatever the source contains." },
  { question: "Are my files uploaded to a server?", answer: "No. Everything runs in your browser using WebAssembly. Your MP4 files never leave your device. Nothing is uploaded, stored, or tracked." },
  { question: "How much smaller will the MP3 be?", answer: "MP3 files are typically 90-95% smaller than the source MP4 since the video stream is discarded. A 200 MB video produces roughly 7-15 MB of MP3 audio." },
  { question: "Is this converter free?", answer: "Yes. This MP4 to MP3 converter is completely free with no file limits, no signup, and no watermarks." },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="MP4 to MP3 Converter - Extract Audio from Video Free"
        description="Convert MP4 video to MP3 audio online for free. Extract audio tracks from videos with customizable bitrate. Browser-based, private, no signup required."
        slug="mp4-to-mp3"
        faqs={faqs}
        rating={4.7}
        ratingCount={276923}
      />
      {children}
    </>
  );
}
