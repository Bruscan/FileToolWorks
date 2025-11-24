import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to GIF Converter | Free & Fast (No Signup)",
  description: "Convert video clips to animated GIFs instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  alternates: {
    canonical: "/video-to-gif",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
