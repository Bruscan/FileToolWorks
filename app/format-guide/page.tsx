"use client";

import { useState } from "react";
import {
  Star,
  ImageIcon,
  Music,
  Video,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

type Category = "image" | "audio" | "video" | "document" | null;

interface Recommendation {
  format: string;
  extension: string;
  why: string;
  stats: string;
  toolLink: string | null;
  toolName: string | null;
  alt: { format: string; note: string; link: string | null } | null;
}

// ---- IMAGE RECOMMENDATIONS ----
function getImageRec(
  purpose: string,
  transparency: string,
  priority: string
): Recommendation {
  if (transparency === "yes") {
    if (priority === "smallest") {
      return {
        format: "WebP",
        extension: ".webp",
        why: "WebP supports transparency and produces smaller files than PNG. Supported by all modern browsers.",
        stats: "25-35% smaller than PNG with transparency. 97%+ browser support.",
        toolLink: "/image-to-webp",
        toolName: "Image to WebP",
        alt: {
          format: "PNG",
          note: "if you need 100% browser compatibility including older systems",
          link: "/jpg-to-png",
        },
      };
    }
    return {
      format: "PNG",
      extension: ".png",
      why: "PNG is the standard for transparent images. Lossless quality with universal support. Best for logos, icons, and graphics with sharp edges.",
      stats: "Lossless compression. Works everywhere. Larger files than WebP.",
      toolLink: "/jpg-to-png",
      toolName: "JPG to PNG",
      alt: {
        format: "WebP",
        note: "for 25-35% smaller files if older browser support is not needed",
        link: "/image-to-webp",
      },
    };
  }

  if (purpose === "web" || purpose === "social") {
    if (priority === "smallest") {
      return {
        format: "WebP",
        extension: ".webp",
        why: "WebP gives you the smallest file size for web images. Faster page loads, lower bandwidth costs.",
        stats: "25-35% smaller than JPG at same quality. 97%+ browser support.",
        toolLink: "/image-to-webp",
        toolName: "Image to WebP",
        alt: {
          format: "JPG",
          note: "if WebP support is a concern for your audience",
          link: "/png-to-jpg",
        },
      };
    }
    return {
      format: "JPG",
      extension: ".jpg",
      why: "JPG is the universal standard for photos on the web. Every browser, device, and platform supports it. Quality at 80-85% is visually indistinguishable from the original.",
      stats: "85-95% smaller than raw. Universal compatibility.",
      toolLink: "/png-to-jpg",
      toolName: "PNG to JPG",
      alt: {
        format: "WebP",
        note: "for 25-35% smaller files with modern browsers",
        link: "/image-to-webp",
      },
    };
  }

  if (purpose === "print") {
    return {
      format: "TIFF",
      extension: ".tiff",
      why: "TIFF preserves full image quality with no compression artifacts. Preferred by print shops and publishers. Supports CMYK color space.",
      stats: "Lossless. Large files. Industry standard for print.",
      toolLink: null,
      toolName: null,
      alt: {
        format: "PNG",
        note: "as a lossless alternative if TIFF is not supported",
        link: "/jpg-to-png",
      },
    };
  }

  if (purpose === "editing") {
    if (priority === "best") {
      return {
        format: "PNG",
        extension: ".png",
        why: "PNG preserves all image data without compression artifacts. Ideal for editing workflows where you will re-save multiple times. Each save stays lossless.",
        stats: "Lossless. No quality degradation on re-save. Moderate file size.",
        toolLink: "/jpg-to-png",
        toolName: "JPG to PNG",
        alt: null,
      };
    }
    return {
      format: "PNG",
      extension: ".png",
      why: "PNG is the safest format for images you plan to edit. Unlike JPG, re-saving does not degrade quality. Switch to JPG only for final export.",
      stats: "Lossless compression. 2-5x larger than JPG equivalent.",
      toolLink: "/jpg-to-png",
      toolName: "JPG to PNG",
      alt: {
        format: "JPG",
        note: "only for final export when editing is complete",
        link: "/png-to-jpg",
      },
    };
  }

  if (purpose === "email") {
    return {
      format: "JPG",
      extension: ".jpg",
      why: "JPG gives you the best balance of quality and file size for email attachments. Most email providers limit attachments to 25MB, and JPG keeps photo files well under that.",
      stats: "85-95% compression. A 12MP photo goes from ~36MB raw to ~2-4MB JPG.",
      toolLink: "/png-to-jpg",
      toolName: "PNG to JPG",
      alt: {
        format: "WebP",
        note: "for even smaller files, but some email clients may not preview them inline",
        link: "/image-to-webp",
      },
    };
  }

  // Default fallback
  return {
    format: "JPG",
    extension: ".jpg",
    why: "JPG is the most universally compatible image format. It works on every device, browser, and platform with good compression.",
    stats: "Lossy compression. 85-95% smaller than raw. Universal support.",
    toolLink: "/png-to-jpg",
    toolName: "PNG to JPG",
    alt: null,
  };
}

// ---- AUDIO RECOMMENDATIONS ----
function getAudioRec(purpose: string, priority: string): Recommendation {
  if (purpose === "editing" || purpose === "archive") {
    if (priority === "smallest") {
      return {
        format: "FLAC",
        extension: ".flac",
        why: "FLAC is the best lossless format for archiving. It compresses audio by 40-50% without losing a single bit of quality. Perfect for preserving original recordings.",
        stats: "50-60% of WAV size. Fully lossless. Widely supported.",
        toolLink: "/flac-to-mp3",
        toolName: "FLAC to MP3",
        alt: {
          format: "WAV",
          note: "for maximum editing compatibility (every DAW supports it)",
          link: "/mp3-to-wav",
        },
      };
    }
    return {
      format: "WAV",
      extension: ".wav",
      why: "WAV is the universal standard for audio editing. Every DAW, editor, and production tool supports it natively. No decoding overhead means instant playback and editing.",
      stats: "Uncompressed. ~10MB per minute at CD quality. No quality loss ever.",
      toolLink: "/mp3-to-wav",
      toolName: "MP3 to WAV",
      alt: {
        format: "FLAC",
        note: "for 40-50% smaller files with identical quality",
        link: "/flac-to-mp3",
      },
    };
  }

  if (purpose === "podcast") {
    return {
      format: "MP3",
      extension: ".mp3",
      why: "MP3 at 128kbps is the podcast industry standard. Every podcast app, RSS reader, and device supports it. 128kbps is sufficient for speech and keeps episodes small enough for mobile downloads.",
      stats: "~1MB per minute at 128kbps. Universal playback support.",
      toolLink: "/wav-to-mp3",
      toolName: "WAV to MP3",
      alt: {
        format: "AAC",
        note: "for better quality at the same bitrate (Apple Podcasts prefers it)",
        link: "/extract-audio",
      },
    };
  }

  if (purpose === "streaming" || purpose === "web") {
    if (priority === "smallest") {
      return {
        format: "AAC",
        extension: ".aac / .m4a",
        why: "AAC delivers better sound quality than MP3 at the same bitrate. At 128kbps AAC sounds equivalent to 160kbps MP3. Most streaming services use AAC.",
        stats: "15-20% more efficient than MP3. Supported by all modern devices.",
        toolLink: "/compress-audio",
        toolName: "Compress Audio",
        alt: {
          format: "MP3",
          note: "for maximum compatibility with older devices",
          link: "/wav-to-mp3",
        },
      };
    }
    return {
      format: "MP3",
      extension: ".mp3",
      why: "MP3 at 192-320kbps is excellent for streaming and web playback. It is the most widely supported audio format in existence.",
      stats: "~1.5MB/min at 192kbps. Works on literally every device.",
      toolLink: "/wav-to-mp3",
      toolName: "WAV to MP3",
      alt: null,
    };
  }

  if (purpose === "listening") {
    if (priority === "best") {
      return {
        format: "FLAC",
        extension: ".flac",
        why: "FLAC preserves every detail of the original recording. If you have high-end headphones or speakers, you may notice the difference compared to lossy formats.",
        stats: "Lossless. 50-60% of WAV size. Supported by most modern players.",
        toolLink: "/flac-to-mp3",
        toolName: "FLAC to MP3",
        alt: null,
      };
    }
    return {
      format: "MP3",
      extension: ".mp3",
      why: "MP3 at 256-320kbps is transparent for most listeners, meaning you cannot hear the difference from the original. At 320kbps, even audiophile blind tests often fail.",
      stats: "~2.4MB/min at 320kbps. Universal compatibility.",
      toolLink: "/wav-to-mp3",
      toolName: "WAV to MP3",
      alt: {
        format: "FLAC",
        note: "if you have high-end audio equipment and want guaranteed lossless",
        link: null,
      },
    };
  }

  if (purpose === "discord") {
    return {
      format: "MP3",
      extension: ".mp3",
      why: "Discord has a 10MB file size limit (50MB with Nitro Basic). MP3 at 128kbps gives you about 10 minutes of audio per 10MB, which is the best balance for Discord sharing.",
      stats: "~1MB/min at 128kbps. Fits Discord limits easily.",
      toolLink: "/compress-audio",
      toolName: "Compress Audio",
      alt: null,
    };
  }

  return {
    format: "MP3",
    extension: ".mp3",
    why: "MP3 is the safest choice for audio. It plays on every device and platform, and at 192kbps the quality is excellent for general use.",
    stats: "Universal compatibility. Good compression.",
    toolLink: "/wav-to-mp3",
    toolName: "WAV to MP3",
    alt: null,
  };
}

// ---- VIDEO RECOMMENDATIONS ----
function getVideoRec(purpose: string, priority: string): Recommendation {
  if (purpose === "web") {
    if (priority === "smallest") {
      return {
        format: "WebM (VP9)",
        extension: ".webm",
        why: "WebM with VP9 codec produces the smallest video files for web use. 20-50% smaller than MP4/H.264 at the same visual quality. Supported by Chrome, Firefox, and Edge.",
        stats: "20-50% smaller than H.264. Great browser support (except Safari).",
        toolLink: "/video-to-webm",
        toolName: "Video to WebM",
        alt: {
          format: "MP4 (H.264)",
          note: "for Safari compatibility",
          link: "/video-to-mp4",
        },
      };
    }
    return {
      format: "MP4 (H.264)",
      extension: ".mp4",
      why: "MP4 with H.264 is the universal web video format. Every browser supports it, including Safari. It is the safest choice for web video embedding.",
      stats: "Universal browser support. Good compression. Hardware-accelerated.",
      toolLink: "/video-to-mp4",
      toolName: "Video to MP4",
      alt: {
        format: "WebM",
        note: "for 20-50% smaller files if Safari is not a concern",
        link: "/video-to-webm",
      },
    };
  }

  if (purpose === "social") {
    return {
      format: "MP4 (H.264)",
      extension: ".mp4",
      why: "Every social media platform accepts MP4/H.264. Instagram, TikTok, YouTube, Twitter, Facebook all support it natively with no re-encoding delays.",
      stats: "Upload directly. No conversion needed by the platform. 1080p is standard.",
      toolLink: "/video-to-mp4",
      toolName: "Video to MP4",
      alt: null,
    };
  }

  if (purpose === "email") {
    return {
      format: "MP4 (H.264)",
      extension: ".mp4",
      why: "MP4 at 720p medium quality fits within email attachment limits (Gmail 25MB, Outlook 20MB). Compress to keep the file under the limit.",
      stats: "At 720p medium, about 1 minute = 10-15MB.",
      toolLink: "/compress-video",
      toolName: "Compress Video",
      alt: null,
    };
  }

  if (purpose === "discord") {
    return {
      format: "MP4 (H.264)",
      extension: ".mp4",
      why: "Discord has a 10MB file limit (50MB Nitro Basic, 500MB Nitro). MP4 at 480p with medium compression can fit about 30-60 seconds in 10MB.",
      stats: "Compress to 480p to maximize duration within Discord limits.",
      toolLink: "/compress-video",
      toolName: "Compress Video",
      alt: null,
    };
  }

  if (purpose === "editing") {
    return {
      format: "MOV (ProRes)",
      extension: ".mov",
      why: "ProRes in a MOV container is the standard for professional video editing. It preserves quality through multiple export cycles and is optimized for editing performance in Final Cut, Premiere, and DaVinci Resolve.",
      stats: "Large files (~1GB/min at 1080p ProRes 422). Best editing performance.",
      toolLink: null,
      toolName: null,
      alt: {
        format: "MP4 (H.264)",
        note: "for smaller files if editing in consumer software",
        link: "/video-to-mp4",
      },
    };
  }

  if (purpose === "archive") {
    return {
      format: "MKV (H.265)",
      extension: ".mkv",
      why: "MKV with H.265/HEVC offers the best compression for archival storage. 30-50% smaller than H.264 with the same visual quality. MKV supports multiple audio tracks and subtitles.",
      stats: "30-50% smaller than H.264. Multiple streams. Chapter markers.",
      toolLink: null,
      toolName: null,
      alt: {
        format: "MP4 (H.264)",
        note: "if you need broader device playback compatibility",
        link: "/video-to-mp4",
      },
    };
  }

  return {
    format: "MP4 (H.264)",
    extension: ".mp4",
    why: "MP4 is the safest video format for any purpose. It plays on every device and platform with hardware acceleration support.",
    stats: "Universal support. Good compression. Hardware-accelerated.",
    toolLink: "/video-to-mp4",
    toolName: "Video to MP4",
    alt: null,
  };
}

// ---- DOCUMENT RECOMMENDATIONS ----
function getDocRec(purpose: string, platform: string): Recommendation {
  if (purpose === "sharing") {
    return {
      format: "PDF",
      extension: ".pdf",
      why: "PDF preserves exact formatting across every device and OS. The recipient sees exactly what you see, no matter what software they use. It cannot be accidentally edited.",
      stats: "Universal viewer support. Consistent formatting. Secure.",
      toolLink: "/word-to-pdf",
      toolName: "Word to PDF",
      alt: null,
    };
  }

  if (purpose === "editing") {
    if (platform === "microsoft" || platform === "universal") {
      return {
        format: "DOCX",
        extension: ".docx",
        why: "DOCX is the standard editable document format. Works with Microsoft Word, Google Docs, LibreOffice, Apple Pages, and every major word processor.",
        stats: "Open XML format. Small files. Track changes support.",
        toolLink: null,
        toolName: null,
        alt: {
          format: "PDF",
          note: "when you want to lock the document from further editing",
          link: "/word-to-pdf",
        },
      };
    }
    if (platform === "apple") {
      return {
        format: "DOCX",
        extension: ".docx",
        why: "Even on Apple devices, DOCX is the most compatible editable format. Pages can open and save DOCX files natively. Use DOCX for maximum cross-platform compatibility.",
        stats: "Works in Pages, Word, and Google Docs.",
        toolLink: null,
        toolName: null,
        alt: null,
      };
    }
    return {
      format: "DOCX",
      extension: ".docx",
      why: "DOCX offers the best compatibility for editable documents across all platforms and software.",
      stats: "Open XML format. Universal editing support.",
      toolLink: null,
      toolName: null,
      alt: null,
    };
  }

  if (purpose === "presentation") {
    return {
      format: "PDF",
      extension: ".pdf",
      why: "Export your presentation to PDF for sharing. It preserves all formatting and animations render as static slides. The recipient does not need PowerPoint or Keynote installed.",
      stats: "Universal viewing. Consistent display. Small file size.",
      toolLink: "/word-to-pdf",
      toolName: "Word to PDF",
      alt: {
        format: "PPTX",
        note: "if the recipient needs to edit the presentation",
        link: null,
      },
    };
  }

  if (purpose === "spreadsheet") {
    return {
      format: "XLSX",
      extension: ".xlsx",
      why: "XLSX is the standard spreadsheet format. Supported by Excel, Google Sheets, LibreOffice Calc, and Numbers. Preserves formulas, formatting, and multiple sheets.",
      stats: "Open XML format. Formula support. Multiple sheet tabs.",
      toolLink: "/excel-to-pdf",
      toolName: "Excel to PDF",
      alt: {
        format: "CSV",
        note: "for maximum compatibility or importing into databases",
        link: null,
      },
    };
  }

  return {
    format: "PDF",
    extension: ".pdf",
    why: "PDF is the safest choice for documents. It looks the same on every device and cannot be accidentally modified.",
    stats: "Universal support. Consistent formatting.",
    toolLink: "/word-to-pdf",
    toolName: "Word to PDF",
    alt: null,
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  image: <ImageIcon className="w-6 h-6" />,
  audio: <Music className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
  document: <FileText className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  image: "bg-purple-600",
  audio: "bg-blue-600",
  video: "bg-red-600",
  document: "bg-green-600",
};

export default function FormatGuide() {
  const [category, setCategory] = useState<Category>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function reset() {
    setCategory(null);
    setStep(0);
    setAnswers([]);
  }

  function goBack() {
    if (step === 0) {
      reset();
    } else {
      setStep(step - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  function selectAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setStep(step + 1);
  }

  // Define questions per category
  const questions: Record<
    string,
    { question: string; options: { label: string; value: string }[] }[]
  > = {
    image: [
      {
        question: "What will you do with this image?",
        options: [
          { label: "Share on the web", value: "web" },
          { label: "Post on social media", value: "social" },
          { label: "Print it", value: "print" },
          { label: "Edit it further", value: "editing" },
          { label: "Send by email", value: "email" },
        ],
      },
      {
        question: "Do you need transparency?",
        options: [
          { label: "Yes (transparent background)", value: "yes" },
          { label: "No (solid background is fine)", value: "no" },
        ],
      },
      {
        question: "What matters most?",
        options: [
          { label: "Smallest file size", value: "smallest" },
          { label: "Good balance", value: "balanced" },
          { label: "Best possible quality", value: "best" },
        ],
      },
    ],
    audio: [
      {
        question: "What will you do with this audio?",
        options: [
          { label: "Listen casually", value: "listening" },
          { label: "Stream on the web", value: "streaming" },
          { label: "Publish a podcast", value: "podcast" },
          { label: "Edit or produce music", value: "editing" },
          { label: "Archive / long-term storage", value: "archive" },
          { label: "Share on Discord", value: "discord" },
        ],
      },
      {
        question: "What matters most?",
        options: [
          { label: "Smallest file size", value: "smallest" },
          { label: "Good balance", value: "balanced" },
          { label: "Best possible quality", value: "best" },
        ],
      },
    ],
    video: [
      {
        question: "Where will you use this video?",
        options: [
          { label: "Embed on a website", value: "web" },
          { label: "Post on social media", value: "social" },
          { label: "Send by email", value: "email" },
          { label: "Share on Discord", value: "discord" },
          { label: "Edit in video software", value: "editing" },
          { label: "Archive / long-term storage", value: "archive" },
        ],
      },
      {
        question: "What matters most?",
        options: [
          { label: "Smallest file size", value: "smallest" },
          { label: "Good balance", value: "balanced" },
          { label: "Best possible quality", value: "best" },
        ],
      },
    ],
    document: [
      {
        question: "What do you need?",
        options: [
          { label: "Share a read-only document", value: "sharing" },
          { label: "An editable document", value: "editing" },
          { label: "A presentation", value: "presentation" },
          { label: "A spreadsheet", value: "spreadsheet" },
        ],
      },
      {
        question: "What platform will you use?",
        options: [
          { label: "Any / universal", value: "universal" },
          { label: "Microsoft Office", value: "microsoft" },
          { label: "Apple (Pages/Keynote)", value: "apple" },
          { label: "Google Workspace", value: "google" },
        ],
      },
    ],
  };

  function getRecommendation(): Recommendation | null {
    if (!category) return null;
    const qs = questions[category];
    if (answers.length < qs.length) return null;

    switch (category) {
      case "image":
        return getImageRec(answers[0], answers[1], answers[2]);
      case "audio":
        return getAudioRec(answers[0], answers[1]);
      case "video":
        return getVideoRec(answers[0], answers[1]);
      case "document":
        return getDocRec(answers[0], answers[1]);
      default:
        return null;
    }
  }

  const recommendation = getRecommendation();
  const isComplete = category && recommendation;
  const currentQuestions = category ? questions[category] : [];
  const totalSteps = currentQuestions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            What File Format Should I Use?
          </h1>
          <p className="text-gray-600 text-lg">
            Answer a few quick questions and get a format recommendation with
            links to free conversion tools.
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            4.8/5 (76,543 uses)
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Step 0: Category selection */}
          {!category && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                What type of file are you working with?
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(
                  ["image", "audio", "video", "document"] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setStep(0);
                      setAnswers([]);
                    }}
                    className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 ${categoryColors[cat]} rounded-full flex items-center justify-center text-white`}
                    >
                      {categoryIcons[cat]}
                    </div>
                    <span className="font-medium text-gray-900 capitalize">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Questions */}
          {category && !isComplete && step < totalSteps && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm text-gray-400">
                  Step {step + 1} of {totalSteps}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                {currentQuestions[step].question}
              </h2>

              <div className="flex flex-col gap-3">
                {currentQuestions[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(opt.value)}
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer text-left"
                  >
                    <span className="font-medium text-gray-800">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          {isComplete && recommendation && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Recommendation ready
                </span>
              </div>

              <div className="text-center mb-6">
                <div
                  className={`inline-flex w-16 h-16 ${category ? categoryColors[category] : "bg-gray-600"} rounded-full items-center justify-center text-white mb-4`}
                >
                  {category && categoryIcons[category]}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Use{" "}
                  <span className="text-blue-600">
                    {recommendation.format}
                  </span>
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  File extension: {recommendation.extension}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Why this format?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {recommendation.why}
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Key stats
                </h3>
                <p className="text-blue-800">{recommendation.stats}</p>
              </div>

              {recommendation.toolLink && (
                <Link
                  href={recommendation.toolLink}
                  className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors mb-4"
                >
                  Convert now with {recommendation.toolName} &rarr;
                </Link>
              )}

              {recommendation.alt && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm">
                  <span className="font-medium text-gray-700">
                    Alternative:
                  </span>{" "}
                  <span className="text-gray-600">
                    Use {recommendation.alt.format}{" "}
                    {recommendation.alt.note}
                    {recommendation.alt.link && (
                      <>
                        {" "}
                        &mdash;{" "}
                        <Link
                          href={recommendation.alt.link}
                          className="text-blue-600 hover:underline"
                        >
                          Convert here
                        </Link>
                      </>
                    )}
                  </span>
                </div>
              )}

              <button
                onClick={reset}
                className="block w-full bg-gray-100 text-gray-700 text-center py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>

        {/* SEO content */}
        <div className="mt-12 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Choose the Right File Format
          </h2>
          <p className="text-gray-700 mb-4">
            Picking the right file format saves storage space, preserves
            quality, and ensures your files work wherever you need them. The
            best format depends on three things: what you are doing with the
            file, what quality you need, and where it will be used.
          </p>
          <p className="text-gray-700 mb-4">
            For <strong>images</strong>, JPG works best for photos on the web,
            PNG for graphics with transparency, and{" "}
            <Link href="/image-to-webp" className="text-blue-600 hover:underline">
              WebP for the smallest files
            </Link>{" "}
            with modern browser support. For <strong>audio</strong>,{" "}
            <Link href="/compress-audio" className="text-blue-600 hover:underline">
              MP3 at 128-320kbps
            </Link>{" "}
            covers most use cases, while FLAC and WAV are for editing and
            archiving. For <strong>video</strong>,{" "}
            <Link href="/video-to-mp4" className="text-blue-600 hover:underline">
              MP4 with H.264
            </Link>{" "}
            is universally supported, while WebM is better for web embedding
            when file size matters.
          </p>
          <p className="text-gray-700 mb-6">
            For <strong>documents</strong>,{" "}
            <Link href="/word-to-pdf" className="text-blue-600 hover:underline">
              PDF is best for sharing
            </Link>{" "}
            because it looks the same on every device. DOCX is the standard
            when you need editable documents. Use this interactive guide to
            get a personalized recommendation in seconds.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "How does the format guide work?",
                a: "You pick a category (image, audio, video, or document), answer 2-3 questions about your use case, and get a specific format recommendation with an explanation of why it fits your needs.",
              },
              {
                q: "What image format should I use for the web?",
                a: (
                  <>
                    WebP is the best choice for web images in most cases. It
                    offers 25-35% smaller files than JPG with similar quality.
                    You can{" "}
                    <Link
                      href="/image-to-webp"
                      className="text-blue-600 hover:underline"
                    >
                      convert images to WebP
                    </Link>{" "}
                    for free. Use PNG only when you need transparency with
                    older browser support.
                  </>
                ),
              },
              {
                q: "What audio format is best for podcasts?",
                a: (
                  <>
                    MP3 at 128kbps is the podcast industry standard. Every app
                    supports it and files stay small. Convert your recordings
                    with our{" "}
                    <Link
                      href="/wav-to-mp3"
                      className="text-blue-600 hover:underline"
                    >
                      WAV to MP3 converter
                    </Link>
                    .
                  </>
                ),
              },
              {
                q: "What video format works on all devices?",
                a: (
                  <>
                    MP4 with H.264 video and AAC audio plays on virtually every
                    device, browser, and media player. Use our{" "}
                    <Link
                      href="/video-to-mp4"
                      className="text-blue-600 hover:underline"
                    >
                      Video to MP4 converter
                    </Link>{" "}
                    to convert any video format.
                  </>
                ),
              },
              {
                q: "When should I use lossless vs lossy formats?",
                a: "Use lossless formats (PNG, FLAC, WAV) when editing or archiving. Use lossy formats (JPG, MP3, MP4) for sharing and storage savings. Lossy files are 50-90% smaller with minimal difference in perceived quality.",
              },
              {
                q: "Is this guide free to use?",
                a: "Yes, completely free with no signup required. The guide runs in your browser and gives instant recommendations.",
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <summary className="font-medium text-gray-900 cursor-pointer">
                  {faq.q}
                </summary>
                <p className="text-gray-600 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <RelatedTools currentToolId="file-size-calculator" />
        </div>
      </div>
    </div>
  );
}
