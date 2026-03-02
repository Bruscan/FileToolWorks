// Maps tool IDs to related blog post slugs for internal linking
// Each tool gets 2 related articles shown below the Related Tools section

export interface RelatedArticle {
  slug: string;
  title: string;
}

const articleMap: Record<string, RelatedArticle[]> = {
  "compress-audio": [
    { slug: "how-to-reduce-audio-file-size", title: "How to Reduce Audio File Size" },
    { slug: "audio-bitrate-explained", title: "Audio Bitrate Explained" },
  ],
  "extract-audio": [
    { slug: "how-to-extract-audio-from-video", title: "How to Extract Audio from Video" },
    { slug: "mp3-vs-wav", title: "MP3 vs WAV: Which Format to Choose" },
  ],
  "trim-audio": [
    { slug: "how-to-compress-podcast-audio", title: "How to Compress Podcast Audio" },
    { slug: "how-to-reduce-audio-file-size", title: "How to Reduce Audio File Size" },
  ],
  "wav-to-mp3": [
    { slug: "how-to-convert-wav-to-mp3", title: "How to Convert WAV to MP3" },
    { slug: "mp3-vs-wav", title: "MP3 vs WAV: Which Format to Choose" },
  ],
  "mp3-to-wav": [
    { slug: "mp3-to-wav-conversion", title: "MP3 to WAV Conversion Guide" },
    { slug: "wav-vs-flac", title: "WAV vs FLAC: Lossless Audio Compared" },
  ],
  "compress-mp3": [
    { slug: "how-to-reduce-audio-file-size", title: "How to Reduce Audio File Size" },
    { slug: "audio-bitrate-explained", title: "Audio Bitrate Explained" },
  ],
  "merge-pdf": [
    { slug: "how-to-merge-pdf-files", title: "How to Merge PDF Files" },
    { slug: "pdf-vs-docx", title: "PDF vs DOCX: When to Use Each" },
  ],
  "compress-pdf": [
    { slug: "how-to-compress-pdf", title: "How to Compress PDF Files" },
    { slug: "dpi-vs-ppi", title: "DPI vs PPI: What You Need to Know" },
  ],
  "split-pdf": [
    { slug: "how-to-split-pdf-pages", title: "How to Split PDF Pages" },
    { slug: "extract-pages-from-pdf", title: "How to Extract Pages from PDF" },
  ],
  "extract-pdf-pages": [
    { slug: "extract-pages-from-pdf", title: "How to Extract Pages from PDF" },
    { slug: "how-to-split-pdf-pages", title: "How to Split PDF Pages" },
  ],
  "pdf-to-text": [
    { slug: "pdf-vs-docx", title: "PDF vs DOCX: When to Use Each" },
    { slug: "pdf-vs-html", title: "PDF vs HTML: Format Comparison" },
  ],
  "pdf-to-jpg": [
    { slug: "pdf-vs-jpg", title: "PDF vs JPG: When to Convert" },
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
  ],
  "jpg-to-pdf": [
    { slug: "how-to-convert-image-to-pdf", title: "How to Convert Images to PDF" },
    { slug: "pdf-vs-jpg", title: "PDF vs JPG: When to Convert" },
  ],
  "html-to-pdf": [
    { slug: "pdf-vs-html", title: "PDF vs HTML: Format Comparison" },
    { slug: "how-to-compress-pdf", title: "How to Compress PDF Files" },
  ],
  "sign-pdf": [
    { slug: "how-to-sign-pdf-online", title: "How to Sign a PDF Online" },
    { slug: "pdf-vs-docx", title: "PDF vs DOCX: When to Use Each" },
  ],
  "image-to-pdf": [
    { slug: "how-to-convert-image-to-pdf", title: "How to Convert Images to PDF" },
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
  ],
  "png-to-jpg": [
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
    { slug: "how-to-compress-images-for-email", title: "How to Compress Images for Email" },
  ],
  "jpg-to-png": [
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
  ],
  "heic-to-jpg": [
    { slug: "heic-vs-jpg", title: "HEIC vs JPG: Format Comparison" },
    { slug: "how-to-convert-heic-to-jpg", title: "How to Convert HEIC to JPG" },
  ],
  "webp-to-jpg": [
    { slug: "how-to-convert-webp-to-jpg", title: "How to Convert WebP to JPG" },
    { slug: "webp-vs-jpg", title: "WebP vs JPG: Which Is Better?" },
  ],
  "webp-to-png": [
    { slug: "webp-vs-png", title: "WebP vs PNG: Format Comparison" },
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
  ],
  "image-to-webp": [
    { slug: "webp-vs-jpg", title: "WebP vs JPG: Which Is Better?" },
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
  ],
  "compress-image": [
    { slug: "how-to-compress-images-for-email", title: "How to Compress Images for Email" },
    { slug: "lossless-vs-lossy-compression", title: "Lossless vs Lossy Compression" },
  ],
  "resize-image": [
    { slug: "how-to-resize-images-without-losing-quality", title: "How to Resize Images Without Losing Quality" },
    { slug: "dpi-vs-ppi", title: "DPI vs PPI: What You Need to Know" },
  ],
  "crop-image": [
    { slug: "how-to-resize-images-without-losing-quality", title: "How to Resize Images Without Losing Quality" },
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
  ],
  "rotate-image": [
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
  ],
  "sharpen-image": [
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
    { slug: "how-to-resize-images-without-losing-quality", title: "How to Resize Images Without Losing Quality" },
  ],
  "blur-image": [
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
  ],
  "remove-background": [
    { slug: "best-image-format-for-web", title: "Best Image Format for the Web" },
    { slug: "png-vs-jpg", title: "PNG vs JPG: Choosing the Right Format" },
  ],
  "compress-video": [
    { slug: "how-to-compress-video-for-email", title: "How to Compress Video for Email" },
    { slug: "how-to-reduce-video-file-size", title: "How to Reduce Video File Size" },
  ],
  "video-to-gif": [
    { slug: "gif-vs-mp4", title: "GIF vs MP4: When to Use Each Format" },
    { slug: "how-to-make-gif-from-video", title: "How to Make a GIF from Video" },
  ],
  "trim-video": [
    { slug: "how-to-compress-video-for-email", title: "How to Compress Video for Email" },
    { slug: "how-to-reduce-video-file-size", title: "How to Reduce Video File Size" },
  ],
  "video-to-mp4": [
    { slug: "how-to-convert-mov-to-mp4", title: "How to Convert MOV to MP4" },
    { slug: "mp4-vs-mov", title: "MP4 vs MOV: Format Comparison" },
  ],
  "video-to-webm": [
    { slug: "mp4-vs-webm", title: "MP4 vs WebM: Which to Choose" },
    { slug: "best-video-format-for-social-media", title: "Best Video Format for Social Media" },
  ],
  "word-to-pdf": [
    { slug: "pdf-vs-docx", title: "PDF vs DOCX: When to Use Each" },
    { slug: "doc-vs-docx", title: "DOC vs DOCX: What Changed" },
  ],
  "excel-to-pdf": [
    { slug: "xls-vs-xlsx", title: "XLS vs XLSX: Excel Format Comparison" },
    { slug: "csv-vs-xlsx", title: "CSV vs XLSX: Spreadsheet Formats" },
  ],
  "ppt-to-pdf": [
    { slug: "ppt-vs-pptx", title: "PPT vs PPTX: PowerPoint Formats" },
    { slug: "pdf-vs-pptx", title: "PDF vs PPTX: Presentation Formats" },
  ],
  "zip-files": [
    { slug: "zip-vs-rar", title: "ZIP vs RAR: Archive Format Comparison" },
    { slug: "7z-vs-zip", title: "7z vs ZIP: Which Is Better?" },
  ],
  "unzip-files": [
    { slug: "zip-vs-rar", title: "ZIP vs RAR: Archive Format Comparison" },
    { slug: "tar-vs-zip", title: "TAR vs ZIP: Archive Formats" },
  ],
};

export function getRelatedArticles(toolId: string): RelatedArticle[] {
  return articleMap[toolId] || [];
}
