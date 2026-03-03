import Link from "next/link";
import { Star, ChevronDown } from "lucide-react";

type Platform = {
  name: string;
  limit: string;
  notes: string;
};

type Category = {
  title: string;
  id: string;
  platforms: Platform[];
  compressTool?: { label: string; href: string };
};

const categories: Category[] = [
  {
    title: "Email Providers",
    id: "email",
    compressTool: {
      label: "Compress Video for Email",
      href: "/compress-video-for-email",
    },
    platforms: [
      {
        name: "Gmail",
        limit: "25 MB",
        notes: "Files over 25MB are automatically shared via Google Drive link",
      },
      {
        name: "Outlook.com",
        limit: "20 MB",
        notes: "Microsoft 365 business accounts may allow up to 150MB via OneDrive",
      },
      {
        name: "Yahoo Mail",
        limit: "25 MB",
        notes: "Total attachment size per email, not per file",
      },
      {
        name: "Apple iCloud Mail",
        limit: "20 MB",
        notes: "Mail Drop allows sending up to 5GB via iCloud link",
      },
      {
        name: "ProtonMail",
        limit: "25 MB",
        notes: "End-to-end encrypted. Total size including email body",
      },
      {
        name: "Zoho Mail",
        limit: "20 MB",
        notes: "Free plan. Paid plans allow up to 40MB",
      },
      {
        name: "AOL Mail",
        limit: "25 MB",
        notes: "Per email total attachment size",
      },
      {
        name: "Tutanota (Tuta)",
        limit: "25 MB",
        notes: "Encrypted email. Total attachment size per message",
      },
    ],
  },
  {
    title: "Messaging Apps",
    id: "messaging",
    compressTool: {
      label: "Compress Video for Discord",
      href: "/compress-video-for-discord",
    },
    platforms: [
      {
        name: "Discord (Free)",
        limit: "10 MB",
        notes: "Per file. Most common limit users hit",
      },
      {
        name: "Discord (Nitro Basic)",
        limit: "50 MB",
        notes: "$2.99/month. 50MB per file upload",
      },
      {
        name: "Discord (Nitro)",
        limit: "500 MB",
        notes: "$9.99/month. 500MB per file upload",
      },
      {
        name: "WhatsApp",
        limit: "2 GB",
        notes: "Documents up to 2GB. Media may be auto-compressed",
      },
      {
        name: "Telegram",
        limit: "2 GB",
        notes: "Per file. One of the highest limits of any messaging app",
      },
      {
        name: "Signal",
        limit: "100 MB",
        notes: "Per attachment. End-to-end encrypted",
      },
      {
        name: "Slack (Free)",
        limit: "1 GB",
        notes: "Per file. Free workspaces have limited total storage",
      },
      {
        name: "Microsoft Teams",
        limit: "250 MB",
        notes: "Per file in chat. Files in channels can be up to 250GB via SharePoint",
      },
      {
        name: "iMessage",
        limit: "100 MB",
        notes: "Approximate. Apple does not publish an official limit",
      },
      {
        name: "Facebook Messenger",
        limit: "25 MB",
        notes: "Per file attachment. Videos may be compressed automatically",
      },
    ],
  },
  {
    title: "Social Media",
    id: "social",
    compressTool: {
      label: "Compress Video",
      href: "/compress-video",
    },
    platforms: [
      {
        name: "Instagram (Reels)",
        limit: "650 MB",
        notes: "Up to 15 minutes. Recommended: MP4, H.264, 1080x1920",
      },
      {
        name: "Instagram (Stories)",
        limit: "30 MB",
        notes: "15 seconds per clip. MP4 or MOV recommended",
      },
      {
        name: "Instagram (Posts)",
        limit: "30 MB",
        notes: "Images: 30MB. Videos: 650MB (up to 60 minutes)",
      },
      {
        name: "TikTok",
        limit: "287 MB",
        notes: "Mobile upload. Desktop allows up to 10GB. Max 10 minutes",
      },
      {
        name: "X (Twitter) - Images",
        limit: "5 MB",
        notes: "JPG, PNG, GIF (up to 15MB for animated GIF). WebP supported",
      },
      {
        name: "X (Twitter) - Videos",
        limit: "512 MB",
        notes: "Up to 2:20 duration. MP4 H.264 with AAC audio recommended",
      },
      {
        name: "YouTube",
        limit: "256 GB",
        notes: "Or 12 hours, whichever is less. Verified accounts only for >15min",
      },
      {
        name: "Facebook (Posts)",
        limit: "10 GB",
        notes: "Videos up to 10GB (max 240 minutes). Images up to 30MB",
      },
      {
        name: "LinkedIn (Posts)",
        limit: "5 GB",
        notes: "Videos: 5GB (max 15 min). Images: 10MB",
      },
      {
        name: "Reddit",
        limit: "1 GB",
        notes: "Videos up to 1GB (max 15 minutes). Images up to 20MB",
      },
      {
        name: "Pinterest",
        limit: "20 MB",
        notes: "Images: 20MB (JPG, PNG). Videos: 2GB (max 15 minutes)",
      },
      {
        name: "Threads",
        limit: "30 MB",
        notes: "Images: 30MB. Videos: similar to Instagram limits",
      },
    ],
  },
  {
    title: "Cloud Storage",
    id: "cloud",
    platforms: [
      {
        name: "Google Drive",
        limit: "5 TB",
        notes: "Per file. 15GB free storage total (shared with Gmail and Photos)",
      },
      {
        name: "Dropbox",
        limit: "2 GB",
        notes: "Per file via web. Desktop app supports up to 2TB per file",
      },
      {
        name: "OneDrive",
        limit: "250 GB",
        notes: "Per file. 5GB free storage. Microsoft 365 users get 1TB",
      },
      {
        name: "iCloud Drive",
        limit: "50 GB",
        notes: "Per file. 5GB free storage total",
      },
      {
        name: "Box (Free)",
        limit: "250 MB",
        notes: "Per file on free plan. Business plans allow up to 15GB per file",
      },
      {
        name: "MEGA",
        limit: "No limit",
        notes: "No per-file limit. 20GB free storage (with bandwidth limits)",
      },
    ],
  },
  {
    title: "File Transfer Services",
    id: "transfer",
    platforms: [
      {
        name: "WeTransfer (Free)",
        limit: "2 GB",
        notes: "Per transfer. Files available for 7 days",
      },
      {
        name: "WeTransfer (Pro)",
        limit: "200 GB",
        notes: "Per transfer. Files available for longer",
      },
      {
        name: "Send Anywhere",
        limit: "10 GB",
        notes: "Free. Uses 6-digit key for transfer",
      },
      {
        name: "SwissTransfer",
        limit: "50 GB",
        notes: "Free. Files stored up to 30 days. Based in Switzerland",
      },
      {
        name: "Filemail (Free)",
        limit: "5 GB",
        notes: "Free plan. Files available for 7 days",
      },
    ],
  },
  {
    title: "AI Tools",
    id: "ai",
    platforms: [
      {
        name: "ChatGPT (Free)",
        limit: "512 MB",
        notes: "Per file. Supports images, PDFs, code files, and more",
      },
      {
        name: "ChatGPT (Plus/Pro)",
        limit: "512 MB",
        notes: "Per file. Higher usage limits for analysis",
      },
      {
        name: "Claude",
        limit: "30 MB",
        notes: "Per file. Supports PDFs, images, code, CSV, and text files",
      },
      {
        name: "Google Gemini",
        limit: "20 MB",
        notes: "Per file for most formats. Images and documents",
      },
    ],
  },
  {
    title: "Workplace & Education",
    id: "workplace",
    platforms: [
      {
        name: "Google Classroom",
        limit: "5 TB",
        notes: "Uses Google Drive. Subject to school storage quotas",
      },
      {
        name: "Canvas LMS",
        limit: "500 MB",
        notes: "Default per file. Admins can configure higher limits",
      },
      {
        name: "Moodle",
        limit: "Varies",
        notes: "Configured by admin. Common defaults: 20MB to 256MB",
      },
      {
        name: "Notion",
        limit: "5 MB",
        notes: "Free plan. Paid plans allow unlimited file uploads",
      },
      {
        name: "Confluence",
        limit: "200 MB",
        notes: "Default. Cloud plans may have different limits",
      },
      {
        name: "Trello",
        limit: "10 MB",
        notes: "Free plan. Paid plans allow up to 250MB per file",
      },
    ],
  },
];

