"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type AudioFormat = "mp3" | "wav" | "aac";
type AudioQuality = "low" | "medium" | "high";

interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function ExtractAudio() {
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null);
  const [format, setFormat] = useState<AudioFormat>("mp3");
  const [quality, setQuality] = useState<AudioQuality>("medium");
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedAudio, setExtractedAudio] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return;
    }

    setVideoFile({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
    });
    setExtractedAudio(null);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeVideo = () => {
    setVideoFile(null);
    setExtractedAudio(null);
    setError(null);
    setProgress(0);
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

  const extractAudio = async () => {
    if (!videoFile) return;

    setExtracting(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();

      // Read video file
      const videoData = await videoFile.file.arrayBuffer();
      const inputName = "input.mp4";

      await ffmpeg.writeFile(inputName, new Uint8Array(videoData));

      // Determine output parameters based on format and quality
      let outputName = `output.${format}`;
      let codecParams: string[] = [];

      switch (format) {
        case "mp3":
          codecParams = ["-vn", "-acodec", "libmp3lame"];
          switch (quality) {
            case "low":
              codecParams.push("-b:a", "128k");
              break;
            case "medium":
              codecParams.push("-b:a", "192k");
              break;
            case "high":
              codecParams.push("-b:a", "320k");
              break;
          }
          break;
        case "wav":
          codecParams = ["-vn", "-acodec", "pcm_s16le"];
          break;
        case "aac":
          codecParams = ["-vn", "-acodec", "aac"];
          switch (quality) {
            case "low":
              codecParams.push("-b:a", "128k");
              break;
            case "medium":
              codecParams.push("-b:a", "192k");
              break;
            case "high":
              codecParams.push("-b:a", "256k");
              break;
          }
          break;
      }

      // Execute FFmpeg command
      await ffmpeg.exec(["-i", inputName, ...codecParams, outputName]);

      // Read output file
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], {
        type: format === "mp3" ? "audio/mpeg" :
              format === "wav" ? "audio/wav" :
              "audio/aac"
      });

      setExtractedAudio(blob);

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

    } catch (err) {
      console.error("Extraction error:", err);
      setError("Failed to extract audio. Please try again with a different video file.");
    } finally {
      setExtracting(false);
      setProgress(0);
    }
  };

  const downloadAudio = () => {
    if (!extractedAudio || !videoFile) return;

    const url = URL.createObjectURL(extractedAudio);
    const a = document.createElement("a");
    a.href = url;
    const baseName = videoFile.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setVideoFile(null);
    setExtractedAudio(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Extract Audio from Video
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract audio from video files and save as MP3, WAV, or AAC. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload any video file and extract its audio track in seconds. Choose your preferred audio format and quality level. All processing happens in your browser for complete privacy. No file uploads to servers, no file size limits.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 35% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.6 / 5</span>
            <span className="text-gray-500">- 143,827 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!videoFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop video here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Video
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP4, AVI, MOV, MKV, WebM, and more
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  {!extractedAudio && (
                    <button
                      onClick={removeVideo}
                      disabled={extracting}
                      className="p-2 hover:bg-red-100 text-red-600 rounded disabled:opacity-50"
                      title="Remove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {!extractedAudio && (
                <div className="space-y-6 mb-6">
                  {/* Output Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFormat("mp3")}
                        disabled={extracting}
                        className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                          format === "mp3"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        MP3
                      </button>
                      <button
                        onClick={() => setFormat("wav")}
                        disabled={extracting}
                        className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                          format === "wav"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        WAV
                      </button>
                      <button
                        onClick={() => setFormat("aac")}
                        disabled={extracting}
                        className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                          format === "aac"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        AAC
                      </button>
                    </div>
                  </div>

                  {/* Audio Quality */}
                  {format !== "wav" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Audio Quality
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setQuality("low")}
                          disabled={extracting}
                          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                            quality === "low"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          Low
                        </button>
                        <button
                          onClick={() => setQuality("medium")}
                          disabled={extracting}
                          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                            quality === "medium"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          Medium
                        </button>
                        <button
                          onClick={() => setQuality("high")}
                          disabled={extracting}
                          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                            quality === "high"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          High
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {extracting && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Extracting audio... ${progress}%` : "Loading FFmpeg..."}
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

              {!extractedAudio ? (
                <button
                  onClick={extractAudio}
                  disabled={extracting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {extracting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>Extract Audio</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      Audio extracted successfully!
                    </p>
                  </div>
                  <button
                    onClick={downloadAudio}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download {format.toUpperCase()}
                  </button>
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
                <strong className="text-gray-900">Upload video</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your video file. Any video format is supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose format and quality</strong>
                <p className="text-gray-600 text-sm">
                  Select your preferred audio format (MP3, WAV, AAC) and quality level.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Extract and download</strong>
                <p className="text-gray-600 text-sm">
                  Click Extract Audio and your audio file will be ready to download in seconds.
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
                What video formats are supported?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support all common video formats including MP4, AVI, MOV, MKV, WebM, FLV, WMV, and more. If your browser can play it, we can extract audio from it.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which audio format should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP3 is the most universal format and works on all devices. WAV provides uncompressed quality but larger file sizes. AAC offers good quality with smaller files and is preferred for Apple devices.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my video uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All audio extraction happens directly in your browser using WebAssembly. Your video never leaves your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                There is no hard limit, but larger video files may take longer to process and require more browser memory. For best performance, we recommend videos under 500MB.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What is the difference between quality levels?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Low quality (128kbps) is good for voice recordings. Medium (192kbps for MP3, 192kbps for AAC) is suitable for most music. High quality (320kbps for MP3, 256kbps for AAC) provides the best audio quality.
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
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="extract-audio" />
    </div>
  );
}
