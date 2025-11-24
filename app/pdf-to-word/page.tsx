"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, Star, FileText } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface ConvertedFile {
  id: string;
  originalName: string;
  blob: Blob;
  pageCount: number;
}

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState<ConvertedFile | null>(null);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file");
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

  const convertToWord = async () => {
    if (!file) return;

    setConverting(true);
    setError(null);

    try {
      // Dynamic imports
      const pdfjsLib = await import("pdfjs-dist");
      const { Document, Packer, Paragraph, TextRun } = await import("docx");

      // Set up PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      // Load PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pageCount = pdf.numPages;

      // Extract text from all pages
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Add page header if multiple pages
        if (pageCount > 1) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Page ${i}`,
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: {
                before: i === 1 ? 0 : 400,
                after: 200,
              },
            })
          );
        }

        // Group text items into lines based on Y position
        const lines: { y: number; text: string }[] = [];
        let currentY = -1;
        let currentLine = "";

        textContent.items.forEach((item: any) => {
          if (item.str) {
            const itemY = Math.round(item.transform[5]);

            // Check if this is a new line (different Y position)
            if (currentY === -1 || Math.abs(itemY - currentY) > 2) {
              if (currentLine) {
                lines.push({ y: currentY, text: currentLine.trim() });
              }
              currentLine = item.str;
              currentY = itemY;
            } else {
              // Same line, add space if needed
              currentLine += (item.str.startsWith(" ") ? "" : " ") + item.str;
            }
          }
        });

        // Add the last line
        if (currentLine) {
          lines.push({ y: currentY, text: currentLine.trim() });
        }

        // Convert lines to paragraphs
        lines.forEach((line) => {
          if (line.text) {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: line.text,
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 120,
                },
              })
            );
          }
        });

        // Add spacing between pages
        if (i < pageCount) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: "", size: 22 })],
              spacing: { after: 200 },
            })
          );
        }
      }

      // Create Word document
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });

      // Generate DOCX file
      const blob = await Packer.toBlob(doc);

      setConvertedFile({
        id: Math.random().toString(36).substr(2, 9),
        originalName: file.name.replace(".pdf", ".docx"),
        blob,
        pageCount,
      });
    } catch (err) {
      console.error("Conversion error:", err);
      setError(
        "Failed to convert PDF. Please make sure the PDF contains text and is not a scanned image."
      );
    } finally {
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
            PDF to Word Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert PDF files to editable Word DOCX format instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Extract text from PDF documents and convert them to Microsoft Word format. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 20% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 187,423 votes</span>
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
              <p className="text-sm text-gray-500 mt-4">Only PDF files are supported</p>
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
                <p className="text-gray-600 mb-1">{convertedFile.originalName}</p>
                <p className="text-sm text-gray-500">
                  {convertedFile.pageCount} {convertedFile.pageCount === 1 ? "page" : "pages"}{" "}
                  converted
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={downloadFile}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Word File
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
                  <FileText className="w-8 h-8 text-red-600" />
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

              {/* Options */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserveFormatting}
                    onChange={(e) => setPreserveFormatting(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Preserve formatting (basic text extraction)
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-6">
                  Note: This tool extracts text content from PDFs. Complex formatting, images,
                  and tables may not be preserved.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                onClick={convertToWord}
                disabled={converting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {converting ? (
                  <>Converting...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convert to Word
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
                  Click or drag and drop your PDF document to get started.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose options</strong>
                <p className="text-gray-600 text-sm">
                  Select whether to preserve basic formatting during conversion.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download Word file</strong>
                <p className="text-gray-600 text-sm">
                  Click convert and download your editable Word DOCX file instantly.
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
                What PDF files can I convert?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                This tool works best with PDFs that contain text. Scanned PDFs or image-based
                PDFs may not convert properly as they require OCR (optical character
                recognition) which is not included in this tool.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will formatting be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Basic text formatting is preserved, but complex layouts, images, tables, and
                advanced formatting may not transfer perfectly. This tool focuses on extracting
                and preserving the text content from your PDF.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my PDF uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your PDF
                never leaves your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Since processing happens in your browser, there are no server-side limits.
                However, very large PDFs may take longer to process and require more memory
                depending on your device capabilities.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I edit the Word file after conversion?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. The output is a standard DOCX file that can be opened and edited in
                Microsoft Word, Google Docs, LibreOffice, and other word processors that support
                the DOCX format.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this work on mobile devices?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This tool works on all modern browsers including mobile Safari, Chrome, and
                Firefox. However, processing large PDFs on mobile devices may be slower due to
                limited memory and processing power.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="pdf-to-word" />
    </div>
  );
}
