import Link from "next/link";
import {
  Music,
  Image,
  Video,
  FileText,
  Globe,
  Archive,
  HardDrive,
  Monitor,
  Camera,
  ArrowRight,
} from "lucide-react";

/* ── Format name display helpers ─────────────────────────────── */

const UPPER = new Set([
  "mp3","wav","aac","ogg","flac","aiff","alac","m4a","wma","pcm","dsd",
  "png","jpg","jpeg","heic","heif","webp","svg","avif","bmp","tiff","gif",
  "apng","ico","eps","psd","mp4","webm","mov","mkv","avi","flv","wmv",
  "mpeg","ts","pdf","docx","doc","odt","rtf","ppt","pptx","xls","xlsx",
  "ods","csv","tsv","html","xml","json","yaml","ttf","otf","woff","zip",
  "rar","ntfs","exfat","ext4","xfs","btrfs","apfs","hfs","zfs","dts",
  "cbr","vbr","cfr","vfr","hdr","sdr","rgb","cmyk","dpi","ppi","midi",
]);

const SPECIAL: Record<string, string> = {
  "h264": "H.264", "h265": "H.265", "h266": "H.266",
  "av1": "AV1", "vp8": "VP8", "vp9": "VP9", "ac3": "AC3",
  "3gp": "3GP", "m4v": "M4V", "mpeg4": "MPEG-4",
  "cr2": "CR2", "nef": "NEF", "dng": "DNG",
  "jpeg-2000": "JPEG 2000", "jpeg-xl": "JPEG XL",
  "ai": "Illustrator (AI)", "prores": "ProRes",
  "4k": "4K", "8k": "8K",
  "1080p": "1080p", "1080i": "1080i", "720p": "720p", "1440p": "1440p",
  "30fps": "30 FPS", "60fps": "60 FPS", "24fps": "24 FPS", "120fps": "120 FPS",
  "ntsc": "NTSC", "pal": "PAL",
  "8-bit": "8-bit", "10-bit": "10-bit",
  "16-bit": "16-bit", "24-bit-audio": "24-bit Audio",
  "44-1khz": "44.1 kHz", "48khz": "48 kHz",
  "srgb": "sRGB", "adobe-rgb": "Adobe RGB",
  "dolby-digital": "Dolby Digital",
  "tar-gz": "TAR.GZ", "utf-8": "UTF-8", "ascii": "ASCII",
  "woff2": "WOFF2", "refs": "ReFS", "fat32": "FAT32",
  "opus": "Opus", "mobi": "MOBI", "epub": "EPUB",
  "keynote": "Keynote", "pages": "Pages", "numbers": "Numbers",
  "excel": "Excel", "word": "Word", "latex": "LaTeX",
  "markdown": "Markdown", "zstd": "Zstandard", "brotli": "Brotli",
  "bzip2": "Bzip2", "gzip": "Gzip", "7z": "7Z",
  "lossless": "Lossless", "lossy": "Lossy", "compression": "Compression",
  "interlaced": "Interlaced", "progressive": "Progressive",
  "vector": "Vector", "raster": "Raster",
  "stereo": "Stereo", "mono": "Mono", "bitstream": "Bitstream",
};

function fmt(part: string): string {
  if (SPECIAL[part]) return SPECIAL[part];
  if (UPPER.has(part)) return part.toUpperCase();
  return part.charAt(0).toUpperCase() + part.slice(1);
}

function comparisonTitle(slug: string): [string, string] {
  const parts = slug.split("-vs-");
  return [fmt(parts[0]), fmt(parts[1])];
}

/* ── Comparison categories ───────────────────────────────────── */

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  slugs: string[];
}

