import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FileToolWorks. Report bugs, suggest features, or ask questions about our free online file tools.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            Have a question, found a bug, or want to suggest a new tool? We want
            to hear from you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            GitHub
          </h2>
          <p>
            The best way to report bugs or request features is through our
            GitHub repository:
          </p>
          <p>
            <a
              href="https://github.com/Bruscan/FileToolWorks/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/Bruscan/FileToolWorks/issues
            </a>
          </p>
          <p>
            Open an issue describing the problem or feature you would like to
            see. We review all submissions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Email
          </h2>
          <p>
            For general inquiries, partnerships, or questions not suited for
            GitHub:
          </p>
          <p>
            <a
              href="mailto:contact@filetoolworks.com"
              className="text-blue-600 hover:underline"
            >
              contact@filetoolworks.com
            </a>
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Frequently Asked Questions
          </h2>
          <p>
            Before reaching out, check if your question is answered on our tool
            pages. Each tool includes an FAQ section covering common questions
            about file formats, conversion quality, and privacy.
          </p>
          <p>
            You can also browse our{" "}
            <Link href="/blog" className="text-blue-600 hover:underline">
              blog
            </Link>{" "}
            for guides on file conversion, format comparisons, and tips for
            working with different file types.
          </p>
        </div>
      </div>
    </div>
  );
}
