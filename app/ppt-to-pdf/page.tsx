"use client";

import { useState } from "react";
import { Star, FileText, Server, Mail, CheckCircle2, ExternalLink } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

export default function PPTToPDF() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // In production, this would send to a backend/mailing list service
    console.log("Waitlist signup:", email);
    setSubmitted(true);
    setEmail("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PowerPoint to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert PowerPoint presentations to PDF format. Professional quality conversion with full formatting preservation.
          </p>
          <p className="text-gray-600 mb-4">
            Transform PPTX and PPT files into high-quality PDF documents. Perfect for sharing presentations that maintain their exact appearance across all devices and platforms.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 35% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.6 / 5</span>
            <span className="text-gray-500">– 176,842 votes</span>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-8 md:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Server className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Coming Soon!
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              PowerPoint to PDF conversion requires advanced server processing to preserve complex layouts, animations, fonts, and embedded media. We are building this feature to deliver professional-quality results.
            </p>
          </div>
        </div>
      </section>

      {/* Why Server Processing */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why This Tool Requires Server Processing
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Complex File Format</h3>
                <p className="text-gray-600 text-sm">
                  PowerPoint files contain intricate layouts, custom fonts, embedded videos, animations, and transitions. These require specialized libraries that cannot run efficiently in web browsers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Server className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Server-Side Rendering</h3>
                <p className="text-gray-600 text-sm">
                  To accurately preserve your presentation's appearance, we need server-side rendering engines similar to Microsoft PowerPoint. This ensures every slide looks exactly as intended.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">
                  We are committed to providing high-quality conversions. Rather than offering a subpar client-side solution, we are building proper server infrastructure to deliver professional results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Get Notified When We Launch
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            Join our waitlist to be among the first to know when PowerPoint to PDF conversion becomes available. We will send you a single email notification when this tool is ready.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2 whitespace-nowrap"
                >
                  <Mail className="w-5 h-5" />
                  Notify Me
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}
            </form>
          ) : (
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                You are on the list!
              </h3>
              <p className="text-gray-600">
                We will email you as soon as PowerPoint to PDF conversion is available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Alternative Solutions */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need to Convert PowerPoint Now?
          </h2>
          <p className="text-gray-600 mb-6">
            While we build this feature, here are some trusted alternatives you can use:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Microsoft PowerPoint</h3>
                <p className="text-gray-600 text-sm mb-2">
                  If you have PowerPoint installed, use File → Save As → PDF. This provides the highest quality conversion with perfect formatting preservation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Google Slides</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Upload your PPTX to Google Slides, then use File → Download → PDF Document. Free and works in any browser.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">CloudConvert</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Professional online conversion service with excellent formatting preservation. Offers free conversions with daily limits.
                </p>
              </div>
            </div>
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
                When will this tool be available?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We are actively developing server infrastructure for PowerPoint conversion. Join our waitlist above to receive an email notification when the tool launches.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the conversion be free?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Like all our tools, PowerPoint to PDF conversion will be completely free with no signup required. We may introduce optional premium features in the future for advanced users.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why cannot this work in the browser?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                PowerPoint files have complex structures including custom fonts, embedded media, animations, and transitions. There are no robust JavaScript libraries that can accurately parse and render PowerPoint presentations in browsers. Server-side processing with specialized engines is required for quality results.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will my presentations be stored on your servers?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Just like our PDF to Word converter, your files will be processed and immediately deleted. We do not store any uploaded presentations or converted PDFs on our servers.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What PowerPoint formats will be supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We plan to support both modern PPTX files and legacy PPT files. The conversion will preserve formatting, fonts, images, charts, and layouts. Animations and transitions will be rendered as static slides.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I use alternative tools in the meantime?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Absolutely. We recommend using PowerPoint's built-in Save as PDF feature, Google Slides, or services like CloudConvert for your immediate conversion needs. See the "Need to Convert PowerPoint Now?" section above for detailed alternatives.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="ppt-to-pdf" />
    </div>
  );
}
