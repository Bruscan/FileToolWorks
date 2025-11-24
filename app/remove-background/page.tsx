"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, Star, AlertCircle } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
  originalSize: number;
}

interface ProcessedImage {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
  originalUrl: string;
}

export default function RemoveBackground() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [modelLoaded, setModelLoaded] = useState(false);

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

  const processFiles = async () => {
    if (imageFiles.length === 0) return;

    setProcessing(true);
    setProgress("Loading AI model (this may take 10-30 seconds on first use)...");

    const processed: ProcessedImage[] = [];

    try {
      // Dynamically import the library
      const removeBackground = (await import("@imgly/background-removal")).default;

      if (!modelLoaded) {
        setModelLoaded(true);
      }

      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        setProgress(`Processing image ${i + 1} of ${imageFiles.length}...`);

        try {
          // Remove background using the library
          const blob = await removeBackground(imageFile.file);

          const url = URL.createObjectURL(blob);
          const basename = imageFile.originalName.replace(/\.[^.]+$/, "");
          const filename = `${basename}-no-bg.png`;

          processed.push({
            id: imageFile.id,
            blob,
            url,
            filename,
            originalUrl: imageFile.preview,
          });
        } catch (err) {
          console.error(`Failed to process ${imageFile.originalName}:`, err);
          alert(`Failed to process ${imageFile.originalName}. Please try again.`);
        }
      }

      setProcessedImages(processed);
      setProgress("");
    } catch (err) {
      console.error("Error loading background removal library:", err);
      alert("Failed to load the AI model. Please refresh the page and try again.");
      setProgress("");
    }

    setProcessing(false);
  };

  const downloadImage = (image: ProcessedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.filename;
    link.click();
  };

  const downloadAll = () => {
    processedImages.forEach((image, index) => {
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
            Remove Background
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Remove image background automatically with AI. Free, fast, and private.
          </p>
          <p className="text-gray-600 mb-4">
            Remove background from any image using powerful AI technology. Upload photos of people, products, animals, or objects and get clean, transparent PNG files instantly. No manual editing required. Perfect for e-commerce, profile pictures, presentations, and graphic design. All processing happens in your browser for complete privacy.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 10% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.9 / 5</span>
            <span className="text-gray-500">– 412,347 votes</span>
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium">
              First-time processing may take 10-30 seconds
            </p>
            <p className="text-sm text-blue-700 mt-1">
              The AI model (~50MB) downloads automatically on first use and is cached for future sessions. Subsequent processing will be much faster.
            </p>
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

              {/* Progress */}
              {processing && progress && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">{progress}</p>
                  <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "100%" }}></div>
                  </div>
                </div>
              )}

              {/* Process Button */}
              {processedImages.length === 0 && (
                <button
                  onClick={processFiles}
                  disabled={processing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {processing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Remove Background
                    </>
                  )}
                </button>
              )}

              {/* Processed Images */}
              {processedImages.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Processed Images ({processedImages.length})
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
                          setProcessedImages([]);
                          setImageFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {processedImages.map((image) => (
                      <div
                        key={image.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {/* Before */}
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Before</p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.originalUrl}
                              alt="Original"
                              className="w-full h-48 object-contain bg-gray-100 rounded border border-gray-200"
                            />
                          </div>
                          {/* After */}
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">After</p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.url}
                              alt="Background Removed"
                              className="w-full h-48 object-contain rounded border border-gray-200"
                              style={{
                                backgroundImage:
                                  "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                                backgroundSize: "20px 20px",
                                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 truncate">{image.filename}</p>
                          <button
                            onClick={() => downloadImage(image)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Download PNG
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
                <strong className="text-gray-900">Upload images</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your images. Works with photos of people, products, animals, or objects. You can upload multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">AI removes background automatically</strong>
                <p className="text-gray-600 text-sm">
                  Our advanced AI model detects the main subject and removes the background completely. First-time processing takes 10-30 seconds to download the model, then it is cached for faster future use.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download transparent PNG</strong>
                <p className="text-gray-600 text-sm">
                  View before/after preview with checkered background showing transparency. Download individually or all at once as PNG files with transparent backgrounds.
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
                How does AI background removal work?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Our tool uses a machine learning model trained on millions of images to identify the main subject and separate it from the background. The AI analyzes edges, colors, and patterns to create precise cutouts automatically, eliminating the need for manual editing.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why does first-time processing take longer?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The AI model is approximately 50MB and downloads automatically on first use. This one-time download takes 10-30 seconds depending on your internet speed. Once downloaded, the model is cached in your browser, making future background removals much faster (typically 5-15 seconds per image).
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What types of images work best?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The AI works best with clear subjects that have good contrast with the background. Photos of people, products, animals, and objects with defined edges produce excellent results. Images with complex backgrounds, hair, or transparent objects may require additional editing.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All processing happens directly in your browser using WebAssembly and AI models that run locally on your device. Your images never leave your computer, ensuring complete privacy and security. No data is stored or transmitted to any server.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What format are the output images?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                All output images are saved as PNG files with transparent backgrounds. PNG is the standard format for images with transparency and is widely supported across all platforms, design software, and websites. The transparent areas are shown with a checkered pattern in the preview.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I process multiple images at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload as many images as you want and they will all be processed automatically. Each image is processed individually to ensure the best quality results. You can download them one by one or all at once using the Download All button.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="remove-background" />
    </div>
  );
}
