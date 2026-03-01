import Link from "next/link";

const audioPosts = [
  {
    slug: "how-to-compress-wav-files",
    title: "How to Compress WAV Files Without Ruining Audio Quality",
  },
  {
    slug: "mp3-vs-wav",
    title: "MP3 vs WAV: Quality, File Size, and When to Use Each",
  },
  {
    slug: "how-to-reduce-audio-file-size",
    title: "How to Reduce Audio File Size: 5 Methods That Work",
  },
  {
    slug: "audio-bitrate-explained",
    title: "Audio Bitrate Explained: What It Means and How to Choose",
  },
  {
    slug: "flac-to-mp3",
    title: "FLAC to MP3: How to Convert and What You Lose",
  },
  {
    slug: "mp3-to-wav-conversion",
    title: "How to Convert MP3 to WAV (Free, No Software Needed)",
  },
  {
    slug: "best-audio-format-for-web",
    title: "Best Audio Format for Web: MP3, OGG, AAC, or WAV?",
  },
  {
    slug: "ogg-vs-mp3",
    title: "OGG vs MP3: Quality, Compatibility, and Which to Use",
  },
  {
    slug: "how-to-compress-podcast-audio",
    title: "How to Compress Podcast Audio Without Losing Voice Quality",
  },
  {
    slug: "how-to-extract-audio-from-video",
    title: "How to Extract Audio from Video (Free, Any Format)",
  },
  {
    slug: "aac-vs-mp3",
    title: "AAC vs MP3: Quality, Compatibility, and Which to Choose",
  },
  {
    slug: "wav-vs-flac",
    title: "WAV vs FLAC: File Size, Quality, and When to Use Each",
  },
  {
    slug: "m4a-vs-mp3",
    title: "M4A vs MP3: Quality, Compatibility, and File Size Compared",
  },
  {
    slug: "flac-vs-alac",
    title: "FLAC vs ALAC: Lossless Audio Formats Compared",
  },
  {
    slug: "opus-vs-mp3",
    title: "Opus vs MP3: Audio Quality, File Size, and Compatibility Compared",
  },
  {
    slug: "ogg-vs-flac",
    title: "OGG vs FLAC: Lossy vs Lossless Audio Compared",
  },
  {
    slug: "aiff-vs-wav",
    title: "AIFF vs WAV: Differences, Compatibility, and Which to Choose",
  },
  {
    slug: "wav-vs-aac",
    title: "WAV vs AAC: Quality, File Size, and When to Use Each",
  },
  {
    slug: "wma-vs-mp3",
    title: "WMA vs MP3: Quality, Compatibility, and File Size Compared",
  },
  {
    slug: "cbr-vs-vbr",
    title: "CBR vs VBR: Constant vs Variable Bitrate Explained",
  },
];

const imagePosts = [
  {
    slug: "png-vs-jpg",
    title: "PNG vs JPG: When to Use Each Format",
  },
  {
    slug: "heic-vs-jpg",
    title: "HEIC vs JPG: Which Image Format Should You Use?",
  },
  {
    slug: "webp-vs-png",
    title: "WebP vs PNG: File Size, Quality, and When to Use Each",
  },
  {
    slug: "svg-vs-png",
    title: "SVG vs PNG: When to Use Each Format",
  },
  {
    slug: "best-image-format-for-web",
    title: "Best Image Format for Web: JPG, PNG, WebP Compared",
  },
  {
    slug: "dpi-vs-ppi",
    title: "DPI vs PPI - What's the Difference?",
  },
  {
    slug: "how-to-resize-images-without-losing-quality",
    title: "How to Resize Images Without Losing Quality",
  },
  {
    slug: "how-to-compress-images-for-email",
    title: "How to Compress Images for Email (Under 1MB Fast)",
  },
  {
    slug: "how-to-convert-webp-to-jpg",
    title: "How to Convert WebP to JPG (Free, No Upload Required)",
  },
  {
    slug: "how-to-convert-heic-to-jpg",
    title: "How to Convert HEIC to JPG",
  },
  {
    slug: "how-to-convert-image-to-pdf",
    title: "How to Convert Image to PDF",
  },
  {
    slug: "webp-vs-jpg",
    title: "WebP vs JPG: File Size, Quality, and Browser Support",
  },
  {
    slug: "jpg-vs-jpeg",
    title: "JPG vs JPEG: Is There a Difference?",
  },
  {
    slug: "avif-vs-webp",
    title: "AVIF vs WebP: Compression, Quality, and Browser Support",
  },
  {
    slug: "heif-vs-heic",
    title: "HEIF vs HEIC: What is the Difference?",
  },
  {
    slug: "lossless-vs-lossy-compression",
    title: "Lossless vs Lossy Compression: How They Work and When to Use Each",
  },
  {
    slug: "png-vs-gif",
    title: "PNG vs GIF: Color Depth, Animation, and When to Use Each",
  },
  {
    slug: "tiff-vs-png",
    title: "TIFF vs PNG: File Size, Quality, and When to Use Each",
  },
  {
    slug: "gif-vs-webp",
    title: "GIF vs WebP: File Size, Animation, and Quality Compared",
  },
  {
    slug: "raw-vs-jpeg",
    title: "RAW vs JPEG: Quality, File Size, and When to Shoot Each",
  },
  {
    slug: "bmp-vs-png",
    title: "BMP vs PNG: File Size, Quality, and When to Use Each",
  },
  {
    slug: "tiff-vs-jpg",
    title: "TIFF vs JPG: When to Use Each Image Format",
  },
];

