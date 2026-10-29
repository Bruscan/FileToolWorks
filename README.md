# FileToolWorks

**Free online file conversion and editing tools.** No signup, no uploads to servers, no limits. All processing happens in your browser.

**[filetoolworks.com](https://filetoolworks.com)**

## Tools

### Image Tools
| Tool | Description |
|------|-------------|
| [Image to PDF](https://filetoolworks.com/image-to-pdf) | Convert any image to PDF |
| [JPG to PDF](https://filetoolworks.com/jpg-to-pdf) | Convert JPG/JPEG images to PDF |
| [PNG to JPG](https://filetoolworks.com/png-to-jpg) | Convert PNG to JPG with quality control |
| [JPG to PNG](https://filetoolworks.com/jpg-to-png) | Convert JPG to lossless PNG |
| [Image to WebP](https://filetoolworks.com/image-to-webp) | Convert images to modern WebP format |
| [WebP to PNG](https://filetoolworks.com/webp-to-png) | Convert WebP back to PNG |
| [WebP to JPG](https://filetoolworks.com/webp-to-jpg) | Convert WebP to JPG |
| [HEIC to JPG](https://filetoolworks.com/heic-to-jpg) | Convert iPhone HEIC photos to JPG |
| [Resize Image](https://filetoolworks.com/resize-image) | Resize by percentage or custom dimensions |
| [Crop Image](https://filetoolworks.com/crop-image) | Crop to preset ratios or custom area |
| [Rotate Image](https://filetoolworks.com/rotate-image) | Rotate and flip with live preview |
| [Compress Image](https://filetoolworks.com/compress-image) | Reduce image file size |
| [Sharpen Image](https://filetoolworks.com/sharpen-image) | Enhance image sharpness |
| [Blur Image](https://filetoolworks.com/blur-image) | Apply blur effect |
| [Remove Background](https://filetoolworks.com/remove-background) | AI-powered background removal in browser |

### PDF Tools
| Tool | Description |
|------|-------------|
| [Merge PDF](https://filetoolworks.com/merge-pdf) | Combine multiple PDFs into one |
| [Split PDF](https://filetoolworks.com/split-pdf) | Split PDF into separate pages |
| [Compress PDF](https://filetoolworks.com/compress-pdf) | Reduce PDF file size |
| [PDF to JPG](https://filetoolworks.com/pdf-to-jpg) | Convert PDF pages to images |
| [JPG to PDF](https://filetoolworks.com/jpg-to-pdf) | Convert images to PDF |
| [PDF to Text](https://filetoolworks.com/pdf-to-text) | Extract text from PDF |
| [Extract PDF Pages](https://filetoolworks.com/extract-pdf-pages) | Extract specific pages from PDF |
| [HTML to PDF](https://filetoolworks.com/html-to-pdf) | Convert HTML to PDF |
| [Sign PDF](https://filetoolworks.com/sign-pdf) | Add signature to PDF documents |
| [PDF to Word](https://filetoolworks.com/pdf-to-word) | Convert PDF to DOCX |

### Video Tools
| Tool | Description |
|------|-------------|
| [Compress Video](https://filetoolworks.com/compress-video) | Reduce video file size with H.264 |
| [Video to GIF](https://filetoolworks.com/video-to-gif) | Convert video clips to animated GIFs |
| [Trim Video](https://filetoolworks.com/trim-video) | Cut video clips without re-encoding |
| [Video to MP4](https://filetoolworks.com/video-to-mp4) | Convert any video format to MP4 |
| [Video to WebM](https://filetoolworks.com/video-to-webm) | Convert videos to WebM for web |

### Audio Tools
| Tool | Description |
|------|-------------|
| [Compress Audio](https://filetoolworks.com/compress-audio) | Reduce audio file size |
| [Extract Audio](https://filetoolworks.com/extract-audio) | Extract audio from video files |
| [Trim Audio](https://filetoolworks.com/trim-audio) | Cut audio files |
| [WAV to MP3](https://filetoolworks.com/wav-to-mp3) | Convert WAV to MP3 |
| [MP3 to WAV](https://filetoolworks.com/mp3-to-wav) | Convert MP3 to WAV |

### Document Tools
| Tool | Description |
|------|-------------|
| [Word to PDF](https://filetoolworks.com/word-to-pdf) | Convert Word documents to PDF |
| [Excel to PDF](https://filetoolworks.com/excel-to-pdf) | Convert Excel spreadsheets to PDF |
| [PPT to PDF](https://filetoolworks.com/ppt-to-pdf) | Convert PowerPoint to PDF |

### Other Tools
| Tool | Description |
|------|-------------|
| [ZIP Files](https://filetoolworks.com/zip-files) | Create ZIP archives |
| [Unzip Files](https://filetoolworks.com/unzip-files) | Extract ZIP archives |

## How It Works

Most tools run entirely in your browser using WebAssembly and the Canvas API. Your files never leave your device.

- **Image tools**: Canvas API for format conversion, resizing, and filters
- **Video/Audio tools**: FFmpeg compiled to WebAssembly (ffmpeg.wasm)
- **PDF tools**: pdf-lib and jsPDF for client-side PDF manipulation
- **AI Background Removal**: @imgly/background-removal running ML models in-browser

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- FFmpeg.js (WebAssembly)
- pdf-lib, jsPDF
- @imgly/background-removal

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## License

Copyright 2025-2026 FileToolWorks. All rights reserved.
