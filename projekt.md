# FileToolWorks.com - Project Documentation

## 🎯 Vision
Bli nästa stora utility-sajt för filkonvertering och bearbetning. Fokus på snabbhet, enkelhet och användarvänlighet.

## 🌐 Domän
**FileToolWorks.com**

## 📋 Projektstatus
- **Fas**: Initial planering
- **Monetisering**: Efter trafik etableras (ingen ads initialt)

---

## 🏗️ Site Structure

### URL-struktur (Platt, SEO-optimerad)
```
/ (home)

Tools (direkt i root):
/image-to-pdf/
/pdf-to-image/
/compress-image/
/compress-pdf/
/jpg-to-png/
/png-to-jpg/
/resize-image/
/crop-image/
/remove-background/
/pdf-to-word/
/word-to-pdf/
/merge-pdf/
/split-pdf/
/heic-to-jpg/
/webp-to-png/
/video-to-mp3/
/gif-to-mp4/
/extract-images-from-pdf/
/convert-ppt-to-pdf/
/pdf-sign-tool/
/ocr-image-to-text/
/text-to-pdf/

Blog:
/blog/
/blog/how-to-convert-image-to-pdf/
/blog/how-to-compress-pdf/
/blog/how-to-remove-background/
/blog/dpi-vs-ppi/
/blog/how-to-merge-pdfs/
/blog/how-to-compress-images/
/blog/how-to-convert-word-to-pdf/
/blog/heic-vs-jpg/
/blog/why-pdf-still-dominates/
/blog/how-to-resize-images-for-social/

Static pages:
/about/
/terms/
/privacy/
/contact/
```

---

## 🏠 Home Page Components

### Sektioner (i ordning)
1. **Hero Section**
   - Headline: "Free Online Tools — Fast, Simple, No Signup"
   - Subheading: kort, direkt värdeproposition
   - Search bar (prominent)

2. **Top 12 Tools Grid**
   - 12 mest populära verktyg
   - Ikoner + korta beskrivningar
   - Direktlänkar

3. **Kategori-sektioner**
   - Image Tools
   - PDF Tools
   - Video Tools
   - (med 4-6 verktyg vardera)

4. **Blog Previews**
   - 3-6 senaste/populäraste artiklar
   - Thumbnail + excerpt + "Read more"

5. **FAQ Section**
   - 6-8 vanliga frågor
   - Optimerat för Google rich results

6. **Footer**
   - Alla internlänkar (tools + blog + static pages)
   - Strukturerad i kolumner

### SEO-optimering Home
- Många interna länkar
- Tydlig kategorisering
- Text runt verktygen (inte bara knappar)
- H1: "Free Online File Conversion Tools"
- Meta: "Convert, compress, and edit files online for free. Fast, secure, no signup required."

---

## 📝 Content Strategy

### Per Tool-sida (Template)
Varje tool-sida ska innehålla:

1. **H1**: "[Action] [File Type] – Free & Fast [Type]"
   - Ex: "JPG to PDF – Free & Fast Converter"

2. **Meta Title**: "[Action] [File Type] – Free & Fast (No Signup)"
   - Max 60 tecken

3. **Meta Description**: "Convert [X] to [Y] instantly. Works online, supports mobile, keeps high quality. Free forever."
   - Max 155 tecken

4. **Intro Text**: 50-150 ord
   - Kort, direkt, funktionell
   - Ingen AI-fluff
   - Exempel: "Convert JPG to PDF instantly. This tool works online, supports mobile, and keeps high quality. How it works: upload, reorder, download."

5. **Tool Interface**
   - Synligt DIREKT (above the fold)
   - Drag-and-drop eller file picker
   - Progress indicator
   - Download-knapp
   - **EXTRA ENKELT UI** - minimalistiskt, tydligt, inga distraktioner

6. **Tutorial/How It Works**: 3-4 steg
   - Kort bullets eller numrerad lista

7. **FAQ**: 3 frågor
   - Specifika för verktyget
   - Schema markup för rich results

8. **Intern Linking**: 3 relaterade tools
   - "Need PNG to JPG? → link"
   - "Want to compress? → link"

9. **Footer**: Standard site footer

### Blogg-artiklar (Template)

#### De första 10 artiklarna:
1. How to Convert Image to PDF (Windows, Mac, iPhone)
2. How to Compress a PDF Without Losing Quality
3. How to Remove the Background From an Image Online
4. DPI vs PPI – What's the Difference?
5. How to Merge Multiple PDFs Into One
6. How to Compress Images for Email or Uploads
7. How to Convert Word to PDF for Free
8. HEIC vs JPG – Which Format Should You Use?
9. Why PDFs Are Still the Most Popular File Format
10. How to Resize Images for Instagram, TikTok, and Websites

