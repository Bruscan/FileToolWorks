import Link from "next/link";

const converters = [
  {
    name: "FileToolWorks",
    url: "https://www.filetoolworks.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "40+",
    note: "FFmpeg WASM, pdf-lib, Canvas API",
  },
  {
    name: "VERT.sh",
    url: "https://vert.sh",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "~20",
    note: "WebAssembly-based, open source",
  },
  {
    name: "FileForge",
    url: "https://convertfiles.github.io",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "~40",
    note: "Browser-based, no server",
  },
  {
    name: "SafeConvert",
    url: "https://www.safeconvert.net",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~30",
    note: "100% browser-based, images/docs/audio/video",
  },
  {
    name: "OfflineConvert",
    url: "https://www.offlineconvert.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~30",
    note: "WebAssembly-based, works offline after loading",
  },
  {
    name: "ezyZip",
    url: "https://www.ezyzip.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~50",
    note: "Archive and conversion tools, browser-based",
  },
  {
    name: "Convertio",
    url: "https://convertio.co",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "24 hours",
    fileLimit: "100 MB (free)",
    openSource: "No",
    tools: "300+",
    note: "Wide format support, server processing",
  },
  {
    name: "CloudConvert",
    url: "https://cloudconvert.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "After processing",
    fileLimit: "1 GB",
    openSource: "No",
    tools: "200+",
    note: "ISO 27001 certified, API available",
  },
  {
    name: "Zamzar",
    url: "https://zamzar.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "24 hours (free)",
    fileLimit: "50 MB (free)",
    openSource: "No",
    tools: "100+",
    note: "Email delivery option on free tier",
  },
  {
    name: "SmallPDF",
    url: "https://smallpdf.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier (2/day)",
    retention: "1 hour",
    fileLimit: "5 GB",
    openSource: "No",
    tools: "20+",
    note: "PDF focused, SSL encrypted transfer",
  },
  {
    name: "iLovePDF",
    url: "https://ilovepdf.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "2 hours",
    fileLimit: "Varies by tool",
    openSource: "No",
    tools: "25+",
    note: "PDF focused, encrypted transfers",
  },
  {
    name: "FreeConvert",
    url: "https://freeconvert.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "A few hours",
    fileLimit: "1 GB (free)",
    openSource: "No",
    tools: "100+",
    note: "256-bit SSL, wide format support",
  },
  {
    name: "PDF24",
    url: "https://tools.pdf24.org",
    processing: "Server",
    uploads: "Yes",
    signup: "No",
    retention: "A few hours",
    fileLimit: "Varies",
    openSource: "No",
    tools: "30+",
    note: "PDF focused, free with no account needed",
  },
  {
    name: "Adobe Acrobat Online",
    url: "https://www.adobe.com/acrobat/online.html",
    processing: "Server",
    uploads: "Yes",
    signup: "Required for some",
    retention: "After processing",
    fileLimit: "100 MB",
    openSource: "No",
    tools: "20+",
    note: "Industry standard, requires Adobe account for most features",
  },
  {
    name: "Online-Convert",
    url: "https://www.online-convert.com",
    processing: "Server",
    uploads: "Yes",
    signup: "Free tier available",
    retention: "24 hours",
    fileLimit: "100 MB (free)",
    openSource: "No",
    tools: "100+",
    note: "Wide format support, optional email delivery",
  },
  {
    name: "FastlyConvert",
    url: "https://www.fastlyconvert.com",
    processing: "Hybrid",
    uploads: "Partial",
    signup: "No",
    retention: "After processing",
    fileLimit: "Varies",
    openSource: "No",
    tools: "~30",
    note: "Browser-first for images, server for video/audio",
  },
  {
    name: "SaferPDF",
    url: "https://www.saferpdf.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "PDF only",
    note: "Browser-based PDF compression and tools",
  },
  {
    name: "HandBrake",
    url: "https://handbrake.fr",
    processing: "Local (install)",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "Video only",
    note: "Desktop app, must install, video transcoding",
  },
  {
    name: "Stirling PDF",
    url: "https://stirlingpdf.com",
    processing: "Local (self-host)",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "PDF only",
    note: "Self-hosted Docker app, PDF tools, open source",
  },
  {
    name: "FFmpeg",
    url: "https://ffmpeg.org",
    processing: "Local (install)",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "Audio/Video",
    note: "Command-line tool, requires technical knowledge",
  },
  {
    name: "PDFsam",
    url: "https://pdfsam.org",
    processing: "Local (install)",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "Yes",
    tools: "PDF only",
    note: "Desktop app, PDF split and merge",
  },
  {
    name: "NoFileUpload",
    url: "https://www.nofileupload.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~10",
    note: "No analytics, no cookies, no third-party scripts",
  },
  {
    name: "NoUploadConvert",
    url: "https://www.nouploadconvert.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~15",
    note: "PDF, image conversion, no server uploads",
  },
  {
    name: "LocalConverter",
    url: "https://localconverter.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~20",
    note: "Images, videos, documents without uploading",
  },
  {
    name: "FreeConverter.cloud",
    url: "https://freeconverter.cloud",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~20",
    note: "WebAssembly-based, documents never uploaded",
  },
  {
    name: "NoUploadTools",
    url: "https://nouploadtools.com",
    processing: "Browser",
    uploads: "No",
    signup: "No",
    retention: "None",
    fileLimit: "None",
    openSource: "No",
    tools: "~10",
    note: "Privacy-first browser utilities",
  },
];

