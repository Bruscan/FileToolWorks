import Link from "next/link";
import { Search, FileImage, FileText, Video, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Free Online File Conversion Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Convert, compress, and edit files instantly
          </p>
          <p className="text-base md:text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
            Transform images to PDF, compress files, convert formats, and more. All tools work directly in your browser. Fast, secure, and completely free. No signup or software installation required.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a tool..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top 12 Tools Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-3 text-blue-600 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {tool.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Tools Category */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-3">
            <FileImage className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Image Tools</h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Convert images between formats, compress photos, resize pictures, and remove backgrounds. All image processing happens securely in your browser.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Tools Category */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-3">
            <FileText className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">PDF Tools</h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Merge, split, compress, and convert PDF files. Extract text with OCR, add signatures, or convert PDFs to Word, images, and other formats.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Tools Category */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-3">
            <Video className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Video Tools</h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-3xl">
            Convert videos and GIFs to different formats. Extract audio from video files quickly and easily.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videoTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Previews */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white group"
              >
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <span className="text-blue-600 text-sm font-medium flex items-center">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ToolCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white text-center text-sm md:text-base font-medium text-gray-900 hover:text-blue-600"
    >
      {title}
    </Link>
  );
}

// Data
const topTools = [
  { title: "Image to PDF", href: "/image-to-pdf", icon: <FileImage className="w-full h-full" /> },
  { title: "PDF to Image", href: "/pdf-to-image", icon: <FileText className="w-full h-full" /> },
  { title: "Compress Image", href: "/compress-image", icon: <FileImage className="w-full h-full" /> },
  { title: "Compress PDF", href: "/compress-pdf", icon: <FileText className="w-full h-full" /> },
  { title: "JPG to PNG", href: "/jpg-to-png", icon: <FileImage className="w-full h-full" /> },
  { title: "PNG to JPG", href: "/png-to-jpg", icon: <FileImage className="w-full h-full" /> },
  { title: "Resize Image", href: "/resize-image", icon: <FileImage className="w-full h-full" /> },
  { title: "Remove Background", href: "/remove-background", icon: <FileImage className="w-full h-full" /> },
  { title: "PDF to Word", href: "/pdf-to-word", icon: <FileText className="w-full h-full" /> },
  { title: "Word to PDF", href: "/word-to-pdf", icon: <FileText className="w-full h-full" /> },
  { title: "Merge PDF", href: "/merge-pdf", icon: <FileText className="w-full h-full" /> },
  { title: "Split PDF", href: "/split-pdf", icon: <FileText className="w-full h-full" /> },
];

const imageTools = [
  { title: "Image to PDF", href: "/image-to-pdf" },
  { title: "Compress Image", href: "/compress-image" },
  { title: "JPG to PNG", href: "/jpg-to-png" },
  { title: "PNG to JPG", href: "/png-to-jpg" },
  { title: "Resize Image", href: "/resize-image" },
  { title: "Crop Image", href: "/crop-image" },
  { title: "Remove Background", href: "/remove-background" },
  { title: "HEIC to JPG", href: "/heic-to-jpg" },
  { title: "WebP to PNG", href: "/webp-to-png" },
];

const pdfTools = [
  { title: "PDF to Image", href: "/pdf-to-image" },
  { title: "Compress PDF", href: "/compress-pdf" },
  { title: "PDF to Word", href: "/pdf-to-word" },
  { title: "Word to PDF", href: "/word-to-pdf" },
  { title: "Merge PDF", href: "/merge-pdf" },
  { title: "Split PDF", href: "/split-pdf" },
  { title: "Extract Images", href: "/extract-images-from-pdf" },
  { title: "PPT to PDF", href: "/convert-ppt-to-pdf" },
  { title: "PDF Sign", href: "/pdf-sign-tool" },
  { title: "OCR to Text", href: "/ocr-image-to-text" },
  { title: "Text to PDF", href: "/text-to-pdf" },
];

const videoTools = [
  { title: "Video to MP3", href: "/video-to-mp3" },
  { title: "GIF to MP4", href: "/gif-to-mp4" },
];

const blogPosts = [
  {
    title: "How to Convert Image to PDF",
    excerpt: "Learn the easiest ways to convert images to PDF on Windows, Mac, and iPhone.",
    href: "/blog/how-to-convert-image-to-pdf",
  },
  {
    title: "How to Compress a PDF Without Losing Quality",
    excerpt: "Reduce PDF file size while maintaining quality with these simple techniques.",
    href: "/blog/how-to-compress-pdf",
  },
  {
    title: "DPI vs PPI – What's the Difference?",
    excerpt: "Understanding the difference between DPI and PPI for better image quality.",
    href: "/blog/dpi-vs-ppi",
  },
];

const faqs = [
  {
    question: "Are these tools really free?",
    answer: "Yes, all our tools are completely free to use. No signup or credit card required.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. Files are processed in your browser when possible, and any server-processed files are deleted immediately after conversion.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed. Just upload your file, convert it, and download the result.",
  },
  {
    question: "What file size limits do you have?",
    answer: "Most tools support files up to 50MB. Larger files may be available with premium features in the future.",
  },
  {
    question: "Can I use these tools on mobile?",
    answer: "Yes! All our tools are fully optimized for mobile devices.",
  },
  {
    question: "How long are files stored?",
    answer: "Files are deleted immediately after conversion. We don't store your files.",
  },
];
