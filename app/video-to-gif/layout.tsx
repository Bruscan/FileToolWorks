import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Video to GIF Converter | Free & Fast (No Signup)",
  description: "Convert video clips to animated GIFs instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/video-to-gif",
  },
};

const faqs = [
    { question: "Why convert video to GIF?", answer: "GIFs are perfect for sharing short video clips on social media, messaging apps, and websites. They auto-play without sound and are widely supported across all platforms." },
    { question: "Why are GIF files so large?", answer: "GIF is an uncompressed format that stores every frame as an image. To reduce file size, use lower FPS, smaller output size, or shorter duration. Consider using 10-15 FPS and 480p or 360p for smaller files." },
    { question: "Are my videos uploaded to a server?", answer: "No. All conversion happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security." },
    { question: "Does this cost anything?", answer: "No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need." },
    { question: "What settings should I use?", answer: "For social media, we recommend 15 FPS, 480p size, and medium quality. For high quality animations, use 24 FPS, original or 720p size, and high quality. Lower settings produce smaller file sizes." },
    { question: "How do I trim my video?", answer: "Use the start time field to skip to a specific point in your video (in seconds), and the duration field to set how many seconds to convert. Leave them empty to convert the entire video." },
];

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Video to GIF Converter"
        description="Convert video clips to animated GIFs instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."
        slug="video-to-gif"
        faqs={faqs}
        rating={4.8}
        ratingCount={104892}
      />
      {children}
    </>
  );
}
