import Link from "next/link";

const audioFormats = [
  { ext: ".mp3", name: "MP3", mime: "audio/mpeg", desc: "Most common audio format. Lossy compression, small files, universal playback support.", tools: [{ name: "Compress Audio", href: "/compress-audio" }, { name: "WAV to MP3", href: "/wav-to-mp3" }], blog: "/blog/aac-vs-mp3" },
  { ext: ".wav", name: "WAV", mime: "audio/wav", desc: "Uncompressed audio. Large files, lossless quality. Standard for audio editing and production.", tools: [{ name: "MP3 to WAV", href: "/mp3-to-wav" }, { name: "WAV to MP3", href: "/wav-to-mp3" }], blog: "/blog/mp3-vs-wav" },
  { ext: ".aac", name: "AAC", mime: "audio/aac", desc: "Advanced Audio Coding. Better quality than MP3 at same bitrate. Default for Apple devices and YouTube.", tools: [{ name: "Compress Audio", href: "/compress-audio" }, { name: "Extract Audio", href: "/extract-audio" }], blog: "/blog/aac-vs-mp3" },
  { ext: ".ogg", name: "OGG Vorbis", mime: "audio/ogg", desc: "Open-source lossy format. Good compression, royalty-free. Used in games and web audio.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/ogg-vs-mp3" },
  { ext: ".flac", name: "FLAC", mime: "audio/flac", desc: "Free Lossless Audio Codec. Compresses without quality loss. 50-60% of WAV size.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/flac-vs-mp3" },
  { ext: ".m4a", name: "M4A", mime: "audio/mp4", desc: "MPEG-4 audio container, typically AAC encoded. Default format for iTunes and Apple Music.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/m4a-vs-mp3" },
  { ext: ".wma", name: "WMA", mime: "audio/x-ms-wma", desc: "Windows Media Audio. Microsoft proprietary format. Declining use, mostly legacy Windows applications.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/wma-vs-mp3" },
  { ext: ".aiff", name: "AIFF", mime: "audio/aiff", desc: "Audio Interchange File Format. Apple's uncompressed audio format. Similar to WAV but Mac-native.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/aiff-vs-wav" },
  { ext: ".opus", name: "Opus", mime: "audio/opus", desc: "Modern open-source codec. Excellent at all bitrates. Used in VoIP, streaming, and WebRTC.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/opus-vs-mp3" },
  { ext: ".alac", name: "ALAC", mime: "audio/alac", desc: "Apple Lossless Audio Codec. Lossless compression for Apple ecosystem. Similar to FLAC but Apple-native.", tools: [{ name: "Compress Audio", href: "/compress-audio" }], blog: "/blog/alac-vs-aac" },
];

