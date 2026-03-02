import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FileToolWorks - Free Online File Tools",
    short_name: "FileToolWorks",
    description:
      "Free online tools for file conversion, compression, and editing. All processing happens in your browser for complete privacy.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#2563eb",
    categories: ["utilities", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
