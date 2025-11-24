# FileToolWorks - Testing Checklist

**Session Date:** 2024-11-24
**Tools Added:** 23 new tools (19 → 38 total)
**Dev Server:** http://localhost:3002

---

## 🔴 NEEDS TESTING (23 tools)

### PDF Tools (5 tools)

- [ ] **PDF to Text** - `/pdf-to-text`
  - Test: Upload PDF with selectable text
  - Verify: Text extraction works, download .txt file
  - Check: FAQ content, SEO metadata

- [ ] **Extract PDF Pages** - `/extract-pdf-pages`
  - Test: Upload multi-page PDF
  - Verify: Checkbox selection works, range input (e.g., "1,3,5-7")
  - Check: Select All/Deselect All buttons, extraction works

- [ ] **Word to PDF** - `/word-to-pdf`
  - Test: Upload .docx file
  - Verify: Conversion works with basic formatting
  - Check: Disclaimer about limited formatting is visible

- [ ] **Excel to PDF** - `/excel-to-pdf`
  - Test: Upload .xlsx file with data
  - Verify: Table conversion works, PDF has proper grid
  - Check: First sheet only is converted

- [ ] **PPT to PDF** - `/ppt-to-pdf`
  - Test: Page loads correctly
  - Verify: "Coming Soon" message displays
  - Check: Alternative recommendations are shown

### Image Tools (6 tools)

- [ ] **Crop Image** - `/crop-image` (IMPROVED)
  - Test: Upload image
  - Verify: Preset ratios work (1:1, 4:3, 16:9, Free)
  - Check: Custom dimensions mode, crop preview

- [ ] **Remove Background** - `/remove-background` ⭐ HIGH TRAFFIC
  - Test: Upload photo with clear subject
  - Verify: AI model downloads (~50MB first time), background removal works
  - Check: Before/after preview, transparent PNG output
  - Note: First conversion takes 10-30 seconds

- [ ] **Blur Image** - `/blur-image`
  - Test: Upload image
  - Verify: Blur slider (0-20px) works
  - Check: Real-time preview, quality settings

- [ ] **Sharpen Image** - `/sharpen-image`
  - Test: Upload slightly blurry image
  - Verify: Sharpening works (Low/Medium/High)
  - Check: Convolution filter enhances edges

- [ ] **Image to HEIC** - `/image-to-heic`
  - Test: Page loads correctly
  - Verify: "Coming Soon" message displays
  - Check: Alternative tool recommendations (HEIC to JPG, Image to WebP)

- [ ] **HTML to PDF** - `/html-to-pdf`
  - Test: Upload .html file OR paste HTML code
  - Verify: Tab switcher works, conversion works
  - Check: Page size options (A4, US Letter), multi-page splitting

### Video Tools (4 tools)

- [ ] **Compress Video** - `/compress-video`
  - Test: Upload video file
  - Verify: FFmpeg loads, compression works
  - Check: Quality settings (Low/Medium/High), resolution options
  - Note: May take 30+ seconds for large videos

- [ ] **Trim Video** - `/trim-video`
  - Test: Upload video
  - Verify: Start/end time inputs work (both seconds and MM:SS format)
  - Check: Duration detection, video preview after trim

- [ ] **Video to MP4** - `/video-to-mp4`
  - Test: Upload non-MP4 video (AVI, MOV, etc.)
  - Verify: Conversion to MP4 works
  - Check: Quality and resolution settings

- [ ] **Video to WebM** - `/video-to-webm`
  - Test: Upload MP4 or other video
  - Verify: WebM conversion works with VP9 codec
  - Check: Quality settings, file size comparison

### Audio Tools (5 tools)

- [ ] **Extract Audio** - `/extract-audio`
  - Test: Upload video file
  - Verify: Audio extraction works (MP3/WAV/AAC)
  - Check: Bitrate settings for MP3, format selector

- [ ] **Compress Audio** - `/compress-audio`
  - Test: Upload audio file (MP3, WAV, etc.)
  - Verify: Compression works, file size reduction
  - Check: Bitrate options (64k/128k/192k)

- [ ] **Trim Audio** - `/trim-audio`
  - Test: Upload audio file
  - Verify: Start/end time trimming works
  - Check: Duration display, codec copy (no quality loss)

- [ ] **MP3 to WAV** - `/mp3-to-wav`
  - Test: Upload MP3 file
  - Verify: WAV conversion works
  - Check: File size warning (10x increase), 44.1kHz output

- [ ] **WAV to MP3** - `/wav-to-mp3`
  - Test: Upload WAV file
  - Verify: MP3 conversion works
  - Check: Bitrate settings, file size reduction (80-90%)

### Other Tools (3 tools)

- [ ] **ZIP Files** - `/zip-files`
  - Test: Upload multiple files (different types)
  - Verify: ZIP creation works, file list displays
  - Check: Remove files before zipping, download archive.zip

- [ ] **Unzip Files** - `/unzip-files`
  - Test: Upload .zip file
  - Verify: File extraction works, list of files shows
  - Check: Individual download and "Download All" buttons

- [ ] **Sign PDF** - `/sign-pdf`
  - Test: Upload PDF
  - Verify: Signature drawing works OR image upload
  - Check: Drag signature to position, optional Name/Date fields
  - Verify: Signed PDF downloads correctly

---

## ✅ TESTING PROTOCOL

For each tool:
1. **Upload Test**: Drag & drop file
2. **UI Test**: All buttons, selectors, and inputs work
3. **Conversion Test**: Processing completes without errors
4. **Download Test**: Output file downloads correctly
5. **Quality Test**: Output file is valid and usable
6. **Mobile Test**: Works on mobile screen size
7. **SEO Test**: Metadata is correct, FAQ loads

---

## 📝 KNOWN ISSUES

- Blog post `/blog/dpi-vs-ppi` may have apostrophe errors (check when testing)
- Some tools may timeout with very large files (>100MB)
- First-time FFmpeg load takes ~10 seconds
- Remove Background AI model is ~50MB (first load only)

---

## 🎯 AFTER TESTING APPROVAL

Once all tools are tested and approved:
1. Update this checklist with ✅ for approved tools
2. Update CLAUDE.md to remove "NEEDS TESTING" status
3. Update sitemap.xml to include all new tool pages
4. Deploy to Vercel for production testing
5. Monitor Google Analytics for traffic patterns

---

## 📊 TESTING PROGRESS

**Total Tools:** 23
**Tested:** 0
**Approved:** 0
**Issues Found:** 0

**Start Testing:** [Date]
**Completion Target:** [Date]
