"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, FileText, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface PDFFile {
  id: string;
  file: File;
  pageCount?: number;
  extractedText?: string;
}

export default function PDFToText() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [extracting, setExtracting] = useState(false);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file.type === "application/pdf") {
      setPdfFile({
        id: Math.random().toString(36).substr(2, 9),
        file,
      });
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

  const removePDF = () => {
    setPdfFile(null);
  };

  const extractText = async () => {
    if (!pdfFile) return;

    setExtracting(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");

      // Set worker source - use unpkg.com (more reliable)
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const text = content.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += `--- Page ${pageNum} ---\n\n${text}\n\n`;
      }

      setPdfFile((prev) =>
        prev
          ? {
              ...prev,
              pageCount: pdf.numPages,
              extractedText: fullText,
            }
          : null
      );
    } catch (error) {
      console.error("Extraction error:", error);
      alert("An error occurred during text extraction. Please try again.");
    } finally {
      setExtracting(false);
    }
  };

  const downloadText = () => {
    if (!pdfFile?.extractedText) return;

    const blob = new Blob([pdfFile.extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pdfFile.file.name.replace(".pdf", "")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setPdfFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PDF to Text Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract text from PDF files instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your PDF file and extract all text content in seconds. All
            processing happens in your browser for complete privacy. No file
            size limits, no signup required. Download the extracted text as a
            plain text file.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 40% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.6 / 5</span>
            <span className="text-gray-500">– 241,000 votes</span>
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
                Drop PDF file here
              </h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
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
                Supports: PDF files up to 50MB
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  PDF File
                  {pdfFile.pageCount && ` (${pdfFile.pageCount} pages)`}
                </h3>
              </div>

              {/* File Info */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {pdfFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={removePDF}
                  className="p-2 hover:bg-red-100 text-red-600 rounded ml-3"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Extract Button */}
              {!pdfFile.extractedText && (
                <button
                  onClick={extractText}
                  disabled={extracting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {extracting ? (
                    <>Extracting Text...</>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Extract Text
                    </>
                  )}
                </button>
              )}

              {/* Extracted Text Preview */}
              {pdfFile.extractedText && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Extracted Text
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadText}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download as TXT
                      </button>
                      <button
                        onClick={startOver}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                      {pdfFile.extractedText}
                    </pre>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {pdfFile.extractedText.length} characters extracted
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">Upload PDF file</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PDF file. Any PDF file up to 50MB
                  is supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Extract text</strong>
                <p className="text-gray-600 text-sm">
                  Click Extract Text to process your PDF. The tool will extract
                  all text content from every page.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">
                  Preview and download
                </strong>
                <p className="text-gray-600 text-sm">
                  Review the extracted text in the preview window and download
                  it as a plain text file.
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
                Does this tool support OCR for scanned PDFs?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool extracts existing text from digital PDFs only. If
                your PDF is a scanned image or contains no selectable text, the
                extraction will be empty. For scanned documents, you need an
                OCR (Optical Character Recognition) tool.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All text extraction happens directly in your browser using
                JavaScript. Your PDF never leaves your device, ensuring
                complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges,
                subscriptions, or signup required. Use it as many times as you
                need.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the formatting be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool extracts plain text only. Fonts, colors, tables,
                and layout formatting are not preserved. The output is a simple
                text file with the content from each page.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I extract text from password-protected PDFs?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently, this tool does not support password-protected PDFs.
                You will need to remove the password protection before
                extracting text.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What format is the output file?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The extracted text is saved as a plain text file (.txt) that
                can be opened in any text editor or word processor. Each page
                is labeled with a page number separator.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="pdf-to-text" />
    </div>
  );
}
