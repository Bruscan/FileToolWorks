import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPI vs PPI – What's the Difference? | FileToolWorks",
  description: "Understand the difference between DPI and PPI for better image quality. Simple explanation without the technical jargon.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DPI vs PPI – What&apos;s the Difference?
        </h1>

        <p className="text-gray-600 mb-8">
          Published on November 24, 2024
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            People use DPI and PPI interchangeably. They should not. One measures screens. One measures printers.
            Knowing the difference helps you avoid blurry prints and oversized files.
          </p>

          <h2>PPI: Pixels Per Inch</h2>
          <p>
            PPI is for screens and digital images. Your phone might have 400 PPI. This means 400 pixels fit in one inch of screen.
            More PPI means sharper images. When you resize a photo or create graphics, you work in PPI.
          </p>

          <h2>DPI: Dots Per Inch</h2>
          <p>
            DPI is for printers. Printers spray tiny dots of ink to create images. A 300 DPI printer puts 300 dots in one inch.
            Home printers often use 600 DPI. Photo printers go higher. DPI only matters when you print.
          </p>

          <h2>Why It Matters</h2>
          <p>
            Save a photo at 72 PPI and it looks perfect on screen. Print that same photo and it looks grainy.
            For quality prints, you need 300 PPI. This is why print shops ask for high-resolution images.
          </p>

          <h2>What About File Size?</h2>
          <p>
            Higher PPI means bigger files. A 72 PPI image might be 500KB. The same image at 300 PPI could be 3MB.
            For web use, stick with 72-96 PPI. For print, go 300 PPI.
          </p>

          <h2>Converting Images Smart</h2>
          <p>
            When you <Link href="/png-to-jpg" className="text-blue-600 hover:underline font-semibold">convert PNG to JPG</Link> or <Link href="/resize-image" className="text-blue-600 hover:underline font-semibold">resize images</Link>,
            the tool maintains your PPI settings. Web images work at 72 PPI. Print images need 300 PPI minimum.
          </p>

          <p>
            <strong>Quick rule:</strong> Screen viewing = 72-96 PPI. Printing = 300 PPI minimum.
          </p>

          <p>
            <Link href="/" className="text-blue-600 hover:underline font-semibold">Check out our free image tools</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
