import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "RAW vs TIFF: Capture vs Output Formats",
  description: "RAW stores unprocessed sensor data for maximum editing flexibility. TIFF is a lossless processed format for archival and delivery. Compare quality, workflow, and best uses.",
  alternates: {
    canonical: "https://www.filetoolworks.com/blog/raw-vs-tiff",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="RAW vs TIFF: Choosing Between Capture and Output Formats"
          description="RAW stores unprocessed sensor data for maximum editing flexibility. TIFF is a lossless processed format for archival and delivery. Compare quality, workflow, and best uses."
          slug="raw-vs-tiff"
          datePublished="2026-04-06"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RAW vs TIFF: Choosing Between Capture and Output Formats
        </h1>

        <p className="text-gray-600 mb-8">
          Published on April 6, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            RAW and TIFF serve different stages of a photography workflow. RAW files contain unprocessed sensor data with 12-14 bits per channel, giving you full control over white balance, exposure, and color grading. TIFF is a processed, lossless format with 8 or 16 bits per channel, used for final delivery and archival. You shoot RAW, edit it, then export to TIFF when you need a high-quality finished file.
          </p>

          <h2>Data and Editing Flexibility</h2>
          <p>
            RAW files preserve every bit of data the sensor captured. White balance is not baked in, so you can change it after the fact with zero quality loss. You can recover 2-3 stops of shadow or highlight detail that would be permanently gone in any other format. TIFF files are already processed through a demosaicing algorithm, meaning the color interpretation is fixed. You can still edit a 16-bit TIFF extensively, but you start from processed data rather than raw sensor readings.
          </p>

          <h2>File Size</h2>
          <p>
            TIFF files are typically larger than RAW files from the same camera. A 45 MP RAW might be 50 MB, while an uncompressed 16-bit TIFF from that same image can be 250+ MB. That seems counterintuitive since RAW is "more data," but TIFF stores three full color channels at high bit depth. RAW stores a single-channel mosaic pattern that gets demosaiced during processing. Compressed TIFF (LZW or ZIP) reduces the gap, but TIFF is almost always the bigger file.
          </p>

          <h2>Software Compatibility</h2>
          <p>
            TIFF opens everywhere: every operating system, every image editor, every print shop. RAW files need dedicated software. Adobe Lightroom, Capture One, and DxO PhotoLab all handle RAW, but each camera manufacturer uses a proprietary RAW format (CR3 for Canon, NEF for Nikon, ARW for Sony). Older software may not support RAW files from newer cameras until an update ships. TIFF never has this problem.
          </p>

          <h2>Professional Workflow</h2>
          <p>
            The standard professional workflow is: shoot RAW, edit in Lightroom or Capture One, export to TIFF for retouching in Photoshop, then deliver final files as TIFF (for print) or JPEG (for web). RAW files are your digital negatives. TIFF files are your master prints. Most pros keep both: RAW for the option to re-edit from scratch, TIFF as the finished deliverable.
          </p>

          <h2>When to Use Each</h2>
          <p>
            Always shoot RAW when your camera supports it and you plan to edit. Use TIFF as your export format when you need lossless quality for print, client delivery, or long-term archival. If you only need web-ready images, skip TIFF entirely and export straight to JPEG or WebP from your RAW editor.
          </p>

          <p>
            Ready to prepare your images for the web? Try our <Link href="/resize-image" className="text-blue-600 hover:underline font-semibold">image resizer</Link> or <Link href="/image-to-webp" className="text-blue-600 hover:underline font-semibold">Image to WebP converter</Link>. For more format guides, check <Link href="/blog/raw-vs-jpeg" className="text-blue-600 hover:underline">RAW vs JPEG</Link>, <Link href="/blog/psd-vs-tiff" className="text-blue-600 hover:underline">PSD vs TIFF</Link>, and <Link href="/blog/tiff-vs-jpg" className="text-blue-600 hover:underline">TIFF vs JPG</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
