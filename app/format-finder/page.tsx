"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Image,
  Music,
  Video,
  FileText,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Zap,
  Globe,
  Shield,
  Smartphone,
} from "lucide-react";

type FileCategory = "image" | "audio" | "video" | "document";

interface UseCase {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface Recommendation {
  format: string;
  extension: string;
  why: string;
  pros: string[];
  cons: string[];
  tool: { name: string; href: string } | null;
  alternativeTool: { name: string; href: string } | null;
  blogPost: { title: string; href: string } | null;
}

const useCases: Record<FileCategory, UseCase[]> = {
  image: [
    {
      id: "web",
      label: "Website or Social Media",
      icon: <Globe className="w-5 h-5" />,
      description: "Publishing images online where file size matters",
    },
    {
      id: "transparency",
      label: "Transparency Needed",
      icon: <Shield className="w-5 h-5" />,
      description: "Logos, icons, or graphics with transparent backgrounds",
    },
    {
      id: "photo",
      label: "Photography",
      icon: <Image className="w-5 h-5" />,
      description: "Storing or sharing high-quality photos",
    },
    {
      id: "smallest",
      label: "Smallest File Size",
      icon: <Zap className="w-5 h-5" />,
      description: "Email attachments, limited storage, slow connections",
    },
  ],
  audio: [
    {
      id: "streaming",
      label: "Music or Podcast",
      icon: <Music className="w-5 h-5" />,
      description: "Distributing audio for listeners online",
    },
    {
      id: "editing",
      label: "Audio Editing",
      icon: <Zap className="w-5 h-5" />,
      description: "Professional production, mixing, or mastering",
    },
    {
      id: "voice",
      label: "Voice Recording",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Meetings, lectures, voice memos, or interviews",
    },
    {
      id: "archival",
      label: "Archival / Lossless",
      icon: <Shield className="w-5 h-5" />,
      description: "Preserving audio at original quality forever",
    },
  ],
  video: [
    {
      id: "social",
      label: "Social Media",
      icon: <Globe className="w-5 h-5" />,
      description: "YouTube, Instagram, TikTok, or Twitter",
    },
    {
      id: "email",
      label: "Email or Messaging",
      icon: <Smartphone className="w-5 h-5" />,
      description: "Sending video clips with tight file size limits",
    },
    {
      id: "web",
      label: "Website Embedding",
      icon: <Zap className="w-5 h-5" />,
      description: "Background videos or inline clips on web pages",
    },
    {
      id: "archive",
      label: "Archival / High Quality",
      icon: <Shield className="w-5 h-5" />,
      description: "Storing original footage at maximum quality",
    },
  ],
  document: [
    {
      id: "sharing",
      label: "Sharing (Read-Only)",
      icon: <Shield className="w-5 h-5" />,
      description: "Send a document that looks the same everywhere",
    },
    {
      id: "editing",
      label: "Collaborative Editing",
      icon: <FileText className="w-5 h-5" />,
      description: "Documents others need to edit and comment on",
    },
    {
      id: "printing",
      label: "Printing",
      icon: <Zap className="w-5 h-5" />,
      description: "Documents meant for physical print output",
    },
    {
      id: "data",
      label: "Spreadsheet / Data",
      icon: <Globe className="w-5 h-5" />,
      description: "Tables, calculations, or structured data",
    },
  ],
};

const recommendations: Record<string, Recommendation> = {
  "image-web": {
    format: "WebP",
    extension: ".webp",
    why: "WebP gives you 25-35% smaller files than JPEG at the same visual quality. Every modern browser supports it. It is the best format for web images in 2026.",
    pros: [
      "25-35% smaller than JPEG",
      "Supports transparency (like PNG)",
      "All modern browsers support it",
      "Supports animation",
    ],
    cons: [
      "Not supported by very old browsers",
      "Some desktop apps cannot open it",
    ],
    tool: { name: "Convert to WebP", href: "/image-to-webp" },
    alternativeTool: { name: "Compress Image", href: "/compress-image" },
    blogPost: { title: "WebP vs JPG", href: "/blog/webp-vs-jpg" },
  },
  "image-transparency": {
    format: "PNG",
    extension: ".png",
    why: "PNG is the standard format for images that need transparent backgrounds. It uses lossless compression, so your graphics stay crisp with clean edges around transparent areas.",
    pros: [
      "Full alpha transparency",
      "Lossless quality",
      "Universal support",
      "Perfect for logos and icons",
    ],
    cons: ["Larger files than JPEG/WebP", "Not ideal for photos"],
    tool: { name: "Convert to PNG", href: "/jpg-to-png" },
    alternativeTool: {
      name: "Remove Background",
      href: "/remove-background",
    },
    blogPost: { title: "PNG vs JPG", href: "/blog/png-vs-jpg" },
  },
  "image-photo": {
    format: "JPEG",
    extension: ".jpg",
    why: "JPEG has been the standard photo format for decades. At quality 85-92%, photos look identical to the original while being 10-20x smaller. Every device, app, and service supports JPEG.",
    pros: [
      "Universal compatibility",
      "Excellent photo compression",
      "Small file sizes",
      "Adjustable quality",
    ],
    cons: ["No transparency", "Lossy (quality degrades with re-saves)"],
    tool: { name: "Convert to JPG", href: "/png-to-jpg" },
    alternativeTool: { name: "Resize Image", href: "/resize-image" },
    blogPost: {
      title: "Best Image Format for Web",
      href: "/blog/best-image-format-for-web",
    },
  },
  "image-smallest": {
    format: "WebP",
    extension: ".webp",
    why: "WebP produces the smallest files of any widely-supported image format. At the same visual quality, WebP is 25-35% smaller than JPEG and up to 80% smaller than PNG.",
    pros: [
      "Smallest file size",
      "Good quality at high compression",
      "Supports transparency",
      "Modern browser support",
    ],
    cons: ["Some older apps may not open it", "Slightly slower to encode"],
    tool: { name: "Convert to WebP", href: "/image-to-webp" },
    alternativeTool: { name: "Compress Image", href: "/compress-image" },
    blogPost: {
      title: "How to Compress Images for Email",
      href: "/blog/how-to-compress-images-for-email",
    },
  },
  "audio-streaming": {
    format: "MP3",
    extension: ".mp3",
    why: "MP3 at 192kbps is the sweet spot for music and podcast distribution. It plays on every device ever made, every app supports it, and file sizes stay manageable for streaming.",
    pros: [
      "Universal playback support",
      "Small file sizes",
      "Great for streaming",
      "Works everywhere",
    ],
    cons: ["Lossy compression", "Not ideal for professional mastering"],
    tool: { name: "WAV to MP3", href: "/wav-to-mp3" },
    alternativeTool: { name: "Compress Audio", href: "/compress-audio" },
    blogPost: { title: "MP3 vs WAV", href: "/blog/mp3-vs-wav" },
  },
  "audio-editing": {
    format: "WAV",
    extension: ".wav",
    why: "WAV is uncompressed audio with zero quality loss. For editing, you need a lossless format so repeated saves and processing do not degrade your audio. Convert to MP3 only for final distribution.",
    pros: [
      "Zero quality loss",
      "Standard for audio editors",
      "No encoding artifacts",
      "Full dynamic range",
    ],
    cons: ["Very large files (10x MP3)", "Not ideal for sharing"],
    tool: { name: "MP3 to WAV", href: "/mp3-to-wav" },
    alternativeTool: { name: "Trim Audio", href: "/trim-audio" },
    blogPost: {
      title: "Audio Bitrate Explained",
      href: "/blog/audio-bitrate-explained",
    },
  },
  "audio-voice": {
    format: "MP3",
    extension: ".mp3",
    why: "For voice recordings, MP3 at 128kbps is more than enough. Voice does not need the full frequency range of music, so lower bitrates still sound clear. Files stay small enough for email.",
    pros: [
      "Small files",
      "128kbps is enough for voice",
      "Easy to share via email",
      "Plays on any device",
    ],
    cons: ["Lossy compression", "Not suitable for music production"],
    tool: { name: "Compress Audio", href: "/compress-audio" },
    alternativeTool: { name: "Trim Audio", href: "/trim-audio" },
    blogPost: {
      title: "How to Reduce Audio File Size",
      href: "/blog/how-to-reduce-audio-file-size",
    },
  },
  "audio-archival": {
    format: "FLAC",
    extension: ".flac",
    why: "FLAC compresses audio to about 50-60% of WAV size without any quality loss. It is the gold standard for archiving music and audio collections at original studio quality.",
    pros: [
      "Lossless quality",
      "50-60% smaller than WAV",
      "Widely supported",
      "Preserves metadata",
    ],
    cons: ["Larger than MP3/AAC", "Not all portable players support it"],
    tool: { name: "Compress Audio", href: "/compress-audio" },
    alternativeTool: { name: "WAV to MP3", href: "/wav-to-mp3" },
    blogPost: { title: "FLAC vs MP3", href: "/blog/flac-vs-mp3" },
  },
  "video-social": {
    format: "MP4 (H.264)",
    extension: ".mp4",
    why: "Every social media platform prefers MP4 with H.264 encoding. It gives you the best compatibility across YouTube, Instagram, TikTok, Twitter, and Facebook. Use 1080p resolution at CRF 23 for the ideal quality-to-size ratio.",
    pros: [
      "Accepted by all platforms",
      "Good quality at reasonable size",
      "Fast to upload",
      "Plays on any device",
    ],
    cons: [
      "Larger than newer codecs like AV1",
      "Some quality loss at high compression",
    ],
    tool: { name: "Video to MP4", href: "/video-to-mp4" },
    alternativeTool: { name: "Compress Video", href: "/compress-video" },
    blogPost: {
      title: "Best Video Format for Social Media",
      href: "/blog/best-video-format-for-social-media",
    },
  },
  "video-email": {
    format: "MP4 (compressed)",
    extension: ".mp4",
    why: "Email attachments typically max out at 25MB. Compress your video to MP4 at 480p or 720p with medium quality (CRF 28) to keep it under the limit while still looking decent.",
    pros: [
      "Small file size",
      "Under 25MB for email",
      "Plays inline in most email clients",
      "Universal compatibility",
    ],
    cons: ["Quality trade-off for small size", "Short clips only"],
    tool: { name: "Compress Video", href: "/compress-video" },
    alternativeTool: { name: "Trim Video", href: "/trim-video" },
    blogPost: {
      title: "How to Compress Video for Email",
      href: "/blog/how-to-compress-video-for-email",
    },
  },
  "video-web": {
    format: "WebM (VP9)",
    extension: ".webm",
    why: "WebM produces smaller files than MP4 at similar quality, making it ideal for web embedding where bandwidth matters. All modern browsers support WebM natively without plugins.",
    pros: [
      "Smaller than MP4",
      "Native browser support",
      "Open and royalty-free",
      "Good for background videos",
    ],
    cons: ["Slower to encode", "Not supported on older iOS"],
    tool: { name: "Video to WebM", href: "/video-to-webm" },
    alternativeTool: { name: "Video to GIF", href: "/video-to-gif" },
    blogPost: { title: "MP4 vs WebM", href: "/blog/mp4-vs-webm" },
  },
  "video-archive": {
    format: "MKV",
    extension: ".mkv",
    why: "MKV is the most flexible container format. It supports virtually any codec, multiple audio tracks, subtitles, and chapters. Use it with H.265 or lossless codecs for maximum quality.",
    pros: [
      "Supports any codec",
      "Multiple audio/subtitle tracks",
      "Chapter markers",
      "No quality ceiling",
    ],
    cons: [
      "Large files",
      "Not universally supported for playback",
      "Some platforms reject MKV uploads",
    ],
    tool: { name: "Video to MP4", href: "/video-to-mp4" },
    alternativeTool: { name: "Compress Video", href: "/compress-video" },
    blogPost: { title: "MKV vs MP4", href: "/blog/mkv-vs-mp4" },
  },
  "document-sharing": {
    format: "PDF",
    extension: ".pdf",
    why: "PDF preserves your exact layout on every device, operating system, and printer. The recipient cannot accidentally edit it. It is the universal standard for sharing finished documents.",
    pros: [
      "Looks identical everywhere",
      "Cannot be accidentally edited",
      "Supports signatures",
      "Universal reader apps",
    ],
    cons: ["Hard to edit without special software", "Can be large with images"],
    tool: { name: "Word to PDF", href: "/word-to-pdf" },
    alternativeTool: { name: "Sign PDF", href: "/sign-pdf" },
    blogPost: { title: "PDF vs DOCX", href: "/blog/pdf-vs-docx" },
  },
  "document-editing": {
    format: "DOCX",
    extension: ".docx",
    why: "DOCX is the standard for collaborative document editing. It works in Microsoft Word, Google Docs, and LibreOffice. Track changes, comments, and version history make collaboration easy.",
    pros: [
      "Easy to edit",
      "Track changes and comments",
      "Works in Word and Google Docs",
      "Formatting options",
    ],
    cons: [
      "Layout can shift between apps",
      "Not ideal for final distribution",
    ],
    tool: { name: "Word to PDF", href: "/word-to-pdf" },
    alternativeTool: null,
    blogPost: { title: "PDF vs DOCX", href: "/blog/pdf-vs-docx" },
  },
  "document-printing": {
    format: "PDF",
    extension: ".pdf",
    why: "PDF is the standard for print-ready documents. It embeds fonts, preserves exact spacing, and ensures your printed output matches what you see on screen. Use PDF/X for professional printing.",
    pros: [
      "WYSIWYG printing",
      "Embeds fonts",
      "Exact layout preservation",
      "Print industry standard",
    ],
    cons: ["Cannot easily edit", "Requires conversion from editable format"],
    tool: { name: "Word to PDF", href: "/word-to-pdf" },
    alternativeTool: { name: "HTML to PDF", href: "/html-to-pdf" },
    blogPost: { title: "PDF vs DOCX", href: "/blog/pdf-vs-docx" },
  },
  "document-data": {
    format: "XLSX",
    extension: ".xlsx",
    why: "XLSX is the standard for spreadsheets with formulas, charts, and data analysis. It supports up to 1 million rows and works in Excel, Google Sheets, and LibreOffice Calc.",
    pros: [
      "Formulas and calculations",
      "Charts and pivot tables",
      "Multiple sheets",
      "1M+ row support",
    ],
    cons: ["Not human-readable like CSV", "Requires spreadsheet software"],
    tool: { name: "Excel to PDF", href: "/excel-to-pdf" },
    alternativeTool: null,
    blogPost: { title: "CSV vs XLSX", href: "/blog/csv-vs-xlsx" },
  },
};

const categoryConfig: Record<
  FileCategory,
  {
    label: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
  }
> = {
  image: {
    label: "Image",
    icon: <Image className="w-6 h-6" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-300",
  },
  audio: {
    label: "Audio",
    icon: <Music className="w-6 h-6" />,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-300",
  },
  video: {
    label: "Video",
    icon: <Video className="w-6 h-6" />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-300",
  },
  document: {
    label: "Document",
    icon: <FileText className="w-6 h-6" />,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-300",
  },
};

export default function FormatFinderPage() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<FileCategory | null>(null);
  const [useCase, setUseCase] = useState<string | null>(null);

