const BASE_URL = "https://www.filetoolworks.com";

const blogPosts = [
  { slug: "how-to-compress-wav-files", title: "How to Compress WAV Files Without Ruining Audio Quality", date: "2026-03-01", description: "Five proven methods to reduce WAV file size while keeping audio quality intact. Convert to MP3/FLAC, reduce sample rate, or use online tools." },
  { slug: "mp3-vs-wav", title: "MP3 vs WAV: Quality, File Size, and When to Use Each", date: "2026-03-01", description: "MP3 vs WAV compared. Learn the real differences in quality, file size, and compatibility, plus when each format is the better choice." },
  { slug: "how-to-reduce-audio-file-size", title: "How to Reduce Audio File Size: 5 Methods That Work", date: "2026-03-01", description: "Five practical methods to reduce audio file size: convert formats, lower bitrate, trim silence, reduce sample rate, and compress." },
  { slug: "audio-bitrate-explained", title: "Audio Bitrate Explained: What It Means and How to Choose", date: "2026-03-01", description: "Audio bitrate measures how much data is used per second of audio. Learn what bitrate means, how it affects quality, and which setting to pick." },
  { slug: "flac-to-mp3", title: "FLAC to MP3: How to Convert and What You Lose", date: "2026-03-01", description: "How to convert FLAC to MP3, what quality you lose in the process, and which bitrate setting gives the best balance of size and sound." },
  { slug: "mp3-to-wav-conversion", title: "How to Convert MP3 to WAV (Free, No Software Needed)", date: "2026-03-01", description: "Convert MP3 to WAV format for free using browser-based tools. No software installation needed, works on any device." },
  { slug: "best-audio-format-for-web", title: "Best Audio Format for Web: MP3, OGG, AAC, or WAV?", date: "2026-03-01", description: "Compare MP3, OGG, AAC, and WAV for web use. Find the best audio format for websites based on file size, quality, and browser support." },
  { slug: "ogg-vs-mp3", title: "OGG vs MP3: Quality, Compatibility, and Which to Use", date: "2026-03-01", description: "OGG vs MP3 compared on quality, file size, and device support. Learn which audio format fits your needs and how to convert between them." },
  { slug: "how-to-compress-podcast-audio", title: "How to Compress Podcast Audio Without Losing Voice Quality", date: "2026-03-01", description: "Compress podcast audio files to meet platform upload limits while keeping voice clarity. Covers bitrate, format choice, and practical tools." },
  { slug: "how-to-extract-audio-from-video", title: "How to Extract Audio from Video (Free, Any Format)", date: "2026-03-01", description: "Extract audio tracks from video files as MP3, WAV, or AAC. Free browser-based tool works with MP4, MOV, AVI, and more." },
  { slug: "png-vs-jpg", title: "PNG vs JPG: When to Use Each Format", date: "2026-03-01", description: "PNG vs JPG compared on quality, file size, transparency, and use cases. Learn when to use each image format." },
  { slug: "heic-vs-jpg", title: "HEIC vs JPG: Which Image Format Should You Use?", date: "2026-03-01", description: "HEIC vs JPG compared on file size, quality, and compatibility. Learn which image format to use and how to convert between them." },
  { slug: "webp-vs-png", title: "WebP vs PNG: File Size, Quality, and When to Use Each", date: "2026-03-01", description: "WebP vs PNG compared on file size, quality, transparency support, and browser compatibility. Find out which format fits your needs." },
  { slug: "svg-vs-png", title: "SVG vs PNG: When to Use Each Format", date: "2026-03-01", description: "SVG vs PNG compared for web use. Learn the key differences in scalability, file size, and when each image format is the right choice." },
  { slug: "best-image-format-for-web", title: "Best Image Format for Web: JPG, PNG, WebP Compared", date: "2026-03-01", description: "Compare JPG, PNG, and WebP for web use. Choose the best image format based on file size, quality, transparency needs, and browser support." },
  { slug: "dpi-vs-ppi", title: "DPI vs PPI: What Is the Difference?", date: "2026-03-01", description: "DPI and PPI both measure resolution but in different contexts. Learn what each means, when it matters, and how to set the right values." },
  { slug: "how-to-resize-images-without-losing-quality", title: "How to Resize Images Without Losing Quality", date: "2026-03-01", description: "Resize images without losing quality using the right tools and techniques. Covers downscaling, upscaling, and format-aware resizing." },
  { slug: "how-to-compress-images-for-email", title: "How to Compress Images for Email (Under 1MB Fast)", date: "2026-03-01", description: "Compress images under 1MB for email attachments. Quick methods to reduce image file size without visible quality loss." },
  { slug: "how-to-convert-webp-to-jpg", title: "How to Convert WebP to JPG (Free, No Upload Required)", date: "2026-03-01", description: "Convert WebP images to JPG format free in your browser. No upload needed, works instantly on any device." },
  { slug: "how-to-convert-heic-to-jpg", title: "How to Convert HEIC to JPG", date: "2026-03-01", description: "Convert HEIC photos from your iPhone to JPG format. Free browser-based conversion with no uploads to external servers." },
  { slug: "how-to-convert-image-to-pdf", title: "How to Convert Image to PDF", date: "2026-03-01", description: "Convert any image to PDF format. Supports JPG, PNG, WebP, and more with page size and orientation options." },
  { slug: "how-to-merge-pdf-files", title: "How to Merge PDF Files Online for Free", date: "2026-03-01", description: "Merge multiple PDF files into one document for free. No signup, no upload to servers, works directly in your browser." },
  { slug: "how-to-split-pdf-pages", title: "How to Split PDF Pages Online", date: "2026-03-01", description: "Split a PDF into separate pages or smaller documents. Free online tool that works in your browser with no file uploads." },
  { slug: "extract-pages-from-pdf", title: "How to Extract Pages from a PDF", date: "2026-03-01", description: "Extract specific pages from a PDF document. Select individual pages or ranges and download a new PDF with just those pages." },
  { slug: "how-to-compress-pdf", title: "How to Compress a PDF Without Losing Quality", date: "2026-03-01", description: "Reduce PDF file size while maintaining text clarity and image quality. Practical compression methods and recommended settings." },
  { slug: "how-to-sign-pdf-online", title: "How to Sign a PDF Online for Free", date: "2026-03-01", description: "Sign PDF documents online for free. Draw or upload your signature, position it on any page, and download the signed PDF." },
  { slug: "pdf-vs-docx", title: "PDF vs DOCX: Differences and When to Use Each", date: "2026-03-01", description: "PDF vs DOCX compared on editing, formatting, compatibility, and file size. Learn when each document format is the right choice." },
  { slug: "how-to-compress-video-for-email", title: "How to Compress Video for Email (Under 25MB)", date: "2026-03-01", description: "Compress video files to fit email attachment limits. Reduce video size below 25MB while keeping reasonable quality." },
  { slug: "how-to-reduce-video-file-size", title: "How to Reduce Video File Size Without Losing Quality", date: "2026-03-01", description: "Reduce video file size using resolution, codec, and bitrate adjustments. Practical methods that preserve visual quality." },
  { slug: "gif-vs-mp4", title: "GIF vs MP4: Which Format Should You Use?", date: "2026-03-01", description: "GIF vs MP4 compared on file size, quality, browser support, and use cases. Learn which video format fits your needs." },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = blogPosts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date + "T12:00:00Z").toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FileToolWorks Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Practical guides on file formats, conversion, and compression.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
