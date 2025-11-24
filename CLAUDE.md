# FileToolWorks - Claude Context

## Project Overview
Free online tools for file conversion and editing. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Current Status
- ✅ Next.js project initialized
- ✅ Global Navbar and Footer components
  - Navbar: Dropdown menus for tool categories (Image, PDF, Video, Audio, Document, Other)
  - Footer: Tool links, company links, copyright
  - Both sticky and responsive
- ✅ Home page created with all sections (SEO-optimized)
- ✅ Hero section with keyword-rich text
- ✅ Category descriptions added (Image, PDF, Video)
- ✅ robots.txt created
- ✅ sitemap.xml generator implemented
- ✅ Canonical URLs configured
- ✅ First tool completed: Image to PDF
  - Client-side conversion with jsPDF
  - Drag & drop upload
  - Image reordering with arrow buttons
  - Collapsible PDF conversion options (with chevron icon):
    - Button-style selectors (square, not round radios)
    - Page orientation (Portrait/Landscape)
    - Page size (A4/US Letter/Auto)
    - Page margin (None/Small/Big)
    - Image compression (Compress/Original)
  - Rating display (4.7/5 with 3,247 votes)
  - 6 FAQ questions
  - SEO-optimized metadata
  - Automatic Related Tools
- ✅ Second tool completed: JPG to PDF
  - Identical to Image to PDF but JPG/JPEG only
  - File validation: only accepts image/jpeg and image/jpg
  - All same features: drag & drop, reordering, options, compression
  - "Start Over" button after successful conversion
  - Rating display (4.7/5 with 128k+ votes)
  - 6 customized FAQ questions for JPG conversion
  - SEO-optimized metadata
- ✅ Third tool completed: PNG to JPG
  - Client-side conversion using Canvas API
  - Accepts PNG files, outputs JPG
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92)
  - Resize options: Original, 75%, 50%, 25%
  - Batch conversion with "Download All"
  - Rating display (4.7/5 with 127k+ votes)
  - 6 FAQ questions about PNG to JPG conversion
  - SEO-optimized metadata
- ✅ Fourth tool completed: JPG to PNG
  - Reverse of PNG to JPG converter
  - Accepts JPG/JPEG files, outputs PNG
  - Same quality and resize options as PNG to JPG
  - Drag & drop support with preview thumbnails
  - Batch conversion with "Download All" and "Start Over"
  - Rating display (4.6/5 with 142k+ votes)
  - 6 customized FAQ questions for JPG to PNG conversion
  - SEO-optimized metadata
