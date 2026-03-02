import Link from "next/link";
import { Metadata } from "next";
import BlogJsonLd from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "How to Make a GIF from a Video (Best Settings for Small Files) | FileToolWorks",
  description: "Turn any video clip into a GIF with the right FPS, resolution, and duration. Includes platform file size limits for Discord, Twitter, and Slack.",
  alternates: {
    canonical: "/blog/how-to-make-gif-from-video",
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
        <BlogJsonLd
          title="How to Make a GIF from a Video (Best Settings for Small Files) | FileToolWorks"
          description="Turn any video clip into a GIF with the right FPS, resolution, and duration. Includes platform file size limits for Discord, Twitter, and Slack."
          slug="how-to-make-gif-from-video"
          datePublished="2026-03-02"
        />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Make a GIF from a Video (Best Settings for Small Files)
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 2, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            To make a GIF from a video: trim the clip to under 6 seconds, set the resolution to 480p or lower, and use 10-15 FPS. These settings keep your GIF under 5MB, which is small enough for most platforms. Our <Link href="/video-to-gif" className="text-blue-600 hover:underline font-semibold">video to GIF converter</Link> handles this directly in your browser.
          </p>

          <h2>Why GIFs Get So Large</h2>
          <p>
            GIF stores every frame as a full image with up to 256 colors. There is no inter-frame compression like MP4 uses, so a 10-second clip at 30 FPS creates 300 individual images stitched together. A 720p GIF at 30 FPS can easily reach 50-100MB. The three biggest factors affecting GIF file size are duration, resolution, and frame rate.
          </p>

          <h2>Recommended Settings by Platform</h2>
          <ul>
            <li><strong>Discord:</strong> GIFs under 256KB auto-play in chat without clicking. Uploads can be up to 8MB (or 50MB with Nitro). Aim for 360p, 10 FPS, 3-4 seconds for auto-play.</li>
            <li><strong>Twitter/X:</strong> Max GIF upload is 15MB, but Twitter auto-converts GIFs to MP4 for playback. Keep it under 10MB for fast uploads. 480p, 15 FPS works well.</li>
            <li><strong>Slack:</strong> No hard limit, but GIFs over 5MB load slowly and frustrate coworkers. Stick to 480p, 10 FPS, under 5 seconds.</li>
            <li><strong>Email:</strong> Most email clients cap embedded images at 1-2MB. Use 320p, 10 FPS, 2-3 seconds max.</li>
          </ul>

          <h2>Settings That Actually Matter</h2>
          <p>
            <strong>Duration</strong> has the biggest impact. Cutting a clip from 10 seconds to 5 seconds roughly halves the file size. <strong>Resolution</strong> is next. Going from 720p to 480p can reduce size by 50-60%. <strong>FPS</strong> matters less visually than you would expect: 15 FPS looks smooth enough for most GIFs, and dropping from 30 FPS to 15 FPS cuts the file size nearly in half.
          </p>

          <h2>Step-by-Step Process</h2>
          <ol>
            <li>Open the <Link href="/video-to-gif" className="text-blue-600 hover:underline font-semibold">video to GIF tool</Link> and upload your video file</li>
            <li>Set the start time and duration to isolate the clip you want (keep it short)</li>
            <li>Choose 480p or 360p resolution</li>
            <li>Set FPS to 10 or 15</li>
            <li>Select High quality for palette optimization (better colors with minimal size increase)</li>
            <li>Convert and download</li>
          </ol>

          <p>
            If the result is still too large, try trimming the duration further or dropping to 360p. For more on choosing between GIF and video formats, read <Link href="/blog/gif-vs-mp4" className="text-blue-600 hover:underline">GIF vs MP4</Link>. Need to shrink a video file instead? See <Link href="/blog/how-to-compress-video-for-email" className="text-blue-600 hover:underline">how to compress video for email</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}
