import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter - Free Online Audio Converter",
  description:
    "Convert WAV audio files to MP3 format online for free. Reduce file size by up to 90% while maintaining audio quality. Fast, secure, and no signup required.",
  keywords: [
    "wav to mp3",
    "wav to mp3 converter",
    "convert wav to mp3",
    "audio converter",
    "wav converter",
    "mp3 converter",
    "compress wav",
    "wav to mp3 online",
    "free audio converter",
  ],
  alternates: {
    canonical: "/wav-to-mp3",
  },
  openGraph: {
    title: "WAV to MP3 Converter - Free Online Audio Converter",
    description:
      "Convert WAV audio files to MP3 format online for free. Reduce file size by up to 90% while maintaining audio quality.",
    url: "/wav-to-mp3",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
