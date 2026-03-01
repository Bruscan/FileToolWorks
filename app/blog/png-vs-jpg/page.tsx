import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG vs JPG: When to Use Each Format",
  description:
    "A clear comparison of PNG and JPG image formats. Learn which one to use for photos, graphics, transparency, and web images.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PNG vs JPG: When to Use Each Format
        </h1>
        <p className="text-gray-600 mb-8">Published on March 1, 2026</p>
        <div className="prose prose-lg max-w-none">
          <p>
            Use JPG for photos. Use PNG for graphics with transparency or sharp
            edges. That covers 90% of cases. Here is why, and when the choice
            gets more nuanced.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            JPG: Best for Photographs
          </h2>
          <p>
            JPG uses lossy compression that works well with the gradients and
            color variations found in photos. A 5 MB raw photo might compress to
            500 KB as JPG with minimal visible quality loss. The tradeoff: every
            time you save a JPG, it loses a small amount of detail. Avoid
            repeatedly editing and saving JPGs.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            PNG: Best for Graphics and Transparency
          </h2>
          <p>
            PNG uses lossless compression, preserving every pixel exactly. This
            makes it ideal for logos, icons, screenshots, and any image with
            text or sharp lines. PNG also supports transparency, which JPG does
            not. The downside: PNG files are much larger than JPG for photos,
            often 5-10x the size.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Quick Comparison
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>File size:</strong> JPG is smaller for photos. PNG is
              smaller for simple graphics with few colors.
            </li>
            <li>
              <strong>Transparency:</strong> Only PNG supports it.
            </li>
            <li>
              <strong>Quality loss:</strong> JPG loses data each save. PNG
              never does.
            </li>
            <li>
              <strong>Best for web:</strong> JPG for hero images and product
              photos. PNG for UI elements and logos.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What About WebP?
          </h2>
          <p>
            WebP supports both lossy and lossless compression, plus
            transparency. It produces smaller files than both JPG and PNG in most
            cases. All modern browsers support it. If you are building a new
            website, WebP is often the best default choice. You can convert
            images with our{" "}
            <Link
              href="/image-to-webp"
              className="text-blue-600 hover:underline font-semibold"
            >
              Image to WebP
            </Link>{" "}
            tool.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Convert Between Formats
          </h2>
          <p>
            Need to switch between formats? Use our{" "}
            <Link
              href="/png-to-jpg"
              className="text-blue-600 hover:underline font-semibold"
            >
              PNG to JPG
            </Link>{" "}
            converter to reduce photo file sizes, or{" "}
            <Link
              href="/jpg-to-png"
              className="text-blue-600 hover:underline font-semibold"
            >
              JPG to PNG
            </Link>{" "}
            when you need lossless quality or transparency support.
          </p>
        </div>
      </article>
    </div>
  );
}
