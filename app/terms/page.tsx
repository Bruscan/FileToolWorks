import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FileToolWorks",
  description:
    "FileToolWorks terms of service. Free online file conversion tools with no signup required.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: March 1, 2026</p>
        <div className="prose prose-lg max-w-none text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Overview
          </h2>
          <p>
            FileToolWorks provides free online tools for file conversion,
            compression, and editing. By using our site, you agree to these
            terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Use of Service
          </h2>
          <p>
            All tools on FileToolWorks are free to use with no account or signup
            required. You may use them for personal and commercial purposes. You
            are responsible for the files you process and the content they
            contain.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            No Warranty
          </h2>
          <p>
            FileToolWorks is provided &quot;as is&quot; without warranty of any
            kind. While we strive for accuracy and reliability, we cannot
            guarantee that conversions will be perfect in every case. Always keep
            backup copies of your original files.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            File Processing
          </h2>
          <p>
            Most tools process files entirely in your browser. For tools that
            require server processing, files are processed temporarily and
            immediately deleted. We do not store, access, or share your files.
            See our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Limitations
          </h2>
          <p>
            File size limits depend on your browser and device capabilities. For
            server-side tools, the maximum file size is 50MB. We reserve the
            right to limit usage to prevent abuse.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Intellectual Property
          </h2>
          <p>
            You retain all rights to your files. FileToolWorks does not claim
            ownership of any content you process through our tools.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            FileToolWorks after changes constitutes acceptance of the updated
            terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Contact
          </h2>
          <p>
            Questions about these terms? Visit our{" "}
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
