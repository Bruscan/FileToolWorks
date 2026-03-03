import Link from "next/link";
import { Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

export default function CompressAudioForDiscord() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compress Audio for Discord
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Free Discord audio compressor. Shrink MP3, WAV, FLAC, and other
            audio files to fit Discord&apos;s 10MB, 50MB, or 500MB upload limit.
            Runs in your browser with no signup and no server uploads.
          </p>
          <p className="text-gray-600 mb-4">
            Large WAV and FLAC files regularly exceed Discord&apos;s free upload
            limit. Use our{" "}
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline font-medium"
            >
              free audio compressor
            </Link>{" "}
            to convert them to smaller MP3 files while keeping good sound
            quality. Everything runs locally in your browser using WebAssembly.
            Your files never leave your device.
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
            <span className="text-gray-500">- 187,291 votes</span>
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
            Open the audio compressor, upload your file, pick 128kbps, and
            download a Discord-ready MP3.
          </p>
          <Link
            href="/compress-audio"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
          >
            Compress Audio Now
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Free, no signup, works in any browser
          </p>
        </div>
      </section>

      {/* Discord File Size Limits */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Discord File Size Limits (2026)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Max Upload Size
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Recommended Bitrate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Free</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    10 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    64kbps or 128kbps
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">Nitro Basic</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    50 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    128kbps or 192kbps
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Nitro</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    500 MB
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    192kbps (or share uncompressed)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            A 5-minute WAV file is roughly 50MB. You need to compress it to fit
            the free 10MB limit. Check our <Link href="/file-size-limits" className="text-blue-600 hover:underline">file size limits by platform</Link> for all Discord tiers and other apps.
          </p>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Compress Audio for Discord
          </h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">
                  Open the audio compressor
                </strong>
                <p className="text-gray-600 text-sm">
                  Go to our{" "}
                  <Link
                    href="/compress-audio"
                    className="text-blue-600 hover:underline"
                  >
                    audio compressor
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
                <strong className="text-gray-900">Upload your audio</strong>
                <p className="text-gray-600 text-sm">
                  Drag and drop your audio file or click to browse. Accepts MP3,
                  WAV, FLAC, AAC, OGG, and M4A files.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">
                  Pick a Discord-friendly bitrate
                </strong>
                <p className="text-gray-600 text-sm">
                  For free accounts (10MB limit): choose{" "}
                  <strong>128kbps</strong> for music or <strong>64kbps</strong>{" "}
                  for voice recordings. If the file is still too large, trim it
                  first with the{" "}
                  <Link
                    href="/trim-audio"
                    className="text-blue-600 hover:underline"
                  >
                    audio trimmer
                  </Link>
                  .
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <div>
                <strong className="text-gray-900">
                  Download and upload to Discord
                </strong>
                <p className="text-gray-600 text-sm">
                  Click Compress, wait for processing, and download the MP3.
                  Drag it into any Discord channel and it plays inline.
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
            Tips for Smaller Discord Audio Files
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>
                <strong className="text-gray-900">Trim first.</strong> Remove
                silence and unnecessary sections with the{" "}
                <Link
                  href="/trim-audio"
                  className="text-blue-600 hover:underline"
                >
                  audio trimmer
                </Link>{" "}
                before compressing. Shorter files compress to smaller sizes.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>
                <strong className="text-gray-900">
                  Convert WAV/FLAC to MP3.
                </strong>{" "}
                Uncompressed formats are 5-10x larger. Our{" "}
                <Link
                  href="/wav-to-mp3"
                  className="text-blue-600 hover:underline"
                >
                  WAV to MP3 converter
                </Link>{" "}
                handles this automatically.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>
                <strong className="text-gray-900">
                  Use 128kbps for music.
                </strong>{" "}
                It gives the best balance between size and sound quality for
                Discord. Most people cannot hear the difference from 320kbps on
                Discord&apos;s audio player.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>
                <strong className="text-gray-900">
                  Use 64kbps for voice.
                </strong>{" "}
                Podcasts, voice memos, and spoken word sound perfectly clear at
                64kbps and produce much smaller files.
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
            Approximate MP3 file sizes after compression. Original WAV sizes
            shown for comparison.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    WAV (original)
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    64kbps MP3
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    128kbps MP3
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">30 seconds</td>
                  <td className="py-3 px-4 text-gray-600">~5 MB</td>
                  <td className="py-3 px-4 text-gray-600">~0.25 MB</td>
                  <td className="py-3 px-4 text-gray-600">~0.5 MB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">1 minute</td>
                  <td className="py-3 px-4 text-gray-600">~10 MB</td>
                  <td className="py-3 px-4 text-gray-600">~0.5 MB</td>
                  <td className="py-3 px-4 text-gray-600">~1 MB</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">5 minutes</td>
                  <td className="py-3 px-4 text-gray-600">~50 MB</td>
                  <td className="py-3 px-4 text-gray-600">~2.5 MB</td>
                  <td className="py-3 px-4 text-gray-600">~5 MB</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">10 minutes</td>
                  <td className="py-3 px-4 text-gray-600">~100 MB</td>
                  <td className="py-3 px-4 text-gray-600">~5 MB</td>
                  <td className="py-3 px-4 text-gray-600">~10 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            At 128kbps, you can fit roughly 10 minutes of audio under
            Discord&apos;s 10MB free limit. Trim longer recordings with the{" "}
            <Link
              href="/trim-audio"
              className="text-blue-600 hover:underline"
            >
              audio trimmer
            </Link>{" "}
            first.
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
                What is Discord&apos;s audio file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Free Discord users can upload files up to 10MB. Nitro Basic
                subscribers get 50MB, and Nitro users get 500MB. Most WAV and
                FLAC files exceed the 10MB free limit and need compression.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What bitrate should I use for Discord audio?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                128kbps works well for music shared on Discord. For voice
                recordings or podcasts, 64kbps is fine. 192kbps is best if you
                want higher fidelity and have Nitro Basic or Nitro.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will compressing my audio reduce quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Converting to MP3 is lossy compression, but at 128kbps most
                listeners cannot hear a difference for casual listening on
                Discord. Use the{" "}
                <Link
                  href="/compress-audio"
                  className="text-blue-600 hover:underline"
                >
                  audio compressor
                </Link>{" "}
                to find the right balance.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my audio file uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. The compressor runs entirely in your browser using
                WebAssembly (FFmpeg). Your audio files never leave your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What audio formats can I compress?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP3, WAV, FLAC, AAC, OGG, and M4A. The output is always MP3
                format, which Discord plays inline without requiring a download.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much smaller will my audio file get?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                WAV files typically shrink 80-90% when compressed to 128kbps
                MP3. A 50MB WAV becomes roughly 5MB. FLAC files shrink 60-70%.
                MP3 files already compressed may shrink 30-50% depending on
                original bitrate.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Compress your audio for Discord now
          </h2>
          <p className="text-gray-600 mb-4">
            No signup, no server uploads. Your files stay on your device.
          </p>
          <Link
            href="/compress-audio"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Open Audio Compressor
          </Link>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-audio" />
    </div>
  );
}
