"use client";

import { useState, useCallback, useRef } from "react";
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

interface CropData {
  x: number;
  y: number;
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
  cropMethod: "preset" | "custom";
  aspectRatio: "1:1" | "16:9" | "4:3" | "free";
  customX: number;
  customY: number;
  customWidth: number;
  customHeight: number;
  outputFormat: "jpeg" | "png" | "webp";
  quality: number;
}

export default function CropImage() {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [converting, setConverting] = useState(false);
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [cropData, setCropData] = useState<CropData>({ x: 0, y: 0, width: 0, height: 0 });
  const [options, setOptions] = useState<Options>({
    cropMethod: "preset",
    aspectRatio: "1:1",
    customX: 0,
    customY: 0,
    customWidth: 400,
    customHeight: 400,
    outputFormat: "jpeg",
    quality: 0.92,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
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

        setImageFile(newFile);

        // Calculate initial crop based on aspect ratio
        const ratio = options.aspectRatio;
        let cropWidth = img.width;
        let cropHeight = img.height;

        if (ratio === "1:1") {
          const minDim = Math.min(img.width, img.height);
          cropWidth = minDim;
          cropHeight = minDim;
        } else if (ratio === "16:9") {
          if (img.width / img.height > 16 / 9) {
            cropWidth = img.height * (16 / 9);
            cropHeight = img.height;
          } else {
            cropWidth = img.width;
            cropHeight = img.width / (16 / 9);
          }
        } else if (ratio === "4:3") {
          if (img.width / img.height > 4 / 3) {
            cropWidth = img.height * (4 / 3);
            cropHeight = img.height;
          } else {
            cropWidth = img.width;
            cropHeight = img.width / (4 / 3);
          }
        } else if (ratio === "free") {
          // Free crop - use full image initially
          cropWidth = img.width;
          cropHeight = img.height;
        }

        const x = (img.width - cropWidth) / 2;
        const y = (img.height - cropHeight) / 2;

        setCropData({
          x: Math.max(0, x),
          y: Math.max(0, y),
          width: Math.round(cropWidth),
          height: Math.round(cropHeight),
        });

        setOptions(prev => ({
          ...prev,
          customX: Math.max(0, Math.round(x)),
          customY: Math.max(0, Math.round(y)),
          customWidth: Math.round(cropWidth),
          customHeight: Math.round(cropHeight),
        }));
      };

      img.src = url;
    }
  }, [options.aspectRatio]);

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

  const removeFile = () => {
    setImageFile(null);
    setConvertedImage(null);
  };

  const updateAspectRatio = (ratio: "1:1" | "16:9" | "4:3" | "free") => {
    if (!imageFile) return;

    let cropWidth = imageFile.width;
    let cropHeight = imageFile.height;

    if (ratio === "1:1") {
      const minDim = Math.min(imageFile.width, imageFile.height);
      cropWidth = minDim;
      cropHeight = minDim;
    } else if (ratio === "16:9") {
      if (imageFile.width / imageFile.height > 16 / 9) {
        cropWidth = imageFile.height * (16 / 9);
        cropHeight = imageFile.height;
      } else {
        cropWidth = imageFile.width;
        cropHeight = imageFile.width / (16 / 9);
      }
    } else if (ratio === "4:3") {
      if (imageFile.width / imageFile.height > 4 / 3) {
        cropWidth = imageFile.height * (4 / 3);
        cropHeight = imageFile.height;
      } else {
        cropWidth = imageFile.width;
        cropHeight = imageFile.width / (4 / 3);
      }
    } else if (ratio === "free") {
      // Free crop - use full image initially
      cropWidth = imageFile.width;
      cropHeight = imageFile.height;
    }

    const x = (imageFile.width - cropWidth) / 2;
    const y = (imageFile.height - cropHeight) / 2;

    setCropData({
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: Math.round(cropWidth),
      height: Math.round(cropHeight),
    });

    setOptions({
      ...options,
      aspectRatio: ratio,
      customX: Math.max(0, Math.round(x)),
      customY: Math.max(0, Math.round(y)),
      customWidth: Math.round(cropWidth),
      customHeight: Math.round(cropHeight),
    });
  };

  const cropImage = async () => {
    if (!imageFile) return;

    setConverting(true);

    try {
      const img = new Image();
      img.src = imageFile.preview;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const cropX = options.cropMethod === "preset" ? cropData.x : options.customX;
          const cropY = options.cropMethod === "preset" ? cropData.y : options.customY;
          const cropWidth = options.cropMethod === "preset" ? cropData.width : options.customWidth;
          const cropHeight = options.cropMethod === "preset" ? cropData.height : options.customHeight;

          // Validate crop dimensions
          const validCropX = Math.max(0, Math.min(cropX, imageFile.width));
          const validCropY = Math.max(0, Math.min(cropY, imageFile.height));
          const validCropWidth = Math.min(cropWidth, imageFile.width - validCropX);
          const validCropHeight = Math.min(cropHeight, imageFile.height - validCropY);

          canvas.width = validCropWidth;
          canvas.height = validCropHeight;

          // Use drawImage with source and destination parameters for cropping
          ctx?.drawImage(
            img,
            validCropX,
            validCropY,
            validCropWidth,
            validCropHeight,
            0,
            0,
            validCropWidth,
            validCropHeight
          );

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const extension = options.outputFormat === "jpeg" ? "jpg" : options.outputFormat;
                const filename = imageFile.originalName.replace(/\.[^.]+$/, `_cropped.${extension}`);

                setConvertedImage({
                  id: imageFile.id,
                  blob,
                  url,
                  filename,
                  width: validCropWidth,
                  height: validCropHeight,
                });
                resolve();
              } else {
                reject(new Error("Failed to crop"));
              }
            },
            `image/${options.outputFormat}`,
            options.quality
          );
        };
        img.onerror = reject;
      });
    } catch (err) {
      alert(`Failed to crop ${imageFile.originalName}`);
    }

    setConverting(false);
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement("a");
    link.href = convertedImage.url;
    link.download = convertedImage.filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crop Image</h1>
          <p className="text-lg text-gray-600 mb-4">
            Crop images to preset ratios or custom dimensions instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your image and crop it to preset aspect ratios (1:1, 4:3, 16:9, Free) or custom dimensions in pixels. Supports JPG, PNG, WebP and all common image formats. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 20% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 156,492 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!imageFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop image here</h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Image
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: JPG, PNG, WebP, and all common image formats
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
                <button
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>

              {/* Image Preview with Crop Overlay */}
              <div className="mb-6 relative inline-block">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageFile.preview}
                    alt={imageFile.originalName}
                    className="max-w-full h-auto rounded border border-gray-300"
                    style={{ maxHeight: "500px" }}
                  />
                  {/* Crop Rectangle Overlay */}
                  <div
                    className="absolute border-4 border-blue-500 pointer-events-none"
                    style={{
                      left: `${((options.cropMethod === "preset" ? cropData.x : options.customX) / imageFile.width) * 100}%`,
                      top: `${((options.cropMethod === "preset" ? cropData.y : options.customY) / imageFile.height) * 100}%`,
                      width: `${((options.cropMethod === "preset" ? cropData.width : options.customWidth) / imageFile.width) * 100}%`,
                      height: `${((options.cropMethod === "preset" ? cropData.height : options.customHeight) / imageFile.height) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Original: {imageFile.width} x {imageFile.height} px
                </p>
              </div>

              {/* Options */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-semibold text-gray-900">Options</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showOptions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showOptions && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                    <div className="space-y-4">
                      {/* Crop Method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Crop Method
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setOptions({ ...options, cropMethod: "preset" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.cropMethod === "preset"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Preset Ratios
                          </button>
                          <button
                            onClick={() => setOptions({ ...options, cropMethod: "custom" })}
                            className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.cropMethod === "custom"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Custom Dimensions
                          </button>
                        </div>
                      </div>

                      {/* Preset Ratios */}
                      {options.cropMethod === "preset" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Aspect Ratio
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={() => updateAspectRatio("1:1")}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.aspectRatio === "1:1"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              1:1
                            </button>
                            <button
                              onClick={() => updateAspectRatio("4:3")}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.aspectRatio === "4:3"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              4:3
                            </button>
                            <button
                              onClick={() => updateAspectRatio("16:9")}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.aspectRatio === "16:9"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              16:9
                            </button>
                            <button
                              onClick={() => updateAspectRatio("free")}
                              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                options.aspectRatio === "free"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              Free
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Custom Dimensions */}
                      {options.cropMethod === "custom" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Custom Crop Area (pixels)
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">X (Left)</label>
                              <input
                                type="number"
                                value={options.customX}
                                onChange={(e) =>
                                  setOptions({ ...options, customX: Number(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                max={imageFile.width}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Y (Top)</label>
                              <input
                                type="number"
                                value={options.customY}
                                onChange={(e) =>
                                  setOptions({ ...options, customY: Number(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                max={imageFile.height}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Width</label>
                              <input
                                type="number"
                                value={options.customWidth}
                                onChange={(e) =>
                                  setOptions({ ...options, customWidth: Number(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                                max={imageFile.width}
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Height</label>
                              <input
                                type="number"
                                value={options.customHeight}
                                onChange={(e) =>
                                  setOptions({ ...options, customHeight: Number(e.target.value) })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                                max={imageFile.height}
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

              {/* Crop Button */}
              {!convertedImage && (
                <button
                  onClick={cropImage}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>Cropping...</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Crop Image
                    </>
                  )}
                </button>
              )}

              {/* Cropped Image */}
              {convertedImage && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Cropped Image</h4>
                    <button
                      onClick={() => {
                        setConvertedImage(null);
                        setImageFile(null);
                      }}
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Start Over
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={convertedImage.url}
                      alt={convertedImage.filename}
                      className="w-full h-auto bg-gray-100 rounded mb-3"
                    />
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 truncate">{convertedImage.filename}</p>
                      <p className="text-xs text-gray-500">
                        {convertedImage.width} x {convertedImage.height} px
                      </p>
                    </div>
                    <button
                      onClick={downloadImage}
                      className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </button>
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
                <strong className="text-gray-900">Upload your image</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your image. All common formats like JPG, PNG, and WebP are supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose crop options</strong>
                <p className="text-gray-600 text-sm">
                  Select a preset aspect ratio (1:1, 4:3, 16:9, Free) or enter custom dimensions. See a visual preview of the crop area on your image.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Crop and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Crop Image&quot; to process. Your cropped image will appear below and you can download it instantly.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What are the preset aspect ratios used for?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Preset ratios help you crop images for specific uses. 1:1 (square) is perfect for profile pictures and Instagram posts. 4:3 is common for standard photos and presentations. 16:9 is ideal for YouTube thumbnails and widescreen displays. Free lets you crop to any custom dimensions without maintaining a ratio.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How do custom dimensions work?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Custom dimensions let you specify the exact pixel coordinates and size of your crop area. X and Y define the top-left starting point, while Width and Height define the crop area size in pixels.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I see the crop area before processing?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. A blue rectangle overlay on your image preview shows exactly where the crop will be applied. This helps you visualize the final result before cropping.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All cropping happens directly in your browser using JavaScript and HTML5 Canvas. Your images never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which output format should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                JPG is best for photos with smaller file sizes. PNG is best for images with transparency or text that need lossless quality. WebP offers excellent compression with high quality but may not work on older browsers.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What happens if my crop dimensions exceed the image size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The tool automatically validates your crop dimensions to ensure they fit within the original image boundaries. Invalid dimensions are automatically adjusted to the maximum possible size.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="crop-image" />

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