const pdfPosts = [
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files Online for Free",
  },
  {
    slug: "how-to-split-pdf-pages",
    title: "How to Split PDF Pages Online",
  },
  {
    slug: "extract-pages-from-pdf",
    title: "How to Extract Pages from a PDF",
  },
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress a PDF Without Losing Quality",
  },
  {
    slug: "how-to-sign-pdf-online",
    title: "How to Sign a PDF Online for Free",
  },
  {
    slug: "pdf-vs-docx",
    title: "PDF vs DOCX: Differences and When to Use Each",
  },
];

const videoPosts = [
  {
    slug: "how-to-compress-video-for-email",
    title: "How to Compress Video for Email (Under 25MB)",
  },
  {
    slug: "how-to-reduce-video-file-size",
    title: "How to Reduce Video File Size Without Losing Quality",
  },
  {
    slug: "gif-vs-mp4",
    title: "GIF vs MP4: Which Format Should You Use?",
  },
  {
    slug: "mp4-vs-webm",
    title: "MP4 vs WebM: File Size, Quality, and Compatibility Compared",
  },
  {
    slug: "how-to-make-gif-from-video",
    title: "How to Make a GIF from a Video (Best Settings for Small Files)",
  },
  {
    slug: "how-to-convert-mov-to-mp4",
    title: "How to Convert MOV to MP4 (3 Free Methods)",
  },
  {
    slug: "mp4-vs-mov",
    title: "MP4 vs MOV: Which Video Format Should You Use?",
  },
  {
    slug: "avi-vs-mp4",
    title: "AVI vs MP4: File Size, Quality, and Compatibility Compared",
  },
  {
    slug: "mkv-vs-mp4",
    title: "MKV vs MP4: File Size, Quality, and Compatibility Compared",
  },
  {
    slug: "flv-vs-mp4",
    title: "FLV vs MP4: Why FLV Is Dead and How to Convert",
  },
  {
    slug: "wmv-vs-mp4",
    title: "WMV vs MP4: Compatibility, Quality, and File Size Compared",
  },
  {
    slug: "best-video-format-for-social-media",
    title: "Best Video Format for Social Media in 2026",
  },
  {
    slug: "h264-vs-h265",
    title: "H.264 vs H.265: Compression, Quality, and When to Use Each",
  },
  {
    slug: "webm-vs-mkv",
    title: "WebM vs MKV: Web Streaming vs Media Storage Compared",
  },
];

const generalPosts = [
  {
    slug: "zip-vs-rar",
    title: "ZIP vs RAR: File Compression Formats Compared",
  },
];

const categories = [
  { name: "Audio", posts: audioPosts, icon: "🎵" },
  { name: "Image", posts: imagePosts, icon: "🖼" },
  { name: "PDF", posts: pdfPosts, icon: "📄" },
  { name: "Video", posts: videoPosts, icon: "🎬" },
  { name: "General", posts: generalPosts, icon: "📁" },
];

export default function BlogIndex() {
  const allPosts = [
    ...audioPosts,
    ...imagePosts,
    ...pdfPosts,
    ...videoPosts,
    ...generalPosts,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FileToolWorks Blog",
    description:
      "Practical guides on file formats, conversion, and compression.",
    url: "https://filetoolworks.com/blog",
    publisher: {
      "@type": "Organization",
      name: "FileToolWorks",
      url: "https://filetoolworks.com",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allPosts.length,
      itemListElement: allPosts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://filetoolworks.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://filetoolworks.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://filetoolworks.com/blog",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          FileToolWorks Blog
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Practical guides on file formats, conversion, and compression.{" "}
          {allPosts.length} articles covering audio, image, PDF, and video
          files.
        </p>

        {categories.map((category) => (
          <section key={category.name} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {category.icon} {category.name} Guides
            </h2>
            <ul className="space-y-3">
              {category.posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline text-lg"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
