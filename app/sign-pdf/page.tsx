"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Download, Star, RotateCcw, Pen, Image as ImageIcon, Type, Calendar } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import SignatureCanvas from "react-signature-canvas";

interface SignatureData {
  type: "draw" | "upload";
  dataUrl: string;
}

export default function SignPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("");
  const [signatureMode, setSignatureMode] = useState<"draw" | "upload">("draw");
  const [signature, setSignature] = useState<SignatureData | null>(null);
  const [signaturePosition, setSignaturePosition] = useState({ x: 100, y: 100 });
  const [signatureDragging, setSignatureDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [signatureName, setSignatureName] = useState("");
  const [signatureDate, setSignatureDate] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showSignatureArea, setShowSignatureArea] = useState(false);

  const sigCanvas = useRef<SignatureCanvas>(null);
  const pdfPreviewRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type === "application/pdf") {
      setPdfFile(file);

      // Convert PDF to data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfDataUrl(e.target?.result as string);
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

  const removeFile = () => {
    setPdfFile(null);
    setPdfDataUrl("");
    setSignature(null);
    setShowSignatureArea(false);
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const saveDrawnSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL();
      setSignature({ type: "draw", dataUrl });
      setShowSignatureArea(false);
    } else {
      alert("Please draw your signature first.");
    }
  };

  const handleSignatureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSignature({ type: "upload", dataUrl });
        setShowSignatureArea(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureDragStart = (e: React.MouseEvent) => {
    setSignatureDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSignatureDragMove = (e: React.MouseEvent) => {
    if (!signatureDragging || !pdfPreviewRef.current) return;

    const previewRect = pdfPreviewRef.current.getBoundingClientRect();
    const newX = e.clientX - previewRect.left - dragOffset.x;
    const newY = e.clientY - previewRect.top - dragOffset.y;

    setSignaturePosition({
      x: Math.max(0, Math.min(newX, previewRect.width - 150)),
      y: Math.max(0, Math.min(newY, previewRect.height - 50)),
    });
  };

  const handleSignatureDragEnd = () => {
    setSignatureDragging(false);
  };

  const signPDF = async () => {
    if (!pdfFile || !signature) {
      alert("Please upload a PDF and add a signature.");
      return;
    }

    setProcessing(true);
    try {
      // Dynamic import of pdf-lib
      const { PDFDocument } = await import("pdf-lib");

      // Load the PDF
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Get the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // Convert signature image to PNG bytes
      const signatureImageBytes = await fetch(signature.dataUrl).then((res) => res.arrayBuffer());
      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      // Calculate position (convert from preview coordinates to PDF coordinates)
      const previewElement = pdfPreviewRef.current;
      if (!previewElement) return;

      const previewWidth = previewElement.offsetWidth;
      const previewHeight = previewElement.offsetHeight;

      // Scale coordinates from preview to actual PDF dimensions
      const scaleX = width / previewWidth;
      const scaleY = height / previewHeight;

      const pdfX = signaturePosition.x * scaleX;
      // PDF coordinates start from bottom-left, so we need to flip Y
      const pdfY = height - (signaturePosition.y * scaleY) - (50 * scaleY);

      // Draw signature on PDF
      firstPage.drawImage(signatureImage, {
        x: pdfX,
        y: pdfY,
        width: 150 * scaleX,
        height: 50 * scaleY,
      });

      // Add optional text fields (name and date)
      if (signatureName) {
        firstPage.drawText(signatureName, {
          x: pdfX,
          y: pdfY - 15,
          size: 10,
        });
      }

      if (signatureDate) {
        firstPage.drawText(signatureDate, {
          x: pdfX,
          y: pdfY - 30,
          size: 10,
        });
      }

      // Save the signed PDF
      const signedPdfBytes = await pdfDoc.save();

      // Create a blob and download it
      const blob = new Blob([new Uint8Array(signedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `signed_${pdfFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setCompleted(true);
    } catch (error) {
      console.error("Signing error:", error);
      alert("An error occurred while signing the PDF. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const startOver = () => {
    setPdfFile(null);
    setPdfDataUrl("");
    setSignature(null);
    setSignaturePosition({ x: 100, y: 100 });
    setSignatureName("");
    setSignatureDate("");
    setCompleted(false);
    setShowSignatureArea(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sign PDF Documents
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Add your signature to PDF documents online. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Draw your signature or upload an image, position it anywhere on the PDF, and optionally add your name and date. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 256,482 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!completed ? (
            <>
              {!pdfFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop PDF file here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    Select PDF File
                  </label>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pdfFile.name}
                    </h3>
                    <button
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  {/* PDF Preview with Signature */}
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">PDF Preview (First Page)</h4>
                    <div
                      ref={pdfPreviewRef}
                      className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-white"
                      style={{ height: "500px" }}
                      onMouseMove={handleSignatureDragMove}
                      onMouseUp={handleSignatureDragEnd}
                      onMouseLeave={handleSignatureDragEnd}
                    >
                      {pdfDataUrl && (
                        <embed
                          src={pdfDataUrl}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                          className="pointer-events-none"
                        />
                      )}

                      {signature && (
                        <div
                          onMouseDown={handleSignatureDragStart}
                          style={{
                            position: "absolute",
                            left: `${signaturePosition.x}px`,
                            top: `${signaturePosition.y}px`,
                            cursor: signatureDragging ? "grabbing" : "grab",
                            border: "2px solid blue",
                            padding: "4px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "4px",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={signature.dataUrl}
                            alt="Signature"
                            style={{ width: "150px", height: "50px", display: "block" }}
                            draggable={false}
                          />
                          <button
                            onClick={() => setSignature(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            style={{ fontSize: "12px" }}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    {signature && (
                      <p className="text-sm text-gray-600 mt-2">
                        Drag the signature to position it on the PDF
                      </p>
                    )}
                  </div>

                  {/* Signature Input Section */}
                  {!signature && !showSignatureArea && (
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Add Signature</h4>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setSignatureMode("draw");
                            setShowSignatureArea(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Pen className="w-5 h-5" />
                          Draw Signature
                        </button>
                        <button
                          onClick={() => {
                            setSignatureMode("upload");
                            document.getElementById("signature-image-input")?.click();
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <ImageIcon className="w-5 h-5" />
                          Upload Image
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureImageUpload}
                          className="hidden"
                          id="signature-image-input"
                        />
                      </div>
                    </div>
                  )}

                  {/* Draw Signature Area */}
                  {showSignatureArea && signatureMode === "draw" && (
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Draw Your Signature</h4>
                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                        <SignatureCanvas
                          ref={sigCanvas}
                          canvasProps={{
                            width: 500,
                            height: 200,
                            className: "signature-canvas w-full",
                          }}
                        />
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={clearSignature}
                          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={saveDrawnSignature}
                          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save Signature
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Optional Text Fields */}
                  {signature && (
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Optional Text Fields</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Type className="w-4 h-4" />
                            Name
                          </label>
                          <input
                            type="text"
                            value={signatureName}
                            onChange={(e) => setSignatureName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4" />
                            Date
                          </label>
                          <input
                            type="text"
                            value={signatureDate}
                            onChange={(e) => setSignatureDate(e.target.value)}
                            placeholder="MM/DD/YYYY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sign PDF Button */}
                  {signature && (
                    <button
                      onClick={signPDF}
                      disabled={processing}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      {processing ? (
                        <>Signing PDF...</>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          Sign and Download PDF
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                PDF Signed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your signed PDF has been downloaded to your device.
              </p>
              <button
                onClick={startOver}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Sign Another PDF
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
                <strong className="text-gray-900">Upload PDF file</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your PDF document that needs to be signed.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Add your signature</strong>
                <p className="text-gray-600 text-sm">
                  Draw your signature with mouse or touch, or upload an image of your signature.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Position and customize</strong>
                <p className="text-gray-600 text-sm">
                  Drag the signature to position it anywhere on the PDF. Optionally add your name and date.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                4
              </span>
              <div>
                <strong className="text-gray-900">Sign and download</strong>
                <p className="text-gray-600 text-sm">
                  Click the button and your signed PDF will download instantly.
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
                Is my PDF uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All PDF signing happens directly in your browser using JavaScript. Your PDF and signature never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I sign multiple pages?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Currently, this tool adds the signature to the first page of your PDF. If you need to sign multiple pages, you can split your PDF, sign each page separately, and then merge them back together using our other tools.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What image formats can I upload for my signature?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can upload any common image format including PNG, JPG, JPEG, or GIF. PNG format with a transparent background works best for a professional look.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does this cost anything?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool is completely free to use with no hidden charges, subscriptions, or signup required. Sign as many PDFs as you need, whenever you need.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is the signature legally binding?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                In most jurisdictions, electronic signatures are legally binding. However, for important legal documents, you should consult with legal professionals to ensure compliance with applicable laws and regulations in your area.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I resize or rotate the signature?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The signature is set to a fixed size for consistency. You can position it anywhere on the PDF by dragging it to your desired location. For custom sizing, prepare your signature image to the desired dimensions before uploading.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="sign-pdf" />
    </div>
  );
}
