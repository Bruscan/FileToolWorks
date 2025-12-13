import { MetadataRoute } from 'next'

const BASE_URL = 'https://filetoolworks.com'

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
]

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  // Tool pages (high priority)
  tools.forEach((tool) => {
    routes.push({
      url: `${BASE_URL}/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Blog posts
  blogPosts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}
