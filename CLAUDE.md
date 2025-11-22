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
- ✅ Central tool management system
  - lib/tools.ts: Database with all 23 tools and metadata
  - Smart getRelatedTools() function (category-based)
  - components/RelatedTools.tsx: Reusable component
- ✅ Tool page templates
  - templates/tool-page-template.tsx: Complete page template
  - templates/tool-layout-template.tsx: SEO metadata template
  - templates/README.md: Usage guide
- ✅ GitHub repo created: https://github.com/Bruscan/FileToolWorks
- 🔄 Ready to build remaining 22 tools using templates

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Dev Server**: Turbopack
- **PDF Processing**: jsPDF (client-side)

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

## Next Steps
1. Build remaining 22 tools using templates
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
