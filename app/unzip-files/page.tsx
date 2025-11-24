"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star, Archive, FileText, FileIcon, Image as ImageIcon } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import JSZip from "jszip";

interface ZipFileEntry {
  id: string;
  name: string;
  size: number;
  blob: Blob;
  path: string;
}

export default function UnzipFiles() {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<ZipFileEntry[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    if (!file.name.toLowerCase().endsWith('.zip')) {
      alert('Please select a ZIP file');
      return;
    }

    setZipFile(file);
    setExtractedFiles([]);
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

  const extractZip = async () => {
    if (!zipFile) return;

    setExtracting(true);

    try {
      const arrayBuffer = await zipFile.arrayBuffer();
      const zip = await JSZip.loadAsync(arrayBuffer);
      const files: ZipFileEntry[] = [];

      // Extract all files
      const promises: Promise<void>[] = [];
      zip.forEach((relativePath, file) => {
        // Skip directories
        if (file.dir) return;

        const promise = file.async("blob").then((blob) => {
          files.push({
            id: Math.random().toString(36).substr(2, 9),
            name: relativePath.split('/').pop() || relativePath,
            size: blob.size,
            blob: blob,
            path: relativePath,
          });
        });
        promises.push(promise);
      });

      await Promise.all(promises);

      // Sort files alphabetically
      files.sort((a, b) => a.path.localeCompare(b.path));

      setExtractedFiles(files);
    } catch (error) {
      alert("Failed to extract ZIP archive. Please try again.");
      console.error(error);
    } finally {
      setExtracting(false);
    }
  };

  const downloadFile = (file: ZipFileEntry) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file.blob);
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadAll = () => {
    extractedFiles.forEach((file) => {
      setTimeout(() => downloadFile(file), 100);
    });
  };

  const startOver = () => {
    setZipFile(null);
    setExtractedFiles([]);
  };

  const getTotalSize = () => {
    const totalBytes = extractedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / 1024 / 1024).toFixed(2);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext || '')) {
      return <ImageIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />;
    } else if (['txt', 'md', 'json', 'xml', 'csv'].includes(ext || '')) {
      return <FileText className="w-8 h-8 text-gray-500 flex-shrink-0" />;
    } else {
      return <FileIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unzip Files - Extract ZIP Archive
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract files from ZIP archives instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload a ZIP file and extract all its contents. View the list of files inside, check their sizes, and download individual files or all at once. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 189,423 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!zipFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop ZIP file here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select ZIP File
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: .zip files
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {zipFile.name}
                </h3>
                <button
                  onClick={startOver}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  Select Different File
                </button>
              </div>

              {/* ZIP File Info */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Archive className="w-12 h-12 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {zipFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(zipFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
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
                      All files will be extracted from the ZIP archive. You can download individual files or all files at once. Files are extracted with their original names and formats.
                    </p>
                  </div>
                )}
              </div>

              {/* Extract Button */}
              {extractedFiles.length === 0 && (
                <button
                  onClick={extractZip}
                  disabled={extracting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {extracting ? (
                    <>Extracting Files...</>
                  ) : (
                    <>
                      <Archive className="w-5 h-5" />
                      Extract Files
                    </>
                  )}
                </button>
              )}

              {/* Extracted Files List */}
              {extractedFiles.length > 0 && (
                <div className="mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {extractedFiles.length} {extractedFiles.length === 1 ? "File" : "Files"} Extracted
                        </h4>
                        <p className="text-sm text-gray-600">
                          Total size: {getTotalSize()} MB
                        </p>
                      </div>
                      <button
                        onClick={downloadAll}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download All
                      </button>
                    </div>

                    {/* File List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {extractedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                        >
                          {getFileIcon(file.name)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.path}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button
                            onClick={() => downloadFile(file)}
                            className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={startOver}
                      className="w-full mt-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Extract Another ZIP
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
                <strong className="text-gray-900">Upload your ZIP file</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop a ZIP archive. The tool will analyze the archive and prepare to extract its contents.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Extract all files</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Extract Files&quot; to unzip the archive. All files will be extracted with their original names and folder paths preserved.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download files</strong>
                <p className="text-gray-600 text-sm">
                  View the list of extracted files with their sizes. Download individual files or click &quot;Download All&quot; to get everything at once.
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
                How do I extract files from a ZIP archive?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Simply upload your ZIP file, click &quot;Extract Files&quot;, and all contents will be extracted. You can then download individual files or all files at once.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All extraction happens directly in your browser using JavaScript. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What file types can be inside the ZIP?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                All file types are supported. ZIP archives can contain any type of file including documents, images, videos, audio files, and more.
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
                Will folder structure be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. The tool displays the full path of each file in the archive, preserving the original folder structure. File names show the complete path from the ZIP root.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I extract password-protected ZIP files?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently, password-protected or encrypted ZIP files are not supported. Only standard ZIP archives can be extracted. Remove the password protection before uploading.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="unzip-files" />
    </div>
  );
}
