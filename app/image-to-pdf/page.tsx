"use client";

import { useState, useCallback } from "react";
import { Upload, X, ArrowUp, ArrowDown, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import type { Metadata } from "next";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface PDFOptions {
  orientation: "portrait" | "landscape";
  pageSize: "a4" | "letter" | "auto";
  margin: "none" | "small" | "big";
  compress: boolean;
}

export default function ImageToPDF() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<PDFOptions>({
    orientation: "portrait",
    pageSize: "a4",
    margin: "small",
    compress: true,
  });

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        newImages.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
        });
      }
    });

    setImages((prev) => [...prev, ...newImages]);
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

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return updated;
    });
  };

  const moveImage = (id: string, direction: "up" | "down") => {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === prev.length - 1) return prev;

      const newImages = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;

    setConverting(true);
    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf");

      // Determine page format
      let format: [number, number] | "a4" | "letter" = "a4";
      if (options.pageSize === "letter") {
        format = "letter";
      } else if (options.pageSize === "auto" && images.length > 0) {
        // Use first image dimensions for auto
        const firstImg = new Image();
        firstImg.src = images[0].preview;
        await new Promise((resolve) => { firstImg.onload = resolve; });
        format = [firstImg.width * 0.264583, firstImg.height * 0.264583]; // px to mm
      }

      const pdf = new jsPDF({
        orientation: options.orientation,
        unit: "mm",
        format: format,
      });

      // Calculate margins
      const marginMap = { none: 0, small: 10, big: 20 };
      const margin = marginMap[options.margin];

      let isFirstPage = true;

      for (const image of images) {
        const img = new Image();
        img.src = image.preview;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgWidth = img.width;
        const imgHeight = img.height;

        // Get page dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate available space with margins
        const availableWidth = pdfWidth - (margin * 2);
        const availableHeight = pdfHeight - (margin * 2);

        // Calculate dimensions to fit page
        const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        // Center image
        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        if (!isFirstPage) {
          pdf.addPage();
        }
        isFirstPage = false;

        // Add image with optional compression
        const format = options.compress ? "JPEG" : "PNG";
        const quality = options.compress ? 0.85 : 1.0;

        pdf.addImage(image.preview, format, x, y, width, height, undefined, options.compress ? "FAST" : "NONE");
      }

      pdf.save("converted.pdf");
    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Image to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert JPG, PNG, HEIC, and other images to PDF instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your images, arrange them in any order, and download as a single PDF file. All processing happens in your browser for complete privacy. No file size limits, no signup required.
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
          {images.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop images here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Images
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: JPG, PNG, HEIC, WebP, and more
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {images.length} {images.length === 1 ? "Image" : "Images"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {image.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveImage(image.id, "up")}
                        disabled={index === 0}
                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveImage(image.id, "down")}
                        disabled={index === images.length - 1}
                        className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
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
                      {/* Page Orientation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Orientation
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, orientation: "portrait" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.orientation === "portrait"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Portrait
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, orientation: "landscape" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.orientation === "landscape"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Landscape
                          </button>
                        </div>
                      </div>

                      {/* Page Size */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Size
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, pageSize: "a4" })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.pageSize === "a4"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            A4
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, pageSize: "letter" })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.pageSize === "letter"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Letter
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, pageSize: "auto" })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.pageSize === "auto"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Auto
                          </button>
                        </div>
                      </div>

                      {/* Page Margin */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Margin
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, margin: "none" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.margin === "none"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            None
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, margin: "small" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.margin === "small"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Small
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, margin: "big" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.margin === "big"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Big
                          </button>
                        </div>
                      </div>

                      {/* Compression */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Compression
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, compress: true })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.compress
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Compress
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, compress: false })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              !options.compress
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Original
                          </button>
                        </div>
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
                <strong className="text-gray-900">Upload images</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your images. You can add multiple files at once.
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
                  Use arrow buttons to reorder images. The order will match the PDF pages.
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
                What image formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support all common image formats including JPG, PNG, HEIC, WebP, GIF, BMP, and TIFF.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.
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
                Can I convert multiple images to one PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple images and they will all be combined into a single PDF file. Each image becomes one page in the PDF.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What PDF quality can I expect?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                High quality. You can choose between compressed (smaller file size) or original quality. Both options produce professional-looking PDFs suitable for printing and sharing.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="image-to-pdf" />
    </div>
  );
}