const categories: Category[] = [
  {
    id: "audio",
    name: "Audio Format Comparisons",
    description: "Compare audio codecs, containers, and encoding formats",
    icon: Music,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    slugs: [
      "mp3-vs-wav", "aac-vs-mp3", "flac-vs-mp3", "ogg-vs-mp3", "opus-vs-mp3",
      "m4a-vs-mp3", "wma-vs-mp3", "aiff-vs-mp3", "midi-vs-mp3",
      "aac-vs-ogg", "aac-vs-flac", "opus-vs-aac", "alac-vs-aac", "ac3-vs-aac",
      "wma-vs-aac", "wav-vs-aac",
      "aiff-vs-wav", "wav-vs-flac", "wav-vs-ogg",
      "flac-vs-alac", "flac-vs-opus", "ogg-vs-flac",
      "dolby-digital-vs-dts",
    ],
  },
  {
    id: "audio-tech",
    name: "Audio Technical Comparisons",
    description: "Sample rates, bit depths, encoding methods, and audio concepts",
    icon: Music,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-300",
    slugs: [
      "cbr-vs-vbr", "stereo-vs-mono", "44-1khz-vs-48khz",
      "16-bit-vs-24-bit-audio", "pcm-vs-bitstream", "dsd-vs-pcm",
      "lossless-vs-lossy-compression",
    ],
  },
  {
    id: "image",
    name: "Image Format Comparisons",
    description: "Compare image formats for web, print, photography, and design",
    icon: Image,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    slugs: [
      "png-vs-jpg", "webp-vs-jpg", "webp-vs-png", "heic-vs-jpg", "heic-vs-png",
      "avif-vs-webp", "avif-vs-jpeg", "avif-vs-png",
      "gif-vs-webp", "gif-vs-svg", "png-vs-gif", "jpg-vs-gif", "apng-vs-gif",
      "bmp-vs-png", "bmp-vs-jpg", "tiff-vs-png", "tiff-vs-jpg", "tiff-vs-bmp",
      "ico-vs-png", "jpg-vs-jpeg", "webp-vs-heic", "heif-vs-heic",
      "jpeg-2000-vs-jpeg", "jpeg-xl-vs-avif",
      "svg-vs-png", "svg-vs-webp", "svg-vs-ai", "eps-vs-svg",
      "psd-vs-png", "psd-vs-tiff",
    ],
  },
  {
    id: "image-raw",
    name: "RAW & Photography Format Comparisons",
    description: "Compare camera RAW formats and photography-specific file types",
    icon: Camera,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-300",
    slugs: [
      "raw-vs-jpeg", "raw-vs-dng", "raw-vs-tiff",
      "cr2-vs-jpg", "nef-vs-jpg", "dng-vs-jpg",
    ],
  },
  {
    id: "image-tech",
    name: "Image & Graphics Technical Comparisons",
    description: "Color spaces, resolution, and graphics concepts",
    icon: Image,
    color: "text-blue-800",
    bg: "bg-blue-50",
    border: "border-blue-400",
    slugs: [
      "dpi-vs-ppi", "rgb-vs-cmyk", "srgb-vs-adobe-rgb", "vector-vs-raster",
    ],
  },
  {
    id: "video",
    name: "Video Format Comparisons",
    description: "Compare video containers and their compatibility, quality, and file size",
    icon: Video,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    slugs: [
      "mp4-vs-webm", "mp4-vs-mov", "mkv-vs-mp4", "avi-vs-mp4", "flv-vs-mp4",
      "wmv-vs-mp4", "3gp-vs-mp4", "m4v-vs-mp4", "mpeg-vs-mp4", "mpeg4-vs-mp4",
      "mp4-vs-ts", "gif-vs-mp4",
      "mkv-vs-avi", "avi-vs-wmv", "avi-vs-mov", "mov-vs-avi", "mov-vs-mkv",
      "webm-vs-mkv",
    ],
  },
  {
    id: "video-codec",
    name: "Video Codec Comparisons",
    description: "Compare H.264, H.265, AV1, VP9, and other video codecs",
    icon: Video,
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-300",
    slugs: [
      "h264-vs-h265", "h264-vs-vp9", "h264-vs-av1",
      "h265-vs-h266", "av1-vs-h265", "av1-vs-vp9",
      "vp8-vs-vp9", "vp9-vs-h265", "prores-vs-h264",
    ],
  },
  {
    id: "video-tech",
    name: "Video Technical Comparisons",
    description: "Resolution, frame rate, color depth, and display standards",
    icon: Monitor,
    color: "text-purple-800",
    bg: "bg-purple-50",
    border: "border-purple-400",
    slugs: [
      "4k-vs-1080p", "4k-vs-8k", "1080i-vs-1080p", "720p-vs-1080p", "1440p-vs-4k",
      "30fps-vs-60fps", "24fps-vs-30fps", "60fps-vs-120fps",
      "cfr-vs-vfr", "ntsc-vs-pal", "8-bit-vs-10-bit",
      "interlaced-vs-progressive", "hdr-vs-sdr",
    ],
  },
  {
    id: "document",
    name: "Document Format Comparisons",
    description: "Compare office, publishing, and document exchange formats",
    icon: FileText,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    slugs: [
      "pdf-vs-docx", "doc-vs-docx", "odt-vs-docx", "rtf-vs-docx", "pages-vs-docx",
      "ppt-vs-pptx", "keynote-vs-pptx", "pdf-vs-pptx",
      "xls-vs-xlsx", "ods-vs-xlsx", "csv-vs-xlsx", "numbers-vs-excel",
      "pdf-vs-epub", "epub-vs-mobi",
      "pdf-vs-html", "pdf-vs-jpg", "png-vs-pdf", "svg-vs-pdf", "tiff-vs-pdf",
      "csv-vs-tsv", "latex-vs-word",
    ],
  },
  {
    id: "web",
    name: "Web & Data Format Comparisons",
    description: "Compare data interchange, web, and font formats",
    icon: Globe,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    slugs: [
      "json-vs-csv", "xml-vs-json", "xml-vs-csv", "xml-vs-yaml", "yaml-vs-json",
      "html-vs-xml", "markdown-vs-html",
      "ttf-vs-otf", "woff-vs-ttf", "woff2-vs-woff",
      "utf-8-vs-ascii",
    ],
  },
  {
    id: "archive",
    name: "Archive & Compression Comparisons",
    description: "Compare archive formats, compression algorithms, and ratios",
    icon: Archive,
    color: "text-gray-600",
    bg: "bg-gray-100",
    border: "border-gray-300",
    slugs: [
      "zip-vs-rar", "7z-vs-zip", "rar-vs-7z",
      "tar-vs-zip", "tar-gz-vs-zip", "gzip-vs-zip",
      "bzip2-vs-gzip", "zstd-vs-gzip", "gzip-vs-brotli",
    ],
  },
  {
    id: "filesystem",
    name: "Filesystem Comparisons",
    description: "Compare file systems for Windows, macOS, Linux, and external drives",
    icon: HardDrive,
    color: "text-gray-700",
    bg: "bg-gray-100",
    border: "border-gray-400",
    slugs: [
      "fat32-vs-ntfs", "fat32-vs-exfat", "exfat-vs-ntfs", "ext4-vs-ntfs",
      "ext4-vs-xfs", "ntfs-vs-refs", "btrfs-vs-ext4",
      "apfs-vs-hfs", "zfs-vs-btrfs",
    ],
  },
  {
    id: "cross",
    name: "Cross-Format Comparisons",
    description: "Comparisons that span across media types",
    icon: ArrowRight,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    slugs: [
      "m4a-vs-mp4", "mp3-vs-mp4",
    ],
  },
];

