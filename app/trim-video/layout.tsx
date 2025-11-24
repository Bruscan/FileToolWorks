import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Trimmer | Cut Video Clips Online (Free)",
  description: "Trim and cut video clips online. Set start and end times, keep original quality. Free, fast, no signup required. Works in your browser.",
  alternates: {
    canonical: "/trim-video",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
