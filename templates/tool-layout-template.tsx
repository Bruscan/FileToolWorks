/**
 * TOOL LAYOUT TEMPLATE
 *
 * Instructions:
 * 1. Copy this file to app/[your-tool-slug]/layout.tsx
 * 2. Replace all [PLACEHOLDERS] with your tool information
 * 3. Keep title under 60 characters
 * 4. Keep description under 160 characters
 * 5. Match the canonical URL to your tool slug
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[TOOL_NAME] | Free & Fast (No Signup)",
  // Example: "HEIC to JPG Converter | Free & Fast (No Signup)"

  description: "[SHORT_DESCRIPTION] Works online, supports mobile, keeps high quality. Free forever, no signup required.",
  // Example: "Convert HEIC to JPG instantly. Works online, supports mobile, keeps high quality. Free forever, no signup required."

  alternates: {
    canonical: "/[tool-slug]",
    // Example: "/heic-to-jpg"
  },
};

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
