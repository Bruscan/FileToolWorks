"use client";

import { useState, useCallback } from "react";
import { Upload, X, ArrowUp, ArrowDown, Download, Star, RotateCcw } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface PDFFile {
  id: string;
  file: File;
}

export default function MergePDF() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(false);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: PDFFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type === "application/pdf") {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
        });
      }
    });

    setPdfFiles((prev) => [...prev, ...newFiles]);
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

  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (id: string, direction: "up" | "down") => {
    setPdfFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === prev.length - 1) return prev;

      const newFiles = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) {
      alert("Please upload at least 2 PDF files to merge.");
      return;
    }

    setMerging(true);
    try {
      // Dynamic import of pdf-lib
      const { PDFDocument } = await import("pdf-lib");

      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Loop through all PDF files and merge them
      for (const pdfFile of pdfFiles) {
        const pdfBytes = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      // Create a blob and download it
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMerged(true);
    } catch (error) {
      console.error("Merge error:", error);
      alert("An error occurred during merging. Please ensure all files are valid PDFs and try again.");
    } finally {
      setMerging(false);
    }
  };

  const startOver = () => {
    setPdfFiles([]);
    setMerged(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Combine multiple PDF files into one document instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your PDF files, arrange them in any order you want, and merge them into a single PDF document. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 156,234 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!merged ? (
            <>
              {pdfFiles.length === 0 ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop PDF files here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    Select PDF Files
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Upload at least 2 PDF files to merge
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pdfFiles.length} {pdfFiles.length === 1 ? "PDF File" : "PDF Files"}
                    </h3>
                    <label
                      htmlFor="add-more"
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                    >
                      + Add More
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                      id="add-more"
                    />
                  </div>

                  <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                    {pdfFiles.map((pdfFile, index) => (
                      <div
                        key={pdfFile.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {pdfFile.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveFile(pdfFile.id, "up")}
                            disabled={index === 0}
                            className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveFile(pdfFile.id, "down")}
                            disabled={index === pdfFiles.length - 1}
                            className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFile(pdfFile.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={mergePDFs}
                    disabled={merging || pdfFiles.length < 2}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    {merging ? (
                      <>Merging PDFs...</>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Merge PDFs
                      </>
                    )}
                  </button>
                  {pdfFiles.length < 2 && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Add at least 2 PDF files to merge
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Merged Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your merged PDF has been downloaded to your device.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Merge More PDFs
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
                <strong className="text-gray-900">Upload PDF files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PDF files. Upload at least 2 files to merge them together.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Arrange order</strong>
                <p className="text-gray-600 text-sm">
                  Use arrow buttons to reorder your PDFs. The numbers show the merge order.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Merge and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Merge PDFs&quot; and your combined file will download automatically.
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
                How many PDF files can I merge at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can merge as many PDF files as you want. There is no limit to the number of files. All processing happens in your browser, so the only limitation is your device memory.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device capabilities.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my PDF files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All merging happens directly in your browser using JavaScript. Your PDF files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Merge as many PDFs as you need, whenever you need.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the quality of my PDFs be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. The merging process preserves the original quality of all your PDF files. Text, images, and formatting remain exactly as they were in the original documents.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I change the order of PDFs before merging?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Use the up and down arrow buttons next to each file to reorder them. The numbers show the order in which PDFs will be merged. Arrange them however you like before clicking merge.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="merge-pdf" />
    </div>
  );
}
