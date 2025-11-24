import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZIP Files - Create ZIP Archive | Free & Fast (No Signup)",
  description: "Compress multiple files into a ZIP archive instantly. Works online, supports mobile, all file types. Free forever, no signup required.",
  alternates: {
    canonical: "/zip-files",
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
