import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress Video for Email (Under 25MB) | FileToolWorks",
  description: "Compress video files to fit email attachment limits. Reduce video size under 25MB with the right resolution, codec, and quality settings.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How to Compress Video for Email (Under 25MB)
        </h1>

        <p className="text-gray-600 mb-8">
          Published on March 1, 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <p>
            Gmail, Outlook, and Yahoo all cap email attachments at 25MB. A single minute of 1080p video from your phone is typically 100-200MB. To email a video, you need to compress it aggressively or trim it down. Here is how to fit your video into an email without destroying the quality.
          </p>

          <h2>Step 1: Trim the Video</h2>
          <p>
            The easiest way to reduce file size is to cut out what you do not need. If your 2-minute video has 30 seconds of useful content, trimming it down cuts file size by 75% before any compression. Use our <Link href="/trim-video" className="text-blue-600 hover:underline font-semibold">video trimmer</Link> to cut your clip to just the relevant part. It uses codec copy mode, so there is no quality loss from trimming.
          </p>

          <h2>Step 2: Lower the Resolution</h2>
          <p>
            Resolution is the biggest factor in video file size. Dropping from 4K to 1080p cuts size by roughly 75%. Going from 1080p to 720p cuts it in half again. For email, 720p is almost always enough. The recipient will watch it on a phone screen or a small preview window, not a 4K monitor.
          </p>

          <h2>Step 3: Compress with the Right Settings</h2>
          <p>
            Open our <Link href="/compress-video" className="text-blue-600 hover:underline font-semibold">free video compressor</Link> and drop in your video file. Set the resolution to 720p and quality to Medium. This typically produces files that are 80-90% smaller than the original. For a 30-second clip, you should end up well under 25MB. If the file is still too large, try Low quality or 480p resolution.
          </p>

          <h2>What About MP4 Format?</h2>
          <p>
            Always send videos as MP4 with H.264 encoding. This is the most universally compatible format. Every phone, computer, and email client can play H.264 MP4 without installing anything. If your video is in MOV, AVI, MKV, or another format, our <Link href="/video-to-mp4" className="text-blue-600 hover:underline font-semibold">video to MP4 converter</Link> will handle the conversion.
          </p>

          <h2>Quick Reference: Video Size Estimates</h2>
          <ul>
            <li><strong>30 seconds at 720p, medium quality:</strong> 3-8MB (fits easily in email)</li>
            <li><strong>1 minute at 720p, medium quality:</strong> 8-15MB (fits in email)</li>
            <li><strong>2 minutes at 720p, medium quality:</strong> 15-30MB (tight, may need lower quality)</li>
            <li><strong>Over 2 minutes:</strong> Consider a file sharing service or cloud link instead</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
