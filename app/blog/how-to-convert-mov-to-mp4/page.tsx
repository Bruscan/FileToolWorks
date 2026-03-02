import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How to Convert MOV to MP4 (3 Free Methods)",
  description: "Convert MOV to MP4 free using online tools, iMovie on Mac, or VLC. Keep full quality with the right codec settings.",
  alternates: {
    canonical: "/blog/how-to-convert-mov-to-mp4",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="How to Convert MOV to MP4 (3 Free Methods)"
          description="Convert MOV to MP4 free using online tools, iMovie on Mac, or VLC. Keep full quality with the right codec settings."
          slug="how-to-convert-mov-to-mp4"
          datePublished="2026-03-02"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Convert MOV to MP4 (3 Free Methods)
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 2, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            MOV is Apple's video format. It works great on Mac and iPhone but causes problems on Windows, Android, and many web platforms. MP4 is the universal alternative that plays on everything. Here are three free ways to convert MOV to MP4 without losing quality.
          </p>

          <h2>Method 1: Online Converter (Any Device)</h2>
          <p>
            The fastest option. Open our <Link href="/video-to-mp4" className="text-blue-600 hover:underline font-semibold">video to MP4 converter</Link>, drag in your MOV file, select your quality setting (High recommended), and click convert. The conversion runs in your browser using WebAssembly, so your video never gets uploaded to a server. Works on Mac, Windows, Linux, and even phones.
          </p>

          <h2>Method 2: iMovie (Mac Only)</h2>
          <p>
            iMovie is free and pre-installed on every Mac. Open iMovie, create a new project, import your MOV file, then go to File &gt; Share &gt; File. Set the quality to High and the format to MP4. iMovie will re-encode the video, which takes longer than a container remux but gives you a clean MP4 file. This method is reliable but slow for large files.
          </p>

          <h2>Method 3: VLC (Mac, Windows, Linux)</h2>
          <p>
            VLC is a free media player that also converts video. Go to Media &gt; Convert/Save (or File &gt; Convert/Stream on Mac). Add your MOV file, click Convert, choose the H.264 + MP3 (MP4) profile, pick your output location, and start. VLC is not the fastest converter, but it handles nearly every video format and costs nothing.
          </p>

          <h2>Quality Tips</h2>
          <ul>
            <li><strong>Use High or CRF 18-23</strong> when re-encoding. Lower CRF numbers mean higher quality but larger files.</li>
            <li><strong>Keep the original resolution.</strong> Do not downscale unless you need a smaller file. Downscaling to 720p is fine for sharing but loses detail.</li>
            <li><strong>MOV and MP4 often use the same codecs.</strong> Many MOV files already contain H.264 video. In those cases, a container remux (changing the wrapper without re-encoding) produces an identical-quality MP4 instantly.</li>
          </ul>

          <p>
            If your converted MP4 is still too large for email or messaging, run it through our <Link href="/compress-video" className="text-blue-600 hover:underline font-semibold">video compressor</Link> to reduce the file size further. For a deeper look at how these formats differ, read <Link href="/blog/how-to-reduce-video-file-size" className="text-blue-600 hover:underline">how to reduce video file size</Link> and <Link href="/blog/mp4-vs-webm" className="text-blue-600 hover:underline">MP4 vs WebM</Link>. For a detailed comparison of the two formats, see <Link href="/blog/mp4-vs-mov" className="text-blue-600 hover:underline">MP4 vs MOV</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
