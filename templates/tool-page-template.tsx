/**
 * TOOL PAGE TEMPLATE
 *
 * Instructions:
 * 1. Copy this file to app/[your-tool-slug]/page.tsx
 * 2. Replace all [TOOL_NAME] placeholders with your tool name (e.g., "HEIC to JPG")
 * 3. Replace [TOOL_ID] with the tool ID from lib/tools.ts (e.g., "heic-to-jpg")
 * 4. Update [DESCRIPTION] with your tool description
 * 5. Customize the tool interface section with your specific functionality
 * 6. Update FAQ questions to match your tool
 * 7. Create a corresponding layout.tsx file with SEO metadata
 */

"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

// [TODO] Define your file interface
interface FileItem {
  id: string;
  file: File;
  preview?: string;
}

export default function ToolPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [converting, setConverting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // [TODO] Add your options state if needed
  // const [options, setOptions] = useState({...});

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: FileItem[] = [];
    Array.from(fileList).forEach((file) => {
      // [TODO] Add file type validation for your tool
      if (file.type.startsWith("image/")) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          // preview: URL.createObjectURL(file), // Use if needed
        });
      }
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

  const handleConvert = async () => {
    if (files.length === 0) return;

    setConverting(true);
    try {
      // [TODO] Implement your conversion logic here
      console.log("Converting files...", files);

      // Example: await convertFiles(files, options);

    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please try again.");
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {/* [TOOL_NAME] Converter */}
            [TOOL_NAME]
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {/* [DESCRIPTION] - Short tagline */}
            [DESCRIPTION]
          </p>
          <p className="text-gray-600 mb-4">
            {/* [DESCRIPTION] - Longer description (50-100 words for SEO) */}
            Upload your files, process them instantly, and download the result. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 3,247 votes</span>
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
                accept="*/*" /* [TODO] Set correct file type filter */
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
                {/* [TODO] Update supported formats */}
                Supports: JPG, PNG, PDF, and more
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {files.length} {files.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept="*/*"
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.file.name}
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

              {/* Options (Optional) */}
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
                    {/* [TODO] Add your options here */}
                    <p className="text-sm text-gray-600">Add your custom options here</p>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={converting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {converting ? (
                  <>Converting...</>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Convert Files
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
                <strong className="text-gray-900">Upload files</strong>
                <p className="text-gray-600 text-sm">
                  {/* [TODO] Customize step 1 description */}
                  Click or drag and drop your files. You can add multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose options (optional)</strong>
                <p className="text-gray-600 text-sm">
                  {/* [TODO] Customize step 2 description */}
                  Customize conversion settings if needed.
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
                  {/* [TODO] Customize step 3 description */}
                  Click "Convert" and your file will download automatically.
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
            {/* [TODO] Customize FAQ questions for your tool */}
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What file formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support all common formats including...
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since all processing happens in your browser, there are no server-side limits. However, very large files may take longer to process depending on your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser. Your files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Use it as many times as you need.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert multiple files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload multiple files and they will all be processed.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What quality can I expect?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                High quality. The output maintains the quality of your original files.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools - Automatic */}
      <RelatedTools currentToolId="[TOOL_ID]" />
    </div>
  );
}
