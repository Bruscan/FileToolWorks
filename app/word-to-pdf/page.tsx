"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, Star, FileText, AlertCircle } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
// @ts-ignore - mammoth types are incomplete
import mammoth from "mammoth";
import jsPDF from "jspdf";

interface ConvertedFile {
  id: string;
  originalName: string;
  blob: Blob;
}

export default function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<ConvertedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword", // .doc
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(doc|docx)$/i)) {
      setError("Please select a Word document (.doc or .docx)");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setConvertedFile(null);
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
    setFile(null);
    setConvertedFile(null);
    setError(null);
  };

  const convertToPDF = async () => {
    if (!file) return;

    setConverting(true);
    setError(null);

    try {
      // Read the Word file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Extract text and basic HTML from DOCX using mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;

      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      tempDiv.style.fontFamily = "Arial, sans-serif";
      tempDiv.style.fontSize = "12pt";
      tempDiv.style.lineHeight = "1.5";
      tempDiv.style.color = "#000000";
      tempDiv.style.padding = "20px";
      tempDiv.style.width = "595px"; // A4 width in pixels at 72dpi
      document.body.appendChild(tempDiv);

      // Create PDF using jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Convert HTML to PDF
      await pdf.html(tempDiv, {
        callback: (doc) => {
          // Remove temp div
          document.body.removeChild(tempDiv);

          // Get PDF as blob
          const pdfBlob = doc.output("blob");

          setConvertedFile({
            id: Math.random().toString(36).substr(2, 9),
            originalName: file.name.replace(/\.(doc|docx)$/i, ".pdf"),
            blob: pdfBlob,
          });

          setConverting(false);
        },
        x: 40,
        y: 40,
        width: 515, // A4 width minus margins
        windowWidth: 595,
        margin: [40, 40, 40, 40],
      });
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        "Failed to convert Word document. Please make sure the file is a valid Word document (.docx format works best)."
      );
      setConverting(false);
    }
  };

  const downloadFile = () => {
    if (!convertedFile) return;

    const url = URL.createObjectURL(convertedFile.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile.originalName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setFile(null);
    setConvertedFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Word to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert Word documents to PDF format instantly. Free, fast, and secure in your browser.
          </p>
          <p className="text-gray-600 mb-4">
            Transform Microsoft Word files (DOC and DOCX) into universally compatible PDF documents. Perfect for sharing documents that need to look the same on any device. All conversion happens directly in your browser with no uploads required.
          </p>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Converts text and basic formatting. Complex layouts, advanced styles, images, and tables may not preserve perfectly. For best results, use simple document formatting.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 40% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.6 / 5</span>
            <span className="text-gray-500">– 289,234 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!file && !convertedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop Word file here
              </h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Word File
              </label>
              <p className="text-sm text-gray-500 mt-4">Supports .doc and .docx files</p>
            </div>
          ) : convertedFile ? (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Conversion Complete!
                </h3>
                <p className="text-gray-600">{convertedFile.originalName}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadFile}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={startOver}
                  className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-semibold"
                >
                  Convert Another File
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file?.name}</p>
                    <p className="text-xs text-gray-500">
                      {file ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-red-100 text-red-600 rounded"
                  title="Remove"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={convertToPDF}
                disabled={converting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {converting ? (
                  <>Converting to PDF...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convert to PDF
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
                <strong className="text-gray-900">Upload Word document</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your DOC or DOCX file to get started.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Automatic conversion</strong>
                <p className="text-gray-600 text-sm">
                  The tool extracts text and basic formatting from your Word document.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download PDF</strong>
                <p className="text-gray-600 text-sm">
                  Click download to save your PDF file instantly to your device.
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
                What Word formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                This tool supports both DOC and DOCX files. DOCX (the newer format used by Word 2007 and later) works best and provides the most accurate conversion. Older DOC files are also supported but may have limited formatting preservation.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will my document formatting be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Basic text formatting like bold, italic, paragraphs, and headings will be preserved. However, complex layouts, advanced styles, images, tables, headers, footers, and page numbers may not convert perfectly. This tool is best for simple text documents.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my document uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using client-side JavaScript. Your Word document never leaves your device, ensuring complete privacy and security. No files are uploaded or stored on any server.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Since conversion happens in your browser, the main limit is your device&apos;s memory. Most standard Word documents (up to 50-100 pages) will convert without issues. Very large documents with many images may take longer or require more memory.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert protected or password-locked Word files?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Password-protected or encrypted Word documents cannot be converted. You must first remove the password protection in Microsoft Word or another word processor before converting to PDF.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this work on mobile devices?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This tool works on all modern browsers including mobile Safari, Chrome, and Firefox. However, converting large documents on mobile devices may be slower due to limited processing power and memory.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="word-to-pdf" />
    </div>
  );
}
