"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2, AlertCircle } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface AudioFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface ConvertedFile {
  blob: Blob;
  name: string;
  size: number;
}

export default function MP3ToWAV() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: AudioFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== "audio/mpeg" && file.type !== "audio/mp3") {
        setError("Please select only MP3 files");
        continue;
      }

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
      });
    }

    setAudioFiles((prev) => [...prev, ...newFiles]);
    setConvertedFiles([]);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (id: string) => {
    setAudioFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const loadFFmpeg = async () => {
    if (ffmpegLoaded && ffmpegRef.current) return ffmpegRef.current;

    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });

      ffmpeg.on("progress", ({ progress: prog }) => {
        setProgress(Math.round(prog * 100));
      });

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      ffmpegRef.current = ffmpeg;
      setFfmpegLoaded(true);
      return ffmpeg;
    } catch (err) {
      console.error("Failed to load FFmpeg:", err);
      throw new Error("Failed to load FFmpeg library");
    }
  };

  const convertToWAV = async () => {
    if (audioFiles.length === 0) return;

    setConverting(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();
      const converted: ConvertedFile[] = [];

      for (let i = 0; i < audioFiles.length; i++) {
        const audioFile = audioFiles[i];

        // Update progress for current file
        setProgress(Math.round((i / audioFiles.length) * 100));

        // Read MP3 file
        const audioData = await audioFile.file.arrayBuffer();
        const inputName = "input.mp3";
        const outputName = "output.wav";

        await ffmpeg.writeFile(inputName, new Uint8Array(audioData));

        // Convert MP3 to WAV with uncompressed PCM
        await ffmpeg.exec([
          "-i", inputName,
          "-acodec", "pcm_s16le", // 16-bit PCM (WAV codec)
          "-ar", "44100", // 44.1kHz sample rate
          outputName
        ]);

        // Read output file
        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data], { type: "audio/wav" });

        // Generate output filename
        const baseName = audioFile.name.replace(/\.[^/.]+$/, "");
        const outputFileName = `${baseName}.wav`;

        converted.push({
          blob,
          name: outputFileName,
          size: blob.size,
        });

        // Clean up
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      }

      setConvertedFiles(converted);
      setProgress(100);

    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to convert MP3 to WAV. Please try again with a different file.");
    } finally {
      setConverting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadFile = (convertedFile: ConvertedFile) => {
    const url = URL.createObjectURL(convertedFile.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    convertedFiles.forEach((file) => {
      downloadFile(file);
    });
  };

  const startOver = () => {
    setAudioFiles([]);
    setConvertedFiles([]);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const calculateSizeIncrease = (originalSize: number, newSize: number) => {
    const increase = ((newSize - originalSize) / originalSize) * 100;
    return increase.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MP3 to WAV Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert MP3 audio files to uncompressed WAV format. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your MP3 files and convert them to high-quality WAV format in seconds. WAV files are uncompressed and offer the highest audio quality, perfect for professional audio editing and production. All processing happens in your browser for complete privacy.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.5 / 5</span>
            <span className="text-gray-500">– 143,000 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {audioFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop MP3 files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/mp3,.mp3"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
                multiple
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select MP3 Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP3 files only
              </p>
            </div>
          ) : (
            <div>
              {/* File Size Warning */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 mb-1">
                    File Size Warning
                  </p>
                  <p className="text-sm text-yellow-800">
                    WAV files are uncompressed and typically 10x larger than MP3 files. This is normal and provides the highest audio quality for professional use.
                  </p>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                {audioFiles.map((audioFile, index) => (
                  <div
                    key={audioFile.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {audioFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(audioFile.size)} MB
                        {convertedFiles[index] && (
                          <span className="ml-2 text-green-600">
                            → {formatFileSize(convertedFiles[index].size)} MB (
                            {calculateSizeIncrease(audioFile.size, convertedFiles[index].size)}% larger)
                          </span>
                        )}
                      </p>
                    </div>
                    {convertedFiles.length === 0 && (
                      <button
                        onClick={() => removeFile(audioFile.id)}
                        disabled={converting}
                        className="p-2 hover:bg-red-100 text-red-600 rounded disabled:opacity-50"
                        title="Remove"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                    {convertedFiles[index] && (
                      <button
                        onClick={() => downloadFile(convertedFiles[index])}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {converting && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Converting to WAV... ${progress}%` : "Loading FFmpeg..."}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {convertedFiles.length === 0 ? (
                <button
                  onClick={convertToWAV}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>Convert to WAV</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      {convertedFiles.length} file{convertedFiles.length > 1 ? "s" : ""} converted successfully!
                    </p>
                  </div>
                  {convertedFiles.length > 1 && (
                    <button
                      onClick={downloadAll}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download All
                    </button>
                  )}
                  <button
                    onClick={startOver}
                    className="w-full bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Start Over
                  </button>
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
                <strong className="text-gray-900">Upload MP3 files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your MP3 files. You can convert multiple files at once.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Convert to WAV</strong>
                <p className="text-gray-600 text-sm">
                  Click Convert to WAV and the files will be processed to uncompressed WAV format.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download WAV files</strong>
                <p className="text-gray-600 text-sm">
                  Download each file individually or all at once. Files are ready for professional use.
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
                Why are WAV files so much larger than MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                WAV files are uncompressed, storing raw audio data without any quality loss. MP3 files use compression to reduce file size, which removes some audio information. WAV files are typically 10x larger but offer the highest quality for professional audio work.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                When should I use WAV instead of MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Use WAV for professional audio editing, music production, archival purposes, or when you need the absolute highest quality. WAV is ideal for audio that will be further processed or edited. Use MP3 for everyday listening, streaming, or when file size matters.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my audio uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using WebAssembly. Your audio files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What sample rate and bit depth does the WAV use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The output WAV files use 44.1kHz sample rate and 16-bit PCM encoding, which is CD quality audio. This is the standard for high-quality digital audio and is compatible with all audio software and devices.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I convert WAV back to MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes, but converting from MP3 to WAV and back to MP3 will not improve quality. The original MP3 compression has already removed some audio data. WAV is best used when you need uncompressed audio for editing or professional work.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                There is no hard limit, but larger files may take longer to process and require more browser memory. For best performance, we recommend MP3 files under 100MB each. Remember that the output WAV will be about 10x larger.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="mp3-to-wav" />
    </div>
  );
}