const faqItems = [
  {
    question: "Are free online file converters safe to use?",
    answer:
      "It depends on how they process your files. Browser-based converters that process files locally in your device are the safest option because your data never leaves your computer. Server-based converters upload your files to remote servers, which introduces privacy risks. The FBI warned in 2025 about malicious file converter sites distributing malware. You can verify safety by opening DevTools (F12) and watching the Network tab during conversion.",
  },
  {
    question: "Which file converters do not upload your files?",
    answer:
      "Browser-based converters like FileToolWorks, VERT.sh, SafeConvert, OfflineConvert, ezyZip, FileForge, NoFileUpload, NoUploadConvert, and LocalConverter process files entirely in your browser using JavaScript or WebAssembly. Your files never leave your device. You can verify this by checking the Network tab in browser DevTools during conversion.",
  },
  {
    question: "What did the FBI say about file converters?",
    answer:
      "In March 2025, the FBI Denver Field Office warned about free online file converters being used to distribute malware. The malicious converters appeared to work normally but secretly installed ransomware, credential stealers, or crypto miners. The FBI warned specifically about converters that required downloads or installations, and those uploading files to unknown servers.",
  },
  {
    question: "How can I tell if a file converter uploads my files?",
    answer:
      "Open the converter in your browser, press F12 to open DevTools, click the Network tab, then upload and convert a test file. If your file data appears in any outgoing request, the converter uploads to a server. If the only requests are for page assets (HTML, CSS, JS, WASM modules), it processes everything locally in your browser.",
  },
  {
    question: "Are browser-based file converters safer than server-based ones?",
    answer:
      "Yes, browser-based converters are safer for privacy because your files never leave your device. Server-based converters upload your data to third-party servers where it could potentially be accessed, stored, or intercepted. However, reputable server-based services like CloudConvert (ISO 27001 certified) have legitimate security practices and make sense for rare formats or very large files.",
  },
  {
    question:
      "What is the difference between browser-based and server-based file converters?",
    answer:
      "Browser-based converters use JavaScript or WebAssembly to process files directly in your browser tab. Your files stay on your device. Server-based converters upload your files to remote servers for processing, then return the converted file. Browser-based tools offer better privacy but may be slower for very large files. Server-based tools can handle more formats but require trusting the provider with your data.",
  },
];