const imageFormats = [
  { ext: ".jpg/.jpeg", name: "JPEG", mime: "image/jpeg", desc: "Most common image format. Lossy compression ideal for photos. Adjustable quality from 1-100%.", tools: [{ name: "PNG to JPG", href: "/png-to-jpg" }, { name: "Compress Image", href: "/compress-image" }], blog: "/blog/png-vs-jpg" },
  { ext: ".png", name: "PNG", mime: "image/png", desc: "Lossless format with transparency support. Best for screenshots, graphics, and text-heavy images.", tools: [{ name: "JPG to PNG", href: "/jpg-to-png" }, { name: "WebP to PNG", href: "/webp-to-png" }], blog: "/blog/png-vs-jpg" },
  { ext: ".webp", name: "WebP", mime: "image/webp", desc: "Google's modern format. 25-35% smaller than JPEG at same quality. Supports transparency and animation.", tools: [{ name: "Image to WebP", href: "/image-to-webp" }, { name: "WebP to JPG", href: "/webp-to-jpg" }], blog: "/blog/webp-vs-jpg" },
  { ext: ".gif", name: "GIF", mime: "image/gif", desc: "Supports animation and transparency. Limited to 256 colors. Best for simple animations and icons.", tools: [{ name: "Video to GIF", href: "/video-to-gif" }], blog: "/blog/gif-vs-mp4" },
  { ext: ".heic/.heif", name: "HEIC", mime: "image/heic", desc: "Apple's default photo format since iOS 11. 50% smaller than JPEG. Limited browser/app support.", tools: [{ name: "HEIC to JPG", href: "/heic-to-jpg" }], blog: "/blog/heic-vs-jpg" },
  { ext: ".svg", name: "SVG", mime: "image/svg+xml", desc: "Vector format using XML. Scales to any size without quality loss. Best for logos, icons, and illustrations.", tools: [], blog: "/blog/svg-vs-png" },
  { ext: ".bmp", name: "BMP", mime: "image/bmp", desc: "Bitmap format. Uncompressed, very large files. Legacy Windows format, rarely used today.", tools: [{ name: "Compress Image", href: "/compress-image" }], blog: "/blog/bmp-vs-jpg" },
  { ext: ".tiff/.tif", name: "TIFF", mime: "image/tiff", desc: "Tagged Image File Format. Supports lossless compression and multiple layers. Standard in publishing and photography.", tools: [{ name: "Compress Image", href: "/compress-image" }], blog: "/blog/tiff-vs-jpg" },
  { ext: ".avif", name: "AVIF", mime: "image/avif", desc: "AV1-based image format. Better compression than WebP. Growing browser support, excellent for web images.", tools: [], blog: "/blog/avif-vs-webp" },
  { ext: ".ico", name: "ICO", mime: "image/x-icon", desc: "Icon format for Windows and web favicons. Contains multiple sizes in one file.", tools: [], blog: "/blog/ico-vs-png" },
  { ext: ".raw", name: "RAW", mime: "image/raw", desc: "Unprocessed sensor data from digital cameras. Maximum editing flexibility. Very large files.", tools: [], blog: "/blog/raw-vs-jpeg" },
  { ext: ".psd", name: "PSD", mime: "image/vnd.adobe.photoshop", desc: "Adobe Photoshop native format. Preserves layers, masks, and editing history.", tools: [], blog: "/blog/psd-vs-png" },
];

