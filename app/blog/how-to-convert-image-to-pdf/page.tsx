import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert Image to PDF - Free Guide | FileToolWorks",
  description: "Learn the easiest ways to convert JPG, PNG, and HEIC images to PDF on any device. Free online converter included.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Convert Image to PDF
        </h1>

        <p className="text-gray-600 mb-8">
          Published on November 24, 2024
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            Converting images to PDF is one of the most common file tasks. Whether you need to submit documents for work,
            create a photo album, or combine multiple images into one file, knowing how to convert images to PDF saves time.
          </p>

          <h2>The Quick Way</h2>
          <p>
            Use our <Link href="/image-to-pdf" className="text-blue-600 hover:underline font-semibold">free Image to PDF converter</Link>.
            Drag and drop your JPG, PNG, HEIC, or WebP files and get a PDF instantly. No software to install.
          </p>

          <h2>Why Convert Images to PDF?</h2>
          <p>
            PDFs maintain image quality while reducing file size. They work on any device without special software.
            Most importantly, PDFs preserve your layout. If you arrange 10 photos in a specific order,
            they stay that way.
          </p>

          <h2>What About iPhone Photos?</h2>
          <p>
            iPhone photos use HEIC format by default. Our tool handles these directly. If you prefer JPG first,
            try our <Link href="/heic-to-jpg" className="text-blue-600 hover:underline font-semibold">HEIC to JPG converter</Link> before
            making a PDF.
          </p>

          <h2>Privacy Matters</h2>
          <p>
            All conversion happens in your browser. Your files never touch our servers. This means your photos,
            documents, and personal files stay on your device.
          </p>

          <h2>PDF Options That Actually Matter</h2>
          <p>
            Choose portrait or landscape based on your images. Use A4 for international documents, US Letter for
            American forms. The compression option reduces file size by 40-60% without visible quality loss.
          </p>

          <p>
            <strong>Try it now:</strong> <Link href="/image-to-pdf" className="text-blue-600 hover:underline font-semibold">Convert Image to PDF for free</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