  const handleCategorySelect = (cat: FileCategory) => {
    setCategory(cat);
    setUseCase(null);
    setStep(1);
  };

  const handleUseCaseSelect = (uc: string) => {
    setUseCase(uc);
    setStep(2);
  };

  const handleReset = () => {
    setStep(0);
    setCategory(null);
    setUseCase(null);
  };

  const handleBack = () => {
    if (step === 2) {
      setUseCase(null);
      setStep(1);
    } else if (step === 1) {
      setCategory(null);
      setStep(0);
    }
  };

  const rec =
    category && useCase
      ? recommendations[`${category}-${useCase}`]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "File Format Finder",
        url: "https://www.filetoolworks.com/format-finder",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Interactive tool to find the best file format for your needs. Get personalized recommendations for image, audio, video, and document formats.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the best image format for websites?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "WebP is the best image format for websites. It produces files 25-35% smaller than JPEG at the same visual quality and supports transparency like PNG. All modern browsers support WebP.",
            },
          },
          {
            "@type": "Question",
            name: "Should I use MP3 or WAV for my audio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use MP3 for sharing, streaming, and distribution. Use WAV for editing and production. MP3 at 192kbps sounds nearly identical to WAV but is 10x smaller.",
            },
          },
          {
            "@type": "Question",
            name: "What video format should I use for social media?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "MP4 with H.264 encoding works on every social media platform including YouTube, Instagram, TikTok, and Facebook. Use 1080p resolution for the best balance of quality and file size.",
            },
          },
          {
            "@type": "Question",
            name: "Is PDF or DOCX better for sharing documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PDF is better for sharing finished documents because it looks identical on every device and cannot be accidentally edited. DOCX is better when the recipient needs to make changes.",
            },
          },
          {
            "@type": "Question",
            name: "What format has the smallest file size?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For images, WebP has the smallest file size at any given quality level. For audio, MP3 at 128kbps. For video, MP4 with H.264 at CRF 28.",
            },
          },
          {
            "@type": "Question",
            name: "Are these format recommendations free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The Format Finder tool is completely free with no signup required. All linked conversion tools also run free in your browser with no file size limits and complete privacy.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.filetoolworks.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Format Finder",
            item: "https://www.filetoolworks.com/format-finder",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          File Format Finder
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Answer 2 quick questions to find the best file format for your needs.
          Get a personalized recommendation with free conversion tools.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s < step
                    ? "bg-blue-600 text-white"
                    : s === step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  s + 1
                )}
              </div>
              {s < 2 && (
                <div
                  className={`w-12 sm:w-20 h-1 rounded ${
                    s < step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="ml-3 text-sm text-gray-500">
            {step === 0
              ? "File type"
              : step === 1
              ? "Use case"
              : "Recommendation"}
          </span>
        </div>

        {/* Step 0: Choose file type */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What type of file are you working with?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {(
                Object.keys(categoryConfig) as FileCategory[]
              ).map((cat) => {
                const cfg = categoryConfig[cat];
                const subtitles: Record<FileCategory, string> = {
                  image: "JPG, PNG, WebP, GIF...",
                  audio: "MP3, WAV, FLAC, AAC...",
                  video: "MP4, WebM, MOV, AVI...",
                  document: "PDF, DOCX, XLSX, PPTX...",
                };
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`${cfg.bg} ${cfg.border} border-2 rounded-xl p-6 text-left hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <div className={`${cfg.color} mb-2`}>{cfg.icon}</div>
                    <div className="font-semibold text-gray-900">
                      {cfg.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {subtitles[cat]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 1: Choose use case */}
        {step === 1 && category && (
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What do you need it for?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useCases[category].map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => handleUseCaseSelect(uc.id)}
                  className="bg-white border-2 border-gray-200 rounded-xl p-5 text-left hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600">{uc.icon}</span>
                    <span className="font-semibold text-gray-900">
                      {uc.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {uc.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Show recommendation */}
        {step === 2 && rec && category && (
          <div>
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm font-bold">
                  Recommended
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                {rec.format}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                File extension: {rec.extension}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {rec.why}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">
                    Pros
                  </h3>
                  <ul className="space-y-1">
                    {rec.pros.map((p, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-0.5">+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">
                    Cons
                  </h3>
                  <ul className="space-y-1">
                    {rec.cons.map((c, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-red-500 mt-0.5">-</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tool links */}
              <div className="flex flex-wrap gap-3">
                {rec.tool && (
                  <Link
                    href={rec.tool.href}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {rec.tool.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {rec.alternativeTool && (
                  <Link
                    href={rec.alternativeTool.href}
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    {rec.alternativeTool.name}
                  </Link>
                )}
              </div>
            </div>

            {rec.blogPost && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  Want to learn more?{" "}
                  <Link
                    href={rec.blogPost.href}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read: {rec.blogPost.title} &rarr;
                  </Link>
                </p>
              </div>
            )}

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Start over with a
              different file type
            </button>
          </div>
        )}

        {/* SEO content (always visible) */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Choose the Right File Format
          </h2>
          <p className="text-gray-700 mb-4">
            Picking the right file format saves storage space, preserves
            quality, and ensures your files work on every device. The best
            format depends on two things: your file type and how you plan
            to use it.
          </p>
          <p className="text-gray-700 mb-4">
            For <strong>images on the web</strong>, WebP beats JPEG and
            PNG on file size while maintaining quality. Use PNG when you
            need transparency. Use JPEG for maximum compatibility with
            older systems. You can{" "}
            <Link
              href="/image-to-webp"
              className="text-blue-600 hover:underline"
            >
              convert images to WebP
            </Link>{" "}
            or{" "}
            <Link
              href="/png-to-jpg"
              className="text-blue-600 hover:underline"
            >
              convert PNG to JPG
            </Link>{" "}
            for free.
          </p>
          <p className="text-gray-700 mb-4">
            For <strong>audio</strong>, MP3 remains the universal choice
            for sharing and streaming. WAV is essential for editing because
            it preserves every detail. FLAC splits the difference: lossless
            quality at half the WAV file size. Our{" "}
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline"
            >
              audio compressor
            </Link>{" "}
            handles all major formats.
          </p>
          <p className="text-gray-700 mb-4">
            For <strong>video</strong>, MP4 with H.264 is the safe bet
            that works everywhere. WebM produces smaller files for web
            embedding. For email, you will need to{" "}
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline"
            >
              compress your video
            </Link>{" "}
            to fit under 25MB attachment limits.
          </p>
          <p className="text-gray-700 mb-6">
            For <strong>documents</strong>, use PDF when sharing final
            versions and DOCX when others need to edit. You can{" "}
            <Link
              href="/word-to-pdf"
              className="text-blue-600 hover:underline"
            >
              convert Word to PDF
            </Link>{" "}
            when you are ready to distribute.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Free Conversion Tools
          </h2>
          <p className="text-gray-700 mb-4">
            FileToolWorks offers{" "}
            <Link
              href="/tools"
              className="text-blue-600 hover:underline"
            >
              40+ free conversion tools
            </Link>{" "}
            that run directly in your browser. No uploads to a server, no
            signups, no file size limits. Your files never leave your
            device.
          </p>
        </div>

        {/* FAQ section for structured data */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                What is the best image format for websites?
              </h3>
              <p className="text-gray-700 text-sm">
                WebP is the best image format for websites in 2026. It
                produces files 25-35% smaller than JPEG at the same visual
                quality and supports transparency like PNG. All modern
                browsers support WebP. Use our{" "}
                <Link
                  href="/image-to-webp"
                  className="text-blue-600 hover:underline"
                >
                  Image to WebP converter
                </Link>{" "}
                to switch your images.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Should I use MP3 or WAV for my audio?
              </h3>
              <p className="text-gray-700 text-sm">
                Use MP3 for sharing, streaming, and distribution. Use WAV
                for editing and production. MP3 at 192kbps sounds nearly
                identical to WAV but is 10x smaller. Convert between them
                with our{" "}
                <Link
                  href="/wav-to-mp3"
                  className="text-blue-600 hover:underline"
                >
                  WAV to MP3
                </Link>{" "}
                or{" "}
                <Link
                  href="/mp3-to-wav"
                  className="text-blue-600 hover:underline"
                >
                  MP3 to WAV
                </Link>{" "}
                tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                What video format should I use for social media?
              </h3>
              <p className="text-gray-700 text-sm">
                MP4 with H.264 encoding works on every social media
                platform including YouTube, Instagram, TikTok, and
                Facebook. Use 1080p resolution for the best balance of
                quality and file size. Our{" "}
                <Link
                  href="/video-to-mp4"
                  className="text-blue-600 hover:underline"
                >
                  Video to MP4 converter
                </Link>{" "}
                handles any input format.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Is PDF or DOCX better for sharing documents?
              </h3>
              <p className="text-gray-700 text-sm">
                PDF is better for sharing finished documents because it
                looks identical on every device and cannot be accidentally
                edited. DOCX is better when the recipient needs to make
                changes. You can{" "}
                <Link
                  href="/word-to-pdf"
                  className="text-blue-600 hover:underline"
                >
                  convert Word to PDF
                </Link>{" "}
                for free when you are ready to share.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                What format has the smallest file size?
              </h3>
              <p className="text-gray-700 text-sm">
                For images, WebP has the smallest file size at any given
                quality level. For audio, MP3 at 128kbps. For video, MP4
                with H.264 at CRF 28. Use our{" "}
                <Link
                  href="/compress-image"
                  className="text-blue-600 hover:underline"
                >
                  image compressor
                </Link>
                ,{" "}
                <Link
                  href="/compress-audio"
                  className="text-blue-600 hover:underline"
                >
                  audio compressor
                </Link>
                , or{" "}
                <Link
                  href="/compress-video"
                  className="text-blue-600 hover:underline"
                >
                  video compressor
                </Link>{" "}
                to reduce file sizes further.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Are these format recommendations free to use?
              </h3>
              <p className="text-gray-700 text-sm">
                Yes. The Format Finder tool is completely free with no
                signup required. All linked conversion tools also run free
                in your browser with no file size limits and complete
                privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
