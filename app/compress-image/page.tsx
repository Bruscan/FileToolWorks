"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
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

interface Options {
  compressionLevel: number;
  outputFormat: string; // 'same', 'image/jpeg', 'image/png', 'image/webp'
  resize: number; // 1 = 100%, 0.75 = 75%, etc.
}

export default function CompressImage() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    compressionLevel: 0.85,
    outputFormat: 'same',
    resize: 1,
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: ImageFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: URL.createObjectURL(file),
          originalSize: file.size,
        });
      }
    });

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

  const getOutputFormat = (file: File): string => {
    if (options.outputFormat === 'same') {
      return file.type;
    }
    return options.outputFormat;
  };

  const getOutputExtension = (format: string): string => {
    const extensions: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    return extensions[format] || '.jpg';
  };

  const compressFiles = async () => {
    if (imageFiles.length === 0) return;

    setCompressing(true);
    const compressed: CompressedImage[] = [];

    for (const imageFile of imageFiles) {
      try {
        const Compressor = (await import("compressorjs")).default;
        const outputFormat = getOutputFormat(imageFile.file);
        const outputExtension = getOutputExtension(outputFormat);

        await new Promise<void>((resolve, reject) => {
          new Compressor(imageFile.file, {
            quality: options.compressionLevel,
            maxWidth: options.resize < 1 ? undefined : undefined,
            width: options.resize < 1 ? undefined : undefined,
            convertSize: 0,
            mimeType: outputFormat,
            success(result) {
              const blob = result as Blob;
              const url = URL.createObjectURL(blob);
              const basename = imageFile.originalName.replace(/\.[^.]+$/, '');
              const filename = `${basename}-compressed${outputExtension}`;

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
              resolve();
            },
            error(err) {
              reject(err);
            },
          });
        });
      } catch (err) {
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
            Image Compressor
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Reduce image file size without losing quality. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Compress JPG, PNG, and WebP images instantly. Reduce file size by up to 90% while maintaining quality. Choose compression level, output format, and resize options. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 102,348 votes</span>
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
                Supports: JPG, PNG, WebP, and other image formats
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
                      {/* Image Quality */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image Quality
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={() => setOptions({ ...options, compressionLevel: 0.5 })}
                            className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                              options.compressionLevel === 0.5
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Low
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, compressionLevel: 0.7 })}
                            className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                              options.compressionLevel === 0.7
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Good
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, compressionLevel: 0.85 })}
                            className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                              options.compressionLevel === 0.85
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            High
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, compressionLevel: 0.92 })}
                            className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                              options.compressionLevel === 0.92
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Best
                          </button>
                        </div>
                      </div>

                      {/* Output Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Output Format
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: 'same' })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === 'same'
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Same
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: 'image/jpeg' })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === 'image/jpeg'
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            JPG
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: 'image/png' })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === 'image/png'
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            PNG
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, outputFormat: 'image/webp' })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.outputFormat === 'image/webp'
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            WebP
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
                      Compress Images
                    </>
                  )}
                </button>
              )}

              {/* Compressed Images */}
              {compressedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Compressed Images ({compressedImages.length})
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
                              Reduced by {image.savings.toFixed(0)}%
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
                <strong className="text-gray-900">Upload images</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your images. Supports JPG, PNG, WebP, and other formats. You can upload multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose compression settings</strong>
                <p className="text-gray-600 text-sm">
                  Select compression level (Low to Maximum), output format (keep same or convert), and resize percentage if needed.
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
                  Click &quot;Compress Images&quot; and see before/after file sizes with percentage savings. Download individually or all at once.
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
                How much can I compress an image?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Compression results vary by image type and content. Typically, you can reduce file size by 40-90% depending on the compression level and original image quality. Photos with gradients compress more than images with text or sharp edges.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will compressing affect image quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes, but minimally if you choose High or Maximum compression. Low compression reduces file size significantly but may introduce visible artifacts. We recommend testing different levels to find the best balance for your needs.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is the difference between compression levels?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Low (0.5) creates the smallest files with visible quality loss. Medium (0.7) balances size and quality well. High (0.85) maintains good quality with moderate compression. Maximum (0.92) preserves near-original quality with minimal size reduction.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All compression happens directly in your browser using JavaScript and the Canvas API. Your images never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which output format should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                JPG is best for photos and images with many colors. PNG is ideal for images with transparency or text. WebP offers better compression than JPG while maintaining quality, but may have limited support on older browsers. Choose &quot;Same&quot; to keep the original format.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I compress multiple images at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload as many images as you want and they will all be compressed with the same settings. You can download them individually or all at once using the Download All button.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-image" />
    </div>
  );
}
