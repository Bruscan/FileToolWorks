import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Free Online File Conversion Tools",
  description:
    "FileToolWorks offers 40+ free online tools for file conversion, compression, and editing. All tools work in your browser with no signup.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About FileToolWorks
        </h1>
        <div className="prose prose-lg max-w-none text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What We Do
          </h2>
          <p>
            FileToolWorks is a collection of 40+ free online tools for working
            with files. Convert images, compress videos, merge PDFs, trim audio,
            and more. Every tool is free, requires no signup, and works directly
            in your browser.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Why We Built This
          </h2>
          <p>
            Most file conversion sites are slow, covered in ads, or require you
            to upload files to their servers. We wanted something better: fast
            tools that respect your privacy. By processing files in your browser
            using modern web technologies like WebAssembly, your files never
            leave your device.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How It Works
          </h2>
          <p>
            Our tools use client-side technologies including the Canvas API,
            WebAssembly (FFmpeg), and JavaScript libraries like pdf-lib and
            JSZip. When you select a file, it is processed entirely on your
            computer. The converted file is generated locally and available for
            download immediately.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Our Tools
          </h2>
          <p>We offer tools across six categories:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Image</strong> - Convert, resize, compress, crop, rotate,
              sharpen, blur, and remove backgrounds
            </li>
            <li>
              <strong>PDF</strong> - Merge, split, compress, extract pages,
              convert to/from other formats, sign
            </li>
            <li>
              <strong>Video</strong> - Compress, trim, convert to GIF/MP4/WebM
            </li>
            <li>
              <strong>Audio</strong> - Compress, trim, convert between WAV, MP3,
              and other formats
            </li>
            <li>
              <strong>Document</strong> - Convert Word, Excel, and PowerPoint to
              PDF
            </li>
            <li>
              <strong>Compression</strong> - Create and extract ZIP archives
            </li>
          </ul>
          <p className="mt-4">
            Browse all tools on our{" "}
            <Link href="/tools" className="text-blue-600 hover:underline">
              tools directory
            </Link>
            . Not sure which format to use? Try our interactive{" "}
            <Link href="/format-guide" className="text-blue-600 hover:underline">
              format guide
            </Link>
            . Want to embed our tools on your own site? See{" "}
            <Link href="/free-tools-widget" className="text-blue-600 hover:underline">
              free tool widgets
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Privacy First
          </h2>
          <p>
            Your files are yours. We don&apos;t store them, we don&apos;t look
            at them, and we don&apos;t share them. Read our full{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              privacy policy
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
    </div>
  );
}