const videoFormats = [
  { ext: ".mp4", name: "MP4", mime: "video/mp4", desc: "Most widely supported video format. Uses H.264/H.265 codecs. Plays on virtually every device.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }, { name: "Compress Video", href: "/compress-video" }], blog: "/blog/mkv-vs-mp4" },
  { ext: ".webm", name: "WebM", mime: "video/webm", desc: "Google's open web video format. Uses VP8/VP9 codecs. Smaller than MP4 at similar quality.", tools: [{ name: "Video to WebM", href: "/video-to-webm" }], blog: "/blog/mp4-vs-webm" },
  { ext: ".mkv", name: "MKV", mime: "video/x-matroska", desc: "Matroska container. Supports unlimited tracks, chapters, and metadata. Popular for high-quality video.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }], blog: "/blog/mkv-vs-mp4" },
  { ext: ".mov", name: "MOV", mime: "video/quicktime", desc: "Apple QuickTime format. High quality, large files. Default for iPhone video recording.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }], blog: "/blog/mp4-vs-mov" },
  { ext: ".avi", name: "AVI", mime: "video/x-msvideo", desc: "Audio Video Interleave. Microsoft legacy format. Large files, limited codec support.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }], blog: "/blog/avi-vs-mp4" },
  { ext: ".wmv", name: "WMV", mime: "video/x-ms-wmv", desc: "Windows Media Video. Microsoft proprietary. Declining use outside Windows ecosystem.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }], blog: "/blog/wmv-vs-mp4" },
  { ext: ".flv", name: "FLV", mime: "video/x-flv", desc: "Flash Video. Formerly dominant for web video. Obsolete since Flash end-of-life in 2020.", tools: [{ name: "Video to MP4", href: "/video-to-mp4" }], blog: "/blog/flv-vs-mp4" },
  { ext: ".gif", name: "GIF (animated)", mime: "image/gif", desc: "Short animations without sound. Very large file sizes compared to video. Max 256 colors per frame.", tools: [{ name: "Video to GIF", href: "/video-to-gif" }], blog: "/blog/gif-vs-mp4" },
];

const documentFormats = [
  { ext: ".pdf", name: "PDF", mime: "application/pdf", desc: "Portable Document Format. Preserves layout across all devices. Standard for sharing documents.", tools: [{ name: "Merge PDF", href: "/merge-pdf" }, { name: "Sign PDF", href: "/sign-pdf" }, { name: "Compress PDF", href: "/compress-pdf" }], blog: "/blog/pdf-vs-docx" },
  { ext: ".docx", name: "DOCX", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", desc: "Microsoft Word format since 2007. XML-based, editable. Standard for business documents.", tools: [{ name: "Word to PDF", href: "/word-to-pdf" }], blog: "/blog/doc-vs-docx" },
  { ext: ".doc", name: "DOC", mime: "application/msword", desc: "Legacy Microsoft Word format (pre-2007). Binary format, less interoperable than DOCX.", tools: [{ name: "Word to PDF", href: "/word-to-pdf" }], blog: "/blog/doc-vs-docx" },
  { ext: ".xlsx", name: "XLSX", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", desc: "Microsoft Excel format. XML-based spreadsheets with formulas, charts, and pivot tables.", tools: [{ name: "Excel to PDF", href: "/excel-to-pdf" }], blog: "/blog/xls-vs-xlsx" },
  { ext: ".pptx", name: "PPTX", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation", desc: "Microsoft PowerPoint format. Presentations with slides, animations, and embedded media.", tools: [{ name: "PPT to PDF", href: "/ppt-to-pdf" }], blog: "/blog/ppt-vs-pptx" },
  { ext: ".txt", name: "Plain Text", mime: "text/plain", desc: "Unformatted text. Universal compatibility, smallest file size. No styling or images.", tools: [{ name: "PDF to Text", href: "/pdf-to-text" }], blog: "" },
  { ext: ".html", name: "HTML", mime: "text/html", desc: "HyperText Markup Language. Web page format with structure, styling, and interactivity.", tools: [{ name: "HTML to PDF", href: "/html-to-pdf" }], blog: "/blog/html-vs-xml" },
  { ext: ".rtf", name: "RTF", mime: "application/rtf", desc: "Rich Text Format. Basic formatting with broad compatibility. Good for simple cross-platform documents.", tools: [], blog: "/blog/rtf-vs-docx" },
  { ext: ".odt", name: "ODT", mime: "application/vnd.oasis.opendocument.text", desc: "OpenDocument Text. Open standard used by LibreOffice and Google Docs export.", tools: [], blog: "/blog/odt-vs-docx" },
  { ext: ".csv", name: "CSV", mime: "text/csv", desc: "Comma-Separated Values. Plain text data format. Universal for data exchange between applications.", tools: [], blog: "/blog/csv-vs-xlsx" },
];

const archiveFormats = [
  { ext: ".zip", name: "ZIP", mime: "application/zip", desc: "Most common archive format. Built-in support on Windows, macOS, and Linux. Good compression.", tools: [{ name: "ZIP Files", href: "/zip-files" }, { name: "Unzip Files", href: "/unzip-files" }], blog: "/blog/zip-vs-rar" },
  { ext: ".rar", name: "RAR", mime: "application/vnd.rar", desc: "Roshal Archive. Better compression than ZIP. Requires WinRAR or compatible software.", tools: [{ name: "Unzip Files", href: "/unzip-files" }], blog: "/blog/zip-vs-rar" },
  { ext: ".7z", name: "7Z", mime: "application/x-7z-compressed", desc: "7-Zip format. Best compression ratios. Open source. Supports AES-256 encryption.", tools: [], blog: "/blog/7z-vs-zip" },
  { ext: ".tar", name: "TAR", mime: "application/x-tar", desc: "Tape Archive. Bundles files without compression. Often combined with gzip (.tar.gz) or bzip2 (.tar.bz2).", tools: [], blog: "/blog/tar-vs-zip" },
  { ext: ".gz/.gzip", name: "GZIP", mime: "application/gzip", desc: "GNU Zip compression. Single-file compression. Standard for web content compression and Linux.", tools: [], blog: "/blog/gzip-vs-zip" },
];

function FormatTable({ formats, category }: { formats: typeof audioFormats; category: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 font-semibold border-b">Format</th>
            <th className="text-left p-3 font-semibold border-b hidden sm:table-cell">Extension</th>
            <th className="text-left p-3 font-semibold border-b">Description</th>
            <th className="text-left p-3 font-semibold border-b hidden md:table-cell">Tools</th>
          </tr>
        </thead>
        <tbody>
          {formats.map((fmt) => (
            <tr key={fmt.ext} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">
                {fmt.blog ? (
                  <Link href={fmt.blog} className="text-blue-600 hover:underline">{fmt.name}</Link>
                ) : (
                  fmt.name
                )}
              </td>
              <td className="p-3 text-gray-600 hidden sm:table-cell font-mono text-xs">{fmt.ext}</td>
              <td className="p-3 text-gray-700">{fmt.desc}</td>
              <td className="p-3 hidden md:table-cell">
                {fmt.tools.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {fmt.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FileFormatsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          File Format Reference Guide
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A complete reference for 60+ common file formats. Find the right format for your needs,
          understand the differences, and convert between formats with free tools.
        </p>

        <nav className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <p className="text-sm font-semibold text-gray-500 mb-2">Jump to:</p>
          <div className="flex flex-wrap gap-2">
            <a href="#audio" className="px-3 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 text-sm">Audio Formats</a>
            <a href="#image" className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm">Image Formats</a>
            <a href="#video" className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm">Video Formats</a>
            <a href="#document" className="px-3 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 text-sm">Document Formats</a>
            <a href="#archive" className="px-3 py-1 bg-orange-50 text-orange-700 rounded hover:bg-orange-100 text-sm">Archive Formats</a>
          </div>
        </nav>

        <section id="audio" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Audio Formats</h2>
          <p className="text-gray-600 mb-4">
            Audio formats differ in compression method, file size, and quality. Lossy formats (MP3, AAC, OGG) are smaller but discard some audio data. Lossless formats (FLAC, WAV, ALAC) preserve full quality but produce larger files.
          </p>
          <FormatTable formats={audioFormats} category="audio" />
          <p className="text-sm text-gray-500 mt-3">
            Need to reduce audio file size? Use our <Link href="/compress-audio" className="text-blue-600 hover:underline">Audio Compressor</Link> to convert any format to optimized MP3.
            Read more: <Link href="/blog/audio-bitrate-explained" className="text-blue-600 hover:underline">Audio Bitrate Explained</Link>
          </p>
        </section>

        <section id="image" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Formats</h2>
          <p className="text-gray-600 mb-4">
            Image formats balance file size, quality, and feature support (transparency, animation). JPEG is best for photos, PNG for graphics with transparency, and WebP for modern web images that need both small size and quality.
          </p>
          <FormatTable formats={imageFormats} category="image" />
          <p className="text-sm text-gray-500 mt-3">
            Convert between image formats with our free tools: <Link href="/png-to-jpg" className="text-blue-600 hover:underline">PNG to JPG</Link>, <Link href="/image-to-webp" className="text-blue-600 hover:underline">Image to WebP</Link>, or <Link href="/resize-image" className="text-blue-600 hover:underline">Resize Image</Link>.
            Read more: <Link href="/blog/best-image-format-for-web" className="text-blue-600 hover:underline">Best Image Format for Web</Link>
          </p>
        </section>

        <section id="video" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Video Formats</h2>
          <p className="text-gray-600 mb-4">
            Video formats are containers that hold video and audio streams encoded with codecs. MP4 with H.264 is the universal choice. WebM offers better compression for web. MKV is popular for high-quality archival.
          </p>
          <FormatTable formats={videoFormats} category="video" />
          <p className="text-sm text-gray-500 mt-3">
            Convert videos with our free tools: <Link href="/video-to-mp4" className="text-blue-600 hover:underline">Video to MP4</Link>, <Link href="/compress-video" className="text-blue-600 hover:underline">Compress Video</Link>, or <Link href="/video-to-gif" className="text-blue-600 hover:underline">Video to GIF</Link>.
            Read more: <Link href="/blog/h264-vs-h265" className="text-blue-600 hover:underline">H.264 vs H.265</Link>
          </p>
        </section>

        <section id="document" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Formats</h2>
          <p className="text-gray-600 mb-4">
            Document formats handle text, formatting, and layout differently. PDF preserves exact appearance across devices. DOCX is editable in Word. HTML is for web content. Choose based on whether you need editability or consistent display.
          </p>
          <FormatTable formats={documentFormats} category="document" />
          <p className="text-sm text-gray-500 mt-3">
            Work with documents: <Link href="/word-to-pdf" className="text-blue-600 hover:underline">Word to PDF</Link>, <Link href="/merge-pdf" className="text-blue-600 hover:underline">Merge PDF</Link>, or <Link href="/sign-pdf" className="text-blue-600 hover:underline">Sign PDF</Link>.
            Read more: <Link href="/blog/pdf-vs-docx" className="text-blue-600 hover:underline">PDF vs DOCX</Link>
          </p>
        </section>

        <section id="archive" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Archive Formats</h2>
          <p className="text-gray-600 mb-4">
            Archive formats bundle multiple files into one and optionally compress them. ZIP has universal support. 7Z offers the best compression ratios. TAR is the standard on Linux, usually paired with GZIP.
          </p>
          <FormatTable formats={archiveFormats} category="archive" />
          <p className="text-sm text-gray-500 mt-3">
            Create or extract archives: <Link href="/zip-files" className="text-blue-600 hover:underline">ZIP Files</Link> or <Link href="/unzip-files" className="text-blue-600 hover:underline">Unzip Files</Link>.
            Read more: <Link href="/blog/zip-vs-rar" className="text-blue-600 hover:underline">ZIP vs RAR</Link>
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Quick Format Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for web images</h3>
              <p className="text-gray-600">WebP for modern browsers, JPEG as fallback. <Link href="/image-to-webp" className="text-blue-600 hover:underline">Convert to WebP</Link></p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for sharing documents</h3>
              <p className="text-gray-600">PDF for consistent layout. <Link href="/word-to-pdf" className="text-blue-600 hover:underline">Convert Word to PDF</Link></p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for audio quality</h3>
              <p className="text-gray-600">FLAC for lossless, 320kbps MP3 for portable. <Link href="/compress-audio" className="text-blue-600 hover:underline">Compress Audio</Link></p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for video sharing</h3>
              <p className="text-gray-600">MP4 with H.264 for universal playback. <Link href="/video-to-mp4" className="text-blue-600 hover:underline">Convert to MP4</Link></p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for logos and icons</h3>
              <p className="text-gray-600">SVG for scalability, PNG for compatibility. <Link href="/jpg-to-png" className="text-blue-600 hover:underline">Convert to PNG</Link></p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Best for email attachments</h3>
              <p className="text-gray-600">ZIP for multiple files, compressed JPEG for photos. <Link href="/zip-files" className="text-blue-600 hover:underline">Create ZIP</Link></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