#### Varje artikel ska ha:
- **Längd**: 200-400 ord (kort och direkt)
- **Screenshots**: 2-3 relevanta bilder
- **Interna länkar**: 2-3 länkar till våra tools
- **Externa länkar**: 1 länk till trusted source (för E-E-A-T)
- **Format**:
  - H1 (title)
  - Intro paragraph
  - H2 sections (2-4 korta sektioner)
  - Kort bullets/steps
  - Conclusion med CTA till verktyg

#### SEO-optimering Blogg:
- Exact search intent matching
- Inga långa AI-paragrafer
- Praktiska screenshots
- Direkta svar först
- Kort och koncist

---

## 🎨 Design Principles

### Core Values
- **Snabbhet**: Ingen bloat, lätta bibliotek
- **Enkelhet**: EXTRA minimalistisk UI, tydlig navigation
- **Mobiloptimering**: 70-80% trafik kommer från mobil
- **No Signup**: Allt ska fungera direkt
- **No Distractions**: Inga popups, banners, eller clutter

### UI Philosophy
- **One Purpose Per Page**: Varje tool-sida har EN funktion
- **Immediate Action**: Tool ska vara synligt direkt, ingen scroll
- **Clean Layout**: Mycket whitespace, tydliga knappar
- **Clear Feedback**: Progress bars, success messages, error states
- **Mobile First**: Designa för mobil först, sedan desktop

### Tech Stack (TBD)
- **Frontend**: React/Next.js eller Vanilla JS (beroende på speed)
- **Styling**: Tailwind CSS (lightweight) eller minimal custom CSS
- **Hosting**: Vercel/Netlify (för speed + CDN)
- **File Processing**:
  - Client-side när möjligt (privacy + speed)
  - Open-source libraries från GitHub
  - Custom logic där behövs

### Performance Targets
- **Page Load**: < 1s (mobile 3G)
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 90+ alla kategorier
- **Bundle Size**: < 100KB initial JS

---

## 🚀 SEO Strategy 2025

### Core Principles
✅ **DO**:
- Kort, unikt content (50-150 ord per tool)
- Snabba sidor (10× snabbare än konkurrenter)
- Stark intern länkning (crawl loops)
- Tydlig struktur (/tool-name/)
- Mobiloptimering first
- E-E-A-T compliance
- FAQ med schema markup
- Google Search Console från dag 1
- Sitemap.xml + robots.txt
- Manual redigering av all content

❌ **DON'T**:
- AI-fluff och generiska texter
- Duplicate content
- Keyword stuffing
- Tunga scripts och libraries
- Cookies/popups utan anledning
- Mass content generation
- Hallucinated facts

### On-Page SEO Checklist
Per sida:
- [ ] Unique H1
- [ ] Optimerad Meta Title (< 60 chars)
- [ ] Optimerad Meta Description (< 155 chars)
- [ ] 50-150 ord unique content
- [ ] 3+ interna länkar
- [ ] FAQ med schema markup
- [ ] Mobile-friendly layout
- [ ] Fast load time (< 1s)
- [ ] Alt text på bilder

### Technical SEO
- [ ] Custom domain (FileToolWorks.com) ✅
- [ ] SSL certificate
- [ ] Sitemap.xml genererad
- [ ] Robots.txt korrekt konfigurerad
- [ ] Google Search Console setup
- [ ] Google Analytics (minimal tracking)
- [ ] Schema.org markup (Organization, FAQ, HowTo)
- [ ] Open Graph tags för social sharing
- [ ] Canonical URLs

### Intern Linking Strategy
- Home länkar till alla top 12 tools
- Home länkar till alla kategori-sektioner
- Varje tool länkar till 3 relaterade tools
- Varje blogg länkar till 2-3 relevanta tools
- Footer länkar till alla tools + bloggar
- **Mål**: Varje sida max 2 klick från home

---

## 💰 Monetization Strategy

### Pre-monetisering
- Ingen ads alls initialt
- Fokus på trafik och SEO
- Bygg trust och user base
- Optimera conversion (tool usage)

### Monetisering (när trafik finns)
- Diskreta display ads (1-2 per sida)
- Eller: "Buy us a coffee" donation
- Eller: Premium tier (större filer, batch processing)

### Full Monetisering (senare)
- Display ads optimerade
- Premium subscription ($5-10/mån)
  - Unlimited file size
  - Batch processing
  - API access
  - No ads
- Affiliate links (till relevanta produkter)

---

## 📊 Success Metrics

### Traffic Goals
- Organisk trafik från Google
- Låg bounce rate (< 60%)
- Hög tool conversion (> 30% använder verktyget)
- Pages per session > 2

