import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Image,
  FileText,
  Video,
  Music,
  FileSpreadsheet,
  Archive,
} from "lucide-react";

const categories = [
  {
    id: "image",
    name: "Image Tools",
    description: "Convert, compress, resize, crop, and edit images online",
    icon: Image,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Merge, split, compress, convert, sign, and extract PDF files",
    icon: FileText,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    id: "video",
    name: "Video Tools",
    description: "Compress, convert, trim videos and create GIFs",
    icon: Video,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    id: "audio",
    name: "Audio Tools",
    description: "Compress, convert, trim, and extract audio files",
    icon: Music,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: "document",
    name: "Document Tools",
    description: "Convert Word, Excel, and PowerPoint to PDF",
    icon: FileSpreadsheet,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    id: "compression",
    name: "Compression Tools",
    description: "Create and extract ZIP archives",
    icon: Archive,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
];

export default function ToolsPage() {
  const toolCount = tools.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Free Online File Tools",
    description: `Browse ${toolCount}+ free online file tools for converting, compressing, and editing files.`,
    url: "https://www.filetoolworks.com/tools",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: toolCount,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `https://www.filetoolworks.com${tool.href}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          All Free Online File Tools
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl">
          {toolCount} free tools for converting, compressing, and editing files
          directly in your browser. No signup, no upload limits, no watermarks.
          Your files never leave your device.
        </p>

        {categories.map((category) => {
          const categoryTools = tools.filter(
            (t) => t.category === category.id
          );
          if (categoryTools.length === 0) return null;

          const Icon = category.icon;

          return (
            <section key={category.id} className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-6 h-6 ${category.color}`} />
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <span className="text-sm text-gray-500">
                  ({categoryTools.length} tools)
                </span>
              </div>
              <p className="text-gray-600 mb-4 ml-9">{category.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-9">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className={`block p-4 bg-white rounded-lg border ${category.border} hover:shadow-md transition-shadow`}
                  >
                    <h3 className={`font-semibold ${category.color} mb-1`}>
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why FileToolWorks?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                100% Free, No Signup
              </h3>
              <p className="text-gray-600 text-sm">
                Every tool is completely free with no account required. No
                hidden fees, no premium tiers, no watermarks on your files.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Browser-Based Privacy
              </h3>
              <p className="text-gray-600 text-sm">
                Most tools process files entirely in your browser using
                WebAssembly and Canvas APIs. Your files never leave your device.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                No File Size Limits
              </h3>
              <p className="text-gray-600 text-sm">
                Since processing happens locally, there are no upload limits or
                server-imposed file size restrictions on most tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
