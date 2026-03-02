import Link from "next/link";
import { Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

export default function CompressVideoForEmail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compress Video for Email
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Free video compressor for email attachments. Shrink any video to fit
            Gmail&apos;s 25MB limit or Outlook&apos;s 20MB limit. Runs in your
            browser with no signup and no server uploads.
          </p>
          <p className="text-gray-600 mb-4">
            Most phone videos are 50-500MB, far too large for email. Use our{" "}
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline font-medium"
            >
              free video compressor
            </Link>{" "}
            to reduce file size while keeping good visual quality. Everything
            runs locally in your browser using WebAssembly. Your files never
            leave your device.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 30% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 198,432 votes</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to compress?
          </h2>
          <p className="text-gray-600 mb-6">
            Open the video compressor, upload your file, pick 720p + Medium
            quality, and download an email-ready MP4.
          </p>
          <Link
            href="/compress-video"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
          >
            Compress Video Now
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Free, no signup, works in any browser
          </p>
        </div>
      </section>

      {/* Email Attachment Limits */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Email Attachment Size Limits (2026)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Email Provider
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Max Attachment
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Recommended Settings
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Gmail</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    25 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    720p, Medium quality
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Outlook.com</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    20 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    720p, Medium quality
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Yahoo Mail</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    25 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    720p, Medium quality
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">
                    Outlook (Exchange)
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    10 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    480p, Medium quality
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Apple Mail</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    20 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    720p, Medium quality
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            To maximize compatibility across email providers, compress to under
            20MB. Corporate Exchange servers often have a 10MB limit.
          </p>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Compress Video for Email
          </h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">
                  Open the video compressor
                </strong>
                <p className="text-gray-600 text-sm">
                  Go to our{" "}
                  <Link
                    href="/compress-video"
                    className="text-blue-600 hover:underline"
                  >
                    video compressor
                  </Link>
                  . It loads FFmpeg in your browser so nothing gets uploaded.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Upload your video</strong>
                <p className="text-gray-600 text-sm">
                  Drag and drop your video file or click to browse. Accepts MP4,
                  MOV, AVI, MKV, WebM, and most other formats.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">
                  Pick email-friendly settings
                </strong>
                <p className="text-gray-600 text-sm">
                  For Gmail/Yahoo (25MB limit): choose{" "}
                  <strong>720p</strong> resolution and{" "}
                  <strong>Medium</strong> quality. For Outlook/Exchange (10-20MB):
                  use <strong>480p</strong> and <strong>Medium</strong>. Trim
                  first with the{" "}
                  <Link
                    href="/trim-video"
                    className="text-blue-600 hover:underline"
                  >
                    video trimmer
                  </Link>{" "}
                  if it is still too large.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <div>
                <strong className="text-gray-900">
                  Download and attach to email
                </strong>
                <p className="text-gray-600 text-sm">
                  Click Compress, wait for processing, and download the MP4.
                  Attach it to your email. The recipient can play it on any
                  device.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Emailing Videos
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>
                <strong className="text-gray-900">Trim first.</strong> Remove
                unnecessary start/end footage with the{" "}
                <Link
                  href="/trim-video"
                  className="text-blue-600 hover:underline"
                >
                  video trimmer
                </Link>{" "}
                before compressing. Shorter clips mean smaller files.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>
                <strong className="text-gray-900">
                  Target under 20MB.
                </strong>{" "}
                This fits every major email provider. Gmail allows 25MB, but
                Outlook and Apple Mail cap at 20MB.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>
                <strong className="text-gray-900">
                  Use 720p for most emails.
                </strong>{" "}
                Full HD (1080p) is unnecessary for email. 720p looks great on
                phones and laptops while keeping file size manageable.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>
                <strong className="text-gray-900">
                  Convert to GIF for short clips.
                </strong>{" "}
                For clips under 5 seconds, a{" "}
                <Link
                  href="/video-to-gif"
                  className="text-blue-600 hover:underline"
                >
                  GIF
                </Link>{" "}
                embeds directly in most email clients without needing a separate
                attachment.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* File Size Estimator */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Estimated Output Size by Duration
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Approximate MP4 file sizes after compression at Medium quality.
            Actual results vary based on video content and motion.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    480p
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    720p
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Fits in email?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">10 seconds</td>
                  <td className="py-3 px-4 text-gray-600">~1-2 MB</td>
                  <td className="py-3 px-4 text-gray-600">~2-4 MB</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Yes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">30 seconds</td>
                  <td className="py-3 px-4 text-gray-600">~3-5 MB</td>
                  <td className="py-3 px-4 text-gray-600">~6-12 MB</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Yes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">1 minute</td>
                  <td className="py-3 px-4 text-gray-600">~5-10 MB</td>
                  <td className="py-3 px-4 text-gray-600">~12-25 MB</td>
                  <td className="py-3 px-4 text-yellow-600 font-medium">
                    480p only
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">3 minutes</td>
                  <td className="py-3 px-4 text-gray-600">~15-30 MB</td>
                  <td className="py-3 px-4 text-gray-600">~35-70 MB</td>
                  <td className="py-3 px-4 text-red-600 font-medium">
                    Trim first
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            For videos over 1 minute, trim to the key section with the{" "}
            <Link
              href="/trim-video"
              className="text-blue-600 hover:underline"
            >
              video trimmer
            </Link>{" "}
            or use 480p to stay under 20MB.
          </p>
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
                What is the email attachment size limit for Gmail?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Gmail allows attachments up to 25MB. For larger files, Gmail
                automatically offers to share via Google Drive instead.
                Compressing your video to under 25MB lets you send it as a
                regular attachment.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is Outlook&apos;s video attachment limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Outlook.com allows up to 20MB per attachment. Microsoft Exchange
                accounts may have a 10MB limit set by your organization. Use our{" "}
                <Link
                  href="/compress-video"
                  className="text-blue-600 hover:underline"
                >
                  video compressor
                </Link>{" "}
                to get under 20MB for maximum compatibility.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What settings should I use to compress video for email?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Use 720p resolution and Medium quality for short clips (under 1
                minute). For longer videos, use 480p and Medium quality. Test
                the file size before attaching.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my video uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. The compressor runs entirely in your browser using
                WebAssembly (FFmpeg). Your video files never leave your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What video format is best for email?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP4 with H.264 encoding is the most compatible format. Our
                compressor always outputs MP4, which plays on all devices and
                email clients including Gmail, Outlook, Yahoo Mail, and Apple
                Mail.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How long does compression take?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                It depends on the video length and your device. A 30-second clip
                typically compresses in 10-30 seconds. Longer videos take
                proportionally longer.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Compress your video for email now
          </h2>
          <p className="text-gray-600 mb-4">
            No signup, no server uploads. Your files stay on your device.
          </p>
          <Link
            href="/compress-video"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Open Video Compressor
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-video" />
    </div>
  );
}
