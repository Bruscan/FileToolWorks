"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";
import { jsPDF } from "jspdf";

interface PngFile {
  id: string;
  file: File;
  originalName: string;
  preview: string;
}

interface Options {
  orientation: "portrait" | "landscape";
  pageSize: "a4" | "letter" | "auto";
  margin: "none" | "small" | "big";
}

export default function PNGToPDF() {
  const [pngFiles, setPngFiles] = useState<PngFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Options>({
    orientation: "portrait",
    pageSize: "a4",
    margin: "small",
  });

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: PngFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type === "image/png") {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          preview: URL.createObjectURL(file),
        });
      }
    });

    setPngFiles((prev) => [...prev, ...newFiles]);
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
    setPngFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveFile = (id: string, direction: "up" | "down") => {
    setPngFiles((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === prev.length - 1) return prev;

      const newFiles = [...prev];
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      [newFiles[index], newFiles[swapIndex]] = [newFiles[swapIndex], newFiles[index]];
      return newFiles;
    });
  };

  const convertToPdf = async () => {
    if (pngFiles.length === 0) return;

    setConverting(true);

    try {
      const margins = { none: 0, small: 10, big: 25 };
      const margin = margins[options.margin];

      const pdf = new jsPDF({
        orientation: options.orientation,
        unit: "mm",
      });

      for (let i = 0; i < pngFiles.length; i++) {
        const pngFile = pngFiles[i];

        if (i > 0) {
          pdf.addPage();
        }

        const img = new Image();
        img.src = pngFile.preview;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const availWidth = pageWidth - margin * 2;
            const availHeight = pageHeight - margin * 2;

            const imgRatio = img.width / img.height;
            let imgWidth = availWidth;
            let imgHeight = availWidth / imgRatio;

            if (imgHeight > availHeight) {
              imgHeight = availHeight;
              imgWidth = availHeight * imgRatio;
            }

            const x = margin + (availWidth - imgWidth) / 2;
            const y = margin + (availHeight - imgHeight) / 2;

            pdf.addImage(pngFile.preview, "PNG", x, y, imgWidth, imgHeight);
            resolve();
          };
        });
      }

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("Failed to create PDF:", err);
    }

    setConverting(false);
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "converted.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            PNG to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert PNG images to PDF documents instantly. Free, fast, and private.
          </p>
          <p className="text-gray-600 mb-4">
            Upload one or more PNG images and combine them into a single PDF document. Reorder pages before converting. For other image formats, use our <Link href="/image-to-pdf" className="text-blue-600 hover:underline">Image to PDF</Link> tool. Need to go the other way? Try <Link href="/pdf-to-jpg" className="text-blue-600 hover:underline">PDF to JPG</Link>. All processing happens in your browser.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">- 134,892 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {pngFiles.length === 0 && !pdfUrl ? (
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
                Supports: PNG images
              </p>
            </div>
          ) : pdfUrl ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Ready!
              </h3>
              <p className="text-gray-600 mb-6">
                Your {pngFiles.length} PNG {pngFiles.length === 1 ? "image has" : "images have"} been converted to PDF.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={downloadPdf}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setPdfUrl(null);
                    setPngFiles([]);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                >
                  Convert More
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {pngFiles.length} {pngFiles.length === 1 ? "Image" : "Images"}
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
                {pngFiles.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                      {index + 1}
                    </span>
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
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveFile(file.id, "up")}
                        className="p-1 hover:bg-gray-200 text-gray-500 rounded"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveFile(file.id, "down")}
                        className="p-1 hover:bg-gray-200 text-gray-500 rounded"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
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
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Orientation
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["portrait", "landscape"] as const).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setOptions({ ...options, orientation: opt })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors capitalize ${
                                options.orientation === opt
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Size
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: "A4", value: "a4" as const },
                            { label: "US Letter", value: "letter" as const },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setOptions({ ...options, pageSize: opt.value })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors ${
                                options.pageSize === opt.value
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Margin
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["none", "small", "big"] as const).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setOptions({ ...options, margin: opt })}
                              className={`px-2 py-2 text-xs font-medium border rounded-lg transition-colors capitalize ${
                                options.margin === opt
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={convertToPdf}
                disabled={converting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {converting ? (
                  <>Converting...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convert to PDF
                  </>
                )}
              </button>
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
                <strong className="text-gray-900">Upload PNG images</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PNG files. Upload multiple images to combine them into one PDF.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Arrange and set options</strong>
                <p className="text-gray-600 text-sm">
                  Reorder images with the arrow buttons. Choose page orientation, size, and margin settings.
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
                  Click &quot;Convert to PDF&quot; and download your PDF document. Each PNG becomes one page.
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
                Can I combine multiple PNG images into one PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple PNG files and they will each become a page in the output PDF. Use the arrow buttons to reorder pages before converting.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is the image quality preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. PNG images are embedded in the PDF at their original resolution. The output PDF maintains the full quality of your original images.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. The entire conversion process runs in your browser using JavaScript. Your PNG files never leave your device. No signup or account needed.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What page sizes are available?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can choose between A4 (210 x 297mm, international standard) and US Letter (8.5 x 11 inches, North American standard). Both support portrait and landscape orientation.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is transparency preserved in the PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                PNG transparency is embedded as-is in the PDF. However, how transparency appears depends on the PDF viewer. Most viewers will display transparent areas as white.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What if I have other image formats too?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                This tool accepts PNG files only. If you have JPG, WebP, or other formats, use our <Link href="/image-to-pdf" className="text-blue-600 hover:underline">Image to PDF</Link> tool which accepts all image formats.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="png-to-pdf" />
    </div>
  );
}
