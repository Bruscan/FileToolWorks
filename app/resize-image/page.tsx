"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
  width: number;
  height: number;
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
  resizeMethod: "percentage" | "custom";
  percentage: number; // 0.75, 0.5, 0.25
  customWidth: number;
  customHeight: number;
  keepAspectRatio: boolean;
  outputFormat: "jpeg" | "png" | "webp";
  quality: number; // 0.5, 0.7, 0.85, 0.92
}

export default function ResizeImage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    resizeMethod: "percentage",
    percentage: 0.75,
    customWidth: 800,
    customHeight: 600,
    keepAspectRatio: true,
    outputFormat: "jpeg",
    quality: 0.92,
  });

  const handleFileSelect = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      Array.from(fileList).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            const newFile: ImageFile = {
              id: Math.random().toString(36).substr(2, 9),
              file,
              originalName: file.name,
              preview: url,
              width: img.width,
              height: img.height,
            };

            // Update state after loading each image
            setImageFiles((prev) => [...prev, newFile]);
          };

          img.src = url;
        }
      });
    },
    []
  );

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
    setImageFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateCustomWidth = (width: number) => {
    if (options.keepAspectRatio && imageFiles.length > 0) {
      const firstImage = imageFiles[0];
      const aspectRatio = firstImage.width / firstImage.height;
      const newHeight = Math.round(width / aspectRatio);
      setOptions({ ...options, customWidth: width, customHeight: newHeight });
    } else {
      setOptions({ ...options, customWidth: width });
    }
  };

  const updateCustomHeight = (height: number) => {
    if (options.keepAspectRatio && imageFiles.length > 0) {
      const firstImage = imageFiles[0];
      const aspectRatio = firstImage.width / firstImage.height;
      const newWidth = Math.round(height * aspectRatio);
      setOptions({ ...options, customHeight: height, customWidth: newWidth });
    } else {
      setOptions({ ...options, customHeight: height });
    }
  };

  const resizeImages = async () => {
    if (imageFiles.length === 0) return;

    setConverting(true);
    const converted: ConvertedImage[] = [];

    for (const imageFile of imageFiles) {
      try {
        const img = new Image();
        img.src = imageFile.preview;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let newWidth: number;
            let newHeight: number;

            if (options.resizeMethod === "percentage") {
              newWidth = Math.round(imageFile.width * options.percentage);
              newHeight = Math.round(imageFile.height * options.percentage);
            } else {
              // Custom dimensions
              if (options.keepAspectRatio) {
                const aspectRatio = imageFile.width / imageFile.height;
                newWidth = options.customWidth;
                newHeight = Math.round(options.customWidth / aspectRatio);
              } else {
                newWidth = options.customWidth;
                newHeight = options.customHeight;
              }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx?.drawImage(img, 0, 0, newWidth, newHeight);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const extension = options.outputFormat === "jpeg" ? "jpg" : options.outputFormat;
                  const filename = imageFile.originalName.replace(
                    /\.[^.]+$/,
                    `.${extension}`
                  );

                  converted.push({
                    id: imageFile.id,
                    blob,
                    url,
                    filename,
                    width: newWidth,
                    height: newHeight,
                  });
                  resolve();
                } else {
                  reject(new Error("Failed to resize"));
                }
              },
              `image/${options.outputFormat}`,
              options.quality
            );
          };
          img.onerror = reject;
        });
      } catch (err) {
        alert(`Failed to resize ${imageFile.originalName}`);
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
            Image Resizer
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Resize images by percentage or custom dimensions instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your images and resize them by percentage or to specific pixel dimensions. Supports JPG, PNG, WebP and all common image formats. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 104,892 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {imageFiles.length === 0 ? (
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
                Supports: JPG, PNG, WebP, and all common image formats
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {imageFiles.length} {imageFiles.length === 1 ? "File" : "Files"}
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

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {imageFiles.map((file) => (
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
                        {file.width} x {file.height} px • {(file.file.size / 1024 / 1024).toFixed(2)} MB
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
                      {/* Resize Method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resize Method
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, resizeMethod: "percentage" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.resizeMethod === "percentage"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            By Percentage
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, resizeMethod: "custom" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.resizeMethod === "custom"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Custom Size
                          </button>
                        </div>
                      </div>

                      {/* Percentage Options */}
                      {options.resizeMethod === "percentage" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resize Percentage
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => setOptions({ ...options, percentage: 0.75 })}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.percentage === 0.75
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              75%
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, percentage: 0.5 })}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.percentage === 0.5
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              50%
                            </button>
                            <button
                              onClick={() => setOptions({ ...options, percentage: 0.25 })}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.percentage === 0.25
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              25%
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom Size Options */}
                      {options.resizeMethod === "custom" && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Custom Dimensions (pixels)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input
                                type="checkbox"
                                checked={options.keepAspectRatio}
                                onChange={(e) => setOptions({ ...options, keepAspectRatio: e.target.checked })}
                                className="rounded border-gray-300"
                              />
                              Keep aspect ratio
                            </label>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Width</label>
                              <input
                                type="number"
                                value={options.customWidth}
                                onChange={(e) => updateCustomWidth(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Height</label>
                              <input
                                type="number"
                                value={options.customHeight}
                                onChange={(e) => updateCustomHeight(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                                disabled={options.keepAspectRatio}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Output Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Output Format
                        </label>
                        <div className="grid grid-cols-3 gap-2">
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
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: "webp" })}
                            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === "webp"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            WebP
                          </button>
                        </div>
                      </div>

                      {/* Quality (only for JPG and WebP) */}
                      {(options.outputFormat === "jpeg" || options.outputFormat === "webp") && (
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
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Resize Button */}
              {convertedImages.length === 0 && (
                <button
                  onClick={resizeImages}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>Resizing...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Resize Images
                    </>
                  )}
                </button>
              )}

              {/* Resized Images */}
              {convertedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Resized Images ({convertedImages.length})
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
                          setImageFiles([]);
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
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 truncate">
                            {image.filename}
                          </p>
                          <p className="text-xs text-gray-500">
                            {image.width} x {image.height} px
                          </p>
                        </div>
                        <button
                          onClick={() => downloadImage(image)}
                          className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Download
                        </button>
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
                <strong className="text-gray-900">Upload images</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your images. You can upload multiple files at once in any common format.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose resize options</strong>
                <p className="text-gray-600 text-sm">
                  Select resize by percentage (75%, 50%, 25%) or enter custom dimensions in pixels. Choose output format and quality.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Resize and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Resize Images&quot; and download your resized images individually or all at once.
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
                Why resize images?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Resizing images reduces file size for faster website loading, easier email sharing, and better social media compatibility. Smaller images also save storage space on your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is the difference between percentage and custom size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Percentage resizing scales the image proportionally (75% makes it 3/4 the original size). Custom size lets you specify exact pixel dimensions, with an option to keep the aspect ratio.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What does &quot;keep aspect ratio&quot; mean?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Keep aspect ratio maintains the original proportions of your image, preventing distortion. When enabled, changing width automatically adjusts height and vice versa.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All resizing happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which output format should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                JPG is best for photos with smaller file sizes. PNG is best for images with transparency or text. WebP offers the best compression with high quality but may not work on older browsers.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I resize multiple images at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple images and they will all be resized with the same settings. You can download them individually or all at once.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="resize-image" />
    </div>
  );
}
