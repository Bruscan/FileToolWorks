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

interface TransformedImage {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
}

interface Options {
  rotation: 0 | 90 | 180 | 270; // degrees
  flip: "none" | "horizontal" | "vertical" | "both";
  outputFormat: "jpeg" | "png" | "webp";
  quality: number; // 0.5, 0.7, 0.85, 0.92
}

export default function RotateImage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [transforming, setTransforming] = useState(false);
  const [transformedImages, setTransformedImages] = useState<TransformedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    rotation: 0,
    flip: "none",
    outputFormat: "jpeg",
    quality: 0.92,
  });

  const handleFileSelect = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      Array.from(fileList).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          const newFile: ImageFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            originalName: file.name,
            preview: url,
          };
          setImageFiles((prev) => [...prev, newFile]);
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

  const transformImages = async () => {
    if (imageFiles.length === 0) return;

    setTransforming(true);
    const transformed: TransformedImage[] = [];

    for (const imageFile of imageFiles) {
      try {
        const img = new Image();
        img.src = imageFile.preview;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(new Error("Failed to get canvas context"));
              return;
            }

            // Calculate canvas dimensions based on rotation
            let canvasWidth = img.width;
            let canvasHeight = img.height;

            if (options.rotation === 90 || options.rotation === 270) {
              // Swap width and height for 90° and 270° rotations
              canvasWidth = img.height;
              canvasHeight = img.width;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Save the current context state
            ctx.save();

            // Move to center of canvas
            ctx.translate(canvasWidth / 2, canvasHeight / 2);

            // Apply rotation
            ctx.rotate((options.rotation * Math.PI) / 180);

            // Apply flip
            let scaleX = 1;
            let scaleY = 1;

            if (options.flip === "horizontal" || options.flip === "both") {
              scaleX = -1;
            }
            if (options.flip === "vertical" || options.flip === "both") {
              scaleY = -1;
            }

            ctx.scale(scaleX, scaleY);

            // Draw image centered at origin
            ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

            // Restore context state
            ctx.restore();

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const extension = options.outputFormat === "jpeg" ? "jpg" : options.outputFormat;
                  const filename = imageFile.originalName.replace(
                    /\.[^.]+$/,
                    `.${extension}`
                  );

                  transformed.push({
                    id: imageFile.id,
                    blob,
                    url,
                    filename,
                  });
                  resolve();
                } else {
                  reject(new Error("Failed to transform"));
                }
              },
              `image/${options.outputFormat}`,
              options.quality
            );
          };
          img.onerror = reject;
        });
      } catch (err) {
        alert(`Failed to transform ${imageFile.originalName}`);
      }
    }

    setTransformedImages(transformed);
    setTransforming(false);
  };

  const downloadImage = (image: TransformedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.filename;
    link.click();
  };

  const downloadAll = () => {
    transformedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rotate Image
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Rotate and flip images instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your images and rotate them 90°, 180°, or 270°. Flip horizontally, vertically, or both. Supports JPG, PNG, WebP and all common image formats. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 124,387 votes</span>
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
                      {/* Rotation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rotation
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={() => setOptions({ ...options, rotation: 0 })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.rotation === 0
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            None
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, rotation: 90 })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.rotation === 90
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            90° CW
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, rotation: 180 })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.rotation === 180
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            180°
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, rotation: 270 })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.rotation === 270
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            90° CCW
                          </button>
                        </div>
                      </div>

                      {/* Flip */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Flip
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={() => setOptions({ ...options, flip: "none" })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.flip === "none"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            None
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, flip: "horizontal" })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.flip === "horizontal"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Horizontal
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, flip: "vertical" })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.flip === "vertical"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Vertical
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, flip: "both" })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.flip === "both"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Both
                          </button>
                        </div>
                      </div>

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

              {/* Preview Section */}
              {imageFiles.length > 0 && transformedImages.length === 0 && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imageFiles.slice(0, 4).map((file) => (
                      <div key={file.id} className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={file.preview}
                          alt={file.originalName}
                          className="w-full h-24 object-cover rounded"
                          style={{
                            transform: `rotate(${options.rotation}deg) scale(${
                              options.flip === "horizontal" || options.flip === "both" ? -1 : 1
                            }, ${
                              options.flip === "vertical" || options.flip === "both" ? -1 : 1
                            })`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {imageFiles.length > 4 && (
                    <p className="text-xs text-gray-500 mt-2">
                      + {imageFiles.length - 4} more {imageFiles.length - 4 === 1 ? "image" : "images"}
                    </p>
                  )}
                </div>
              )}

              {/* Transform Button */}
              {transformedImages.length === 0 && (
                <button
                  onClick={transformImages}
                  disabled={transforming}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {transforming ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Apply Changes
                    </>
                  )}
                </button>
              )}

              {/* Transformed Images */}
              {transformedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Processed Images ({transformedImages.length})
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
                          setTransformedImages([]);
                          setImageFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {transformedImages.map((image) => (
                      <div
                        key={image.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="w-full h-48 object-contain bg-gray-100 rounded mb-3"
                        />
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 truncate">
                            {image.filename}
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
                <strong className="text-gray-900">Choose rotation and flip options</strong>
                <p className="text-gray-600 text-sm">
                  Select rotation angle (90°, 180°, 270°) and flip direction (horizontal, vertical, or both). Preview shows changes in real time.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Apply and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Apply Changes&quot; and download your rotated images individually or all at once.
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
                Why rotate images?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Photos taken on smartphones or cameras sometimes have incorrect orientation. Rotating fixes this issue. You may also need to rotate images to match specific design requirements or platform guidelines.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What does 90° CW and 90° CCW mean?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                CW means clockwise (turns right), and CCW means counterclockwise (turns left). 90° CW rotates the image to the right by a quarter turn, while 90° CCW rotates it to the left by a quarter turn.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is the difference between flip and rotate?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Rotate turns the image by an angle (90°, 180°, 270°). Flip creates a mirror image by reversing the image horizontally (left to right), vertically (top to bottom), or both.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All rotation and flipping happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does rotating reduce image quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Rotating at 90°, 180°, or 270° does not reduce quality as these are lossless operations. However, the quality setting for JPG and WebP formats will affect the final file size and quality during export.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I rotate multiple images at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple images and they will all be rotated and flipped with the same settings. You can download them individually or all at once.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="rotate-image" />
    </div>
  );
}
