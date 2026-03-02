import Link from "next/link";

export default function VsIlovepdf() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FileToolWorks vs iLovePDF",
    description:
      "Compare FileToolWorks and iLovePDF for free online PDF tools.",
    url: "https://www.filetoolworks.com/vs/ilovepdf",
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
          name: "FileToolWorks vs iLovePDF",
          item: "https://www.filetoolworks.com/vs/ilovepdf",
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
          FileToolWorks vs iLovePDF
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Both offer free PDF tools online. Here is how they compare for
          merging, compressing, signing, and converting PDFs.
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
                  iLovePDF
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium">Price</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  100% Free
                </td>
                <td className="p-4 border-b">Free tier + Premium ($4/mo)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">Signup Required</td>
                <td className="p-4 border-b text-green-700 font-medium">No</td>
                <td className="p-4 border-b">No (but limited without account)</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Daily Limit</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  Unlimited
                </td>
                <td className="p-4 border-b">Limited tasks/day (free)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">Privacy</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  Files stay on your device
                </td>
                <td className="p-4 border-b">Uploaded to servers</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">PDF Tools</td>
                <td className="p-4 border-b">
                  10 PDF tools + 30 other tools
                </td>
                <td className="p-4 border-b">25+ PDF-specific tools</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 border-b font-medium">File Types</td>
                <td className="p-4 border-b">
                  PDF, Image, Video, Audio, Docs
                </td>
                <td className="p-4 border-b">PDF-focused only</td>
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Watermarks</td>
                <td className="p-4 border-b text-green-700 font-medium">
                  Never
                </td>
                <td className="p-4 border-b">None on free tier</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-4 font-medium">Desktop App</td>
                <td className="p-4">Web only</td>
                <td className="p-4">Yes (Windows/Mac)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Where FileToolWorks Wins</h2>
          <p>
            FileToolWorks handles PDFs entirely in your browser. When you{" "}
            <Link
              href="/merge-pdf"
              className="text-blue-600 hover:underline"
            >
              merge PDFs
            </Link>{" "}
            or{" "}
            <Link
              href="/sign-pdf"
              className="text-blue-600 hover:underline"
            >
              sign a PDF
            </Link>
            , the files never leave your computer. There are no daily task
            limits, no file size restrictions from server upload caps, and no
            features locked behind a paywall.
          </p>
          <p>
            FileToolWorks also goes beyond PDFs. You get image tools (
            <Link
              href="/remove-background"
              className="text-blue-600 hover:underline"
            >
              remove background
            </Link>
            ,{" "}
            <Link
              href="/resize-image"
              className="text-blue-600 hover:underline"
            >
              resize
            </Link>
            ), video tools (
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline"
            >
              compress
            </Link>
            ,{" "}
            <Link
              href="/trim-video"
              className="text-blue-600 hover:underline"
            >
              trim
            </Link>
            ), and audio tools (
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline"
            >
              compress
            </Link>
            ,{" "}
            <Link
              href="/trim-audio"
              className="text-blue-600 hover:underline"
            >
              trim
            </Link>
            ) in the same place.
          </p>

          <h2>Where iLovePDF Wins</h2>
          <p>
            iLovePDF is a PDF specialist. It offers more PDF-specific tools than
            FileToolWorks, including OCR text recognition, PDF page numbering,
            PDF repair, and PDF/A compliance conversion. If you work with PDFs
            all day and need advanced features, iLovePDF covers more edge cases.
          </p>
          <p>
            iLovePDF also has a desktop application for Windows and Mac, which is
            useful if you prefer offline software.
          </p>

          <h2>FileToolWorks PDF Tools</h2>
          <p>
            FileToolWorks covers the core PDF tasks most people need:
          </p>
          <ul>
            <li>
              <Link href="/merge-pdf" className="text-blue-600 hover:underline">
                Merge PDF
              </Link>{" "}
              - Combine multiple PDFs into one
            </li>
            <li>
              <Link href="/compress-pdf" className="text-blue-600 hover:underline">
                Compress PDF
              </Link>{" "}
              - Reduce PDF file size
            </li>
            <li>
              <Link href="/split-pdf" className="text-blue-600 hover:underline">
                Split PDF
              </Link>{" "}
              - Separate pages from a PDF
            </li>
            <li>
              <Link href="/extract-pdf-pages" className="text-blue-600 hover:underline">
                Extract PDF Pages
              </Link>{" "}
              - Pull specific pages
            </li>
            <li>
              <Link href="/sign-pdf" className="text-blue-600 hover:underline">
                Sign PDF
              </Link>{" "}
              - Add your signature
            </li>
            <li>
              <Link href="/pdf-to-text" className="text-blue-600 hover:underline">
                PDF to Text
              </Link>{" "}
              - Extract text content
            </li>
            <li>
              <Link href="/pdf-to-jpg" className="text-blue-600 hover:underline">
                PDF to JPG
              </Link>{" "}
              - Convert pages to images
            </li>
            <li>
              <Link href="/html-to-pdf" className="text-blue-600 hover:underline">
                HTML to PDF
              </Link>{" "}
              - Convert web pages
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <h3>Is FileToolWorks a full iLovePDF replacement?</h3>
          <p>
            For the most common PDF tasks (merge, compress, split, sign, extract
            pages, convert), yes. For advanced features like OCR or PDF/A
            compliance, iLovePDF has more options.
          </p>

          <h3>Are my PDFs private on FileToolWorks?</h3>
          <p>
            Yes. All PDF processing happens in your browser using JavaScript
            libraries like pdf-lib. Your files are never uploaded to any server.
          </p>

          <h3>Does iLovePDF have daily limits?</h3>
          <p>
            The free tier limits how many tasks you can run per day. Premium
            ($4/month) removes those limits. FileToolWorks has no limits at all.
          </p>

          <h3>Can FileToolWorks handle large PDFs?</h3>
          <p>
            Yes. Since processing happens locally, the main constraint is your
            browser memory. Most modern devices handle PDFs up to 100+ MB
            without issues.
          </p>

          <h3>Which is better for signing PDFs?</h3>
          <p>
            Both let you draw or upload a signature. FileToolWorks does it
            entirely in your browser for maximum privacy. iLovePDF processes on
            their servers.
          </p>

          <h3>Does FileToolWorks handle other file types?</h3>
          <p>
            Yes. Unlike iLovePDF which focuses only on PDFs, FileToolWorks
            offers 40+ tools for images, video, audio, and documents.
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
            href="/sign-pdf"
            className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
          >
            Try PDF Signer
          </Link>
        </div>
      </div>
    </div>
  );
}
