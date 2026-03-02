import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.filetoolworks.com'

// All tools - matches actual pages in /app folder
const tools = [
  // Image Tools (15)
  'image-to-pdf',
  'heic-to-jpg',
  'png-to-jpg',
  'jpg-to-png',
  'webp-to-jpg',
  'webp-to-png',
  'compress-image',
  'resize-image',
  'rotate-image',
  'image-to-webp',
  'crop-image',
  'sharpen-image',
  'blur-image',
  'remove-background',
  'image-to-heic',

  // PDF Tools (10)
  'compress-pdf',
  'merge-pdf',
  'split-pdf',
  'pdf-to-jpg',
  'jpg-to-pdf',
  'pdf-to-text',
  'extract-pdf-pages',
  'html-to-pdf',
  'sign-pdf',
  'pdf-to-word',

  // Video Tools (5)
  'compress-video',
  'video-to-gif',
  'trim-video',
  'video-to-mp4',
  'video-to-webm',

  // Audio Tools (5)
  'extract-audio',
  'compress-audio',
  'trim-audio',
  'wav-to-mp3',
  'mp3-to-wav',

  // Document Tools (3)
  'word-to-pdf',
  'excel-to-pdf',
  'ppt-to-pdf',

  // Compression Tools (2)
  'zip-files',
  'unzip-files',
]

// Blog posts - matches actual pages in /app/blog folder
const blogPosts = [
  'dpi-vs-ppi',
  'how-to-compress-pdf',
  'how-to-convert-image-to-pdf',
  'how-to-compress-wav-files',
  'mp3-vs-wav',
  'how-to-reduce-audio-file-size',
  'audio-bitrate-explained',
  'png-vs-jpg',
  'how-to-convert-webp-to-jpg',
  'how-to-compress-images-for-email',
  'gif-vs-mp4',
  'how-to-compress-video-for-email',
  'how-to-merge-pdf-files',
  'how-to-split-pdf-pages',
  'extract-pages-from-pdf',
  'how-to-resize-images-without-losing-quality',
  'heic-vs-jpg',
  'how-to-sign-pdf-online',
  'flac-to-mp3',
  'best-image-format-for-web',
  'pdf-vs-docx',
  'mp3-to-wav-conversion',
  'best-audio-format-for-web',
  'ogg-vs-mp3',
  'how-to-compress-podcast-audio',
  'how-to-extract-audio-from-video',
  'webp-vs-png',
  'how-to-convert-heic-to-jpg',
  'how-to-reduce-video-file-size',
  'svg-vs-png',
  'mp4-vs-webm',
  'how-to-make-gif-from-video',
  'how-to-convert-mov-to-mp4',
  'mp4-vs-mov',
  'webp-vs-jpg',
  'jpg-vs-jpeg',
  'aac-vs-mp3',
  'avi-vs-mp4',
  'wav-vs-flac',
  'mkv-vs-mp4',
  'avif-vs-webp',
  'flv-vs-mp4',
  'wmv-vs-mp4',
  'heif-vs-heic',
  'm4a-vs-mp3',
  'best-video-format-for-social-media',
  'lossless-vs-lossy-compression',
  'png-vs-gif',
  'tiff-vs-png',
  'gif-vs-webp',
  'flac-vs-alac',
  'h264-vs-h265',
  'webm-vs-mkv',
  'opus-vs-mp3',
  'raw-vs-jpeg',
  'bmp-vs-png',
  'ogg-vs-flac',
  'aiff-vs-wav',
  'wav-vs-aac',
  'wma-vs-mp3',
  'cbr-vs-vbr',
  'tiff-vs-jpg',
  'zip-vs-rar',
  '7z-vs-zip',
  'doc-vs-docx',
  'av1-vs-h265',
  'tar-vs-zip',
  'csv-vs-xlsx',
  'ppt-vs-pptx',
  'odt-vs-docx',
  'pdf-vs-epub',
  'xls-vs-xlsx',
  'eps-vs-svg',
  'flac-vs-mp3',
  'rtf-vs-docx',
  'avif-vs-jpeg',
  'gzip-vs-zip',
  'mov-vs-avi',
  'vp9-vs-h265',
  'jpeg-xl-vs-avif',
  'aac-vs-ogg',
  'apng-vs-gif',
  'prores-vs-h264',
  'm4a-vs-mp4',
  'opus-vs-aac',
  'mkv-vs-avi',
  'mpeg-vs-mp4',
  'rar-vs-7z',
  'alac-vs-aac',
  'heic-vs-png',
  'av1-vs-vp9',
  'wav-vs-ogg',
  'json-vs-csv',
  'xml-vs-json',
  'yaml-vs-json',
  'png-vs-pdf',
  'webp-vs-heic',
  'h264-vs-vp9',
  'aac-vs-flac',
  'mp3-vs-mp4',
  'aiff-vs-mp3',
  'wma-vs-aac',
  'midi-vs-mp3',
  'mp4-vs-ts',
  'pdf-vs-html',
  'epub-vs-mobi',
  'psd-vs-png',
  'avi-vs-wmv',
  'ttf-vs-otf',
  'jpg-vs-gif',
  'svg-vs-pdf',
  'bmp-vs-jpg',
  'tiff-vs-pdf',
  '3gp-vs-mp4',
  'avif-vs-png',
  'woff-vs-ttf',
  'markdown-vs-html',
  'woff2-vs-woff',
  'm4v-vs-mp4',
  'bzip2-vs-gzip',
  'raw-vs-dng',
  'gif-vs-svg',
  'mov-vs-mkv',
  'tiff-vs-bmp',
  'cr2-vs-jpg',
  'ico-vs-png',
  'pdf-vs-jpg',
  'svg-vs-ai',
  'keynote-vs-pptx',
  'ods-vs-xlsx',
  'xml-vs-csv',
  'dng-vs-jpg',
  'pages-vs-docx',
  'numbers-vs-excel',
  'xml-vs-yaml',
  'psd-vs-tiff',
  'raw-vs-tiff',
  'pdf-vs-pptx',
  'h264-vs-av1',
  'csv-vs-tsv',
  'html-vs-xml',
  'flac-vs-opus',
  'latex-vs-word',
  'svg-vs-webp',
  'stereo-vs-mono',
  '4k-vs-1080p',
  'vector-vs-raster',
  'rgb-vs-cmyk',
  '30fps-vs-60fps',
  '1080i-vs-1080p',
  '720p-vs-1080p',
  '1440p-vs-4k',
  '24fps-vs-30fps',
  '60fps-vs-120fps',
  'hdr-vs-sdr',
  'srgb-vs-adobe-rgb',
  'mpeg4-vs-mp4',
  'avi-vs-mov',
  'nef-vs-jpg',
  '4k-vs-8k',
  'ntsc-vs-pal',
  '8-bit-vs-10-bit',
  'interlaced-vs-progressive',
  '44-1khz-vs-48khz',
  'ac3-vs-aac',
  'cfr-vs-vfr',
  '16-bit-vs-24-bit-audio',
  'zstd-vs-gzip',
  'exfat-vs-ntfs',
  'dolby-digital-vs-dts',
  'pcm-vs-bitstream',
  'fat32-vs-exfat',
  'fat32-vs-ntfs',
  'ext4-vs-ntfs',
  'h265-vs-h266',
  'vp8-vs-vp9',
  'dsd-vs-pcm',
  'apfs-vs-hfs',
  'ntfs-vs-refs',
  'ext4-vs-xfs',
  'btrfs-vs-ext4',
  'gzip-vs-brotli',
  'jpeg-2000-vs-jpeg',
  'tar-gz-vs-zip',
  'zfs-vs-btrfs',
  'utf-8-vs-ascii',
  'how-to-compress-video-for-whatsapp',
  'how-to-convert-wav-to-mp3',
  'smallest-video-format',
  'best-free-audio-compressor-online',
  'free-online-file-converter-no-signup',
  'best-convertio-alternatives-free',
  'best-ilovepdf-alternatives-free',
]

