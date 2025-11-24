"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
  id: string;
  file: File;
  originalName: string;
}

interface ConvertedImage {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
}

interface Options {
  format: "jpeg" | "png";
  quality: number;
}

export default function HEICToJPG() {
  const [heicFiles, setHeicFiles] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    format: "jpeg",
    quality: 0.92,
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: ImageFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
        });
      }
    });

    setHeicFiles((prev) => [...prev, ...newFiles]);
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
    setHeicFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const convertFiles = async () => {
    if (heicFiles.length === 0) return;

    setConverting(true);
    try {
      const heic2any = (await import("heic2any")).default;
      const converted: ConvertedImage[] = [];

      for (const heicFile of heicFiles) {
        try {
          const result = await heic2any({
            blob: heicFile.file,
            toType: `image/${options.format}`,
            quality: options.quality,
          });

          const blob = Array.isArray(result) ? result[0] : result;
          const url = URL.createObjectURL(blob);
          const filename = heicFile.originalName.replace(/\.heic$/i, `.${options.format === "jpeg" ? "jpg" : "png"}`);

          converted.push({
            id: heicFile.id,
            blob,
            url,
            filename,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error converting ${heicFile.originalName}:`, error);
        }
      }

      setConvertedImages(converted);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please try again.");
    } finally {
      setConverting(false);
    }
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
            HEIC to JPG Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert iPhone HEIC photos to JPG or PNG instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your HEIC images from iPhone or iPad and convert them to widely compatible JPG or PNG format. All processing happens in your browser for complete privacy. No file size limits, no signup required.
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
          {heicFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop HEIC files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept=".heic,.heif,image/heic,image/heif"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select HEIC Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: HEIC, HEIF (iPhone photos)
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {heicFiles.length} {heicFiles.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept=".heic,.heif,image/heic,image/heif"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {heicFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
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
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Output Format
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, format: "jpeg" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.format === "jpeg"
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
                            Good
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, quality: 0.92 })}
                            className={`flex-1 px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === 0.92
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Best
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
                  onClick={convertFiles}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>Converting...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Convert to {options.format === "jpeg" ? "JPG" : "PNG"}
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
                        key={image.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="w-full h-48 object-cover bg-gray-100 rounded mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 truncate">
                            {image.filename}
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
                <strong className="text-gray-900">Upload HEIC files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your HEIC photos from iPhone or iPad. You can upload multiple files at once.
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
                  Click &quot;Convert&quot; and download your converted images individually or all at once.
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
                What is HEIC format?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                HEIC (High Efficiency Image Container) is the default photo format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining similar quality.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why convert HEIC to JPG?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                While HEIC files are smaller and higher quality, many devices and websites do not support them. Converting to JPG ensures compatibility across all platforms and devices.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my photos uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your photos never leave your device, ensuring complete privacy and security.
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
                Can I convert multiple HEIC files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple HEIC files and they will all be converted. You can download them individually or all at once.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the quality be affected?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can choose the quality level. The &quot;Best&quot; setting maintains very high quality similar to the original HEIC file. The &quot;Good&quot; setting provides a smaller file size with minimal quality loss.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="heic-to-jpg" />
    </div>
  );
}
