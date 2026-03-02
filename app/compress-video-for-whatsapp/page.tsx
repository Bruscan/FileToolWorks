import Link from "next/link";
import { Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

export default function CompressVideoForWhatsApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compress Video for WhatsApp
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Free WhatsApp video compressor. Shrink any video to fit WhatsApp&apos;s
            16MB file size limit. Runs in your browser with no signup and no
            server uploads.
          </p>
          <p className="text-gray-600 mb-4">
            WhatsApp rejects videos over 16MB or compresses them aggressively,
            killing the quality. Use our{" "}
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline font-medium"
            >
              free video compressor
            </Link>{" "}
            to reduce file size on your terms. You control the resolution and
            quality. Everything runs locally in your browser using WebAssembly,
            so your files never leave your device.
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
            Open the video compressor, upload your file, pick 480p + Medium
            quality, and download a WhatsApp-ready MP4.
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

      {/* WhatsApp File Size Limits */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            WhatsApp File Size Limits (2026)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Attachment Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Max Size
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Video (media)</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    16 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Plays inline in chat with preview thumbnail
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Document</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    2 GB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    No inline preview, recipient must download and open
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Status</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    16 MB / 30 sec
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    Limited to 30 seconds and auto-compressed by WhatsApp
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            For the best experience, compress your video below 16MB so it plays
            inline with a thumbnail. Sending as a document avoids compression but
            loses the preview.
          </p>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Compress Video for WhatsApp
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
                  . It loads FFmpeg in your browser so nothing gets uploaded to
                  a server.
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
                  Drag and drop your video file or tap to browse. Works with
                  MP4, MOV, AVI, MKV, WebM, and most other formats. Works on
                  iPhone, Android, and desktop.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">
                  Pick WhatsApp-friendly settings
                </strong>
                <p className="text-gray-600 text-sm">
                  Choose <strong>480p</strong> resolution and{" "}
                  <strong>Medium</strong> quality. This keeps most clips well
                  under 16MB. If the video is still too large, trim it with our{" "}
                  <Link
                    href="/trim-video"
                    className="text-blue-600 hover:underline"
                  >
                    video trimmer
                  </Link>{" "}
                  first.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <div>
                <strong className="text-gray-900">
                  Download and send via WhatsApp
                </strong>
                <p className="text-gray-600 text-sm">
                  Click Compress, wait for processing, and download the MP4.
                  Open WhatsApp and attach it as a video for inline playback
                  with a thumbnail preview.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Why Pre-Compress */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Pre-Compress Instead of Letting WhatsApp Do It?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>
                <strong className="text-gray-900">Better quality.</strong>{" "}
                WhatsApp&apos;s auto-compression is aggressive and often creates
                visible artifacts, especially in dark scenes. Pre-compressing
                with Medium quality looks noticeably better.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>
                <strong className="text-gray-900">Faster sending.</strong>{" "}
                Smaller files upload to WhatsApp faster, especially on slow
                mobile data connections.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>
                <strong className="text-gray-900">Control the result.</strong>{" "}
                You choose the resolution and quality instead of leaving it up
                to WhatsApp&apos;s unpredictable algorithm.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>
                <strong className="text-gray-900">Avoid rejections.</strong>{" "}
                Videos over 16MB get rejected entirely when sent as media. No
                error message, just nothing happens. Pre-compressing prevents
                this.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Smaller WhatsApp Videos
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>
                <strong className="text-gray-900">Trim first.</strong> Remove
                unnecessary footage with the{" "}
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
                <strong className="text-gray-900">Use 480p.</strong>{" "}
                WhatsApp plays video on a small phone screen. 480p looks fine
                at mobile viewing distance and saves a lot of space.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>
                <strong className="text-gray-900">
                  Convert to GIF for short clips.
                </strong>{" "}
                Clips under 5 seconds work great as{" "}
                <Link
                  href="/video-to-gif"
                  className="text-blue-600 hover:underline"
                >
                  GIFs
                </Link>{" "}
                that auto-play in WhatsApp chats.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>
                <strong className="text-gray-900">
                  Send as MP4.
                </strong>{" "}
                MP4 (H.264) is the most compatible format for WhatsApp. Our
                compressor always outputs MP4. If your source is MOV or MKV,
                you can also{" "}
                <Link
                  href="/video-to-mp4"
                  className="text-blue-600 hover:underline"
                >
                  convert to MP4
                </Link>{" "}
                first.
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
                    Fits in 16MB?
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
            For WhatsApp, a 30-second clip at 480p is the sweet spot. Use the{" "}
            <Link
              href="/trim-video"
              className="text-blue-600 hover:underline"
            >
              video trimmer
            </Link>{" "}
            to cut longer clips down to size.
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
                What is WhatsApp&apos;s video file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                WhatsApp limits video attachments to 16MB on most platforms.
                Videos larger than 16MB cannot be sent as media messages. You
                can send larger files (up to 2GB) as document attachments, but
                they lose the inline preview and thumbnail.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What settings should I use to compress video for WhatsApp?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Use 480p resolution and Medium quality in the{" "}
                <Link
                  href="/compress-video"
                  className="text-blue-600 hover:underline"
                >
                  video compressor
                </Link>
                . This keeps most 30-60 second clips well under 16MB with
                good visual quality on a phone screen.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does WhatsApp compress videos automatically?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. WhatsApp applies aggressive compression that often creates
                visible artifacts. Pre-compressing with controlled settings
                gives you better quality because you choose the level instead
                of letting WhatsApp decide.
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
                Can I compress videos for WhatsApp on my phone?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. The compressor works in any mobile browser on iPhone and
                Android. Open the tool, upload your video, compress, and share
                directly to WhatsApp. No app install needed.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How long of a video can I send on WhatsApp?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                At 480p Medium quality, you can fit roughly 30-60 seconds into
                16MB. At Low quality, up to 2 minutes may fit. For longer
                clips, use the{" "}
                <Link
                  href="/trim-video"
                  className="text-blue-600 hover:underline"
                >
                  video trimmer
                </Link>{" "}
                to cut out the best part first.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Compress your video for WhatsApp now
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