// Generate a stable ISO date string for each item based on its index and a date range
function getStaggeredDateString(index: number, total: number, startIso: string, endIso: string): string {
  const startMs = new Date(startIso).getTime()
  const endMs = new Date(endIso).getTime()
  const step = total > 1 ? (endMs - startMs) / (total - 1) : 0
  return new Date(startMs + step * index).toISOString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: '2026-03-02T15:00:00.000Z',
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Tool pages (high priority) - staggered Jan 15 to Mar 1 2026
  tools.forEach((tool, i) => {
    routes.push({
      url: `${BASE_URL}/${tool}`,
      lastModified: getStaggeredDateString(i, tools.length, '2026-01-15T08:00:00.000Z', '2026-03-01T16:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // File format reference page
  routes.push({
    url: `${BASE_URL}/file-formats`,
    lastModified: '2026-03-02T12:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  // Tools directory page
  routes.push({
    url: `${BASE_URL}/tools`,
    lastModified: '2026-03-02T18:00:00.000Z',
    changeFrequency: 'weekly',
    priority: 0.9,
  })

  // Free tools widget page
  routes.push({
    url: `${BASE_URL}/free-tools-widget`,
    lastModified: '2026-03-02T15:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  // Format comparison hub
  routes.push({
    url: `${BASE_URL}/compare`,
    lastModified: '2026-03-02T20:00:00.000Z',
    changeFrequency: 'weekly',
    priority: 0.8,
  })

  // Format Finder interactive tool
  routes.push({
    url: `${BASE_URL}/format-finder`,
    lastModified: '2026-03-02T20:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  // File Size Calculator
  routes.push({
    url: `${BASE_URL}/file-size-calculator`,
    lastModified: '2026-03-02T22:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  // LLMs discovery file
  routes.push({
    url: `${BASE_URL}/llms.txt`,
    lastModified: '2026-03-02T15:00:00.000Z',
    changeFrequency: 'monthly',
    priority: 0.5,
  })

  // Trust / legal pages
  const trustPages = ['about', 'privacy', 'terms', 'contact']
  trustPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}/${page}`,
      lastModified: '2026-03-01T10:00:00.000Z',
      changeFrequency: 'yearly',
      priority: 0.4,
    })
  })

  // Blog index page
  routes.push({
    url: `${BASE_URL}/blog`,
    lastModified: '2026-03-02T14:00:00.000Z',
    changeFrequency: 'weekly',
    priority: 0.8,
  })

  // Blog posts - staggered Feb 1 to Mar 2 2026 (all in the past)
  blogPosts.forEach((post, i) => {
    routes.push({
      url: `${BASE_URL}/blog/${post}`,
      lastModified: getStaggeredDateString(i, blogPosts.length, '2026-02-01T09:00:00.000Z', '2026-03-02T09:00:00.000Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}
