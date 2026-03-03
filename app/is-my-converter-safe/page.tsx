"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    id: "processing",
    question: "Where does the file get processed?",
    options: [
      { label: "In your browser (client-side)", score: 10, color: "green" },
      { label: "Uploaded to a server", score: 3, color: "yellow" },
      { label: "Requires downloading software", score: 0, color: "red" },
      { label: "Not sure", score: 2, color: "yellow" },
    ],
  },
  {
    id: "signup",
    question: "Does it require creating an account?",
    options: [
      { label: "No account needed", score: 10, color: "green" },
      { label: "Optional account", score: 7, color: "green" },
      { label: "Required signup", score: 3, color: "yellow" },
      { label: "Requires payment info", score: 0, color: "red" },
    ],
  },
  {
    id: "ads",
    question: "Does it show ads or pop-ups?",
    options: [
      { label: "No ads at all", score: 10, color: "green" },
      { label: "Minimal banner ads", score: 6, color: "yellow" },
      { label: "Aggressive pop-ups or redirects", score: 0, color: "red" },
      { label: "Not sure", score: 3, color: "yellow" },
    ],
  },
  {
    id: "download",
    question: "What do you download after conversion?",
    options: [
      { label: "Just the converted file", score: 10, color: "green" },
      { label: "A ZIP containing the file", score: 7, color: "yellow" },
      { label: "An executable (.exe, .dmg, .app)", score: 0, color: "red" },
      { label: "Not sure", score: 2, color: "yellow" },
    ],
  },
  {
    id: "https",
    question: "Does the site use HTTPS (padlock icon)?",
    options: [
      { label: "Yes, HTTPS with padlock", score: 10, color: "green" },
      { label: "No, HTTP only", score: 0, color: "red" },
      { label: "Not sure", score: 3, color: "yellow" },
    ],
  },
  {
    id: "retention",
    question: "How long does the site keep your files?",
    options: [
      { label: "Files never leave my device", score: 10, color: "green" },
      { label: "Deleted immediately after conversion", score: 7, color: "green" },
      { label: "Deleted within hours", score: 5, color: "yellow" },
      { label: "Not sure / no clear policy", score: 1, color: "red" },
    ],
  },
  {
    id: "watermark",
    question: "Does it add watermarks to converted files?",
    options: [
      { label: "No watermarks", score: 10, color: "green" },
      { label: "Watermarks on free tier", score: 4, color: "yellow" },
      { label: "Always adds watermarks", score: 1, color: "red" },
    ],
  },
  {
    id: "limits",
    question: "Are there file size or usage limits?",
    options: [
      { label: "No limits", score: 10, color: "green" },
      { label: "Reasonable limits (100MB+)", score: 7, color: "green" },
      { label: "Strict limits pushing paid upgrade", score: 3, color: "yellow" },
    ],
  },
  {
    id: "privacy",
    question: "Does the site have a clear privacy policy?",
    options: [
      { label: "Yes, clear and transparent", score: 10, color: "green" },
      { label: "Vague or hard to find", score: 3, color: "yellow" },
      { label: "No privacy policy", score: 0, color: "red" },
    ],
  },
  {
    id: "reputation",
    question: "Is the tool from a known, established source?",
    options: [
      { label: "Well-known tool with good reputation", score: 10, color: "green" },
      { label: "Newer tool but seems legitimate", score: 6, color: "yellow" },
      { label: "Unknown source, no company info", score: 1, color: "red" },
      { label: "Not sure", score: 3, color: "yellow" },
    ],
  },
];

const preScored = [
  { name: "FileToolWorks", url: "/tools", score: 98, processing: "Browser", badge: "Recommended" },
  { name: "VERT.sh", url: null, score: 95, processing: "Browser", badge: null },
  { name: "CloudConvert", url: null, score: 72, processing: "Server", badge: null },
  { name: "Convertio", url: null, score: 68, processing: "Server", badge: null },
  { name: "Zamzar", url: null, score: 65, processing: "Server", badge: null },
  { name: "iLovePDF", url: null, score: 70, processing: "Server", badge: null },
  { name: "Smallpdf", url: null, score: 69, processing: "Server", badge: null },
  { name: "FreeConvert", url: null, score: 66, processing: "Server", badge: null },
  { name: "Online-Convert", url: null, score: 64, processing: "Server", badge: null },
];

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-green-100 border-green-300";
  if (score >= 50) return "bg-yellow-100 border-yellow-300";
  return "bg-red-100 border-red-300";
}

