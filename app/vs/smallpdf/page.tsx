import Link from "next/link";

export default function VsSmallpdf() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FileToolWorks vs Smallpdf",
    description:
      "Compare FileToolWorks and Smallpdf for free online file conversion and PDF tools.",
    url: "https://www.filetoolworks.com/vs/smallpdf",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.filetoolworks.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FileToolWorks vs Smallpdf",
          item: "https://www.filetoolworks.com/vs/smallpdf",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/tools"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; All Tools
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          FileToolWorks vs Smallpdf
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Smallpdf limits free users to 2 tasks per day. FileToolWorks has no
          limits at all. Here is the full comparison.
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4 font-semibold text-gray-700 border-b">
                  Feature
                </th>
                <th className="text-left p-4 font-semibold text-blue-700 border-b">
                  FileToolWorks
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 border-b">
                  Smallpdf
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium">Price</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  100% Free
                </td>
                <td className="p-4 border-b">Free tier + $9/mo Pro</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">Signup Required</td>
                <td className="p-4 border-b text-green-700 font-medium">No</td>
                <td className="p-4 border-b">No (but limited without account)</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">File Size Limit</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  None (browser-based)
                </td>
                <td className="p-4 border-b">5 MB (free tier)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">Daily Limit</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  Unlimited
                </td>
                <td className="p-4 border-b">2 tasks/day (free)</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Privacy</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  Files stay on your device
                </td>
                <td className="p-4 border-b">Uploaded to servers</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">Processing</td>
                <td className="p-4 border-b">Browser (WebAssembly)</td>
                <td className="p-4 border-b">Server-side</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Tool Count</td>
                <td className="p-4 border-b">40+ tools (all file types)</td>
                <td className="p-4 border-b">~30 tools (PDF-focused)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-medium">Ads</td>
                <td className="p-4 text-green-700 font-medium">None</td>
                <td className="p-4">Upsell prompts on free tier</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Where FileToolWorks Wins</h2>
          <p>
            The biggest difference is limits. Smallpdf caps free users at 2
            tasks per day with a 5 MB file size limit. FileToolWorks has no
            daily cap, no file size restriction, and no upsell walls. You can
            convert 50 files in a row without hitting a paywall.
          </p>
          <p>
            FileToolWorks also covers more ground. Beyond PDF tools, you get
            image converters (
            <Link
              href="/png-to-jpg"
              className="text-blue-600 hover:underline"
            >
              PNG to JPG
            </Link>
            ,{" "}
            <Link
              href="/remove-background"
              className="text-blue-600 hover:underline"
            >
              background remover
            </Link>
            ), video tools (
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline"
            >
              compress video
            </Link>
            ,{" "}
            <Link
              href="/video-to-gif"
              className="text-blue-600 hover:underline"
            >
              video to GIF
            </Link>
            ), and audio tools (
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline"
            >
              audio compressor
            </Link>
            ,{" "}
            <Link
              href="/wav-to-mp3"
              className="text-blue-600 hover:underline"
            >
              WAV to MP3
            </Link>
            ). Smallpdf is PDF-only.
          </p>

          <h2>Where Smallpdf Wins</h2>
          <p>
            Smallpdf has deeper PDF features. OCR (optical character
            recognition), PDF editing with text and shape tools, and eSign
            workflows with multiple signers are all available on paid plans.
            If you need advanced PDF editing or team-based document signing,
            Smallpdf has more mature features.
          </p>
          <p>
            Smallpdf also has desktop and mobile apps for offline use, plus
            integrations with Google Drive and Dropbox that FileToolWorks
            does not offer.
          </p>

          <h2>Who Should Use FileToolWorks</h2>
          <p>
            Choose FileToolWorks if you hit Smallpdf&apos;s 2-task daily limit
            and do not want to pay $9/month. FileToolWorks handles the PDF
            tasks most people need:{" "}
            <Link
              href="/merge-pdf"
              className="text-blue-600 hover:underline"
            >
              merge PDFs
            </Link>
            ,{" "}
            <Link
              href="/compress-pdf"
              className="text-blue-600 hover:underline"
            >
              compress PDFs
            </Link>
            ,{" "}
            <Link
              href="/extract-pdf-pages"
              className="text-blue-600 hover:underline"
            >
              extract pages
            </Link>
            ,{" "}
            <Link
              href="/sign-pdf"
              className="text-blue-600 hover:underline"
            >
              sign PDFs
            </Link>
            , and{" "}
            <Link
              href="/pdf-to-text"
              className="text-blue-600 hover:underline"
            >
              extract text
            </Link>
            . Plus you get 30+ tools for images, video, and audio that
            Smallpdf does not have.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Is FileToolWorks really free?</h3>
          <p>
            Yes. Every tool is free with no daily limits, no file size caps, and
            no paid tiers. There is nothing to upgrade to.
          </p>

          <h3>Why does Smallpdf limit free users to 2 tasks?</h3>
          <p>
            Smallpdf processes files on their servers, which costs them money
            per conversion. The limit pushes users toward the $9/month Pro
            plan. FileToolWorks avoids this by processing in your browser.
          </p>

          <h3>Can FileToolWorks do OCR like Smallpdf?</h3>
          <p>
            Not yet. FileToolWorks extracts selectable text from PDFs but does
            not perform OCR on scanned documents. If you need OCR, Smallpdf
            Pro is the better choice.
          </p>

          <h3>Which is more private?</h3>
          <p>
            FileToolWorks. Your files never leave your device. Smallpdf uploads
            files to their servers for processing and deletes them after a set
            period.
          </p>

          <h3>Does Smallpdf have image or video tools?</h3>
          <p>
            No. Smallpdf is focused entirely on PDFs. FileToolWorks covers
            images, video, audio, and documents in addition to PDF tools.
          </p>

          <h3>Which is faster for PDF tasks?</h3>
          <p>
            For typical PDF operations like merging or compressing, both are
            fast. FileToolWorks skips the upload step entirely since processing
            happens locally, which saves time on slower connections.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Browse All 40+ Tools
          </Link>
          <Link
            href="/merge-pdf"
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
          >
            Try PDF Merger
          </Link>
          <Link
            href="/compress-audio"
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
          >
            Try Audio Compressor
          </Link>
        </div>
      </div>
    </div>
  );
}
