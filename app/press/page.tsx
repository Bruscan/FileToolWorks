import Link from "next/link";
import { Metadata } from "next";
import { Shield, Globe, Zap, Lock, FileAudio, FileImage, FileText, Film, Archive } from "lucide-react";

export const metadata: Metadata = {
  title: "Press Kit & Media Resources | FileToolWorks",
  description:
    "Press kit for FileToolWorks. Free browser-based file conversion tools that process files locally. No uploads, no signup. Media resources, key facts, and contact.",
  alternates: {
    canonical: "https://www.filetoolworks.com/press",
  },
};

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Press Kit & Media Resources
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Everything journalists, bloggers, and researchers need to write about FileToolWorks.
        </p>

        {/* Quick Facts */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">40+ Free Tools</p>
                <p className="text-sm text-gray-600">Image, PDF, video, audio, and document conversion tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">100% Client-Side Processing</p>
                <p className="text-sm text-gray-600">Files never leave your browser. Zero server uploads.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">No Signup Required</p>
                <p className="text-sm text-gray-600">No account, no email, no payment. Just convert.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Built With Modern Web Tech</p>
                <p className="text-sm text-gray-600">WebAssembly (FFmpeg), Canvas API, pdf-lib, Tesseract.js</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Story */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Story</h2>
          <p className="text-gray-700 mb-4">
            FileToolWorks was built because most online file converters have a fundamental problem: they require
            you to upload your files to their servers. Your tax documents, personal photos, confidential contracts,
            and private recordings all pass through someone else&apos;s infrastructure.
          </p>
          <p className="text-gray-700 mb-4">
            In March 2025, the{" "}
            <Link href="/security" className="text-blue-600 hover:underline">
              FBI issued a public warning
            </Link>{" "}
            about fake file conversion websites distributing malware. Attackers create sites that look like
            legitimate converters but install ransomware, steal credentials, or harvest personal data from
            uploaded files.
          </p>
          <p className="text-gray-700">
            FileToolWorks eliminates this risk entirely. Every tool processes files directly in your browser
            using technologies like WebAssembly and the Canvas API. Files never leave your device. There is no
            upload, no server processing, and no way for anyone (including us) to access your files.
          </p>
        </section>

        {/* How It Works (Technical) */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Client-Side Processing Works</h2>
          <p className="text-gray-700 mb-4">
            Unlike traditional file converters that upload files to remote servers, FileToolWorks runs
            conversion logic entirely in your browser tab:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">Category</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">Technology</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">What It Does</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Video & Audio</td>
                  <td className="p-3 text-gray-700">FFmpeg compiled to WebAssembly</td>
                  <td className="p-3 text-gray-600">Compress, convert, trim, and extract media formats</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Images</td>
                  <td className="p-3 text-gray-700">Canvas API + ImageData</td>
                  <td className="p-3 text-gray-600">Convert, resize, crop, rotate, sharpen, blur images</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">PDFs</td>
                  <td className="p-3 text-gray-700">pdf-lib + jsPDF</td>
                  <td className="p-3 text-gray-600">Merge, split, extract, sign, and create PDFs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Background Removal</td>
                  <td className="p-3 text-gray-700">@imgly/background-removal (WASM ML)</td>
                  <td className="p-3 text-gray-600">AI-powered background removal in the browser</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-700">OCR / Text Extraction</td>
                  <td className="p-3 text-gray-700">Tesseract.js (WASM)</td>
                  <td className="p-3 text-gray-600">Extract text from images locally</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            You can verify this yourself: open your browser&apos;s Network tab while using any tool. You will
            see zero file upload requests. All processing happens in your browser&apos;s memory.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">FileToolWorks vs Traditional Converters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">Feature</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">FileToolWorks</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border-b">Server-Upload Converters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">File processing</td>
                  <td className="p-3 text-green-700 font-medium">In your browser</td>
                  <td className="p-3 text-red-700">On their servers</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Files uploaded</td>
                  <td className="p-3 text-green-700 font-medium">Never</td>
                  <td className="p-3 text-red-700">Always</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Account required</td>
                  <td className="p-3 text-green-700 font-medium">No</td>
                  <td className="p-3 text-red-700">Usually yes</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Data retention</td>
                  <td className="p-3 text-green-700 font-medium">None (files stay on your device)</td>
                  <td className="p-3 text-red-700">Hours to days on their servers</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-gray-700">Malware risk</td>
                  <td className="p-3 text-green-700 font-medium">None (no downloads from server)</td>
                  <td className="p-3 text-red-700">Possible (FBI warning, March 2025)</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-700">Works offline</td>
                  <td className="p-3 text-green-700 font-medium">After initial page load</td>
                  <td className="p-3 text-red-700">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            For a detailed comparison of 21 file converters, see our{" "}
            <Link href="/privacy-comparison" className="text-blue-600 hover:underline">
              privacy comparison page
            </Link>.
          </p>
        </section>

        {/* Tool Categories */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tool Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileImage className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Image Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Convert, compress, resize, crop, rotate, sharpen, blur, remove backgrounds. Supports PNG, JPG, WebP, HEIC, SVG.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">PDF Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Merge, split, extract pages, compress, sign, convert to/from images and text. 10 PDF tools.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Film className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Video Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Compress, trim, convert formats (MP4, WebM, MOV, MKV, AVI, GIF). FFmpeg-powered.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileAudio className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Audio Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Compress, trim, convert formats (MP3, WAV, FLAC, M4A, AAC, OGG). Extract audio from video.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Document Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Word to PDF, Excel to PDF, PowerPoint to PDF. Office document conversion.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Archive className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Archive Tools</h3>
              </div>
              <p className="text-sm text-gray-600">
                Create and extract ZIP files. Client-side compression with JSZip.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            See the{" "}
            <Link href="/tools" className="text-blue-600 hover:underline">
              complete tool directory
            </Link>{" "}
            for all 40+ tools.
          </p>
        </section>

        {/* Suggested Story Angles */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Angles</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">The Safe Alternative to Fake Converters</h3>
              <p className="text-sm text-gray-600">
                After the FBI warned about malicious file converters spreading malware, FileToolWorks offers
                a verifiably safe alternative. Client-side processing means there is nothing to intercept,
                no server to hack, and no files to steal.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900">WebAssembly Makes Desktop-Quality Tools Run in Browsers</h3>
              <p className="text-sm text-gray-600">
                FileToolWorks demonstrates how WebAssembly is changing what browsers can do. FFmpeg, a tool
                traditionally requiring command-line expertise, now runs in a browser tab and compresses video
                files without any server infrastructure.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900">Privacy-First Web Tools for a Post-Upload World</h3>
              <p className="text-sm text-gray-600">
                In an era of data breaches and surveillance, FileToolWorks proves that powerful web tools
                do not need to collect user data. Zero accounts, zero uploads, zero tracking of file contents.
              </p>
            </div>
          </div>
        </section>

        {/* Quotable */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
          <div className="space-y-4">
            <blockquote className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
              <p className="text-gray-700 italic">
                &ldquo;Your files never leave your browser. We built every tool to process data locally
                using WebAssembly and JavaScript APIs. There is no upload step, no server-side processing,
                and no way for us to see what you convert.&rdquo;
              </p>
            </blockquote>
            <blockquote className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
              <p className="text-gray-700 italic">
                &ldquo;After the FBI warned about fake converter sites, we wanted to build something
                that people could use with confidence. If your files never leave your device, there is
                nothing to intercept.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>

        {/* Links & Resources */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Links & Resources</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Website:</span>{" "}
              <a href="https://www.filetoolworks.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                www.filetoolworks.com
              </a>
            </li>
            <li>
              <span className="font-medium">All Tools:</span>{" "}
              <Link href="/tools" className="text-blue-600 hover:underline">
                filetoolworks.com/tools
              </Link>
            </li>
            <li>
              <span className="font-medium">Privacy Comparison (21 converters):</span>{" "}
              <Link href="/privacy-comparison" className="text-blue-600 hover:underline">
                filetoolworks.com/privacy-comparison
              </Link>
            </li>
            <li>
              <span className="font-medium">Security & Safety:</span>{" "}
              <Link href="/security" className="text-blue-600 hover:underline">
                filetoolworks.com/security
              </Link>
            </li>
            <li>
              <span className="font-medium">Is My Converter Safe? (Checker):</span>{" "}
              <Link href="/is-my-converter-safe" className="text-blue-600 hover:underline">
                filetoolworks.com/is-my-converter-safe
              </Link>
            </li>
            <li>
              <span className="font-medium">GitHub:</span>{" "}
              <a href="https://github.com/Bruscan/FileToolWorks" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                github.com/Bruscan/FileToolWorks
              </a>
            </li>
            <li>
              <span className="font-medium">Embed Our Tools:</span>{" "}
              <Link href="/free-tools-widget" className="text-blue-600 hover:underline">
                filetoolworks.com/free-tools-widget
              </Link>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-blue-50 rounded-xl border border-blue-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Contact</h2>
          <p className="text-gray-700 mb-4">
            For press inquiries, interviews, or to request additional information:
          </p>
          <p className="text-gray-700">
            Visit our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              contact page
            </Link>{" "}
            or email us. We typically respond within 24 hours.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            You are free to reference any information on this page in your articles. No permission needed
            for factual reporting about FileToolWorks.
          </p>
        </section>
      </div>
    </div>
  );
}
