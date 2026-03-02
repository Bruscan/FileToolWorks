import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FileToolWorks privacy policy. Your files are processed in your browser and never uploaded to our servers.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: March 1, 2026</p>
        <div className="prose prose-lg max-w-none text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Your Privacy Matters
          </h2>
          <p>
            FileToolWorks is built with privacy as a core principle. The vast
            majority of our tools process your files entirely in your browser
            using client-side JavaScript and WebAssembly. Your files never leave
            your device.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How File Processing Works
          </h2>
          <p>
            Our image, audio, video, and PDF tools run directly in your browser.
            When you upload a file to convert, compress, or edit, the processing
            happens on your computer. No file data is sent to any server. Once
            you close the browser tab, all file data is gone.
          </p>
          <p>
            A small number of tools (such as PDF to Word) require server-side
            processing. In those cases, your file is temporarily uploaded,
            processed, and immediately deleted. We do not store, log, or retain
            any uploaded files.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Analytics
          </h2>
          <p>
            We use Vercel Analytics to collect anonymous usage statistics such as
            page views and device type. This data does not identify you
            personally and contains no file content. We use it solely to
            understand which tools are popular and improve the site.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Cookies
          </h2>
          <p>
            FileToolWorks does not set any tracking cookies. We do not use
            advertising networks or third-party trackers. Vercel Analytics is
            cookie-free.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Third-Party Services
          </h2>
          <p>
            The site is hosted on Vercel. Some tools load WebAssembly modules
            (such as FFmpeg) from CDN providers. These requests are subject to
            those providers&apos; privacy policies, but no file content is shared
            with them.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, please reach out
            through our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
