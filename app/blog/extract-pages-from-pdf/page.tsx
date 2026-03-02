import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How to Extract Pages from a PDF for Free | FileToolWorks",
  description:
    "Select and extract specific pages from any PDF file. Free online tool, no signup, runs in your browser.",
  alternates: {
    canonical: "/blog/extract-pages-from-pdf",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="How to Extract Pages from a PDF for Free | FileToolWorks"
          description="Select and extract specific pages from any PDF file. Free online tool, no signup, runs in your browser."
          slug="extract-pages-from-pdf"
          datePublished="2026-03-01"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Extract Pages from a PDF
        </h1>

        <p className="text-gray-600 mb-8">Published on March 1, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p>
            To extract pages from a PDF, use our{" "}
            <Link
              href="/extract-pdf-pages"
              className="text-blue-600 hover:underline font-semibold"
            >
              free PDF page extractor
            </Link>
            . Upload your PDF, check the boxes for the pages you want, and
            download a new PDF containing only those pages. You can also type
            page ranges like &quot;1,3,5-7&quot; for faster selection.
          </p>

          <h2>Selecting Pages</h2>
          <p>
            After uploading, you see a grid of checkboxes for every page. Click
            individual pages or use the range input for bulk selection. The
            &quot;Select All&quot; and &quot;Deselect All&quot; buttons help
            with large documents. A counter at the top shows how many pages you
            have selected out of the total.
          </p>

          <h2>Use Cases</h2>
          <p>
            Pull a single receipt from a multi-page bank statement. Grab the
            signature page from a contract without sharing the full document.
            Extract a specific chart or table from a research paper. Save only
            the cover page and table of contents from a textbook. Any time you
            need part of a PDF without the rest, extraction is the answer.
          </p>

          <h2>Quality and Formatting</h2>
          <p>
            Extraction is lossless. Pages are copied from the original PDF
            without any re-encoding. All text, images, vector graphics, and
            formatting stay exactly as they were. The new file is just smaller
            because it has fewer pages.
          </p>

          <h2>Related PDF Tools</h2>
          <p>
            If you need to combine extracted pages with other documents, use{" "}
            <Link
              href="/merge-pdf"
              className="text-blue-600 hover:underline font-semibold"
            >
              Merge PDF
            </Link>
            . To break a PDF into equal sections rather than specific pages, try{" "}
            <Link
              href="/split-pdf"
              className="text-blue-600 hover:underline font-semibold"
            >
              Split PDF
            </Link>
            . Need a signature on one of those pages?{" "}
            <Link
              href="/sign-pdf"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign PDF
            </Link>{" "}
            lets you add one directly in the browser.
          </p>

          <p>
            For a comparison of splitting vs extracting, read <Link href="/blog/how-to-split-pdf-pages" className="text-blue-600 hover:underline">how to split PDF pages</Link>. If the result is too large for email, <Link href="/blog/how-to-compress-pdf" className="text-blue-600 hover:underline">compress the PDF</Link> to reduce file size.
          </p>

          <p>
            <strong>Get started:</strong>{" "}
            <Link
              href="/extract-pdf-pages"
              className="text-blue-600 hover:underline font-semibold"
            >
              Extract PDF pages now
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
