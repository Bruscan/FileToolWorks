# FileToolWorks

**Free online file conversion and editing tools.** No signup, no uploads to servers, no limits. All processing happens in your browser.

**[www.filetoolworks.com](https://www.filetoolworks.com)**

## Tools

### Image Tools
| Tool | Description |
|------|-------------|
| [Image to PDF](https://www.filetoolworks.com/image-to-pdf) | Convert any image to PDF |
| [JPG to PDF](https://www.filetoolworks.com/jpg-to-pdf) | Convert JPG/JPEG images to PDF |
| [PNG to JPG](https://www.filetoolworks.com/png-to-jpg) | Convert PNG to JPG with quality control |
| [JPG to PNG](https://www.filetoolworks.com/jpg-to-png) | Convert JPG to lossless PNG |
| [Image to WebP](https://www.filetoolworks.com/image-to-webp) | Convert images to modern WebP format |
| [WebP to PNG](https://www.filetoolworks.com/webp-to-png) | Convert WebP back to PNG |
| [WebP to JPG](https://www.filetoolworks.com/webp-to-jpg) | Convert WebP to JPG |
| [HEIC to JPG](https://www.filetoolworks.com/heic-to-jpg) | Convert iPhone HEIC photos to JPG |
| [Resize Image](https://www.filetoolworks.com/resize-image) | Resize by percentage or custom dimensions |
| [Crop Image](https://www.filetoolworks.com/crop-image) | Crop to preset ratios or custom area |
| [Rotate Image](https://www.filetoolworks.com/rotate-image) | Rotate and flip with live preview |
| [Compress Image](https://www.filetoolworks.com/compress-image) | Reduce image file size |
| [Sharpen Image](https://www.filetoolworks.com/sharpen-image) | Enhance image sharpness |
| [Blur Image](https://www.filetoolworks.com/blur-image) | Apply blur effect |
| [Remove Background](https://www.filetoolworks.com/remove-background) | AI-powered background removal in browser |

### PDF Tools
| Tool | Description |
|------|-------------|
| [Merge PDF](https://www.filetoolworks.com/merge-pdf) | Combine multiple PDFs into one |
| [Split PDF](https://www.filetoolworks.com/split-pdf) | Split PDF into separate pages |
| [Compress PDF](https://www.filetoolworks.com/compress-pdf) | Reduce PDF file size |
| [PDF to JPG](https://www.filetoolworks.com/pdf-to-jpg) | Convert PDF pages to images |
| [JPG to PDF](https://www.filetoolworks.com/jpg-to-pdf) | Convert images to PDF |
| [PDF to Text](https://www.filetoolworks.com/pdf-to-text) | Extract text from PDF |
| [Extract PDF Pages](https://www.filetoolworks.com/extract-pdf-pages) | Extract specific pages from PDF |
| [HTML to PDF](https://www.filetoolworks.com/html-to-pdf) | Convert HTML to PDF |
| [Sign PDF](https://www.filetoolworks.com/sign-pdf) | Add signature to PDF documents |
| [PDF to Word](https://www.filetoolworks.com/pdf-to-word) | Convert PDF to DOCX |

### Video Tools
| Tool | Description |
|------|-------------|
| [Compress Video](https://www.filetoolworks.com/compress-video) | Reduce video file size with H.264 |
| [Video to GIF](https://www.filetoolworks.com/video-to-gif) | Convert video clips to animated GIFs |
| [Trim Video](https://www.filetoolworks.com/trim-video) | Cut video clips without re-encoding |
| [Video to MP4](https://www.filetoolworks.com/video-to-mp4) | Convert any video format to MP4 |
| [Video to WebM](https://www.filetoolworks.com/video-to-webm) | Convert videos to WebM for web |

### Audio Tools
| Tool | Description |
|------|-------------|
| [Compress Audio](https://www.filetoolworks.com/compress-audio) | Reduce audio file size |
| [Extract Audio](https://www.filetoolworks.com/extract-audio) | Extract audio from video files |
| [Trim Audio](https://www.filetoolworks.com/trim-audio) | Cut audio files |
| [WAV to MP3](https://www.filetoolworks.com/wav-to-mp3) | Convert WAV to MP3 |
| [MP3 to WAV](https://www.filetoolworks.com/mp3-to-wav) | Convert MP3 to WAV |

### Document Tools
| Tool | Description |
|------|-------------|
| [Word to PDF](https://www.filetoolworks.com/word-to-pdf) | Convert Word documents to PDF |
| [Excel to PDF](https://www.filetoolworks.com/excel-to-pdf) | Convert Excel spreadsheets to PDF |
| [PPT to PDF](https://www.filetoolworks.com/ppt-to-pdf) | Convert PowerPoint to PDF |

### Other Tools
| Tool | Description |
|------|-------------|
| [ZIP Files](https://www.filetoolworks.com/zip-files) | Create ZIP archives |
| [Unzip Files](https://www.filetoolworks.com/unzip-files) | Extract ZIP archives |

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
