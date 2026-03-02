"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Copy, Check, FileAudio, FileImage, FileText, Film, Archive } from "lucide-react";

interface Widget {
  id: string;
  name: string;
  description: string;
  embedPath: string;
  fullPath: string;
  category: string;
  icon: React.ReactNode;
  height: string;
}

const widgets: Widget[] = [
  {
    id: "compress-audio",
    name: "Audio Compressor",
    description: "Compress MP3, WAV, AAC, OGG, and FLAC files in the browser",
    embedPath: "/embed/compress-audio",
    fullPath: "/compress-audio",
    category: "Audio",
    icon: <FileAudio className="w-5 h-5" />,
    height: "500",
  },
  {
    id: "compress-image",
    name: "Image Compressor",
    description: "Reduce image file size while maintaining quality",
    embedPath: "/compress-image",
    fullPath: "/compress-image",
    category: "Image",
    icon: <FileImage className="w-5 h-5" />,
    height: "500",
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert images to PDF documents",
    embedPath: "/image-to-pdf",
    fullPath: "/image-to-pdf",
    category: "PDF",
    icon: <FileText className="w-5 h-5" />,
    height: "550",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    embedPath: "/merge-pdf",
    fullPath: "/merge-pdf",
    category: "PDF",
    icon: <FileText className="w-5 h-5" />,
    height: "500",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    description: "Convert PNG images to JPG format",
    embedPath: "/png-to-jpg",
    fullPath: "/png-to-jpg",
    category: "Image",
    icon: <FileImage className="w-5 h-5" />,
    height: "500",
  },
  {
    id: "video-to-gif",
    name: "Video to GIF",
    description: "Convert video clips to animated GIFs",
    embedPath: "/video-to-gif",
    fullPath: "/video-to-gif",
    category: "Video",
    icon: <Film className="w-5 h-5" />,
    height: "550",
  },
  {
    id: "resize-image",
    name: "Image Resizer",
    description: "Resize images by percentage or custom dimensions",
    embedPath: "/resize-image",
    fullPath: "/resize-image",
    category: "Image",
    icon: <FileImage className="w-5 h-5" />,
    height: "550",
  },
  {
    id: "zip-files",
    name: "ZIP Files",
    description: "Create ZIP archives from uploaded files",
    embedPath: "/zip-files",
    fullPath: "/zip-files",
    category: "Other",
    icon: <Archive className="w-5 h-5" />,
    height: "500",
  },
];