### SEO Goals
- Indexerad i Google
- Ranking för relevanta keywords
- Top 10 för nisch-keywords
- Featured snippets där möjligt

### Engagement Goals
- **Bounce Rate**: < 60%
- **Time on Page**: > 1 min (tools)
- **Pages per Session**: > 2
- **Tool Conversion**: > 30% använder verktyget

---

## 🛠️ Implementation Plan

### Foundation
- [ ] Project setup (framework, hosting)
- [ ] Design system (colors, typography, components)
- [ ] Home page layout
- [ ] Footer + navigation
- [ ] Static pages (About, Terms, Privacy, Contact)

### Core Tools (Prioriterade)
- [ ] Image to PDF
- [ ] PDF to Image
- [ ] Compress Image
- [ ] Compress PDF
- [ ] JPG to PNG
- [ ] PNG to JPG
- [ ] Resize Image
- [ ] Remove Background
- [ ] PDF to Word
- [ ] Word to PDF
- [ ] Merge PDF
- [ ] Split PDF

### Extended Tools
- [ ] HEIC to JPG
- [ ] WebP to PNG
- [ ] Crop Image
- [ ] Video to MP3
- [ ] GIF to MP4
- [ ] Extract Images from PDF
- [ ] PPT to PDF
- [ ] PDF Sign Tool
- [ ] OCR Image to Text
- [ ] Text to PDF

### Content
- [ ] 10 bloggartiklar (200-400 ord vardera)
- [ ] FAQ på home page
- [ ] Tool FAQs (alla verktyg)

### SEO & Launch
- [ ] Meta tags alla sidor
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Google Search Console
- [ ] Schema markup
- [ ] Final performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Launch

### Post-Launch
- [ ] Monitor GSC data
- [ ] Fix crawl errors
- [ ] A/B test tool layouts
- [ ] Add more tools baserat på demand
- [ ] Eventuellt Google Ads för boost

---

## 📚 Resources & Libraries

### Open Source Tools (att utvärdera)
- **PDF**: pdf-lib, jsPDF, PDF.js
- **Images**: sharp.js, Pica, browser-image-compression
- **Video**: ffmpeg.wasm (WebAssembly)
- **Background Removal**: @imgly/background-removal, rembg
- **OCR**: Tesseract.js

### Design Resources
- **Icons**: Heroicons, Lucide, eller custom
- **Fonts**: System fonts (performance) eller Inter/Roboto
- **Colors**: TBD (clean, professional palette)

---

## 🔒 Privacy & Legal

### Must-Have Pages
- **Privacy Policy**:
  - No account creation
  - Files processed client-side when possible
  - No storage of user files (delete immediately)
  - Cookie policy (minimal tracking)

- **Terms of Service**:
  - File size limits
  - Acceptable use policy
  - No liability for file loss
  - Free service, no guarantees

- **About**:
  - Mission: "We built FileToolWorks to make file conversion simple and accessible"
  - Team (author page för E-E-A-T)
  - Contact info

- **Contact**:
  - Email
  - Support form (enkel)

---

## 🎯 Competitive Advantages

### Why We'll Win
1. **Snabbare**: 10× snabbare än Smallpdf, ILovePDF
2. **Renare**: Ingen spam, popups, forced signups
3. **Extra enkelt UI**: Minimalistiskt, fokus på funktionen
4. **Mobiloptimerad**: Fungerar perfekt på telefon
5. **Modern SEO**: Optimerad för 2025 algorithms
6. **Privacy-first**: Client-side processing när möjligt
7. **Free**: Allt gratis från början (builds trust)

### Differentiators vs Konkurrenter
- **iLovePDF**: För många popups, signup-walls
- **Smallpdf**: Dyrt premium, begränsningar
- **PDF24**: Gammaldags UI, långsam
- **Convertio**: För många ads, tracking
- **Vi**: Snabbt, rent, mobilt, EXTRA enkelt, modernt

---

## 🔗 Important Links

- **Domain**: FileToolWorks.com
- **GitHub**: TBD
- **Hosting**: TBD (Vercel/Netlify)
- **Analytics**: Google Search Console + Google Analytics
- **Email**: TBD (support@filetoolworks.com)

---

## 📝 Notes

- **Uppdatera denna fil regelbundet** när projektet utvecklas
- **CLAUDE.md ska uppdateras innan varje git commit** (enligt workflow requirements)
- **Ställ alltid klargörande frågor** i planning mode
- **UI ska vara EXTRA enkelt** - minimalistiskt och tydligt
- **Bloggar ska vara korta** - 200-400 ord
- **Inga YouTube-verktyg** - fokus på fil-konvertering

---

_Last updated: 2025-11-22_
_Version: 1.1_
_Status: Initial Planning_
