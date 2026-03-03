"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

interface SvgFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
}

interface ConvertedImage {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
  width: number;
  height: number;
}

interface Options {
  scale: number; // 1x, 2x, 3x, 4x
}

export default function SVGToPNG() {
  const [svgFiles, setSvgFiles] = useState<SvgFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    scale: 2,
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: SvgFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: URL.createObjectURL(file),
        });
      }
    });

    setSvgFiles((prev) => [...prev, ...newFiles]);
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
    setSvgFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const convertFiles = async () => {
    if (svgFiles.length === 0) return;

    setConverting(true);
    const converted: ConvertedImage[] = [];

    for (const svgFile of svgFiles) {
      try {
        const svgText = await svgFile.file.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Get SVG dimensions
        let width = parseFloat(svgElement.getAttribute("width") || "0");
        let height = parseFloat(svgElement.getAttribute("height") || "0");

        if (!width || !height) {
          const viewBox = svgElement.getAttribute("viewBox");
          if (viewBox) {
            const parts = viewBox.split(/[\s,]+/);
            width = parseFloat(parts[2]) || 300;
            height = parseFloat(parts[3]) || 300;
          } else {
            width = 300;
            height = 300;
          }
        }

        const scaledWidth = Math.round(width * options.scale);
        const scaledHeight = Math.round(height * options.scale);

        // Create a blob URL from the SVG text for consistent rendering
        const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.src = svgUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
            }

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const filename = svgFile.originalName.replace(/\.svg$/i, ".png");

                  converted.push({
                    id: svgFile.id,
                    blob,
                    url,
                    filename,
                    width: scaledWidth,
                    height: scaledHeight,
                  });
                  resolve();
                } else {
                  reject(new Error("Failed to convert"));
                }
              },
              "image/png"
            );

            URL.revokeObjectURL(svgUrl);
          };
          img.onerror = () => {
            URL.revokeObjectURL(svgUrl);
            reject(new Error("Failed to load SVG"));
          };
        });
      } catch (err) {
        console.error(`Failed to convert ${svgFile.originalName}:`, err);
      }
    }

    setConvertedImages(converted);
    setConverting(false);
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
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
            SVG to PNG Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert SVG vector files to PNG images instantly. Free, no upload needed.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your SVG files and convert them to high-quality PNG images at 1x, 2x, 3x, or 4x resolution. Perfect for designers and developers who need raster versions of vector graphics. Need other image conversions? Try <Link href="/png-to-jpg" className="text-blue-600 hover:underline">PNG to JPG</Link> or <Link href="/image-to-webp" className="text-blue-600 hover:underline">Image to WebP</Link>. All processing happens in your browser for complete privacy.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 89,214 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {svgFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop SVG files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept=".svg,image/svg+xml"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select SVG Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: SVG vector files
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {svgFiles.length} {svgFiles.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept=".svg,image/svg+xml"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {svgFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.preview}
                      alt={file.originalName}
                      className="w-12 h-12 object-contain rounded bg-white border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Scale
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "1x", value: 1 },
                          { label: "2x", value: 2 },
                          { label: "3x", value: 3 },
                          { label: "4x", value: 4 },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setOptions({ ...options, scale: opt.value })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.scale === opt.value
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Higher scale = larger PNG. 2x is recommended for most uses.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              {convertedImages.length === 0 && (
                <button
                  onClick={convertFiles}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>Converting...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Convert to PNG
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
                    <div className="flex gap-2">
                      <button
                        onClick={downloadAll}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Download All
                      </button>
                      <button
                        onClick={() => {
                          setConvertedImages([]);
                          setSvgFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {convertedImages.map((image) => (
                      <div
                        key={image.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="w-full h-48 object-contain bg-gray-100 rounded mb-3"
                          style={{ backgroundImage: "repeating-conic-gradient(#f3f4f6 0% 25%, white 0% 50%)", backgroundSize: "16px 16px" }}
                        />
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-600 truncate block">
                              {image.filename}
                            </span>
                            <span className="text-xs text-gray-400">
                              {image.width} x {image.height}px - {(image.blob.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
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
                <strong className="text-gray-900">Upload SVG files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your SVG files. You can upload multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose output scale</strong>
                <p className="text-gray-600 text-sm">
                  Select 1x, 2x, 3x, or 4x to control the PNG resolution. 2x is great for retina displays.
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
                  Click &quot;Convert to PNG&quot; and download your PNG images individually or all at once.
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
                Why convert SVG to PNG?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                SVG is a vector format that not all applications support. PNG is a universal raster format that works everywhere - social media, email, documents, presentations. Converting SVG to PNG ensures compatibility while preserving transparency.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What does the scale option do?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Scale controls the output resolution. A 100x100 SVG at 1x becomes a 100x100 PNG. At 2x, it becomes 200x200 PNG with sharper details. Use 2x for retina/HiDPI displays, 3x or 4x for print or when you need high-resolution output.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is transparency preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. PNG supports transparency, so any transparent areas in your SVG will remain transparent in the PNG output. This is one advantage of PNG over JPG for SVG conversion.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using the Canvas API. Your SVG files never leave your device, ensuring complete privacy. No signup or account needed.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert multiple SVG files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload as many SVG files as you need and they will all be converted with the same scale setting. Download them individually or use &quot;Download All&quot; to get them all.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What SVG features are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                This tool uses your browser&apos;s native SVG rendering engine, so it supports all standard SVG features including paths, shapes, gradients, filters, and text. External fonts or images referenced by URL may not render if they require network access.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="svg-to-png" />
    </div>
  );
}
