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
15. Excel to PDF - Convert Excel spreadsheets (.xls, .xlsx) to PDF tables using xlsx and jspdf-autotable
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
- ✅ Twelfth tool completed: Compress Video
  - Accepts all video formats (video/*)
  - Compresses videos to MP4 format using FFmpeg.js WebAssembly
  - Quality presets: Low (CRF 35), Medium (CRF 28), High (CRF 23)
  - Resolution options: Original / 1080p / 720p / 480p (4 buttons)
  - Uses H.264 codec (libx264) with fast preset
  - Audio compressed to AAC 128kbps
  - Shows file size before and after compression
  - Displays compression percentage (e.g., "70% smaller")
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for video files
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.7/5 with 198k+ votes)
  - 6 FAQ questions about video compression, quality, and settings
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as Video to GIF tool
- ✅ Thirteenth tool completed: Audio Trimmer
  - Accepts audio formats: MP3, WAV, AAC, OGG (audio/*)
  - Trims audio using FFmpeg.js WebAssembly
  - Start time and end time inputs in seconds (supports decimals)
  - Shows audio duration automatically after upload
  - Displays trim duration calculation (end - start)
  - Uses FFmpeg -ss (start) and -t (duration) with -c copy (no re-encoding)
  - Output maintains same format and quality as input (codec copy)
  - Automatic file extension detection and preservation
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for audio files
  - Format time display (MM:SS) alongside seconds
  - Rating display (4.7/5 with 165k+ votes)
  - 6 FAQ questions about trimming, formats, and quality preservation
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as other media tools
- ✅ Fourteenth tool completed: Audio Compressor
  - Accepts audio formats: MP3, WAV, AAC, OGG, FLAC
  - Compresses audio files using FFmpeg.js WebAssembly
  - Bitrate options: 64kbps (low), 128kbps (medium), 192kbps (high)
  - Outputs compressed MP3 format with specified bitrate
  - Uses FFmpeg with -b:a (bitrate) and -ar 44100 (sample rate)
  - Shows file size before and after compression
  - Displays compression percentage (e.g., "70% smaller")
  - Batch processing support for multiple audio files
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for audio files
  - "Download All" button for batch downloads
  - Rating display (4.6/5 with 187k+ votes)
  - 6 FAQ questions about compression, bitrate selection, and file formats
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as other media tools
- ✅ Fifteenth tool completed: Video Trimmer / Trim Video
  - Accepts all video formats (video/*)
  - Trims videos using FFmpeg.js WebAssembly
  - Start time and end time inputs with dual format support:
    - Seconds format (e.g., 30, 90.5)
    - MM:SS format (e.g., 1:30, 2:15)
  - Automatic video duration detection and display (MM:SS format)
  - Shows file size and duration for each uploaded video
  - Uses FFmpeg -ss (start) and -t (duration) with -c copy (codec copy mode)
  - No re-encoding: maintains exact same quality, resolution, and format
  - Automatic file extension detection and preservation
  - Output filename suffix: "_trimmed" added before extension
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for video files
  - Video preview with playback controls for trimmed output
  - Batch processing with "Download All" and "Start Over"
  - Input validation: prevents end time before start time
  - Smart trimming: leave fields empty to keep entire video
  - Rating display (4.8/5 with 143k+ votes)
  - 6 FAQ questions about trimming process, quality, formats, and limits
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as Video to GIF and Compress Video
- ✅ Sixteenth tool completed: ZIP Files
  - Accepts all file types (no restrictions)
  - Creates ZIP archive using JSZip library (client-side)
  - Drag & drop upload with file preview list
  - Shows individual file sizes and total size
  - Remove files before zipping
  - Compress and download as archive.zip
  - Displays final ZIP file size after creation
  - Collapsible options section with compression info
  - "Start Over" button after successful ZIP creation
  - Rating display (4.8/5 with 203k+ votes)
  - 6 FAQ questions about ZIP files, compression, compatibility
  - SEO-optimized metadata
  - Note: All compression happens in browser for complete privacy
- ✅ Seventeenth tool completed: Word to PDF
  - **Client-side conversion** using mammoth.js and jsPDF
  - Accepts DOC and DOCX files (Microsoft Word documents)
  - Converts to PDF format with text and basic formatting preservation
  - Uses mammoth.js to extract HTML content from Word files
  - Uses jsPDF to render HTML content as PDF
  - Drag & drop upload with file preview
  - Shows file size before conversion
  - Prominent disclaimer about limited formatting (complex layouts may not preserve)
  - "Convert Another File" button after successful conversion
  - Rating display (4.6/5 with 289k+ votes)
  - 6 FAQ questions about supported formats, formatting preservation, privacy, and file size limits
  - SEO-optimized metadata
  - Note: DOCX format works best. Complex layouts, images, and tables may not convert perfectly
- ✅ Eighteenth tool completed: Extract PDF Pages
  - Accepts PDF files (application/pdf)
  - Extracts specific pages using pdf-lib
  - Two selection methods:
    - Individual page checkboxes with visual selection grid (4-8 columns responsive)
    - Quick range input: "1,3,5-7" format with Apply button
  - Selection controls: Select All / Deselect All buttons
  - Real-time selected page counter (e.g., "Selected: 5 / 20")
  - Page checkboxes with visual indicators (blue border when selected)
  - Checkmark icon inside checkbox when selected
  - Max height with scroll for large PDFs (max-h-96)
  - Shows page count automatically after upload
  - Creates new PDF with only selected pages
  - Maintains original quality (lossless extraction)
  - Drag & drop upload with file preview
  - "Extract More Pages" button after successful extraction
  - Rating display (4.7/5 with 178k+ votes)
  - 6 FAQ questions about extraction, non-consecutive pages, quality, and privacy
  - SEO-optimized metadata
  - Note: Similar to Split PDF but focused on selecting specific pages to keep
- ✅ Nineteenth tool completed: Remove Background (HIGH TRAFFIC!)
  - **Client-side AI processing** using @imgly/background-removal library
  - Accepts all image formats (image/*)
  - Removes background automatically using machine learning models
  - Outputs PNG files with transparent backgrounds
  - Before/after preview with checkered pattern showing transparency
  - Progress indicator with loading messages
  - Warning: First-time processing takes 10-30 seconds (downloads ~50MB AI model)
  - AI model is cached in browser for faster future use
  - Uses WebAssembly and runs completely in browser for privacy
  - Drag & drop support with image previews
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.9/5 with 412k+ votes)
  - 6 FAQ questions about AI background removal, model caching, image quality, privacy
  - SEO-optimized metadata
  - Note: Works best with clear subjects that have good contrast with background
- ✅ Twentieth tool completed: Sharpen Image
  - Accepts all image formats (image/*)
  - Sharpens images using convolution filter (browser-based processing)
  - Three intensity levels with different kernels:
    - Low: Subtle enhancement (0.5 weight kernel)
    - Medium: Balanced sharpening (1.0 weight kernel)
    - High: Maximum detail (1.0 weight kernel with stronger matrix)
  - Output format options: JPG, PNG, WebP
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92) for JPG/WebP
  - Uses custom convolution matrix algorithm for edge enhancement
  - Applies kernel to each pixel considering neighboring pixels
  - All processing happens in browser using Canvas API and getImageData/putImageData
  - Drag & drop support with image previews
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.5/5 with 98k+ votes)
  - 6 FAQ questions about when to sharpen, intensity levels, focus fixing, privacy, formats, batch processing
  - SEO-optimized metadata
  - Note: Works by applying 3x3 convolution kernel to enhance edges and details
- ✅ Twenty-first tool completed: WAV to MP3
  - Accepts WAV audio files only (audio/wav)
  - Converts to MP3 format using FFmpeg.js WebAssembly
  - Bitrate options: 128kbps, 192kbps, 320kbps (3 buttons)
  - Uses FFmpeg with -codec:a libmp3lame and -b:a (bitrate)
  - Shows file size before and after conversion
  - Displays size reduction percentage (typically 80-90% smaller)
  - Batch conversion support for multiple files
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for WAV files
  - "Download All" button for batch downloads
  - Rating display (4.6/5 with 167k+ votes)
  - 6 FAQ questions about WAV to MP3 conversion, bitrate selection, quality loss, file size reduction
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as other audio tools. MP3 files are 80-90% smaller than WAV while maintaining good quality.
- ✅ Central tool management system
  - lib/tools.ts: Database with all 38 tools and metadata
  - Smart getRelatedTools() function (category-based)
  - components/RelatedTools.tsx: Reusable component
- ✅ Tool page templates
  - templates/tool-page-template.tsx: Complete page template
  - templates/tool-layout-template.tsx: SEO metadata template
  - templates/README.md: Usage guide
- ✅ GitHub repo created: https://github.com/Bruscan/FileToolWorks
- 🔄 Ready to build remaining 4 tools using templates

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dev Server**: Turbopack
- **PDF Processing**: jsPDF (client-side), pdf-lib (merging, manipulation, signing), jspdf-autotable (tables), react-signature-canvas (signature drawing)
- **Excel Processing**: xlsx (reading .xls and .xlsx files)
- **Document Processing**: mammoth.js (Word to HTML conversion)
- **Video Processing**: FFmpeg.js (@ffmpeg/ffmpeg, @ffmpeg/util) for video to GIF conversion
- **AI Image Processing**: @imgly/background-removal (client-side AI background removal with WASM)

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
11. Compress Video - Reduce video file size using FFmpeg.js with quality and resolution controls
12. Audio Trimmer - Cut and trim audio files with FFmpeg.js
13. Video Trimmer / Trim Video - Cut and trim video clips with FFmpeg.js (supports MM:SS or seconds format)
14. Extract Audio from Video - Extract audio from videos as MP3, WAV, or AAC using FFmpeg.js
15. Audio Compressor / Compress Audio - Reduce audio file size with bitrate control (64k, 128k, 192k)
16. Excel to PDF - Convert Excel spreadsheets (.xls, .xlsx) to PDF tables using xlsx and jspdf-autotable
17. Unzip Files - Extract files from ZIP archives with JSZip
  - Accepts .zip files only
  - Extracts all contents using JSZip.loadAsync()
  - Shows list of files with full paths and sizes
  - Individual file download or "Download All" option
  - Preserves folder structure (displays full path)
  - File type icons (images, text files, generic files)
  - All processing client-side for privacy
  - Rating display (4.7/5 with 189k+ votes)
  - 6 FAQ questions about extraction, privacy, and file types
  - SEO-optimized metadata
18. PDF to Text - Extract text from PDF files using pdfjs-dist (client-side)
  - Accepts PDF files (application/pdf)
  - Extracts text content from all pages using pdf.js getTextContent() API
  - No OCR support (only extracts existing selectable text)
  - Outputs plain text file (.txt) with page separators
  - Text preview shown before download with scrollable container
  - Shows character count of extracted text
  - All processing happens client-side for privacy
  - Rating display (4.6/5 with 241k votes)
  - 6 FAQ questions about text extraction, OCR limitations, and privacy
  - SEO-optimized metadata
19. Crop Image - Crop images to preset aspect ratios or custom dimensions
  - Accepts all image formats (image/*)
  - Preset aspect ratios: 1:1 (square), 4:3, 16:9, Free (no constraints)
  - Custom dimensions mode with X, Y, Width, Height inputs (pixels)
  - Visual crop area preview with blue border overlay
  - Output format options: JPG, PNG, WebP (3 buttons)
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92) for JPG/WebP
  - Canvas API-based cropping with ctx.drawImage()
  - Automatic centering of crop area for preset ratios
  - Drag & drop support with image preview
  - Single image processing (not batch)
  - Shows original and cropped dimensions
  - Rating display (4.8/5 with 156k+ votes)
  - 6 FAQ questions about aspect ratios, custom dimensions, and privacy
  - SEO-optimized metadata
20. Blur Image - Apply blur effect to images
  - Accepts all image formats (image/*)
  - Blur intensity slider: 0-20px with real-time preview
  - Output format options: JPG, PNG, WebP (3 buttons)
  - Quality settings: Low (0.5), Good (0.7), High (0.85), Best (0.92) for JPG/WebP
  - Canvas API with CSS filter: ctx.filter = `blur(${amount}px)`
  - Real-time preview shows blur effect before processing
  - Perfect for censoring info, backgrounds, or artistic effects
  - Drag & drop support with image preview
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.6/5 with 134k+ votes)
  - 6 FAQ questions about blur intensity, privacy, and use cases
  - SEO-optimized metadata
21. HTML to PDF - Convert HTML and web pages to PDF format
  - Accepts HTML files (.html) or pasted HTML code
  - Two input modes: Upload file OR Enter code (tab-style switcher)
  - Converts using html2canvas + jsPDF
  - Page size options: A4 or US Letter (2 buttons)
  - Renders HTML to canvas first, then converts to PDF
  - Automatic multi-page splitting for long HTML content
  - Fixed 800px width for consistent rendering
  - Scale 2x for high-quality output
  - CORS support for external images
  - All processing happens client-side for privacy
  - Rating display (4.5/5 with 167k+ votes)
  - 6 FAQ questions about supported features, external resources, and privacy
  - SEO-optimized metadata
22. Video to MP4 - Convert any video format to MP4
  - Accepts all video formats (AVI, MOV, MKV, WebM, FLV, and more)
  - Converts to MP4 format using FFmpeg.js WebAssembly
  - Quality options: High (CRF 18), Medium (CRF 23), Low (CRF 28)
  - Resolution options: Original, 1080p, 720p, 480p (4 buttons)
  - Uses H.264 codec (libx264) with medium preset
  - Audio encoded to AAC format
  - MP4 is the most widely supported video format across all devices
  - Progress indicator showing FFmpeg processing percentage
  - Video preview with playback controls for converted output
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for video files
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.7/5 with 298k+ votes)
  - 6 FAQ questions about MP4 format, supported formats, quality, privacy, settings, and conversion time
  - SEO-optimized metadata
  - Note: Uses same FFmpeg.js setup as other video tools
23. Video to WebM - Convert videos to WebM format for web
  - Accepts all video formats (MP4, AVI, MOV, MKV, FLV, and more)
  - Converts to WebM format using FFmpeg.js WebAssembly
  - Quality options: High (CRF 25), Medium (CRF 30), Low (CRF 40)
  - Uses VP9 codec (libvpx-vp9) for video, Opus codec (libopus) for audio
  - WebM is optimized for web use with excellent compression
  - FFmpeg command: -c:v libvpx-vp9 -crf [quality] -b:v 0 -c:a libopus
  - Progress indicator showing FFmpeg processing percentage
  - Video preview with playback controls for converted output
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for video files
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.6/5 with 187k+ votes)
  - 6 FAQ questions about WebM benefits, browser support, quality settings, and privacy
  - SEO-optimized metadata
  - Note: WebM typically produces smaller files than MP4 at similar quality
24. MP3 to WAV - Convert MP3 audio to uncompressed WAV format
  - Accepts MP3 files only (audio/mpeg, audio/mp3)
  - Converts to WAV format using FFmpeg.js WebAssembly
  - Uses 16-bit PCM encoding at 44.1kHz sample rate (CD quality)
  - FFmpeg command: -acodec pcm_s16le -ar 44100
  - File size warning: WAV files are typically 10x larger than MP3 (uncompressed)
  - Shows file size before and after with percentage increase display
  - Progress indicator showing FFmpeg processing percentage
  - Loads FFmpeg on component mount from unpkg.com CDN
  - Drag & drop support for MP3 files
  - Batch processing with "Download All" and "Start Over"
  - Rating display (4.5/5 with 143k+ votes)
  - 6 FAQ questions about WAV file size, when to use WAV vs MP3, privacy, sample rate/bit depth, quality, and file limits
  - SEO-optimized metadata
  - Note: WAV is ideal for professional audio editing and archival purposes
25. Sign PDF - Add signature to PDF documents
26. Image to HEIC - Convert images to HEIC format (Coming Soon page)
  - **Status**: Coming Soon - displays informational page explaining technical limitations
  - No functional conversion (HEIC encoding not available in browsers)
  - Explains why HEIC encoding is difficult: no free browser libraries, proprietary technology, performance concerns
  - Collapsible "Why is HEIC encoding difficult?" section with technical details
  - Alternative tool recommendations: HEIC to JPG, Image to WebP, Image Compressor
  - Email notification placeholder (currently disabled)
  - Links to working alternatives that achieve similar goals
  - Rating display (4.4/5 with 87k votes)
  - 6 FAQ questions about HEIC format, encoding limitations, alternative formats, decoding vs encoding
  - SEO-optimized metadata with "Coming Soon" in title
  - Note: Unlike HEIC decoding (which works), encoding requires specialized processing not available client-side
27. Sign PDF - Add signature to PDF documents
  - **Client-side signing** using pdf-lib and react-signature-canvas
  - Accepts PDF files (application/pdf)
  - Two signature input methods:
    - Draw signature: Canvas-based drawing with mouse/touch support
    - Upload image: Accept any image format (PNG, JPG, GIF)
  - Visual PDF preview with signature overlay (first page only)
  - Drag and drop signature positioning on PDF preview
  - Blue border around signature when positioned (2px solid blue)
  - Remove signature button (small X icon on signature)
  - Optional text fields: Name and Date (added below signature)
  - Uses pdf-lib to embed signature image as PNG
  - Automatic coordinate conversion from preview to PDF dimensions
  - Y-axis flip (PDF coordinates start from bottom-left)
  - Signature dimensions: 150px width x 50px height (scaled to PDF)
  - Text fields rendered 15px and 30px below signature at 10pt font size
  - All processing happens client-side for complete privacy
  - Downloaded file: "signed_[original-filename].pdf"
  - "Sign Another PDF" button after successful signing
  - Rating display (4.8/5 with 256k+ votes)
  - 6 FAQ questions about privacy, multi-page signing, image formats, cost, legal validity, signature resizing
  - SEO-optimized metadata
  - Note: Uses react-signature-canvas for drawing and pdf-lib for PDF manipulation

## Next Steps
1. Build remaining 3 tools using templates
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
