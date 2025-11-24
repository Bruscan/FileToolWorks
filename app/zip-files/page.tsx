"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star, Archive } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import JSZip from "jszip";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function ZipFiles() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [creating, setCreating] = useState(false);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadedFile[] = [];
    Array.from(fileList).forEach((file) => {
      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
      });
    });

    setFiles((prev) => [...prev, ...newFiles]);
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
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getTotalSize = () => {
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / 1024 / 1024).toFixed(2);
  };

  const createZip = async () => {
    if (files.length === 0) return;

    setCreating(true);

    try {
      const zip = new JSZip();

      // Add all files to the zip
      files.forEach((fileItem) => {
        zip.file(fileItem.name, fileItem.file);
      });

      // Generate the zip file
      const blob = await zip.generateAsync({ type: "blob" });
      setZipBlob(blob);
    } catch (error) {
      alert("Failed to create ZIP archive. Please try again.");
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const downloadZip = () => {
    if (!zipBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "archive.zip";
    link.click();
  };

  const startOver = () => {
    setFiles([]);
    setZipBlob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ZIP Files - Create ZIP Archive
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Compress multiple files into a single ZIP archive. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload any files and combine them into a compressed ZIP archive. Perfect for sharing multiple files at once or reducing storage space. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 203,482 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {files.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: All file types
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {files.length} {files.length === 1 ? "File" : "Files"} ({getTotalSize()} MB total)
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <Archive className="w-8 h-8 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
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

              {/* Options Section */}
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
                    <p className="text-sm text-gray-600">
                      All files will be compressed into a single ZIP archive using standard compression. The archive will be named &quot;archive.zip&quot; by default.
                    </p>
                  </div>
                )}
              </div>

              {/* Create ZIP Button */}
              {!zipBlob && (
                <button
                  onClick={createZip}
                  disabled={creating}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {creating ? (
                    <>Creating ZIP...</>
                  ) : (
                    <>
                      <Archive className="w-5 h-5" />
                      Create ZIP Archive
                    </>
                  )}
                </button>
              )}

              {/* Download Section */}
              {zipBlob && (
                <div className="mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <Archive className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      ZIP Archive Created!
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Your {files.length} files have been compressed into a ZIP archive ({(zipBlob.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={downloadZip}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download ZIP
                      </button>
                      <button
                        onClick={startOver}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                      >
                        Start Over
                      </button>
                    </div>
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
                <strong className="text-gray-900">Upload your files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop any files you want to compress. You can add multiple files of any type.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Review and remove files</strong>
                <p className="text-gray-600 text-sm">
                  Check your file list and remove any files you don&apos;t want to include. You can see the total size of all files.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Create and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Create ZIP Archive&quot; and download your compressed file. Perfect for sharing via email or reducing storage space.
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
                What is a ZIP file?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                A ZIP file is a compressed archive that can contain one or more files or folders. It reduces file size and makes it easy to share multiple files as a single download.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much can ZIP compression reduce file size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Compression rates vary by file type. Text files and documents can compress by 50-90%, while images and videos (already compressed) may only reduce by 5-20%.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All compression happens directly in your browser using JavaScript. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Since processing happens in your browser, the limit depends on your device memory. Most modern computers can easily handle ZIP files up to several GB.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What file types can I add to a ZIP?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                All file types are supported. You can mix documents, images, videos, audio files, and any other file format in a single ZIP archive.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can someone open my ZIP file on any device?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. ZIP is a universal format supported by all operating systems including Windows, Mac, Linux, iOS, and Android. No special software is required.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="zip-files" />
    </div>
  );
}