export default function PrivacyComparisonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "File Converter Privacy Comparison",
    description:
      "Factual comparison of how 26 file converters handle your data. See which upload files to servers vs process locally.",
    url: "https://www.filetoolworks.com/privacy-comparison",
    dateModified: "2026-03-03",
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
          name: "Privacy Comparison",
          item: "https://www.filetoolworks.com/privacy-comparison",
        },
      ],
    },
    mainEntity: {
      "@type": "Table",
      about: "File converter privacy and data handling comparison",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          href="/tools"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; All Tools
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          File Converter Privacy Comparison: Who Uploads Your Files?
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Not all file converters handle your data the same way. Some upload
          files to remote servers. Others process everything locally. This
          comparison shows exactly how 26 popular file converters work, so you
          can make an informed choice.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-900">
            <strong>Methodology:</strong> Data sourced from each service&apos;s
            privacy policy, FAQ pages, and public documentation as of March
            2026. &quot;Browser&quot; means files are processed entirely in your
            browser with no server upload. &quot;Server&quot; means files are
            uploaded to the provider&apos;s servers for processing.
            &quot;Local&quot; means desktop software you install.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Three Types of File Converters
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-900 mb-2">
              Browser-Based (Client-Side)
            </h3>
            <p className="text-sm text-green-800">
              Files never leave your device. Processing happens in your browser
              using JavaScript or WebAssembly. You can verify this by checking
              the Network tab in browser DevTools during conversion.
            </p>
            <p className="text-xs text-green-700 mt-2 font-medium">
              Privacy risk: Lowest
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Server-Based (Cloud)
            </h3>
            <p className="text-sm text-yellow-800">
              Files are uploaded to the provider&apos;s servers, processed
              remotely, and returned to you. Your data passes through
              third-party infrastructure. Reputable services encrypt and delete
              files, but you must trust their policies.
            </p>
            <p className="text-xs text-yellow-700 mt-2 font-medium">
              Privacy risk: Moderate
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="font-semibold text-blue-900 mb-2">
              Installable Software
            </h3>
            <p className="text-sm text-blue-800">
              Desktop applications you download and install. Files stay on your
              computer, but you must trust the installer itself. The FBI
              specifically warned about malicious converter installers in 2025.
            </p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              Privacy risk: Low (if trusted source)
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Comparison Table
        </h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-3 font-semibold text-gray-900">
                  Service
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Processing
                </th>
                <th className="text-center p-3 font-semibold text-gray-900">
                  Uploads Files?
                </th>
                <th className="text-center p-3 font-semibold text-gray-900">
                  Signup?
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Data Retention
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Free Limit
                </th>
                <th className="text-center p-3 font-semibold text-gray-900">
                  Open Source?
                </th>
                <th className="text-left p-3 font-semibold text-gray-900">
                  Tools
                </th>
              </tr>
            </thead>
            <tbody>
              {converters.map((c, i) => (
                <tr
                  key={c.name}
                  className={`border-b ${
                    c.processing === "Browser"
                      ? "bg-green-50"
                      : c.processing.startsWith("Local")
                        ? "bg-blue-50"
                        : c.processing === "Hybrid"
                          ? "bg-orange-50"
                          : i % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-medium text-gray-900">{c.name}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        c.processing === "Browser"
                          ? "bg-green-200 text-green-800"
                          : c.processing.startsWith("Local")
                            ? "bg-blue-200 text-blue-800"
                            : c.processing === "Hybrid"
                              ? "bg-orange-200 text-orange-800"
                              : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {c.processing}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {c.uploads === "No" ? (
                      <span className="text-green-600 font-bold">No</span>
                    ) : c.uploads === "Partial" ? (
                      <span className="text-orange-600 font-bold">Partial</span>
                    ) : (
                      <span className="text-red-600 font-bold">Yes</span>
                    )}
                  </td>
                  <td className="p-3 text-center text-gray-700">{c.signup}</td>
                  <td className="p-3 text-gray-700">{c.retention}</td>
                  <td className="p-3 text-gray-700">{c.fileLimit}</td>
                  <td className="p-3 text-center">
                    {c.openSource === "Yes" ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="p-3 text-gray-700">{c.tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          How to Verify Any Converter&apos;s Privacy Claims
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <p className="text-gray-700 mb-4">
            You do not need to trust what any file converter says about privacy.
            You can verify it yourself in under 60 seconds:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              Open the converter website in Chrome, Firefox, or Edge
            </li>
            <li>
              Press <strong>F12</strong> to open Developer Tools
            </li>
            <li>
              Click the <strong>Network</strong> tab
            </li>
            <li>
              Upload and convert a small test file
            </li>
            <li>
              Watch the Network tab. If your file data appears in any outgoing
              request, the converter uploads to a server. If the only requests
              are for page assets (HTML, CSS, JS, WASM modules), it processes
              locally.
            </li>
          </ol>
          <p className="text-gray-600 text-sm mt-4">
            Browser-based converters like{" "}
            <Link
              href="/compress-audio"
              className="text-blue-600 hover:underline"
            >
              audio compressors
            </Link>{" "}
            and{" "}
            <Link
              href="/merge-pdf"
              className="text-blue-600 hover:underline"
            >
              PDF mergers
            </Link>{" "}
            that use WebAssembly will download a WASM module on first use, but
            your actual file data stays in the browser tab.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          The FBI Warning: What Happened
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <p className="text-gray-700 mb-4">
            In March 2025, the FBI Denver Field Office issued a warning about
            free online file converter tools being used to distribute malware.
            The malicious converters functioned as expected (converting .doc to
            .pdf, for example) but secretly installed ransomware, credential
            stealers, or crypto miners on users&apos; devices.
          </p>
          <p className="text-gray-700 mb-4">
            The FBI specifically warned about converters that required downloads
            or installations, as well as those that uploaded files to unknown
            servers where personal data could be scraped.
          </p>
          <p className="text-gray-700">
            Browser-based converters avoid both attack vectors. There is nothing
            to install (the tool runs in your existing browser tab), and files
            never leave your device. For a deeper breakdown, see our{" "}
            <Link
              href="/security"
              className="text-blue-600 hover:underline"
            >
              security explanation
            </Link>{" "}
            or the{" "}
            <Link
              href="/blog/are-free-file-converters-safe"
              className="text-blue-600 hover:underline"
            >
              full FBI warning analysis
            </Link>
            .
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          When Server-Based Converters Make Sense
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <p className="text-gray-700 mb-4">
            Server-based converters are not inherently dangerous. Reputable
            services like CloudConvert (ISO 27001 certified) and SmallPDF
            (encrypted transfer, 1-hour retention) have legitimate security
            practices. Server processing makes sense when:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              You need to convert rare or complex formats that require
              specialized server software
            </li>
            <li>
              File sizes are very large and your device lacks the processing
              power
            </li>
            <li>
              You need batch processing of hundreds of files with an API
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            For common conversions (image format changes, PDF merging, audio
            compression, video trimming), browser-based tools handle these well
            without any server involvement.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Try Browser-Based Conversion
          </h3>
          <p className="text-gray-700 mb-4">
            All of these tools process files in your browser. No upload, no
            signup, no file size limits:
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
              href="/video-to-gif"
              className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
            >
              Video to GIF
            </Link>
            <Link
              href="/tools"
              className="bg-white px-4 py-2 rounded border border-blue-200 text-blue-700 hover:bg-blue-100 text-sm font-medium"
            >
              View All 56 Tools &rarr;
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Quick Safety Checklist
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
          <p className="text-gray-700 mb-4">
            Before using any file converter, check these five things:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg leading-6">1.</span>
              <span>
                <strong>Does it upload your files?</strong> Open DevTools (F12),
                click Network, and convert a test file. No outgoing data = safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg leading-6">2.</span>
              <span>
                <strong>Does it require a download or install?</strong> The FBI
                warned about malicious converter installers. Browser-based tools
                need no install.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg leading-6">3.</span>
              <span>
                <strong>Does it require signup or email?</strong> Legitimate
                browser-based converters do not need your personal information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg leading-6">4.</span>
              <span>
                <strong>Does the URL match the official site?</strong> Scam
                converters use URLs similar to real tools. Check for misspellings
                or extra words in the domain name.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg leading-6">5.</span>
              <span>
                <strong>Does it use HTTPS?</strong> A padlock icon in the
                address bar means the connection is encrypted. Avoid any
                converter on plain HTTP.
              </span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-10">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-900 mb-2">
            About This Comparison
          </h3>
          <p className="mb-2">
            This page compares 26 file converter services based on publicly
            available information from their websites, privacy policies, and
            documentation. Last updated March 2026. Policies may
            change. We recommend checking each service&apos;s current privacy
            policy before use.
          </p>
          <p>
            FileToolWorks is included in this comparison. We built this page to
            help users make informed decisions about file converter privacy,
            regardless of which service they choose. If you find any inaccuracies,
            please{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:underline"
            >
              let us know
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
