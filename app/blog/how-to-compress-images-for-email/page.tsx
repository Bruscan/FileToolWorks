import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress Images for Email (Under 1MB Fast) | FileToolWorks",
  description: "Compress images for email attachments in seconds. Reduce photo file size below 1MB without visible quality loss using free browser-based tools.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Compress Images for Email (Under 1MB Fast)
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 1, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            Most email providers cap attachments at 25MB, but the real problem is smaller: recipients on mobile connections do not want to download a 5MB photo. To compress an image for email, you need to reduce its dimensions, increase its compression, or both. Here is how to get any image under 1MB without it looking terrible.
          </p>

          <h2>Resize First, Compress Second</h2>
          <p>
            The single biggest factor in image file size is resolution. A 4000x3000 photo from your phone is far larger than anyone needs for an email. Resizing to 1920x1440 (50%) cuts file size by roughly 75% before you even touch compression. For most email purposes, 1200px on the longest side is plenty. Use our <Link href="/resize-image" className="text-blue-600 hover:underline font-semibold">image resizer</Link> to scale down first, then compress.
          </p>

          <h2>Pick the Right Format</h2>
          <p>
            JPG is the best format for emailing photos. It handles photographic content well and every device can open it. PNG files are usually 5-10x larger than JPG for the same photo. If someone sent you a PNG screenshot, converting it to JPG with our <Link href="/png-to-jpg" className="text-blue-600 hover:underline font-semibold">PNG to JPG converter</Link> will dramatically reduce the file size.
          </p>

          <h2>Quality Settings That Work</h2>
          <p>
            JPG quality between 70-85% is the sweet spot for email. At 80%, file size drops by about 60% compared to maximum quality, and the difference is invisible at screen size. Below 60% you start seeing blocky artifacts around edges and text. Stick to 75-80% unless the recipient needs to print the image.
          </p>

          <h2>Quick Method: Compress in Your Browser</h2>
          <p>
            The fastest approach: drop your images into our <Link href="/compress-image" className="text-blue-600 hover:underline font-semibold">free image compressor</Link>. It runs entirely in your browser, so nothing gets uploaded to a server. Pick your quality level, download the compressed versions, and attach them to your email. Batch processing is supported if you need to compress multiple photos at once.
          </p>

          <h2>Target File Sizes for Email</h2>
          <ul>
            <li><strong>Under 200KB:</strong> Ideal. Loads instantly on any connection.</li>
            <li><strong>200KB - 1MB:</strong> Good for most email. Standard for a single photo.</li>
            <li><strong>1MB - 5MB:</strong> Acceptable for a few attachments. May be slow on mobile.</li>
            <li><strong>Over 5MB:</strong> Consider a file sharing link instead of an attachment.</li>
          </ul>

          <p>
            For more on keeping images sharp at smaller sizes, see <Link href="/blog/how-to-resize-images-without-losing-quality" className="text-blue-600 hover:underline">how to resize images without losing quality</Link>. Not sure whether to send JPG or PNG? Our <Link href="/blog/png-vs-jpg" className="text-blue-600 hover:underline">PNG vs JPG comparison</Link> has the answer.
          </p>
        </div>
      </article>
    </div>
  );
}
