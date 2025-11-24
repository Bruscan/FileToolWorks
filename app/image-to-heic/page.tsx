"use client";

import { useState } from "react";
import { Upload, AlertCircle, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import Link from "next/link";

export default function ImageToHEIC() {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Image to HEIC Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert JPG, PNG, and other images to HEIC format for better compression.
          </p>
          <p className="text-gray-600 mb-4">
            HEIC (High Efficiency Image Container) is Apple&apos;s modern image format that provides better compression than JPG while maintaining similar quality. However, HEIC encoding in web browsers has technical limitations.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-gray-300 text-gray-300" style={{ clipPath: "inset(0 60% 0 0)", fill: "#facc15" }} />
            </div>
            <span className="text-gray-700 font-medium">4.4 / 5</span>
            <span className="text-gray-500">– 87,000 votes</span>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-700 mb-4">
                We&apos;re working on bringing HEIC encoding to your browser. This tool is currently under development due to technical limitations with HEIC encoding in web browsers.
              </p>
              <p className="text-gray-600 mb-4">
                Unlike HEIC decoding (which works great in our <Link href="/heic-to-jpg" className="text-blue-600 hover:text-blue-800 underline">HEIC to JPG converter</Link>), HEIC encoding requires advanced processing capabilities that are not yet widely available as free, client-side browser libraries.
              </p>
            </div>
          </div>

          {/* Technical Details (Collapsible) */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="w-full text-left flex items-center justify-between text-lg font-semibold text-gray-900 hover:text-gray-700"
            >
              <span>Why is HEIC encoding difficult?</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${showTechnicalDetails ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTechnicalDetails && (
              <div className="mt-4 space-y-3 text-gray-600">
                <p>
                  <strong className="text-gray-900">No free browser libraries:</strong> Unlike other image formats (JPG, PNG, WebP), there are no mature, free JavaScript libraries that can encode HEIC images directly in your browser.
                </p>
                <p>
                  <strong className="text-gray-900">Proprietary technology:</strong> HEIC uses advanced compression algorithms (HEVC/H.265) that are patent-encumbered and require specialized processing power.
                </p>
                <p>
                  <strong className="text-gray-900">Performance concerns:</strong> Even if encoding were possible, the computational requirements would make it extremely slow in a browser environment compared to native applications.
                </p>
                <p>
                  <strong className="text-gray-900">Current options:</strong> Most HEIC encoders require server-side processing or paid APIs, which conflicts with our privacy-first, client-side processing philosophy.
                </p>
              </div>
            )}
          </div>

          {/* Alternative Tools */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What you can do instead:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-gray-900">Convert HEIC to JPG:</strong>
                  <span className="text-gray-700"> Use our <Link href="/heic-to-jpg" className="text-blue-600 hover:text-blue-800 underline">HEIC to JPG converter</Link> to make your iPhone photos compatible with all devices.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-gray-900">Convert to WebP:</strong>
                  <span className="text-gray-700"> Use our <Link href="/image-to-webp" className="text-blue-600 hover:text-blue-800 underline">Image to WebP converter</Link> for modern, efficient image compression that works everywhere.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-gray-900">Compress images:</strong>
                  <span className="text-gray-700"> Use our <Link href="/compress-image" className="text-blue-600 hover:text-blue-800 underline">Image Compressor</Link> to reduce file size while maintaining quality.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Notify Me Form Placeholder */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Want to be notified when this tool becomes available?
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button
                disabled
                className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              >
                Notify Me
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Email notifications coming soon
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is HEIC format?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                HEIC (High Efficiency Image Container) is the default photo format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining similar quality, resulting in smaller file sizes.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why can&apos;t I convert to HEIC yet?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                HEIC encoding requires specialized processing that is not available as a free, client-side browser library. Unlike HEIC decoding (which works great), encoding requires advanced algorithms and computational power that are difficult to implement in JavaScript.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What formats can I convert to instead?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can convert images to WebP (modern, efficient compression), JPG (universal compatibility), or PNG (lossless quality). WebP offers similar compression benefits to HEIC and is supported by all modern browsers.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert HEIC to other formats?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes! Our HEIC to JPG converter works perfectly for converting iPhone photos to JPG or PNG format. HEIC decoding is fully supported in browsers, so you can easily convert HEIC files to more compatible formats.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will this tool ever be available?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We&apos;re actively monitoring developments in HEIC encoding technology. If a suitable client-side solution becomes available, we&apos;ll implement it immediately. In the meantime, we recommend using WebP format for similar compression benefits.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why use HEIC instead of JPG or WebP?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                HEIC offers excellent compression and quality, making it ideal for iPhone users. However, WebP provides similar benefits and is supported across all modern browsers and platforms. For most users, WebP is a better choice than HEIC due to wider compatibility.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="image-to-heic" />
    </div>
  );
}
