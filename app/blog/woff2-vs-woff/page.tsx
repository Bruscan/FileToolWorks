import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "WOFF2 vs WOFF: Compression, Browser Support, and Which to Use",
  description: "WOFF2 is 30% smaller than WOFF thanks to Brotli compression and has 97%+ browser support. Compare file size, performance, and when to use each web font format.",
  alternates: {
    canonical: "/blog/woff2-vs-woff",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="WOFF2 vs WOFF: Compression, Browser Support, and Which to Use"
          description="WOFF2 is 30% smaller than WOFF thanks to Brotli compression and has 97%+ browser support. Compare file size, performance, and when to use each web font format."
          slug="woff2-vs-woff"
          datePublished="2026-03-31"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          WOFF2 vs WOFF: Compression, Browser Support, and Which to Use
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 31, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            WOFF2 is the successor to WOFF with one major upgrade: it uses Brotli compression instead of gzip, producing files roughly 30% smaller. A font that compresses to 94 KB as WOFF drops to about 83 KB as WOFF2. Both formats wrap the same underlying TrueType or OpenType font data, so the rendered text looks identical. The only difference is how the file is compressed for delivery over the network.
          </p>

          <h2>Compression and File Size</h2>
          <p>
            WOFF 1.0 uses zlib (gzip) compression, reducing font files by about 40-50% compared to raw TTF. WOFF2 replaces that with Brotli, a compression algorithm Google developed specifically for web content. The result is an additional 30% size reduction on top of what WOFF already achieves. For a website loading four font weights, switching from WOFF to WOFF2 can save 30-50 KB total. That matters for mobile users on slow connections and directly affects Largest Contentful Paint metrics.
          </p>

          <h2>Browser Support</h2>
          <p>
            WOFF2 has over 97% global browser support as of 2026. Every current version of Chrome, Firefox, Safari, and Edge supports it. The only browsers that need WOFF as a fallback are IE11 (retired in 2022) and some pre-2015 mobile browsers. WOFF 1.0 has 99%+ support going back to IE9. In practice, serving WOFF2 as the primary format with a WOFF fallback in your <code>@font-face</code> declaration covers every browser that matters.
          </p>

          <h2>Performance Impact</h2>
          <p>
            Smaller font files mean faster page loads. A WOFF2 font typically downloads and decompresses faster than WOFF even though Brotli decompression is slightly more CPU-intensive than gzip. The bandwidth savings more than compensate for the extra decompression time. Google PageSpeed Insights flags WOFF (non-WOFF2) font usage as an optimization opportunity. If you are self-hosting fonts, serving WOFF2 is one of the easiest performance wins available.
          </p>

          <h2>How to Implement Both</h2>
          <p>
            The standard approach is to list WOFF2 first in your CSS <code>@font-face</code> rule, with WOFF as the fallback. Browsers pick the first format they support. Example: <code>src: url(&apos;font.woff2&apos;) format(&apos;woff2&apos;), url(&apos;font.woff&apos;) format(&apos;woff&apos;);</code>. Most font providers (Google Fonts, Adobe Fonts) already serve WOFF2 automatically. If you are converting fonts yourself, tools like <code>woff2_compress</code> or online converters handle the conversion from TTF/OTF to WOFF2.
          </p>

          <h2>Which to Use</h2>
          <p>
            Use WOFF2 as your primary web font format. Include WOFF as a fallback only if your analytics show meaningful traffic from browsers older than 2015. If you are starting a new project today, WOFF2-only is a reasonable choice for most audiences. There is no scenario where WOFF is preferable to WOFF2 for new development.
          </p>

          <p>
            For more on font formats, see our comparison of <Link href="/blog/woff-vs-ttf" className="text-blue-600 hover:underline">WOFF vs TTF</Link> for web versus desktop use, and <Link href="/blog/ttf-vs-otf" className="text-blue-600 hover:underline">TTF vs OTF</Link> for choosing between desktop font formats.
          </p>
        </div>
      </article>
    </div>
  );
}
