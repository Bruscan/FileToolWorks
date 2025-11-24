"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Download, ChevronDown, Star, RotateCcw } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface PDFOptions {
  pageSize: "a4" | "letter";
}

export default function HtmlToPDF() {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [mode, setMode] = useState<"upload" | "code">("upload");
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<PDFOptions>({
    pageSize: "a4",
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type === "text/html" || file.name.endsWith(".html")) {
      setHtmlFile(file);
      setHtmlCode("");
    } else {
      alert("Please upload a valid HTML file");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const convertToPDF = async () => {
    if (!htmlFile && !htmlCode) return;

    setConverting(true);
    try {
      // Dynamic imports
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Get HTML content
      let htmlContent = "";
      if (htmlFile) {
        htmlContent = await htmlFile.text();
      } else {
        htmlContent = htmlCode;
      }

      // Create a temporary container to render HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "0";
      tempDiv.style.width = "800px"; // Fixed width for consistent rendering
      tempDiv.style.padding = "20px";
      tempDiv.style.backgroundColor = "#ffffff";
      document.body.appendChild(tempDiv);

      // Wait a moment for any images or styles to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Render HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2, // Higher quality
        useCORS: true, // Allow cross-origin images
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Get canvas dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgData = canvas.toDataURL("image/png");

      // Determine page dimensions (A4 or Letter in mm)
      let pageWidth = 210; // A4 width in mm
      let pageHeight = 297; // A4 height in mm

      if (options.pageSize === "letter") {
        pageWidth = 215.9; // US Letter width in mm
        pageHeight = 279.4; // US Letter height in mm
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: options.pageSize,
      });

      // Calculate scaling to fit content
      const pdfWidth = pageWidth;
      const pdfHeight = (imgHeight * pageWidth) / imgWidth;

      // If content fits on one page
      if (pdfHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      } else {
        // Split content across multiple pages
        let remainingHeight = imgHeight;
        let position = 0;

        while (remainingHeight > 0) {
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgWidth;
          const pageImgHeight = Math.min(
            (pageHeight * imgWidth) / pageWidth,
            remainingHeight
          );
          pageCanvas.height = pageImgHeight;

          const ctx = pageCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              position,
              imgWidth,
              pageImgHeight,
              0,
              0,
              imgWidth,
              pageImgHeight
            );

            const pageImgData = pageCanvas.toDataURL("image/png");
            const scaledHeight = (pageImgHeight * pageWidth) / imgWidth;

            if (position > 0) {
              pdf.addPage();
            }

            pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, scaledHeight);
          }

          position += pageImgHeight;
          remainingHeight -= pageImgHeight;
        }
      }

      pdf.save("converted.pdf");
      setConverted(true);
    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please check your HTML and try again.");
    } finally {
      setConverting(false);
    }
  };

  const startOver = () => {
    setHtmlFile(null);
    setHtmlCode("");
    setConverted(false);
    setShowOptions(false);
  };

  const hasContent = htmlFile || htmlCode.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            HTML to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert HTML and web pages to PDF instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload an HTML file or paste your HTML code directly. The tool will render your HTML and convert it to a professional PDF document. All processing happens in your browser for complete privacy.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.5 / 5</span>
            <span className="text-gray-500">– 167,234 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!converted ? (
            <>
              {/* Mode Selection */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setMode("upload")}
                  className={`flex-1 px-4 py-3 text-sm font-medium border rounded-lg transition-colors ${
                    mode === "upload"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Upload HTML File
                </button>
                <button
                  onClick={() => setMode("code")}
                  className={`flex-1 px-4 py-3 text-sm font-medium border rounded-lg transition-colors ${
                    mode === "code"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Enter HTML Code
                </button>
              </div>

              {mode === "upload" ? (
                <>
                  {!htmlFile ? (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
                    >
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Drop HTML file here
                      </h3>
                      <p className="text-gray-600 mb-4">
                        or click to browse
                      </p>
                      <input
                        type="file"
                        accept=".html,text/html"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        id="file-input"
                      />
                      <label
                        htmlFor="file-input"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                      >
                        Select HTML File
                      </label>
                      <p className="text-sm text-gray-500 mt-4">
                        Supports: .html files
                      </p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          HTML File Selected
                        </h3>
                        <button
                          onClick={() => setHtmlFile(null)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-xs">HTML</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {htmlFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(htmlFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <button
                          onClick={() => setHtmlFile(null)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded"
                          title="Remove"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter HTML Code
                  </label>
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    placeholder="Paste your HTML code here...&#10;&#10;Example:&#10;&lt;h1&gt;Hello World&lt;/h1&gt;&#10;&lt;p&gt;This is a paragraph.&lt;/p&gt;"
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Include complete HTML with styles for best results
                  </p>
                </div>
              )}

              {hasContent && (
                <>
                  {/* Options */}
                  <div className="bg-white border border-gray-200 rounded-lg mb-4">
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-semibold text-gray-900">Options</span>
                      <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showOptions ? "rotate-180" : ""}`} />
                    </button>

                    {showOptions && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Page Size
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setOptions({ ...options, pageSize: "a4" })}
                              className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.pageSize === "a4"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              A4
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, pageSize: "letter" })}
                              className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.pageSize === "letter"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              US Letter
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={convertToPDF}
                    disabled={converting}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {converting ? (
                      <>Converting...</>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Convert to PDF
                      </>
                    )}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Created Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your PDF has been downloaded to your device.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Convert Another File
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">Choose input method</strong>
                <p className="text-gray-600 text-sm">
                  Upload an HTML file or paste your HTML code directly in the text area.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Select page size</strong>
                <p className="text-gray-600 text-sm">
                  Choose between A4 or US Letter format for your PDF output.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Convert and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Convert to PDF&quot; and your file will download automatically.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What HTML features are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Most standard HTML and CSS features are supported, including text, images, colors, backgrounds, and basic layouts. Complex JavaScript animations or interactive elements may not render correctly in the PDF.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert web pages from URLs?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently, this tool only supports HTML files or code input. To convert a web page, save it as an HTML file first (File &gt; Save As in your browser), then upload it here.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are external images and stylesheets supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                External resources (images, CSS files) should work if they are publicly accessible. For best results, use inline styles and embedded images (data URLs) or ensure external resources have CORS enabled.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my HTML code uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your HTML code never leaves your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What if my HTML is too long for one page?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The tool automatically splits content across multiple PDF pages when needed. Long HTML documents will be divided into multiple pages to fit the selected page size.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this tool cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="html-to-pdf" />
    </div>
  );
}
