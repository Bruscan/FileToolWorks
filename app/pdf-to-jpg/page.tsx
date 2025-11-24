"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface PDFFile {
  id: string;
  file: File;
  pageCount?: number;
}

interface ConvertedImage {
  pageNumber: number;
  dataUrl: string;
  filename: string;
}

interface Options {
  format: "jpg" | "png";
  quality: number;
  scale: number;
}

export default function PDFToJPG() {
  const [pdfFile, setPdfFile] = useState<PDFFile | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    format: "jpg",
    quality: 0.92,
    scale: 2,
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file.type === "application/pdf") {
      setPdfFile({
        id: Math.random().toString(36).substr(2, 9),
        file,
      });
      setConvertedImages([]);
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
    setConvertedImages([]);
  };

  const convertToImages = async () => {
    if (!pdfFile) return;

    setConverting(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");

      // Set worker source - use CDN with HTTPS
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const images: ConvertedImage[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: options.scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const dataUrl = canvas.toDataURL(
          options.format === "jpg" ? "image/jpeg" : "image/png",
          options.quality
        );

        const filename = `${pdfFile.file.name.replace(".pdf", "")}_page_${pageNum}.${options.format}`;

        images.push({
          pageNumber: pageNum,
          dataUrl,
          filename,
        });
      }

      setConvertedImages(images);
      setPdfFile((prev) => prev ? { ...prev, pageCount: pdf.numPages } : null);
    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement("a");
    link.href = image.dataUrl;
    link.download = image.filename;
    link.click();
  };

  const downloadAll = () => {
    convertedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PDF to JPG Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert PDF pages to JPG or PNG images instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your PDF file and convert each page to a high-quality image. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 3,247 votes</span>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image Format
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, format: "jpg" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.format === "jpg"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            JPG
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, format: "png" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.format === "png"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            PNG
                          </button>
                        </div>
                      </div>

                      {/* Quality */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image Quality
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, quality: 0.7 })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === 0.7
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Low
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, quality: 0.92 })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === 0.92
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            High
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, quality: 1 })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === 1
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Max
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              {convertedImages.length === 0 && (
                <button
                  onClick={convertToImages}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>Converting...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Convert to Images
                    </>
                  )}
                </button>
              )}

              {/* Converted Images */}
              {convertedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Converted Images ({convertedImages.length})
                    </h4>
                    <button
                      onClick={downloadAll}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Download All
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {convertedImages.map((image) => (
                      <div
                        key={image.pageNumber}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.dataUrl}
                          alt={`Page ${image.pageNumber}`}
                          className="w-full h-48 object-contain bg-gray-100 rounded mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Page {image.pageNumber}
                          </span>
                          <button
                            onClick={() => downloadImage(image)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  Click or drag and drop your PDF file. Any PDF file up to 50MB is supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose format and quality</strong>
                <p className="text-gray-600 text-sm">
                  Select JPG or PNG format and choose your preferred quality level.
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
                  Click &quot;Convert to Images&quot; and download individual pages or all at once.
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
                What image formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can convert PDF pages to either JPG (JPEG) or PNG format. JPG is better for photos and offers smaller file sizes, while PNG is better for documents with text and graphics.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a page limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. You can convert PDFs with any number of pages. Each page will be converted to a separate image file that you can download individually or all at once.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your PDF never leaves your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What quality settings should I use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                For most documents, High quality (default) provides a good balance between file size and image quality. Use Max quality for important documents or detailed graphics. Low quality is suitable for quick previews.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert password-protected PDFs?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently, this tool does not support password-protected PDFs. You will need to remove the password protection before converting.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="pdf-to-jpg" />
    </div>
  );
}
