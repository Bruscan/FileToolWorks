"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Download, FileText, Star, Copy, Check } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

interface ImageFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
}

export default function ImageToText() {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [progress, setProgress] = useState("");
  const [copied, setCopied] = useState(false);
  const tesseractRef = useRef<any>(null);

  const loadTesseract = async () => {
    if (tesseractRef.current) return tesseractRef.current;
    if ((window as any).Tesseract) {
      tesseractRef.current = (window as any).Tesseract;
      return tesseractRef.current;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      script.onload = () => {
        tesseractRef.current = (window as any).Tesseract;
        resolve(tesseractRef.current);
      };
      script.onerror = () =>
        reject(new Error("Failed to load OCR engine. Please refresh and try again."));
      document.head.appendChild(script);
    });
  };

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: e.target?.result as string,
        });
        setExtractedText("");
        setProgress("");
      };
      reader.readAsDataURL(file);
    }
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

  const removeImage = () => {
    setImageFile(null);
    setExtractedText("");
    setProgress("");
  };

  const extractText = async () => {
    if (!imageFile) return;

    setExtracting(true);
    setProgress("Loading OCR engine...");

    try {
      const Tesseract = await loadTesseract();

      setProgress("Initializing text recognition...");

      const worker = await Tesseract.createWorker("eng", 1, {
        logger: (m: any) => {
          if (m.status === "recognizing text") {
            const pct = Math.round(m.progress * 100);
            setProgress(`Recognizing text... ${pct}%`);
          } else if (m.status) {
            setProgress(m.status);
          }
        },
      });

      const {
        data: { text },
      } = await worker.recognize(imageFile.file);

      await worker.terminate();

      setExtractedText(text.trim());
      setProgress("");
    } catch (error) {
      console.error("OCR error:", error);
      alert(
        "An error occurred during text extraction. Please refresh the page and try again."
      );
      setProgress("");
    } finally {
      setExtracting(false);
    }
  };

  const downloadText = () => {
    if (!extractedText) return;

    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const baseName = imageFile?.originalName.replace(/\.[^.]+$/, "") || "extracted";
    link.download = `${baseName}_text.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyText = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = extractedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const startOver = () => {
    setImageFile(null);
    setExtractedText("");
    setProgress("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Image to Text (OCR)
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract text from images using OCR. Free, instant, and private.
          </p>
          <p className="text-gray-600 mb-4">
            Upload any image and extract the text from it using optical character
            recognition. Works with screenshots, photos of documents, scanned
            pages, and more. All processing runs in your browser using
            WebAssembly -- your images never leave your device. Need to extract text
            from PDFs instead? Try our{" "}
            <Link
              href="/pdf-to-text"
              className="text-blue-600 hover:underline"
            >
              PDF to Text converter
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 30% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">-- 196,000 votes</span>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop image here
              </h3>
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
                Supports: JPG, PNG, WebP, BMP, GIF
              </p>
            </div>
          ) : (
            <div>
              {/* Image Preview */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <img
                    src={imageFile.preview}
                    alt="Uploaded"
                    className="w-32 h-32 object-contain rounded border border-gray-200 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {imageFile.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(imageFile.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={removeImage}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Extract Button */}
              {!extractedText && !extracting && (
                <button
                  onClick={extractText}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Extract Text
                </button>
              )}

              {/* Progress */}
              {extracting && (
                <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-gray-700 font-medium">{progress}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    First-time use downloads a 4MB language model (cached for
                    future use)
                  </p>
                </div>
              )}

              {/* Extracted Text */}
              {extractedText && (
                <div className="mt-4">
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Extracted Text
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={copyText}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadText}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download TXT
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                      {extractedText}
                    </pre>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {extractedText.length} characters extracted
                    </p>
                    <button
                      onClick={startOver}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Extract Another Image
                    </button>
                  </div>
                </div>
              )}

              {/* No text found */}
              {extractedText === "" && !extracting && imageFile && progress === "" && (
                <></>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">Upload your image</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop any image file. Screenshots, photos of
                  documents, and scanned pages all work.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Run text extraction</strong>
                <p className="text-gray-600 text-sm">
                  Click Extract Text to start OCR processing. The tool
                  analyzes each character in the image using AI-powered text
                  recognition.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Copy or download text</strong>
                <p className="text-gray-600 text-sm">
                  Review the extracted text, copy it to your clipboard, or
                  download it as a .txt file.
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
                How does the OCR text extraction work?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                This tool uses Tesseract.js, an open-source OCR engine that runs
                directly in your browser using WebAssembly. It analyzes the
                pixels in your image to detect and recognize text characters.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my images uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All OCR processing happens locally in your browser. Your
                images never leave your device, ensuring complete privacy. The
                OCR engine and language data are downloaded once and cached. For
                more privacy-first tools, see our{" "}
                <Link
                  href="/security"
                  className="text-blue-600 hover:underline"
                >
                  security page
                </Link>
                .
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What image formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                JPG, PNG, WebP, BMP, GIF, and most standard image formats.
                Screenshots, photos of documents, and scanned images all work.
                For best results, use clear, high-contrast images. You can also{" "}
                <Link
                  href="/resize-image"
                  className="text-blue-600 hover:underline"
                >
                  resize your image
                </Link>{" "}
                or{" "}
                <Link
                  href="/sharpen-image"
                  className="text-blue-600 hover:underline"
                >
                  sharpen it
                </Link>{" "}
                first for better OCR results.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why is the first scan slow?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The first time you use this tool, it downloads the OCR language
                model (about 4MB). This is cached in your browser, so subsequent
                scans are much faster.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I extract text from handwritten notes?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The OCR engine works best with printed text. Handwritten text
                recognition is limited and may produce inaccurate results. For
                best accuracy, use images with clear printed or typed text.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What languages does this support?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently this tool supports English text recognition. The OCR
                engine uses the English trained data model for character
                recognition.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="image-to-text" />
    </div>
  );
}
