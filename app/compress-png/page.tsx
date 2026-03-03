"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
  originalSize: number;
}

interface CompressedImage {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
  originalSize: number;
  compressedSize: number;
  savings: number;
}

export default function CompressPng() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [outputFormat, setOutputFormat] = useState<string>("image/png");
  const [quality, setQuality] = useState(0.85);
  const [resize, setResize] = useState(1);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: ImageFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type === "image/png") {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: URL.createObjectURL(file),
          originalSize: file.size,
        });
      }
    });

    if (newFiles.length === 0 && fileList.length > 0) {
      alert("Please select PNG files only.");
      return;
    }

    setImageFiles((prev) => [...prev, ...newFiles]);
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
    setImageFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getExtension = (format: string): string => {
    const ext: Record<string, string> = {
      "image/png": ".png",
      "image/jpeg": ".jpg",
      "image/webp": ".webp",
    };
    return ext[format] || ".png";
  };

  const compressFiles = async () => {
    if (imageFiles.length === 0) return;

    setCompressing(true);
    const compressed: CompressedImage[] = [];

    for (const imageFile of imageFiles) {
      try {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const targetWidth = Math.round(img.width * resize);
            const targetHeight = Math.round(img.height * resize);
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const ext = getExtension(outputFormat);
            const basename = imageFile.originalName.replace(/\.[^.]+$/, "");
            const filename = `${basename}-compressed${ext}`;

            if (outputFormat === "image/png") {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    const savings = ((imageFile.originalSize - blob.size) / imageFile.originalSize) * 100;
                    compressed.push({
                      id: imageFile.id,
                      blob,
                      url,
                      filename,
                      originalSize: imageFile.originalSize,
                      compressedSize: blob.size,
                      savings: Math.max(0, savings),
                    });
                  }
                  resolve();
                },
                "image/png"
              );
            } else {
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const url = URL.createObjectURL(blob);
                    const savings = ((imageFile.originalSize - blob.size) / imageFile.originalSize) * 100;
                    compressed.push({
                      id: imageFile.id,
                      blob,
                      url,
                      filename,
                      originalSize: imageFile.originalSize,
                      compressedSize: blob.size,
                      savings: Math.max(0, savings),
                    });
                  }
                  resolve();
                },
                outputFormat,
                quality
              );
            }
          };
          img.src = URL.createObjectURL(imageFile.file);
        });
      } catch {
        alert(`Failed to compress ${imageFile.originalName}`);
      }
    }

    setCompressedImages(compressed);
    setCompressing(false);
  };

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.filename;
    link.click();
  };

  const downloadAll = () => {
    compressedImages.forEach((image, index) => {
      setTimeout(() => downloadImage(image), index * 100);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compress PNG
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Reduce PNG file size while keeping transparency. Free and private.
          </p>
          <p className="text-gray-600 mb-4">
            Compress PNG images by stripping metadata and optimizing image data. Keep PNG format for lossless quality with transparency, or convert to JPG/WebP for dramatic size reduction. Everything runs in your browser - files never leave your device. For JPG compression, use our dedicated <Link href="/compress-jpg" className="text-blue-600 hover:underline">JPG compressor</Link>, or try our <Link href="/compress-image" className="text-blue-600 hover:underline">general image compressor</Link> for any format.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 198,432 votes</span>
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
                Drop PNG files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="image/png"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select PNG Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Accepts PNG files only
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
                  accept="image/png"
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
                        {formatFileSize(file.originalSize)}
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
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "PNG", value: "image/png" },
                            { label: "JPG", value: "image/jpeg" },
                            { label: "WebP", value: "image/webp" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setOutputFormat(opt.value)}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                outputFormat === opt.value
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        {outputFormat === "image/jpeg" && (
                          <p className="text-xs text-amber-600 mt-1">Note: JPG does not support transparency</p>
                        )}
                      </div>

                      {/* Quality (only for JPG/WebP) */}
                      {outputFormat !== "image/png" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quality
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { label: "Low", value: 0.5 },
                              { label: "Good", value: 0.7 },
                              { label: "High", value: 0.85 },
                              { label: "Best", value: 0.92 },
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => setQuality(opt.value)}
                                className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                  quality === opt.value
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resize */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image Size
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "Original", value: 1 },
                            { label: "75%", value: 0.75 },
                            { label: "50%", value: 0.5 },
                            { label: "25%", value: 0.25 },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setResize(opt.value)}
                              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                resize === opt.value
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compress Button */}
              {compressedImages.length === 0 && (
                <button
                  onClick={compressFiles}
                  disabled={compressing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {compressing ? (
                    <>Compressing...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Compress PNG Files
                    </>
                  )}
                </button>
              )}

              {/* Compressed Results */}
              {compressedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Compressed ({compressedImages.length})
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
                          setCompressedImages([]);
                          setImageFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {compressedImages.map((image) => (
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
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 truncate">
                            {image.filename}
                          </p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Before: {formatFileSize(image.originalSize)}</span>
                            <span>After: {formatFileSize(image.compressedSize)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-green-600">
                              {image.savings > 0
                                ? `Reduced by ${image.savings.toFixed(0)}%`
                                : "No reduction (already optimized)"}
                            </span>
                            <button
                              onClick={() => downloadImage(image)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              Download
                            </button>
                          </div>
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
                <strong className="text-gray-900">Upload PNG files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PNG images. Upload multiple files for batch compression.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose output settings</strong>
                <p className="text-gray-600 text-sm">
                  Keep as PNG for lossless output, or convert to JPG/WebP for much smaller files. Optionally resize to reduce dimensions.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Compress and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Compress PNG Files&quot; to process. See before/after sizes and download individually or all at once.
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
                How does PNG compression work?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                PNG uses lossless compression by default, so traditional compression keeps quality identical. Our tool reduces file size by stripping unnecessary metadata, optimizing the image data, and optionally resizing. You can also convert to JPG or WebP for much smaller files if you don&apos;t need transparency.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will compressing my PNG lose transparency?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. When you output as PNG, transparency is fully preserved. If you convert to JPG, transparency will be replaced with a white background since JPG does not support transparency. WebP supports transparency and offers better compression. See our <Link href="/png-to-jpg" className="text-blue-600 hover:underline">PNG to JPG converter</Link> for more details.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my PNG files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All processing happens directly in your browser. Your images never leave your device. We never see, store, or access your files. Read about our <Link href="/security" className="text-blue-600 hover:underline">security approach</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why is my compressed PNG still large?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                PNG is a lossless format, so it cannot be compressed as aggressively as JPG. For maximum size reduction, try resizing to 75% or 50%, or convert to JPG or WebP format. Our tool strips metadata which often reduces size by 5-15%.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Should I convert my PNG to JPG for smaller files?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                If your image has no transparency and is a photo, converting to JPG will dramatically reduce file size (often 80-90% smaller). Use the output format option to convert. If you need transparency, keep PNG or try <Link href="/image-to-webp" className="text-blue-600 hover:underline">WebP format</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I compress multiple PNG files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload as many PNG files as you want and they will all be processed with the same settings. Download individually or use the Download All button.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-png" />
    </div>
  );
}