export default function FreeToolsWidget() {
  const [selectedWidget, setSelectedWidget] = useState<Widget>(widgets[0]);
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe
  src="https://www.filetoolworks.com${selectedWidget.embedPath}"
  width="100%"
  height="${selectedWidget.height}"
  frameborder="0"
  allow="cross-origin-isolated"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
></iframe>
<p style="text-align: center; margin-top: 8px;">
  <a href="https://www.filetoolworks.com${selectedWidget.fullPath}" target="_blank" rel="noopener" style="color: #6b7280; font-size: 12px; text-decoration: none;">
    Powered by FileToolWorks - Free Online File Tools
  </a>
</p>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block text-sm">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free File Converter Widgets
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Add free file conversion tools to any website. Copy the embed code, paste it into your HTML, and give your visitors the ability to convert files directly on your site.
          </p>
          <p className="text-gray-600">
            All tools run in the browser using WebAssembly. No server uploads, no API keys, no usage limits. Your visitors&apos; files never leave their device.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tool selector */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Select a Tool</h2>
            <div className="space-y-2">
              {widgets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWidget(w)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedWidget.id === w.id
                      ? "bg-blue-50 border-blue-300 text-blue-900"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={selectedWidget.id === w.id ? "text-blue-600" : "text-gray-400"}>{w.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{w.name}</p>
                      <p className="text-xs text-gray-500">{w.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Embed code + preview */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{selectedWidget.name}</h2>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Free</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{selectedWidget.description}</p>

              {/* Embed code */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Code className="w-4 h-4" />
                    Embed Code
                  </label>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto leading-relaxed">
                  <code>{embedCode}</code>
                </pre>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">How to Use</h3>
                <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Copy the embed code above</li>
                  <li>Paste it into your HTML page where you want the tool to appear</li>
                  <li>Adjust the width and height values if needed</li>
                  <li>The attribution link is required for free usage</li>
                </ol>
              </div>

              {/* Preview link */}
              <div className="text-center">
                <a
                  href={`https://www.filetoolworks.com${selectedWidget.fullPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Preview full tool →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Embed Our Tools?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">100% Free</h3>
              <p className="text-sm text-gray-600">No API keys, no usage limits, no hidden costs. Embed as many tools as you want on any number of sites.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
              <p className="text-sm text-gray-600">All processing happens in your visitor&apos;s browser. Files never touch a server. No data collection.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">No Setup Required</h3>
              <p className="text-sm text-gray-600">Just paste the embed code. No npm packages, no build steps, no server configuration. Works with any website.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">Responsive design that works on phones, tablets, and desktops. Touch-friendly drag and drop.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">30+ Tools Available</h3>
              <p className="text-sm text-gray-600">Audio compression, image conversion, PDF merging, video tools, and more. All embeddable for free.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast and Reliable</h3>
              <p className="text-sm text-gray-600">Powered by WebAssembly and hosted on a global CDN. Sub-second load times with 99.9% uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Uses These Widgets?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Bloggers and Content Creators</h3>
              <p className="text-sm text-gray-600">Add an image compressor or format converter directly in your blog posts so readers can act on your tutorials immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Web Developers</h3>
              <p className="text-sm text-gray-600">Embed file tools in client portals, internal dashboards, or documentation sites without building conversion logic from scratch.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Educators and Course Creators</h3>
              <p className="text-sm text-gray-600">Give students access to file conversion tools inside your learning platform. Great for multimedia and design courses.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Forum and Community Admins</h3>
              <p className="text-sm text-gray-600">Let your community members compress audio, convert images, or merge PDFs without leaving your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Is this really free?</summary>
              <p className="mt-2 text-gray-600 text-sm">Yes. All widgets are free to embed with no usage limits. The only requirement is keeping the &quot;Powered by FileToolWorks&quot; attribution link.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Do my visitors&apos; files get uploaded anywhere?</summary>
              <p className="mt-2 text-gray-600 text-sm">No. All file processing happens locally in the browser using WebAssembly. Files never leave your visitor&apos;s device. There is no server-side processing.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Can I customize the widget appearance?</summary>
              <p className="mt-2 text-gray-600 text-sm">You can adjust the iframe width and height to fit your layout. The widget itself uses a clean, minimal design that works well on most sites.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">What platforms are supported?</summary>
              <p className="mt-2 text-gray-600 text-sm">Any platform that supports HTML embeds: WordPress, Squarespace, Wix, Webflow, Ghost, Hugo, custom HTML sites, and more. Just paste the iframe code.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Do I need an API key?</summary>
              <p className="mt-2 text-gray-600 text-sm">No. There are no API keys, no registration, and no authentication required. Just copy the embed code and paste it into your site.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Can I remove the attribution link?</summary>
              <p className="mt-2 text-gray-600 text-sm">The attribution link is required for free usage. It helps us keep these tools free for everyone. Please do not remove or hide it.</p>
            </details>
          </div>
        </div>
      </section>

      {/* All tools list */}
      <section className="max-w-4xl mx-auto px-4 py-8 pb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Available Tools</h2>
          <p className="text-gray-600 text-sm mb-6">Every tool on FileToolWorks can be embedded on your website. Here is the full list:</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { name: "Audio Compressor", path: "/compress-audio" },
              { name: "Audio Trimmer", path: "/trim-audio" },
              { name: "WAV to MP3", path: "/wav-to-mp3" },
              { name: "MP3 to WAV", path: "/mp3-to-wav" },
              { name: "Extract Audio", path: "/extract-audio" },
              { name: "Image to PDF", path: "/image-to-pdf" },
              { name: "JPG to PDF", path: "/jpg-to-pdf" },
              { name: "PNG to JPG", path: "/png-to-jpg" },
              { name: "JPG to PNG", path: "/jpg-to-png" },
              { name: "Image to WebP", path: "/image-to-webp" },
              { name: "WebP to PNG", path: "/webp-to-png" },
              { name: "Image Resizer", path: "/resize-image" },
              { name: "Rotate Image", path: "/rotate-image" },
              { name: "Crop Image", path: "/crop-image" },
              { name: "Blur Image", path: "/blur-image" },
              { name: "Sharpen Image", path: "/sharpen-image" },
              { name: "Remove Background", path: "/remove-background" },
              { name: "Merge PDF", path: "/merge-pdf" },
              { name: "Extract PDF Pages", path: "/extract-pdf-pages" },
              { name: "PDF to Text", path: "/pdf-to-text" },
              { name: "Sign PDF", path: "/sign-pdf" },
              { name: "HTML to PDF", path: "/html-to-pdf" },
              { name: "Word to PDF", path: "/word-to-pdf" },
              { name: "Excel to PDF", path: "/excel-to-pdf" },
              { name: "Video to GIF", path: "/video-to-gif" },
              { name: "Compress Video", path: "/compress-video" },
              { name: "Trim Video", path: "/trim-video" },
              { name: "Video to MP4", path: "/video-to-mp4" },
              { name: "Video to WebM", path: "/video-to-webm" },
              { name: "ZIP Files", path: "/zip-files" },
              { name: "Unzip Files", path: "/unzip-files" },
            ].map((tool) => (
              <Link
                key={tool.path}
                href={tool.path}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline py-1"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