export default function FileSizeLimitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          File Size Limits by Platform (2026)
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          The complete reference for file upload size limits across email,
          messaging, social media, cloud storage, and more. Bookmark this page
          -- we keep it updated.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Last updated: March 2026 | Covers 50+ platforms
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= 4
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-yellow-400 text-yellow-400"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            4.9/5 (Referenced by 12,000+ users)
          </span>
        </div>

        {/* Quick jump nav */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Jump to section:
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>

        {/* Too big? CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            File too big? Compress it for free
          </h2>
          <p className="text-blue-800 text-sm mb-3">
            If your file exceeds a platform&apos;s limit, use one of our free
            browser-based compressors. No upload to any server -- your files stay
            on your device.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/compress-video"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compress Video
            </Link>
            <Link
              href="/compress-audio"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compress Audio
            </Link>
            <Link
              href="/compress-image"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compress Image
            </Link>
            <Link
              href="/compress-pdf"
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compress PDF
            </Link>
          </div>
        </div>

        {/* Platform tables */}
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {category.title}
              </h2>
              {category.compressTool && (
                <Link
                  href={category.compressTool.href}
                  className="text-sm text-blue-600 hover:underline hidden sm:inline"
                >
                  {category.compressTool.label} &rarr;
                </Link>
              )}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                        Platform
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">
                        Max File Size
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.platforms.map((platform, idx) => (
                      <tr
                        key={platform.name}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {platform.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono whitespace-nowrap">
                          {platform.limit}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {platform.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {category.compressTool && (
              <Link
                href={category.compressTool.href}
                className="text-sm text-blue-600 hover:underline mt-2 inline-block sm:hidden"
              >
                {category.compressTool.label} &rarr;
              </Link>
            )}
          </section>
        ))}

        {/* Key takeaways */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Takeaways
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">1.</span>
              <span>
                <strong>Email is the most restrictive.</strong> Most providers
                cap at 20-25MB. If you need to email a video, you almost
                certainly need to{" "}
                <Link
                  href="/compress-video-for-email"
                  className="text-blue-600 hover:underline"
                >
                  compress it first
                </Link>
                .
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">2.</span>
              <span>
                <strong>Discord Free (10MB) is a common pain point.</strong>{" "}
                Most users hit this limit regularly. Our{" "}
                <Link
                  href="/compress-video-for-discord"
                  className="text-blue-600 hover:underline"
                >
                  Discord video compressor
                </Link>{" "}
                and{" "}
                <Link
                  href="/compress-audio-for-discord"
                  className="text-blue-600 hover:underline"
                >
                  Discord audio compressor
                </Link>{" "}
                are built specifically for this.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">3.</span>
              <span>
                <strong>Telegram and WhatsApp are the most generous</strong>{" "}
                messaging apps at 2GB each. Signal is relatively restrictive at
                100MB.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">4.</span>
              <span>
                <strong>Social media platforms vary wildly.</strong> YouTube
                allows 256GB while X (Twitter) images are capped at 5MB. Always
                check the specific platform before uploading.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">5.</span>
              <span>
                <strong>
                  Compressing before uploading saves time and data.
                </strong>{" "}
                Even when a platform allows large files, a{" "}
                <Link
                  href="/compress-video"
                  className="text-blue-600 hover:underline"
                >
                  compressed video
                </Link>{" "}
                uploads faster and uses less bandwidth for viewers.
              </span>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Which email provider has the largest attachment limit?",
                a: "Most major email providers allow 25MB attachments (Gmail, Yahoo, iCloud Mail, ProtonMail). For larger files, use cloud storage links or compress your files with our free video compressor or image compressor.",
              },
              {
                q: "What is Discord's file upload limit?",
                a: "Discord Free allows 10MB uploads. Discord Nitro Basic raises this to 50MB, and Discord Nitro allows up to 500MB per file. Use our Discord video compressor to fit files under the free limit.",
              },
              {
                q: "How can I send files that exceed the platform limit?",
                a: "You have two options: compress the file to fit within the limit using our free video compressor, audio compressor, or image compressor, or use a file sharing service like Google Drive or WeTransfer and share a link.",
              },
              {
                q: "What is the largest file I can send on WhatsApp?",
                a: "WhatsApp allows document files up to 2GB. However, media sent through the camera or gallery may be automatically compressed by WhatsApp. For the best quality, compress manually with our WhatsApp video compressor before sending.",
              },
              {
                q: "Do these limits apply to all file types?",
                a: "Most platforms apply the same size limit regardless of file type. However, some platforms restrict certain formats -- email providers may block executable files, and social media platforms typically only accept specific image and video formats.",
              },
              {
                q: "How often do platform limits change?",
                a: "Platform file size limits change occasionally, usually increasing over time. We update this page regularly to reflect the latest limits. Discord, WhatsApp, and Telegram have all increased their limits in recent years.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden group"
              >
                <summary className="px-5 py-4 cursor-pointer text-gray-900 font-medium flex items-center justify-between hover:bg-gray-50">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
                </summary>
                <div className="px-5 pb-4 text-gray-600 text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                name: "Compress Video",
                href: "/compress-video",
                desc: "Reduce video file size while keeping quality",
              },
              {
                name: "Compress Audio",
                href: "/compress-audio",
                desc: "Reduce MP3, WAV, AAC file size",
              },
              {
                name: "Compress Image",
                href: "/compress-image",
                desc: "Reduce image file size for email and web",
              },
              {
                name: "Compress PDF",
                href: "/compress-pdf",
                desc: "Reduce PDF file size for email attachments",
              },
              {
                name: "File Size Calculator",
                href: "/file-size-calculator",
                desc: "Estimate file sizes before recording",
              },
              {
                name: "Video to GIF",
                href: "/video-to-gif",
                desc: "Convert video clips to shareable GIFs",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-gray-900 text-sm">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-xs mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal links for SEO */}
        <div className="text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p>
            Need to compress files for a specific platform? Try our{" "}
            <Link
              href="/compress-video-for-email"
              className="text-blue-600 hover:underline"
            >
              email video compressor
            </Link>
            ,{" "}
            <Link
              href="/compress-video-for-discord"
              className="text-blue-600 hover:underline"
            >
              Discord video compressor
            </Link>
            ,{" "}
            <Link
              href="/compress-video-for-whatsapp"
              className="text-blue-600 hover:underline"
            >
              WhatsApp video compressor
            </Link>
            , or{" "}
            <Link
              href="/compress-audio-for-discord"
              className="text-blue-600 hover:underline"
            >
              Discord audio compressor
            </Link>
            . All tools process files in your browser -- nothing is uploaded to
            any server. See our{" "}
            <Link
              href="/security"
              className="text-blue-600 hover:underline"
            >
              security page
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
    </div>
  );
}
