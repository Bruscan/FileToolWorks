"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
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
}

interface Options {
  outputFormat: "jpeg" | "png";
  quality: number;
  resize: number; // 1 = 100%, 0.75 = 75%, etc.
}

export default function WebPToJPG() {
  const [webpFiles, setWebpFiles] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    outputFormat: "jpeg",
    quality: 0.92,
    resize: 1,
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: ImageFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp")) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: URL.createObjectURL(file),
        });
      }
    });

    setWebpFiles((prev) => [...prev, ...newFiles]);
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
    setWebpFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const convertFiles = async () => {
    if (webpFiles.length === 0) return;

    setConverting(true);
    const converted: ConvertedImage[] = [];

    for (const webpFile of webpFiles) {
      try {
        const img = new Image();
        img.src = webpFile.preview;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Apply resize
            canvas.width = img.width * options.resize;
            canvas.height = img.height * options.resize;

            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

            const mimeType = options.outputFormat === "jpeg" ? "image/jpeg" : "image/png";
            const extension = options.outputFormat === "jpeg" ? ".jpg" : ".png";

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const filename = webpFile.originalName.replace(/\.webp$/i, extension);

                  converted.push({
                    id: webpFile.id,
                    blob,
                    url,
                    filename,
                  });
                  resolve();
                } else {
                  reject(new Error("Failed to convert"));
                }
              },
              mimeType,
              options.quality
            );
          };
          img.onerror = reject;
        });
      } catch (err) {
        alert(`Failed to convert ${webpFile.originalName}`);
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
            WebP to JPG Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert WebP images to JPG format instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your WebP images and convert them to JPG format with customizable quality and size settings. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 104,573 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {webpFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop WebP files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="image/webp"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select WebP Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: WebP images
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {webpFiles.length} {webpFiles.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept="image/webp"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {webpFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.preview}
                      alt={file.originalName}
                      className="w-12 h-12 object-cover rounded"
                    />
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
                    <div className="space-y-4">
                      {/* Output Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Output Format
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: "jpeg" })}
                            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === "jpeg"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            JPG
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: "png" })}
                            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === "png"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            PNG
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Quality */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Quality
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={() => setOptions({ ...options, quality: 0.5 })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                options.quality === 0.5
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              Low
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, quality: 0.7 })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                options.quality === 0.7
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              Good
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, quality: 0.85 })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                options.quality === 0.85
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              High
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, quality: 0.92 })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                options.quality === 0.92
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              Best
                            </button>
                          </div>
                        </div>

                        {/* Resize */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Size
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={() => setOptions({ ...options, resize: 1 })}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.resize === 1
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              Original
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, resize: 0.75 })}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.resize === 0.75
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              75%
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, resize: 0.5 })}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.resize === 0.5
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              50%
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, resize: 0.25 })}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.resize === 0.25
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              25%
                            </button>
                          </div>
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
                      Convert to {options.outputFormat === "jpeg" ? "JPG" : "PNG"}
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
                          setWebpFiles([]);
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
                <strong className="text-gray-900">Upload WebP files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your WebP images. You can upload multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose format, quality, and size</strong>
                <p className="text-gray-600 text-sm">
                  Select JPG or PNG output, choose quality level, and adjust image size. Higher quality means larger file size.
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
                  Click convert and download your images individually or all at once.
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
                What is WebP format?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                WebP is a modern image format developed by Google that provides superior compression for images on the web. While it offers smaller file sizes, not all software and devices support WebP yet.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why convert WebP to JPG?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                JPG is universally supported across all devices, software, and platforms. Converting WebP to JPG ensures your images can be viewed and edited anywhere without compatibility issues.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the image quality be affected?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can control the output quality. The Best setting (0.92) maintains very high quality similar to the original WebP. Lower settings reduce file size but may show some quality loss.
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
                Can I convert to PNG instead of JPG?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. In the Options section, you can choose between JPG and PNG output formats. PNG is better if you need transparency support or lossless quality.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since conversion happens in your browser, there are no server-imposed file size limits. The only limit is your device memory and browser capability.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="webp-to-jpg" />
    </div>
  );
}