- ✅ Fifth tool completed: Image Resizer
  - Accepts all image formats (image/*)
  - Two resize methods:
    - By percentage: 75%, 50%, 25% (button selectors)
    - Custom dimensions: Width/height input fields in pixels
  - "Keep aspect ratio" checkbox (default: checked)
  - Automatic dimension calculation when aspect ratio locked
  - Output format options: JPG, PNG, WebP (3 buttons)
  - Quality settings: Low, Good, High, Best (only for JPG/WebP)
  - Shows original dimensions (width x height) for each image
  - Shows new dimensions after resizing
  - Drag & drop support with image previews
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.8/5 with 104k+ votes)
  - 6 FAQ questions about image resizing
  - SEO-optimized metadata
- ✅ Sixth tool completed: Image to WebP
  - Accepts all image formats (image/*)
  - Converts to WebP format using Canvas API
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92)
  - Resize options: Original, 75%, 50%, 25%
  - Uses canvas.toBlob() with "image/webp" and quality parameter
  - Automatic filename extension change to .webp
  - Drag & drop support with image previews
  - Batch conversion with "Download All" and "Start Over"
  - Rating display (4.7/5 with 118k+ votes)
  - 6 FAQ questions about WebP benefits and compatibility
  - SEO-optimized metadata
- ✅ Seventh tool completed: WebP to PNG
  - Accepts WebP files only (image/webp)
  - Converts to PNG format using Canvas API
  - No quality option (PNG is lossless)
  - Resize options: Original, 75%, 50%, 25%
  - Uses canvas.toBlob() with "image/png" mime type
  - Automatic filename extension change to .png
  - Drag & drop support with image previews
  - Batch conversion with "Download All" and "Start Over"
  - Rating display (4.7/5 with 102k+ votes)
  - 6 FAQ questions about WebP to PNG conversion and compatibility
  - SEO-optimized metadata
- ✅ Eighth tool completed: Merge PDF
  - Accepts multiple PDF files (application/pdf)
  - Merges all PDFs into a single document using pdf-lib
  - PDF reordering with arrow buttons (up/down)
  - Numbered indicators show merge order (1, 2, 3...)
  - No additional options needed (simple merge only)
  - Drag & drop upload support
  - Requires minimum 2 PDFs to merge
  - "Merge More PDFs" button after successful merge
  - Rating display (4.8/5 with 156k+ votes)
  - 6 FAQ questions about merging PDFs, file limits, quality preservation
  - SEO-optimized metadata
- ✅ Ninth tool completed: Rotate Image
  - Accepts all image formats (image/*)
  - Rotation options: None / 90° CW / 180° / 90° CCW (4 buttons)
  - Flip options: None / Horizontal / Vertical / Both (4 buttons)
  - Output format: JPG / PNG / WebP (3 buttons)
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92) for JPG/WebP
  - Real-time preview of transformations before applying
  - Uses Canvas API with ctx.rotate() and ctx.scale() for transformations
  - Properly handles dimension swapping for 90° and 270° rotations
  - Drag & drop support with image previews
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.7/5 with 124k+ votes)
  - 6 FAQ questions about rotating, flipping, and image quality
  - SEO-optimized metadata
- ✅ Tenth tool completed: Video to GIF
  - Accepts all video formats (video/*)
  - Converts videos to animated GIF using FFmpeg.js WebAssembly
  - FPS options: 10 / 15 / 24 / 30 (4 buttons)
  - Size options: Original / 720p / 480p / 360p (4 buttons)
  - Quality options: Low / Medium / High (3 buttons with palette optimization)
  - Start time and duration inputs (optional) for trimming videos
  - Progress indicator showing FFmpeg conversion percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Uses lanczos scaling for high-quality resizing
  - Implements palette generation for better GIF colors
  - Warns users about large GIF file sizes
  - Drag & drop support for video files
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.8/5 with 104k+ votes)
  - 6 FAQ questions about video to GIF conversion, file sizes, and settings
  - SEO-optimized metadata
  - Note: FFmpeg.js is complex but works well for browser-based video processing
- ✅ Eleventh tool completed: PDF to Word Converter
  - **Server-side conversion** using Python + pdf2docx (Vercel serverless function)
  - Accepts PDF files (application/pdf)
  - Converts to DOCX format with preserved formatting (text, fonts, tables, images)
  - Uses api/pdf-to-word.py with Python 3.9 runtime
  - 50MB file size limit (Vercel limit)
  - 10 second execution timeout
  - Files are not stored, immediately deleted after conversion
  - Frontend uploads PDF as base64, receives DOCX as base64
  - Rating display (4.7/5 with 187k+ votes)
  - 6 FAQ questions about conversion quality, privacy, and file limits
  - SEO-optimized metadata
  - Note: Only works when deployed to Vercel (not on localhost)
- ✅ Central tool management system
  - lib/tools.ts: Database with all 23 tools and metadata
  - Smart getRelatedTools() function (category-based)
  - components/RelatedTools.tsx: Reusable component
- ✅ Tool page templates
  - templates/tool-page-template.tsx: Complete page template
  - templates/tool-layout-template.tsx: SEO metadata template
  - templates/README.md: Usage guide
- ✅ GitHub repo created: https://github.com/Bruscan/FileToolWorks
- 🔄 Ready to build remaining 18 tools using templates

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dev Server**: Turbopack
- **PDF Processing**: jsPDF (client-side), pdf-lib (merging, manipulation)
- **Video Processing**: FFmpeg.js (@ffmpeg/ffmpeg, @ffmpeg/util) for video to GIF conversion

## Key Design Principles
- **Extra Simple UI**: Minimalist, one purpose per page
- **Mobile First**: 70-80% traffic from mobile
- **Fast**: < 1s page load, < 100KB initial JS
- **SEO Optimized**: 50-150 words per tool, strong internal linking
- **Privacy First**: Client-side processing when possible
- **Collapsible UI**: Options hidden by default to avoid overwhelming users

## Architecture

### Tool Management
All tools are defined in `lib/tools.ts` with:
- Tool ID, name, description
- Category (image, pdf, video, audio, document, compression)
- Icon color
- Automatic related tools based on category

### Component Structure
- **Navbar**: Global navigation with category dropdowns
- **Footer**: Global footer with tool links
- **RelatedTools**: Reusable component that automatically shows 3 related tools
- **Tool Pages**: Follow standardized template with all common sections

### URL Structure
All tools use flat URLs (e.g., `/image-to-pdf/` not `/tools/image-to-pdf/`)

## Building New Tools

1. Copy templates from `/templates/`:
   - `tool-page-template.tsx` → `app/[tool-slug]/page.tsx`
   - `tool-layout-template.tsx` → `app/[tool-slug]/layout.tsx`

2. Add tool to `lib/tools.ts`

3. Replace placeholders in templates:
   - [TOOL_NAME], [TOOL_ID], [DESCRIPTION]
   - Customize FAQ questions
   - Implement conversion logic

4. Test and deploy

## Completed Tools
1. Image to PDF - Convert any image format to PDF
2. JPG to PDF - Convert JPG/JPEG images to PDF (specialized version)
3. PNG to JPG - Convert PNG images to JPG format with quality options
4. JPG to PNG - Convert JPG/JPEG images to PNG format
5. Image Resizer - Resize images by percentage or custom dimensions
6. Image to WebP - Convert any image format to modern WebP format
7. WebP to PNG - Convert WebP images to PNG format with lossless quality
8. Merge PDF - Combine multiple PDF files into one document
9. Rotate Image - Rotate and flip images with real-time preview
10. Video to GIF - Convert video clips to animated GIFs with FFmpeg.js

## Next Steps
1. Build remaining 13 tools using templates
2. Create static pages (About, Terms, Privacy, Contact)
3. Create blog structure
4. Deploy to production

## SEO Implementation
- **Metadata**: metadataBase set to filetoolworks.com
- **Canonical URLs**: Configured via metadata alternates
- **Sitemap**: Dynamic sitemap.ts generates all pages
- **Robots.txt**: Allows all crawlers, references sitemap
- **Content**: Keyword-rich hero text, category descriptions
- **Rating**: 4.7/5 stars with vote count for trust building
- **No em-dashes or special characters in text content**

## Important Notes
- Blog posts should be 200-400 words (short and direct)
- No YouTube tools (removed from scope)
- All content must be manually edited (no AI fluff)
- No em-dashes (—) or similar characters in text
- Collapsible options with chevron icon that rotates
- Square button-style selectors (not round radio buttons)
- FAQ sections: 6 questions maximum per tool
- Update this file before every commit