/* ── Related tools for each category ─────────────────────────── */

const categoryTools: Record<string, { name: string; href: string }[]> = {
  audio: [
    { name: "Compress Audio", href: "/compress-audio" },
    { name: "WAV to MP3", href: "/wav-to-mp3" },
    { name: "MP3 to WAV", href: "/mp3-to-wav" },
    { name: "Trim Audio", href: "/trim-audio" },
    { name: "Extract Audio", href: "/extract-audio" },
  ],
  "audio-tech": [
    { name: "Compress Audio", href: "/compress-audio" },
    { name: "WAV to MP3", href: "/wav-to-mp3" },
  ],
  image: [
    { name: "PNG to JPG", href: "/png-to-jpg" },
    { name: "JPG to PNG", href: "/jpg-to-png" },
    { name: "Image to WebP", href: "/image-to-webp" },
    { name: "WebP to PNG", href: "/webp-to-png" },
    { name: "HEIC to JPG", href: "/heic-to-jpg" },
    { name: "Remove Background", href: "/remove-background" },
  ],
  "image-raw": [
    { name: "Resize Image", href: "/resize-image" },
    { name: "Compress Image", href: "/compress-image" },
  ],
  "image-tech": [
    { name: "Resize Image", href: "/resize-image" },
    { name: "Image to PDF", href: "/image-to-pdf" },
  ],
  video: [
    { name: "Video to MP4", href: "/video-to-mp4" },
    { name: "Video to WebM", href: "/video-to-webm" },
    { name: "Compress Video", href: "/compress-video" },
    { name: "Video to GIF", href: "/video-to-gif" },
    { name: "Trim Video", href: "/trim-video" },
  ],
  "video-codec": [
    { name: "Compress Video", href: "/compress-video" },
    { name: "Video to MP4", href: "/video-to-mp4" },
  ],
  "video-tech": [
    { name: "Compress Video", href: "/compress-video" },
    { name: "Video to MP4", href: "/video-to-mp4" },
  ],
  document: [
    { name: "Word to PDF", href: "/word-to-pdf" },
    { name: "Excel to PDF", href: "/excel-to-pdf" },
    { name: "Merge PDF", href: "/merge-pdf" },
    { name: "PDF to Text", href: "/pdf-to-text" },
    { name: "Sign PDF", href: "/sign-pdf" },
  ],
  web: [
    { name: "HTML to PDF", href: "/html-to-pdf" },
  ],
  archive: [
    { name: "ZIP Files", href: "/zip-files" },
    { name: "Unzip Files", href: "/unzip-files" },
  ],
  filesystem: [],
  cross: [
    { name: "Extract Audio", href: "/extract-audio" },
    { name: "Video to MP4", href: "/video-to-mp4" },
  ],
};

