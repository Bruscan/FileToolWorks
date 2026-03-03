import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is FileToolWorks Safe? How We Protect Your Files",
  description:
    "FileToolWorks processes files in your browser. No uploads, no servers, no risk. Learn how client-side processing keeps your files safe from malware and data theft.",
  alternates: {
    canonical: "https://www.filetoolworks.com/security",
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Are Free File Converters Safe? How FileToolWorks Protects Your Files
        </h1>
        <p className="text-gray-600 mb-8">Last updated: March 3, 2026</p>
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            In March 2025, the FBI warned that criminals were using free online
            file converters to distribute malware. The tools looked legitimate
            but secretly installed ransomware, spyware, or crypto miners on
            users&apos; computers. The warning was clear: be careful which file
            converters you trust.
          </p>
          <p>
            FileToolWorks takes a fundamentally different approach.{" "}
            <strong>
              Your files never leave your device.
            </strong>{" "}
            All processing happens inside your browser using JavaScript and
            WebAssembly. There is nothing to upload, nothing to intercept, and
            nothing stored on a server.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How Client-Side Processing Works
          </h2>
          <p>
            When you use a tool like our{" "}
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline"
            >
              audio compressor
            </Link>{" "}
            or{" "}
            <Link
              href="/remove-background"
              className="text-blue-600 hover:underline"
            >
              background remover
            </Link>
            , the file stays on your computer the entire time. Your browser
            reads the file, processes it using built-in web APIs or WebAssembly
            modules (like FFmpeg compiled to WASM), and gives you the result.
            The internet is never involved in the actual conversion.
          </p>
          <p>
            This means:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No upload</strong> - Your file never touches our servers
              or any third-party server
            </li>
            <li>
              <strong>No interception</strong> - There is no network transfer
              that could be intercepted
            </li>
            <li>
              <strong>No storage</strong> - Nothing is saved anywhere. Close the
              tab and all data is gone
            </li>
            <li>
              <strong>No malware risk</strong> - You download only the file you
              created, not an executable
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How to Verify This Yourself
          </h2>
          <p>
            You do not have to take our word for it. Open your browser&apos;s
            developer tools (F12), go to the Network tab, and use any of our
            tools. You will see that no file data leaves your browser. The only
            network requests are for loading the page itself and, in some cases,
            downloading a WASM processing module (like FFmpeg).
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Which Tools Use Server Processing?
          </h2>
          <p>
            One tool requires server-side processing:{" "}
            <Link
              href="/word-to-pdf"
              className="text-blue-600 hover:underline"
            >
              Word to PDF
            </Link>{" "}
            (complex DOCX rendering needs Python libraries not available in
            browsers). For this tool, your file is temporarily uploaded,
            converted, and immediately deleted. No files are stored or logged.
          </p>
          <p>
            Every other tool on FileToolWorks - all 40+ of them - runs entirely
            in your browser. This includes:{" "}
            <Link
              href="/compress-video"
              className="text-blue-600 hover:underline"
            >
              video compression
            </Link>
            ,{" "}
            <Link
              href="/merge-pdf"
              className="text-blue-600 hover:underline"
            >
              PDF merging
            </Link>
            ,{" "}
            <Link
              href="/image-to-pdf"
              className="text-blue-600 hover:underline"
            >
              image to PDF
            </Link>
            ,{" "}
            <Link
              href="/video-to-gif"
              className="text-blue-600 hover:underline"
            >
              video to GIF
            </Link>
            , and everything else.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What Makes a File Converter Dangerous?
          </h2>
          <p>
            The FBI warning specifically called out file converters that require
            you to download and install software. These installers can bundle
            malware alongside the converter. Server-based converters carry a
            different risk: your files pass through a third-party server where
            they could be stored, scanned, or leaked.
          </p>
          <p>
            Browser-based tools like FileToolWorks avoid both risks. There is
            nothing to install, and no file data leaves your device.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Technical Details
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Image tools</strong> use the Canvas API and native browser
              image decoding
            </li>
            <li>
              <strong>Video and audio tools</strong> use FFmpeg compiled to
              WebAssembly, running entirely in-browser
            </li>
            <li>
              <strong>PDF tools</strong> use pdf-lib and jsPDF, both
              client-side JavaScript libraries
            </li>
            <li>
              <strong>Background removal</strong> uses a machine learning model
              that runs via WebAssembly in your browser
            </li>
            <li>
              <strong>ZIP tools</strong> use JSZip for client-side
              compression and extraction
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            No Account, No Tracking, No Ads
          </h2>
          <p>
            FileToolWorks does not require signup. There are no ads, no
            watermarks, and no file size limits. We use cookie-free Vercel
            Analytics for anonymous page view counts. That is the extent of our
            data collection.
          </p>
          <p>
            For full details, see our{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>

          <p className="mt-6">
            Not sure if your current converter is safe? Try our{" "}
            <Link
              href="/is-my-converter-safe"
              className="text-blue-600 hover:underline"
            >
              converter safety checker
            </Link>{" "}
            to get an instant risk score.
          </p>

          <p className="mt-6">
            Want to see how other file converters compare on privacy? Check our{" "}
            <Link
              href="/privacy-comparison"
              className="text-blue-600 hover:underline"
            >
              file converter privacy comparison
            </Link>{" "}
            for a side-by-side breakdown of 15 services. Journalists and bloggers
            can find ready-to-use information on our{" "}
            <Link
              href="/press"
              className="text-blue-600 hover:underline"
            >
              press kit page
            </Link>
            .
          </p>

          <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Try It Yourself
            </h3>
            <p className="text-gray-700 mb-4">
              Our most popular tools, all 100% browser-based:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compress-audio"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                Compress Audio
              </Link>
              <Link
                href="/remove-background"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                Remove Background
              </Link>
              <Link
                href="/merge-pdf"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                Merge PDF
              </Link>
              <Link
                href="/compress-video"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                Compress Video
              </Link>
              <Link
                href="/sign-pdf"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                Sign PDF
              </Link>
              <Link
                href="/tools"
                className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
              >
                View All 40+ Tools &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
