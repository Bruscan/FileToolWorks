# FileToolWorks - Claude Context

## Project Overview
Free online tools for file conversion and editing. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Current Status
- ✅ Next.js project initialized
- ✅ Home page created with all sections (SEO-optimized)
- ✅ Hero section with keyword-rich text
- ✅ Category descriptions added (Image, PDF, Video)
- ✅ robots.txt created
- ✅ sitemap.xml generator implemented
- ✅ Canonical URLs configured
- ✅ GitHub repo created: https://github.com/Bruscan/FileToolWorks
- 🔄 Ready for tool page development

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dev Server**: Turbopack

## Key Design Principles
- **Extra Simple UI**: Minimalist, one purpose per page
- **Mobile First**: 70-80% traffic from mobile
- **Fast**: < 1s page load, < 100KB initial JS
- **SEO Optimized**: 50-150 words per tool, strong internal linking
- **Privacy First**: Client-side processing when possible

## URL Structure
All tools use flat URLs (e.g., `/image-to-pdf/` not `/tools/image-to-pdf/`)

## Next Steps
1. Create static pages (About, Terms, Privacy, Contact)
2. Build first tool page (Image to PDF)
3. Set up component library for tools
4. Implement client-side file processing
5. Create blog structure

## SEO Implementation
- **Metadata**: metadataBase set to filetoolworks.com
- **Canonical URLs**: Configured via metadata alternates
- **Sitemap**: Dynamic sitemap.ts generates all pages
- **Robots.txt**: Allows all crawlers, references sitemap
- **Content**: Keyword-rich hero text, category descriptions
- **No em-dashes or special characters in text content**

## Important Notes
- Blog posts should be 200-400 words (short and direct)
- No YouTube tools (removed from scope)
- All content must be manually edited (no AI fluff)
- No em-dashes (—) or similar characters in text
- Update this file before every commit
