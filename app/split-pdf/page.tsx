"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star, FileText } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import { PDFDocument } from "pdf-lib";

interface PDFFile {
  id: string;
  file: File;
  pageCount?: number;
}

type SplitMethod = "every-page" | "range" | "extract";

export default function SplitPDF() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("every-page");
  const [pageRange, setPageRange] = useState("");
  const [converted, setConverted] = useState(false);

  const handleFileSelect = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    try {
      // Load PDF to get page count
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      setPdfFile({
        id: Math.random().toString(36).substr(2, 9),
        file,
        pageCount,
      });
    } catch (error) {
      console.error("Error loading PDF:", error);
      alert("Failed to load PDF. Please try another file.");
    } finally {
      setLoading(false);
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

  const removeFile = () => {
    setPdfFile(null);
    setPageRange("");
    setConverted(false);
  };

  const parsePageRange = (range: string, maxPages: number): number[][] => {
    // Parse ranges like "1-3, 5, 7-10" into array of page arrays
    const ranges: number[][] = [];
    const parts = range.split(",").map((s) => s.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          throw new Error(`Invalid range: ${part}`);
        }
        const pageArray = [];
        for (let i = start; i <= end; i++) {
          pageArray.push(i - 1); // Convert to 0-based
        }
        ranges.push(pageArray);
      } else {
        const pageNum = parseInt(part);
        if (isNaN(pageNum) || pageNum < 1 || pageNum > maxPages) {
          throw new Error(`Invalid page number: ${part}`);
        }
        ranges.push([pageNum - 1]); // Convert to 0-based
      }
    }

    return ranges;
  };

  const handleSplit = async () => {
    if (!pdfFile || !pdfFile.pageCount) return;

    setProcessing(true);
    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      if (splitMethod === "every-page") {
        // Split into individual pages
        for (let i = 0; i < pdfFile.pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(copiedPage);

          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;
          a.download = `${pdfFile.file.name.replace(".pdf", "")}_page_${i + 1}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          // Small delay between downloads to avoid browser blocking
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } else if (splitMethod === "range" || splitMethod === "extract") {
        if (!pageRange.trim()) {
          alert("Please enter page ranges (e.g., 1-3, 5, 7-10)");
          return;
        }

        const ranges = parsePageRange(pageRange, pdfFile.pageCount);

        for (let i = 0; i < ranges.length; i++) {
          const newPdf = await PDFDocument.create();
          const copiedPages = await newPdf.copyPages(sourcePdf, ranges[i]);
          copiedPages.forEach((page) => newPdf.addPage(page));

          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = url;

          // Create filename based on page range
          const rangeStr = ranges[i].length === 1
            ? `page_${ranges[i][0] + 1}`
            : `pages_${ranges[i][0] + 1}-${ranges[i][ranges[i].length - 1] + 1}`;
          a.download = `${pdfFile.file.name.replace(".pdf", "")}_${rangeStr}.pdf`;

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          // Small delay between downloads
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      setConverted(true);
    } catch (error: any) {
      console.error("Split error:", error);
      alert(error.message || "An error occurred during splitting. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const startOver = () => {
    setPdfFile(null);
    setPageRange("");
    setConverted(false);
    setSplitMethod("every-page");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Split PDF
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Split PDF files into separate pages or custom page ranges instantly
          </p>
          <p className="text-gray-600 mb-4">
            Upload your PDF and choose how to split it. Extract specific pages, split by page ranges, or separate every page into individual files. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 124k+ votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!pdfFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop PDF here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select PDF File
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Accepts PDF files only
              </p>
            </div>
          ) : converted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Split Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your PDF files have been downloaded.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Split Another PDF
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                <FileText className="w-8 h-8 text-red-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {pdfFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB
                    {pdfFile.pageCount && ` • ${pdfFile.pageCount} pages`}
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-red-100 text-red-600 rounded"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Split Options */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-semibold text-gray-900">Split Options</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showOptions ? "rotate-180" : ""}`} />
                </button>

                {showOptions && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200 space-y-4">
                    {/* Split Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Split Method
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSplitMethod("every-page")}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            splitMethod === "every-page"
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          Every Page
                        </button>
                        <button
                          onClick={() => setSplitMethod("range")}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            splitMethod === "range"
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          Page Ranges
                        </button>
                        <button
                          onClick={() => setSplitMethod("extract")}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            splitMethod === "extract"
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                          }`}
                        >
                          Extract Pages
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {splitMethod === "every-page" && "Split into individual PDF files, one per page"}
                        {splitMethod === "range" && "Split into multiple PDFs based on page ranges"}
                        {splitMethod === "extract" && "Extract specific pages into separate PDFs"}
                      </p>
                    </div>

                    {/* Page Range Input */}
                    {(splitMethod === "range" || splitMethod === "extract") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Range
                        </label>
                        <input
                          type="text"
                          value={pageRange}
                          onChange={(e) => setPageRange(e.target.value)}
                          placeholder="e.g., 1-3, 5, 7-10"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter page numbers or ranges separated by commas (e.g., 1-3, 5, 7-10)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Split Button */}
              <button
                onClick={handleSplit}
                disabled={processing || loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {processing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Split PDF
                  </>
                )}
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
                <strong className="text-gray-900">Upload PDF file</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PDF. The page count will be detected automatically.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose split method</strong>
                <p className="text-gray-600 text-sm">
                  Select how to split: every page, page ranges, or extract specific pages. Enter page numbers if needed.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download split PDFs</strong>
                <p className="text-gray-600 text-sm">
                  Click Split PDF and each resulting PDF will download automatically to your device.
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
                How do I split a PDF into separate pages?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Upload your PDF, select Every Page as the split method, and click Split PDF. Each page will be saved as a separate PDF file and downloaded to your device automatically.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I extract specific pages from a PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Select Extract Pages or Page Ranges and enter the page numbers you want (e.g., 1-3, 5, 7-10). Each range will become a separate PDF file.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since all processing happens in your browser, there are no server-side limits. However, very large PDFs may take longer to process depending on your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my PDF files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All splitting happens directly in your browser using pdf-lib. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is the difference between split methods?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Every Page creates one PDF per page. Page Ranges lets you split by multiple ranges (e.g., 1-5, 6-10). Extract Pages is similar to ranges but focuses on extracting specific pages you want to keep.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Split as many PDFs as you need.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools - Automatic */}
      <RelatedTools currentToolId="split-pdf" />
    </div>
  );
}
