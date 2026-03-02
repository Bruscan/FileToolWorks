import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "WOFF vs TTF: Font Formats for Web and Desktop",
  description: "WOFF is 40-50% smaller than TTF and built for web delivery. TTF is the standard desktop font format. Compare file size, browser support, and when to use each.",
  alternates: {
    canonical: "/blog/woff-vs-ttf",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="WOFF vs TTF: Font Formats for Web and Desktop Compared"
          description="WOFF is 40-50% smaller than TTF and built for web delivery. TTF is the standard desktop font format. Compare file size, browser support, and when to use each."
          slug="woff-vs-ttf"
          datePublished="2026-03-30"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          WOFF vs TTF: Font Formats for Web and Desktop Compared
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 30, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            WOFF (Web Open Font Format) wraps TTF or OTF font data in a compressed container designed for web delivery. TTF (TrueType Font) is the standard desktop font format that has been around since 1991. The core difference is purpose: WOFF is built for browsers, TTF is built for operating systems. A typical TTF file at 150 KB becomes 80-90 KB as WOFF, roughly a 40-50% reduction through gzip compression.
          </p>

          <h2>File Size and Performance</h2>
          <p>
            WOFF compresses font tables using gzip (WOFF 1.0) or Brotli (WOFF2). This compression reduces bandwidth and speeds up page loads. A website using four font weights in TTF might transfer 600 KB of font data. The same fonts in WOFF2 drop to around 200 KB. On mobile connections, this difference shaves seconds off load times and directly improves Core Web Vitals scores. TTF files are uncompressed, which is fine for local installation where disk space is cheap, but wasteful for network transfer.
          </p>

          <h2>Browser and Device Support</h2>
          <p>
            WOFF has over 98% browser support globally. WOFF2 (the newer version with Brotli compression) has 97%+ support. The only browsers that need plain WOFF are IE11 and some very old mobile browsers. TTF also works in browsers via @font-face, but browsers have to download the full uncompressed file. For desktop applications, TTF works on Windows, macOS, and Linux natively. WOFF is not designed for desktop installation, though some operating systems can handle it.
          </p>

          <h2>Rendering Quality</h2>
          <p>
            WOFF and TTF render identically because WOFF is just a compressed wrapper around the same font data. The glyph outlines, hinting instructions, and kerning tables are preserved exactly. There is zero visual difference between a TTF font installed on your system and the same font served as WOFF in a browser. The rendering engine (ClearType, FreeType, Core Text) determines how the font looks, not the container format.
          </p>

          <h2>WOFF vs WOFF2</h2>
          <p>
            WOFF2 replaced WOFF as the recommended web font format. WOFF2 uses Brotli compression instead of gzip, which produces files about 30% smaller than WOFF 1.0. For new projects, serve WOFF2 as the primary format with WOFF as a fallback. There is no reason to use plain TTF on the web anymore unless you need to support browsers from before 2012.
          </p>

          <h2>Which to Use</h2>
          <p>
            Use WOFF2 (with WOFF fallback) for web fonts. Use TTF for desktop font installation, design software, and any application that reads font files directly from disk. If you are choosing between <Link href="/blog/ttf-vs-otf" className="text-blue-600 hover:underline">TTF and OTF</Link> for desktop use, OTF offers more typographic features. For the web, the choice is simple: always WOFF2.
          </p>

          <p>
            Working with different file formats? Check out our <Link href="/image-to-webp" className="text-blue-600 hover:underline font-semibold">Image to WebP</Link> converter for optimizing web images, or browse more comparisons like <Link href="/blog/woff2-vs-woff" className="text-blue-600 hover:underline">WOFF2 vs WOFF</Link>, <Link href="/blog/svg-vs-png" className="text-blue-600 hover:underline">SVG vs PNG</Link>, and <Link href="/blog/eps-vs-svg" className="text-blue-600 hover:underline">EPS vs SVG</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
