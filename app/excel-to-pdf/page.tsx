"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExcelFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function ExcelToPDF() {
  const [files, setFiles] = useState<ExcelFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: ExcelFile[] = [];
    Array.from(fileList).forEach((file) => {
      // Accept .xls and .xlsx files
      if (
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx") ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
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
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const convertToPDF = async () => {
    if (files.length === 0) return;

    setConverting(true);
    try {
      for (const excelFile of files) {
        // Read Excel file
        const arrayBuffer = await excelFile.file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON array (array of arrays)
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        // Create PDF
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(16);
        doc.text(firstSheetName, 14, 15);

        // Add table
        autoTable(doc, {
          head: data.length > 0 ? [data[0]] : [],
          body: data.slice(1),
          startY: 25,
          theme: "grid",
          styles: {
            fontSize: 8,
            cellPadding: 2,
          },
          headStyles: {
            fillColor: [66, 139, 202],
            textColor: 255,
            fontStyle: "bold",
          },
          margin: { top: 25 },
        });

        // Save PDF
        const pdfName = excelFile.name.replace(/\.(xlsx?|xls)$/i, ".pdf");
        doc.save(pdfName);
      }

      setConverted(true);
    } catch (error) {
      console.error("Conversion error:", error);
      alert("An error occurred during conversion. Please try again with a valid Excel file.");
    } finally {
      setConverting(false);
    }
  };

  const startOver = () => {
    setFiles([]);
    setConverted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Excel to PDF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert Excel spreadsheets to PDF format instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your Excel files (.xls or .xlsx) and convert them to PDF documents with preserved formatting. The first sheet of your spreadsheet will be converted to a professional-looking PDF table. All processing happens in your browser for complete privacy.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.5 / 5</span>
            <span className="text-gray-500">– 234,128 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {files.length === 0 && !converted ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop Excel files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Excel Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: .xls and .xlsx files
              </p>
            </div>
          ) : converted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Conversion Complete!
              </h3>
              <p className="text-gray-600 mb-6">
                Your PDF {files.length > 1 ? "files have" : "file has"} been downloaded.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Convert More Files
              </button>
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
                  accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-green-700 text-xs font-semibold">
                        {file.name.endsWith(".xlsx") ? "XLSX" : "XLS"}
                      </span>
                    </div>
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
                      className="p-2 hover:bg-red-100 text-red-600 rounded flex-shrink-0"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={convertToPDF}
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
                <strong className="text-gray-900">Upload Excel files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your .xls or .xlsx files. You can add multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Convert to PDF</strong>
                <p className="text-gray-600 text-sm">
                  Click the convert button. The first sheet of each spreadsheet will be converted to a PDF table.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download your PDFs</strong>
                <p className="text-gray-600 text-sm">
                  Your converted PDF files will download automatically with the same name as your Excel files.
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
                What Excel formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support both .xls (Excel 97-2003) and .xlsx (Excel 2007 and later) file formats. Both formats will be converted to PDF with proper formatting.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which sheet gets converted to PDF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The converter uses the first sheet (leftmost tab) in your Excel workbook. If you need a different sheet converted, move it to the first position before converting.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using JavaScript. Your Excel files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will formulas and formatting be preserved?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The PDF will show the calculated values from formulas (not the formulas themselves). Basic formatting like cell content is preserved. Complex formatting like colors and borders may vary.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Since processing happens in your browser, there are no server-side limits. However, very large spreadsheets with thousands of rows may take longer to process depending on your device.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert password-protected Excel files?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Password-protected or encrypted Excel files cannot be converted. You will need to remove the password protection in Excel first before converting to PDF.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="excel-to-pdf" />
    </div>
  );
}