function getScoreLabel(score: number) {
  if (score >= 90) return "Excellent - Very Safe";
  if (score >= 80) return "Good - Generally Safe";
  if (score >= 60) return "Fair - Some Concerns";
  if (score >= 40) return "Poor - Significant Risks";
  return "Dangerous - Avoid";
}

function getScoreEmoji(score: number) {
  if (score >= 80) return "";
  if (score >= 50) return "";
  return "";
}

export default function SafetyCheckerPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    setShowResult(false);
  };

  const handleCheckScore = () => {
    setShowResult(true);
    const el = document.getElementById("result");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          Is My File Converter Safe?
        </h1>
        <p className="text-gray-600 mb-2">Free interactive safety checker</p>
        <p className="text-gray-700 mb-8">
          In March 2025, the{" "}
          <strong>FBI warned that criminals were using fake file converters</strong>{" "}
          to distribute malware, ransomware, and spyware. The tools worked as
          advertised but secretly installed malicious software. Use this checker
          to evaluate whether the file converter you are using is safe.
        </p>

        {/* Safety Checklist */}
        <div className="space-y-6 mb-8">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-lg border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-3">
                {idx + 1}. {q.question}
              </p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleAnswer(q.id, opt.score)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      answers[q.id] === opt.score
                        ? opt.color === "green"
                          ? "bg-green-100 border-green-500 text-green-800"
                          : opt.color === "yellow"
                          ? "bg-yellow-100 border-yellow-500 text-yellow-800"
                          : "bg-red-100 border-red-500 text-red-800"
                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Check Score Button */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-3">
            {answeredCount} of {questions.length} questions answered
          </p>
          <button
            onClick={handleCheckScore}
            disabled={answeredCount < 5}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
              answeredCount >= 5
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Check Safety Score
          </button>
          {answeredCount < 5 && (
            <p className="text-gray-500 text-sm mt-2">
              Answer at least 5 questions to get a score
            </p>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div id="result" className={`rounded-lg border-2 p-8 mb-8 text-center ${getScoreBg(percentage)}`}>
            <p className="text-6xl font-bold mb-2">
              <span className={getScoreColor(percentage)}>{percentage}</span>
              <span className="text-gray-400 text-3xl">/100</span>
            </p>
            <p className={`text-xl font-semibold mb-4 ${getScoreColor(percentage)}`}>
              {getScoreLabel(percentage)}
            </p>

            {percentage < 60 && (
              <div className="bg-white rounded-lg p-4 mt-4 text-left">
                <p className="font-semibold text-red-700 mb-2">
                  Warning: This converter may not be safe
                </p>
                <p className="text-gray-700 text-sm">
                  Based on your answers, this file converter shows concerning
                  signs. The FBI has warned about tools that upload files to
                  unknown servers, require software downloads, or show aggressive
                  ads. Consider switching to a browser-based converter that
                  processes files locally on your device.
                </p>
              </div>
            )}

            {percentage >= 60 && percentage < 80 && (
              <div className="bg-white rounded-lg p-4 mt-4 text-left">
                <p className="font-semibold text-yellow-700 mb-2">
                  Fair: Some areas could be improved
                </p>
                <p className="text-gray-700 text-sm">
                  This converter appears mostly legitimate but has some privacy
                  or security concerns. For maximum safety, consider using a
                  tool that processes files entirely in your browser without
                  uploading anything to servers.
                </p>
              </div>
            )}

            {percentage >= 80 && (
              <div className="bg-white rounded-lg p-4 mt-4 text-left">
                <p className="font-semibold text-green-700 mb-2">
                  Good: This converter appears safe
                </p>
                <p className="text-gray-700 text-sm">
                  Based on your answers, this file converter follows good
                  security practices. Browser-based tools that process files
                  locally are the safest option since your files never leave your
                  device.
                </p>
              </div>
            )}

            <button
              onClick={handleReset}
              className="mt-4 text-blue-600 hover:underline text-sm"
            >
              Check another converter
            </button>
          </div>
        )}

        {/* Pre-scored Converters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Popular Converter Safety Scores
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            We evaluated popular file converters against the same 10 criteria. Browser-based tools score highest because your files never leave your device.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4">Converter</th>
                  <th className="text-left py-2 pr-4">Processing</th>
                  <th className="text-right py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {preScored.map((tool) => (
                  <tr key={tool.name} className="border-b border-gray-100">
                    <td className="py-2 pr-4">
                      {tool.url ? (
                        <Link href={tool.url} className="text-blue-600 hover:underline font-medium">
                          {tool.name}
                        </Link>
                      ) : (
                        <span className="font-medium">{tool.name}</span>
                      )}
                      {tool.badge && (
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {tool.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          tool.processing === "Browser"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {tool.processing}
                      </span>
                    </td>
                    <td className={`py-2 text-right font-semibold ${getScoreColor(tool.score)}`}>
                      {tool.score}/100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FBI Warning Section */}
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What Did the FBI Warn About?
          </h2>
          <p>
            In March 2025, the FBI Denver Field Office issued a public warning about free
            online file converters that distribute malware. The warning stated that
            criminals create legitimate-looking converter tools that actually install
            ransomware, keyloggers, or crypto miners on victims&apos; computers.
          </p>
          <p>
            The FBI specifically warned about tools that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Require downloading and installing software on your computer</li>
            <li>Upload your files to unknown servers</li>
            <li>Show aggressive ads, pop-ups, or redirects</li>
            <li>Request unnecessary permissions or personal information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How to Stay Safe
          </h2>
          <p>
            The safest file converters process everything in your browser. Your files
            never leave your device, there is nothing to install, and no data passes
            through third-party servers. Look for tools that explicitly state they use
            client-side or browser-based processing.
          </p>
          <p>
            Read more about how browser-based processing works on our{" "}
            <Link href="/security" className="text-blue-600 hover:underline">
              security page
            </Link>
            , or see a{" "}
            <Link href="/privacy-comparison" className="text-blue-600 hover:underline">
              side-by-side privacy comparison
            </Link>{" "}
            of 15 popular file converters.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Use a Safe File Converter
          </h3>
          <p className="text-gray-700 mb-4">
            FileToolWorks processes all files in your browser. No uploads, no
            servers, no risk. 40+ free tools for images, PDFs, videos, audio, and
            documents.
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
              href="/tools"
              className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 text-sm font-medium"
            >
              View All 40+ Tools
            </Link>
          </div>
        </div>

        {/* FAQ for SEO */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                Are free file converters safe to use?
              </h3>
              <p className="text-gray-700 text-sm">
                It depends on how they work. Browser-based converters that process files locally on your device are safe because your files never leave your computer. Server-based converters carry more risk since your files pass through third-party servers. The FBI has warned about malicious converters that install malware, so always verify how a tool processes your files before using it.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                What did the FBI say about file converters?
              </h3>
              <p className="text-gray-700 text-sm">
                In March 2025, the FBI Denver Field Office warned that criminals were creating fake file converter websites and software that secretly installed ransomware, keyloggers, and other malware. The converters appeared to work normally, but the downloaded files or installed software contained hidden threats.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                How can I tell if a file converter is safe?
              </h3>
              <p className="text-gray-700 text-sm">
                Check if the tool processes files in your browser (client-side) rather than uploading them to servers. Look for HTTPS, a clear privacy policy, no required downloads, and no aggressive ads or pop-ups. Use our safety checker above to evaluate any converter against 10 security criteria.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                What is a browser-based file converter?
              </h3>
              <p className="text-gray-700 text-sm">
                A browser-based (client-side) file converter runs entirely in your web browser using JavaScript and WebAssembly. Your files are read, processed, and converted without ever being uploaded to a server. This is the safest type of file converter because your data never leaves your device. FileToolWorks uses this approach for all 40+ of its tools.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is Convertio safe?
              </h3>
              <p className="text-gray-700 text-sm">
                Convertio is a legitimate service, but it uploads your files to their servers for processing. They state files are deleted within 24 hours. If you are handling sensitive documents, consider using a browser-based converter instead where files never leave your device. See our{" "}
                <Link href="/vs/convertio" className="text-blue-600 hover:underline">FileToolWorks vs Convertio comparison</Link>{" "}
                for a detailed breakdown.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is Zamzar safe?
              </h3>
              <p className="text-gray-700 text-sm">
                Zamzar is a well-established converter, but it uploads files to their servers and shares data with third parties according to their privacy policy. Files are stored for up to seven days. For maximum privacy, use a tool that processes files locally in your browser. See our{" "}
                <Link href="/vs/zamzar" className="text-blue-600 hover:underline">FileToolWorks vs Zamzar comparison</Link>{" "}
                for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
