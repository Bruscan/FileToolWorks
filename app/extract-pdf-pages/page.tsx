"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, Star, FileText, Check } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import { PDFDocument } from "pdf-lib";

interface PDFFile {
  id: string;
  file: File;
  pageCount?: number;
}

interface PageSelection {
  [pageNumber: number]: boolean;
}

export default function ExtractPDFPages() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pageSelection, setPageSelection] = useState<PageSelection>({});
  const [pageRangeInput, setPageRangeInput] = useState("");
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

      // Initialize page selection (all pages selected by default)
      const initialSelection: PageSelection = {};
      for (let i = 0; i < pageCount; i++) {
        initialSelection[i] = false;
      }
      setPageSelection(initialSelection);
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
    setPageSelection({});
    setPageRangeInput("");
    setConverted(false);
  };

  const togglePage = (pageNum: number) => {
    setPageSelection((prev) => ({
      ...prev,
      [pageNum]: !prev[pageNum],
    }));
  };

  const selectAllPages = () => {
    if (!pdfFile?.pageCount) return;
    const newSelection: PageSelection = {};
    for (let i = 0; i < pdfFile.pageCount; i++) {
      newSelection[i] = true;
    }
    setPageSelection(newSelection);
  };

  const deselectAllPages = () => {
    if (!pdfFile?.pageCount) return;
    const newSelection: PageSelection = {};
    for (let i = 0; i < pdfFile.pageCount; i++) {
      newSelection[i] = false;
    }
    setPageSelection(newSelection);
  };

  const applyPageRange = () => {
    if (!pdfFile?.pageCount || !pageRangeInput.trim()) return;

    try {
      const newSelection: PageSelection = {};
      // Initialize all to false
      for (let i = 0; i < pdfFile.pageCount; i++) {
        newSelection[i] = false;
      }

      const parts = pageRangeInput.split(",").map((s) => s.trim());

      for (const part of parts) {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
          if (isNaN(start) || isNaN(end) || start < 1 || end > pdfFile.pageCount || start > end) {
            alert(`Invalid range: ${part}`);
            return;
          }
          for (let i = start; i <= end; i++) {
            newSelection[i - 1] = true; // Convert to 0-based
          }
        } else {
          const pageNum = parseInt(part);
          if (isNaN(pageNum) || pageNum < 1 || pageNum > pdfFile.pageCount) {
            alert(`Invalid page number: ${part}`);
            return;
          }
          newSelection[pageNum - 1] = true; // Convert to 0-based
        }
      }

      setPageSelection(newSelection);
    } catch (error) {
      console.error("Error parsing page range:", error);
      alert("Error parsing page range. Please use format like: 1,3,5-7");
    }
  };

  const handleExtract = async () => {
    if (!pdfFile || !pdfFile.pageCount) return;

    // Get selected pages
    const selectedPages = Object.entries(pageSelection)
      .filter(([_, selected]) => selected)
      .map(([page, _]) => parseInt(page))
      .sort((a, b) => a - b);

    if (selectedPages.length === 0) {
      alert("Please select at least one page to extract.");
      return;
    }

    setProcessing(true);
    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      // Create new PDF with selected pages
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourcePdf, selectedPages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      // Create filename based on selected pages
      const pageRangeStr = selectedPages.length === 1
        ? `page_${selectedPages[0] + 1}`
        : `pages_${selectedPages.length}`;
      a.download = `${pdfFile.file.name.replace(".pdf", "")}_extracted_${pageRangeStr}.pdf`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setConverted(true);
    } catch (error: any) {
      console.error("Extract error:", error);
      alert(error.message || "An error occurred during extraction. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const startOver = () => {
    setPdfFile(null);
    setPageSelection({});
    setPageRangeInput("");
    setConverted(false);
  };

  const selectedCount = Object.values(pageSelection).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Extract PDF Pages
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract specific pages from PDF documents instantly
          </p>
          <p className="text-gray-600 mb-4">
            Upload your PDF and select which pages you want to extract. Choose pages individually using checkboxes or enter page ranges like 1,3,5-7. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 178k+ votes</span>
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
                Pages Extracted Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your extracted PDF has been downloaded.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Extract More Pages
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

              {/* Page Range Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Select by Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pageRangeInput}
                    onChange={(e) => setPageRangeInput(e.target.value)}
                    placeholder="e.g., 1,3,5-7"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPageRange}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter page numbers or ranges separated by commas
                </p>
              </div>

              {/* Selection Controls */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={selectAllPages}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAllPages}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Deselect All
                </button>
                <div className="ml-auto text-sm text-gray-600 flex items-center">
                  Selected: <span className="font-semibold ml-1">{selectedCount}</span> / {pdfFile.pageCount}
                </div>
              </div>

              {/* Page Checkboxes */}
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {Array.from({ length: pdfFile.pageCount || 0 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => togglePage(i)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      pageSelection[i]
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        pageSelection[i]
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 bg-white"
                      }`}>
                        {pageSelection[i] && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-medium">{i + 1}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Extract Button */}
              <button
                onClick={handleExtract}
                disabled={processing || loading || selectedCount === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {processing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Extract {selectedCount} {selectedCount === 1 ? "Page" : "Pages"}
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
                <strong className="text-gray-900">Select pages to extract</strong>
                <p className="text-gray-600 text-sm">
                  Click individual page checkboxes or enter page ranges like 1,3,5-7 for quick selection.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download extracted PDF</strong>
                <p className="text-gray-600 text-sm">
                  Click Extract Pages and your new PDF with only the selected pages will download automatically.
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
                How do I extract specific pages from a PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Upload your PDF, select the pages you want to keep by clicking their checkboxes, and click Extract Pages. You can select pages individually or use the range input for faster selection (e.g., 1,3,5-7).
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I extract non-consecutive pages?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. You can select any combination of pages. Use the checkboxes to click individual pages or enter ranges separated by commas (e.g., 1,5,10-15,20) to select non-consecutive pages quickly.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a limit on the number of pages I can extract?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. You can extract as few as one page or as many pages as you need from your PDF. Since processing happens in your browser, there are no server-side restrictions.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my PDF files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All page extraction happens directly in your browser using pdf-lib. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the extracted pages maintain their original quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Extraction is a lossless process. The pages in your new PDF will have exactly the same quality, formatting, fonts, and images as the original document.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Extract pages from as many PDFs as you need.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools - Automatic */}
      <RelatedTools currentToolId="extract-pdf-pages" />
    </div>
  );
}