/* ── Page ────────────────────────────────────────────────────── */

const totalComparisons = categories.reduce((sum, cat) => sum + cat.slugs.length, 0);

export default function ComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "File Format Comparisons",
    description: `Compare ${totalComparisons}+ file formats side by side. Audio, image, video, document, and archive format comparisons.`,
    url: "https://www.filetoolworks.com/compare",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalComparisons,
      itemListElement: categories.flatMap((cat, ci) =>
        cat.slugs.map((slug, si) => {
          const [a, b] = comparisonTitle(slug);
          return {
            "@type": "ListItem",
            position: ci * 100 + si + 1,
            name: `${a} vs ${b}`,
            url: `https://www.filetoolworks.com/blog/${slug}`,
          };
        })
      ),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.filetoolworks.com" },
        { "@type": "ListItem", position: 2, name: "Format Comparisons", item: "https://www.filetoolworks.com/compare" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Format Comparisons</li>
          </ol>
        </nav>

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          File Format Comparisons
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">
          Compare {totalComparisons}+ file formats side by side. Detailed breakdowns of audio, image, video,
          document, and archive formats to help you pick the right format for your project.
        </p>

        {/* Jump navigation */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-10">
          <p className="text-sm font-medium text-gray-700 mb-3">Jump to category:</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`text-sm px-3 py-1.5 rounded-full border ${cat.border} ${cat.bg} ${cat.color} hover:opacity-80 transition-opacity`}
              >
                {cat.name.replace(" Comparisons", "")} ({cat.slugs.length})
              </a>
            ))}
          </div>
        </div>

        {/* Category sections */}
        {categories.map((cat) => {
          const Icon = cat.icon;
          const tools = categoryTools[cat.id] || [];

          return (
            <section key={cat.id} id={cat.id} className="mb-12 scroll-mt-20">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${cat.bg}`}>
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {cat.slugs.length}
                </span>
              </div>
              <p className="text-gray-600 mb-4 ml-12">{cat.description}</p>

              {/* Comparison grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {cat.slugs.map((slug) => {
                  const [a, b] = comparisonTitle(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/blog/${slug}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border ${cat.border} bg-white hover:${cat.bg} transition-colors group`}
                    >
                      <span className="text-gray-900 font-medium text-sm">
                        {a} <span className="text-gray-400 font-normal">vs</span> {b}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {/* Related tools */}
              {tools.length > 0 && (
                <div className="ml-12 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 py-1">Related tools:</span>
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Bottom CTA */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Need to convert a file?</h2>
          <p className="text-gray-600 mb-4">
            FileToolWorks offers 40+ free conversion and editing tools that run directly in your browser.
            No signup, no uploads to servers, complete privacy.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse All Tools
            </Link>
            <Link
              href="/file-formats"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              File Format Reference
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
