export interface Tool {
  id: string;
  name: string;
  href: string;
  description: string;
  category: string;
  iconColor: string;
}

export const tools: Tool[] = [
  // Image Tools
  {
    id: "image-to-pdf",
    name: "Image to PDF",
    href: "/image-to-pdf",
    description: "Convert JPG, PNG, HEIC to PDF instantly",
    category: "image",
    iconColor: "text-blue-600",
  },
  {
    id: "heic-to-jpg",
    name: "HEIC to JPG",
    href: "/heic-to-jpg",
    description: "Convert iPhone photos to JPG format",
    category: "image",
    iconColor: "text-green-600",
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    href: "/png-to-jpg",
    description: "Convert PNG images to JPG format",
    category: "image",
    iconColor: "text-purple-600",
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    href: "/jpg-to-png",
    description: "Convert JPG images to PNG format",
    category: "image",
    iconColor: "text-indigo-600",
  },
  {
    id: "webp-to-jpg",
    name: "WebP to JPG",
    href: "/webp-to-jpg",
    description: "Convert WebP images to JPG format",
    category: "image",
    iconColor: "text-orange-600",
  },
  {
    id: "webp-to-png",
    name: "WebP to PNG",
    href: "/webp-to-png",
    description: "Convert WebP images to PNG format",
    category: "image",
    iconColor: "text-pink-600",
  },
  {
    id: "compress-image",
    name: "Image Compressor",
    href: "/compress-image",
    description: "Reduce image file size without losing quality",
    category: "image",
    iconColor: "text-blue-600",
  },
  {
    id: "compress-jpg",
    name: "Compress JPG",
    href: "/compress-jpg",
    description: "Reduce JPG file size without losing visible quality",
    category: "image",
    iconColor: "text-yellow-600",
  },
  {
    id: "compress-png",
    name: "Compress PNG",
    href: "/compress-png",
    description: "Reduce PNG file size while keeping transparency",
    category: "image",
    iconColor: "text-sky-600",
  },
  {
    id: "resize-image",
    name: "Image Resizer",
    href: "/resize-image",
    description: "Resize images to specific dimensions",
    category: "image",
    iconColor: "text-cyan-600",
  },
  {
    id: "rotate-image",
    name: "Rotate Image",
    href: "/rotate-image",
    description: "Rotate and flip images instantly",
    category: "image",
    iconColor: "text-teal-600",
  },
  {
    id: "image-to-webp",
    name: "Image to WebP",
    href: "/image-to-webp",
    description: "Convert images to WebP format",
    category: "image",
    iconColor: "text-lime-600",
  },
  {
    id: "crop-image",
    name: "Crop Image",
    href: "/crop-image",
    description: "Crop images to preset ratios or custom dimensions",
    category: "image",
    iconColor: "text-amber-600",
  },
  {
    id: "sharpen-image",
    name: "Sharpen Image",
    href: "/sharpen-image",
    description: "Sharpen and enhance image details",
    category: "image",
    iconColor: "text-emerald-600",
  },
  {
    id: "blur-image",
    name: "Blur Image",
    href: "/blur-image",
    description: "Apply blur effect to images",
    category: "image",
    iconColor: "text-violet-600",
  },
  {
    id: "remove-background",
    name: "Remove Background",
    href: "/remove-background",
    description: "Remove image background automatically",
    category: "image",
    iconColor: "text-red-600",
  },
  {
    id: "svg-to-png",
    name: "SVG to PNG",
    href: "/svg-to-png",
    description: "Convert SVG vector files to PNG images",
    category: "image",
    iconColor: "text-fuchsia-600",
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    href: "/png-to-pdf",
    description: "Convert PNG images to PDF documents",
    category: "image",
    iconColor: "text-red-500",
  },
  {
    id: "image-to-heic",
    name: "Image to HEIC",
    href: "/image-to-heic",
    description: "Convert images to HEIC format (Coming Soon)",
    category: "image",
    iconColor: "text-rose-600",
  },
  {
    id: "image-to-text",
    name: "Image to Text (OCR)",
    href: "/image-to-text",
    description: "Extract text from images using OCR",
    category: "image",
    iconColor: "text-slate-600",
  },

  // PDF Tools
  {
    id: "compress-pdf",
    name: "Compress PDF",
    href: "/compress-pdf",
    description: "Reduce PDF file size while maintaining quality",
    category: "pdf",
    iconColor: "text-red-600",
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    href: "/merge-pdf",
    description: "Combine multiple PDF files into one",
    category: "pdf",
    iconColor: "text-red-600",
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    href: "/split-pdf",
    description: "Split PDF into separate pages or ranges",
    category: "pdf",
    iconColor: "text-red-600",
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    href: "/pdf-to-jpg",
    description: "Convert PDF pages to JPG images",
    category: "pdf",
    iconColor: "text-orange-600",
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    href: "/jpg-to-pdf",
    description: "Convert JPG images to PDF format",
    category: "pdf",
    iconColor: "text-blue-600",
  },
  {
    id: "pdf-to-text",
    name: "PDF to Text",
    href: "/pdf-to-text",
    description: "Extract text from PDF files instantly",
    category: "pdf",
    iconColor: "text-purple-600",
  },
  {
    id: "extract-pdf-pages",
    name: "Extract PDF Pages",
    href: "/extract-pdf-pages",
    description: "Extract specific pages from PDF documents",
    category: "pdf",
    iconColor: "text-red-600",
  },
  {
    id: "html-to-pdf",
    name: "HTML to PDF",
    href: "/html-to-pdf",
    description: "Convert HTML and web pages to PDF",
    category: "pdf",
    iconColor: "text-indigo-600",
  },
  {
    id: "sign-pdf",
    name: "Sign PDF",
    href: "/sign-pdf",
    description: "Add signature to PDF documents",
    category: "pdf",
    iconColor: "text-teal-600",
  },

  // Video Tools
  {
    id: "compress-video",
    name: "Compress Video",
    href: "/compress-video",
    description: "Reduce video file size for easier sharing",
    category: "video",
    iconColor: "text-purple-600",
  },
  {
    id: "video-to-gif",
    name: "Video to GIF",
    href: "/video-to-gif",
    description: "Convert video clips to animated GIFs",
    category: "video",
    iconColor: "text-pink-600",
  },
  {
    id: "trim-video",
    name: "Video Trimmer",
    href: "/trim-video",
    description: "Cut and trim video clips online",
    category: "video",
    iconColor: "text-violet-600",
  },
  {
    id: "video-to-mp4",
    name: "Video to MP4",
    href: "/video-to-mp4",
    description: "Convert any video format to MP4",
    category: "video",
    iconColor: "text-blue-600",
  },
  {
    id: "video-to-webm",
    name: "Video to WebM",
    href: "/video-to-webm",
    description: "Convert videos to WebM format for web",
    category: "video",
    iconColor: "text-green-600",
  },
  {
    id: "mov-to-mp4",
    name: "MOV to MP4",
    href: "/mov-to-mp4",
    description: "Convert Apple MOV videos to MP4 format",
    category: "video",
    iconColor: "text-indigo-600",
  },
  {
    id: "gif-to-mp4",
    name: "GIF to MP4",
    href: "/gif-to-mp4",
    description: "Convert animated GIFs to MP4 video",
    category: "video",
    iconColor: "text-pink-600",
  },
  {
    id: "webm-to-mp4",
    name: "WebM to MP4",
    href: "/webm-to-mp4",
    description: "Convert WebM videos to MP4 format",
    category: "video",
    iconColor: "text-cyan-600",
  },
  {
    id: "mkv-to-mp4",
    name: "MKV to MP4",
    href: "/mkv-to-mp4",
    description: "Convert MKV videos to MP4 format",
    category: "video",
    iconColor: "text-violet-600",
  },
  {
    id: "avi-to-mp4",
    name: "AVI to MP4",
    href: "/avi-to-mp4",
    description: "Convert AVI videos to MP4 format",
    category: "video",
    iconColor: "text-emerald-600",
  },

  // Audio Tools
  {
    id: "extract-audio",
    name: "Extract Audio from Video",
    href: "/extract-audio",
    description: "Extract audio from video files as MP3, WAV, or AAC",
    category: "audio",
    iconColor: "text-blue-600",
  },
  {
    id: "compress-audio",
    name: "Audio Compressor",
    href: "/compress-audio",
    description: "Reduce audio file size and bitrate",
    category: "audio",
    iconColor: "text-green-600",
  },
  {
    id: "trim-audio",
    name: "Audio Trimmer",
    href: "/trim-audio",
    description: "Cut and trim audio files online",
    category: "audio",
    iconColor: "text-emerald-600",
  },
  {
    id: "wav-to-mp3",
    name: "WAV to MP3",
    href: "/wav-to-mp3",
    description: "Convert WAV audio to MP3 format",
    category: "audio",
    iconColor: "text-cyan-600",
  },
  {
    id: "mp3-to-wav",
    name: "MP3 to WAV",
    href: "/mp3-to-wav",
    description: "Convert MP3 audio to WAV format",
    category: "audio",
    iconColor: "text-sky-600",
  },
  {
    id: "compress-mp3",
    name: "MP3 Compressor",
    href: "/compress-mp3",
    description: "Reduce MP3 file size with bitrate control",
    category: "audio",
    iconColor: "text-teal-600",
  },
  {
    id: "flac-to-mp3",
    name: "FLAC to MP3",
    href: "/flac-to-mp3",
    description: "Convert FLAC audio to MP3 format",
    category: "audio",
    iconColor: "text-orange-600",
  },
  {
    id: "m4a-to-mp3",
    name: "M4A to MP3",
    href: "/m4a-to-mp3",
    description: "Convert M4A audio to MP3 format",
    category: "audio",
    iconColor: "text-purple-600",
  },
  {
    id: "mp4-to-mp3",
    name: "MP4 to MP3",
    href: "/mp4-to-mp3",
    description: "Extract audio from MP4 videos as MP3",
    category: "audio",
    iconColor: "text-rose-600",
  },
  {
    id: "aac-to-mp3",
    name: "AAC to MP3",
    href: "/aac-to-mp3",
    description: "Convert AAC audio to MP3 format",
    category: "audio",
    iconColor: "text-amber-600",
  },
  {
    id: "ogg-to-mp3",
    name: "OGG to MP3",
    href: "/ogg-to-mp3",
    description: "Convert OGG Vorbis audio to MP3 format",
    category: "audio",
    iconColor: "text-lime-600",
  },

  // Document Tools
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    href: "/pdf-to-word",
    description: "Convert PDF files to editable Word documents",
    category: "document",
    iconColor: "text-blue-700",
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    href: "/word-to-pdf",
    description: "Convert Word documents to PDF format",
    category: "document",
    iconColor: "text-blue-700",
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    href: "/excel-to-pdf",
    description: "Convert Excel spreadsheets to PDF",
    category: "document",
    iconColor: "text-green-700",
  },
  {
    id: "ppt-to-pdf",
    name: "PPT to PDF",
    href: "/ppt-to-pdf",
    description: "Convert PowerPoint presentations to PDF",
    category: "document",
    iconColor: "text-orange-700",
  },

  // Other Tools
  {
    id: "zip-files",
    name: "ZIP Files",
    href: "/zip-files",
    description: "Compress files into a ZIP archive",
    category: "compression",
    iconColor: "text-gray-600",
  },
  {
    id: "unzip-files",
    name: "Unzip Files",
    href: "/unzip-files",
    description: "Extract files from ZIP archives",
    category: "compression",
    iconColor: "text-gray-700",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((tool) => tool.category === category);
}

export function getRelatedTools(currentToolId: string, limit: number = 3): Tool[] {
  const currentTool = getToolById(currentToolId);
  if (!currentTool) return [];

  // Get tools from the same category, excluding current tool
  const sameCategoryTools = tools.filter(
    (tool) => tool.category === currentTool.category && tool.id !== currentToolId
  );

  // Get tools from related categories based on current category
  const relatedCategories: Record<string, string[]> = {
    image: ["pdf", "compression"],
    pdf: ["image", "document"],
    video: ["compression", "image"],
    audio: ["compression"],
    document: ["pdf"],
    compression: ["image", "video"],
  };

  const relatedCategoryTools = tools.filter(
    (tool) =>
      relatedCategories[currentTool.category]?.includes(tool.category) &&
      tool.id !== currentToolId
  );

  // Combine: prioritize same category, then related categories
  const combined = [...sameCategoryTools, ...relatedCategoryTools];

  // Remove duplicates and limit
  const unique = Array.from(new Map(combined.map((tool) => [tool.id, tool])).values());
  return unique.slice(0, limit);
}
