import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Interlaced vs Progressive Scan: What Is the Difference? | FileToolWorks",
  description: "Interlaced video draws odd and even lines in alternating fields. Progressive video draws every line in sequence. Here is when each method matters.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="Interlaced vs Progressive Scan: What Is the Difference? | FileToolWorks"
          description="Interlaced video draws odd and even lines in alternating fields. Progressive video draws every line in sequence. Here is when each method matters."
          slug="interlaced-vs-progressive"
          datePublished="2026-04-15"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interlaced vs Progressive Scan: What Is the Difference?
        </h1>

        <p className="text-gray-600 mb-8">
          Published on April 15, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            Interlaced scanning draws half the image per pass, alternating between odd and even lines. Progressive scanning draws every line top to bottom in a single pass. The "i" and "p" in labels like <Link href="/blog/1080i-vs-1080p" className="text-blue-600 hover:underline">1080i and 1080p</Link> refer to exactly this. Progressive produces a cleaner, sharper image per frame, which is why it has become the default for modern displays and digital video.
          </p>

          <h2>How Interlaced Scanning Works</h2>
          <p>
            Interlaced video splits each frame into two fields. Field one contains the odd-numbered lines (1, 3, 5...) and field two contains the even-numbered lines (2, 4, 6...). Each field is displayed in rapid succession. A 1080i signal at 30 fps actually transmits 60 fields per second, each containing 540 lines. Your brain merges the two fields into what looks like a complete frame. This technique was invented for CRT televisions in the 1930s because it doubled the perceived refresh rate without doubling the bandwidth. Broadcast standards like <Link href="/blog/ntsc-vs-pal" className="text-blue-600 hover:underline">NTSC and PAL</Link> relied on interlacing for decades.
          </p>

          <h2>How Progressive Scanning Works</h2>
          <p>
            Progressive video draws every line in order, top to bottom, for each frame. A 1080p/30 signal sends 30 complete 1080-line frames per second. Each frame is whole, with no field splitting. This eliminates the interline flicker and combing artifacts that interlacing can produce. Every modern computer monitor, phone screen, and flat-panel TV uses progressive scan natively. Digital cameras, streaming platforms, and web video all default to progressive.
          </p>

          <h2>Combing Artifacts and Motion</h2>
          <p>
            The biggest problem with interlaced video appears during fast motion. Because the two fields are captured at slightly different moments, moving objects appear with a comb-like edge pattern where the odd and even lines do not align. Deinterlacing algorithms attempt to fix this, but they either blur the image or introduce their own artifacts. Progressive video avoids the problem entirely. This is why sports broadcasts and action content look better in progressive formats, and why frame rates like <Link href="/blog/24fps-vs-30fps" className="text-blue-600 hover:underline">24p and 30p</Link> are preferred for cinema and web delivery.
          </p>

          <h2>Where Interlaced Video Still Exists</h2>
          <p>
            Some over-the-air TV broadcasts still use 1080i, particularly in North America and Japan. Older camcorders, DVDs, and certain surveillance systems also output interlaced content. If you receive interlaced footage, you will likely need to deinterlace it before editing or uploading. Most editing software can handle this automatically, though quality varies by method (bob, blend, or adaptive).
          </p>

          <h2>Which Should You Use?</h2>
          <p>
            Use progressive for everything unless your delivery target specifically requires interlaced (some broadcast stations mandate 1080i). Progressive gives sharper frames, cleaner motion, smaller file sizes at equivalent quality, and universal compatibility. If you have interlaced footage you need to convert, a proper deinterlace pass before final export produces the best results.
          </p>

          <p>
            Need to convert or compress your video? Try our <Link href="/video-to-mp4" className="text-blue-600 hover:underline font-semibold">video to MP4 converter</Link> or <Link href="/compress-video" className="text-blue-600 hover:underline font-semibold">video compressor</Link>. For related topics, see <Link href="/blog/1080i-vs-1080p" className="text-blue-600 hover:underline">1080i vs 1080p</Link>, <Link href="/blog/720p-vs-1080p" className="text-blue-600 hover:underline">720p vs 1080p</Link>, and <Link href="/blog/ntsc-vs-pal" className="text-blue-600 hover:underline">NTSC vs PAL</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
