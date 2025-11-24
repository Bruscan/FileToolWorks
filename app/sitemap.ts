import { MetadataRoute } from 'next'

const BASE_URL = 'https://filetoolworks.com'

// All tools
const tools = [
  'image-to-pdf',
  'pdf-to-image',
  'compress-image',
  'compress-pdf',
  'jpg-to-png',
  'png-to-jpg',
  'resize-image',
  'crop-image',
  'remove-background',
  'pdf-to-word',
  'word-to-pdf',
  'merge-pdf',
  'split-pdf',
  'heic-to-jpg',
  'webp-to-png',
  'video-to-mp3',
  'gif-to-mp4',
  'extract-images-from-pdf',
  'convert-ppt-to-pdf',
  'pdf-sign-tool',
  'ocr-image-to-text',
  'text-to-pdf',
  'extract-audio',
]

// Blog posts
const blogPosts = [
  'how-to-convert-image-to-pdf',
  'how-to-compress-pdf',
  'how-to-remove-background',
  'dpi-vs-ppi',
  'how-to-merge-pdfs',
  'how-to-compress-images',
  'how-to-convert-word-to-pdf',
  'heic-vs-jpg',
  'why-pdf-still-dominates',
  'how-to-resize-images-for-social',
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

  // Static pages
  const staticPages = ['about', 'privacy', 'terms', 'contact', 'blog']
  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  })

  // Tool pages
  tools.forEach((tool) => {
    routes.push({
      url: `${BASE_URL}/${tool}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Blog posts
  blogPosts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  })

  return routes
}
