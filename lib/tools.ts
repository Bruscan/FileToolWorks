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
    id: "compress-image",
    name: "Image Compressor",
    href: "/compress-image",
    description: "Reduce image file size without losing quality",
    category: "image",
    iconColor: "text-blue-600",
  },
  {
    id: "resize-image",
    name: "Image Resizer",
    href: "/resize-image",
    description: "Resize images to specific dimensions",
    category: "image",
    iconColor: "text-cyan-600",
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

  // Audio Tools
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

  // Document Tools
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
