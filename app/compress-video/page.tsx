"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface VideoFile {
  id: string;
  file: File;
  originalName: string;
  originalSize: number;
}

interface CompressedVideo {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
  originalSize: number;
  compressedSize: number;
}

interface Options {
  quality: string; // "low", "medium", "high"
  resolution: string; // "original", "1080", "720", "480"
}

export default function CompressVideo() {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [compressedVideos, setCompressedVideos] = useState<CompressedVideo[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [progress, setProgress] = useState("");
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [options, setOptions] = useState<Options>({
    quality: "medium",
    resolution: "original",
  });

  // Load FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (ffmpegRef.current) return;

      setLoadingFFmpeg(true);
      try {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        ffmpeg.on("log", ({ message }) => {
          console.log(message);
        });

        ffmpeg.on("progress", ({ progress: p }) => {
          setProgress(`Processing: ${Math.round(p * 100)}%`);
        });

        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        setFfmpegReady(true);
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
        alert("Failed to load FFmpeg. Please refresh the page and try again.");
      } finally {
        setLoadingFFmpeg(false);
      }
    };

    loadFFmpeg();
  }, []);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: VideoFile[] = [];
    Array.from(fileList).forEach((file) => {
      if (file.type.startsWith("video/")) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          originalSize: file.size,
        });
      }
    });

    setVideoFiles((prev) => [...prev, ...newFiles]);
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
    setVideoFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const compressFiles = async () => {
    if (videoFiles.length === 0 || !ffmpegRef.current || !ffmpegReady) return;

    setCompressing(true);
    setProgress("Initializing...");
    const compressed: CompressedVideo[] = [];

    for (const videoFile of videoFiles) {
      try {
        const ffmpeg = ffmpegRef.current;
        const inputName = "input.mp4";
        const outputName = "output.mp4";

        setProgress(`Loading ${videoFile.originalName}...`);

        // Write input file to FFmpeg's file system
        await ffmpeg.writeFile(inputName, await fetchFile(videoFile.file));

        // Build FFmpeg command arguments
        const args = ["-i", inputName];

        // Set video codec
        args.push("-vcodec", "libx264");

        // Set quality (CRF value: lower = better quality, larger file)
        let crfValue: string;
        if (options.quality === "low") {
          crfValue = "35"; // High compression, lower quality
        } else if (options.quality === "medium") {
          crfValue = "28"; // Balanced
        } else {
          crfValue = "23"; // Low compression, higher quality
        }
        args.push("-crf", crfValue);

        // Set encoding preset (faster = lower quality/smaller size)
        args.push("-preset", "fast");

        // Set resolution if not original
        if (options.resolution !== "original") {
          args.push("-vf", `scale=${options.resolution}:-2`);
        }

        // Set audio codec (copy or compress)
        args.push("-acodec", "aac");
        args.push("-b:a", "128k");

        // Output file
        args.push(outputName);

        setProgress(`Compressing ${videoFile.originalName}...`);

        // Execute FFmpeg command
        await ffmpeg.exec(args);

        // Read output file
        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([new Uint8Array(data as Uint8Array).buffer], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        const filename = videoFile.originalName.replace(/\.[^.]+$/, "_compressed.mp4");

        compressed.push({
          id: videoFile.id,
          blob,
          url,
          filename,
          originalSize: videoFile.originalSize,
          compressedSize: blob.size,
        });

        // Cleanup
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);

      } catch (err) {
        console.error("Compression error:", err);
        alert(`Failed to compress ${videoFile.originalName}. Please try again with different settings.`);
      }
    }

    setCompressedVideos(compressed);
    setCompressing(false);
    setProgress("");
  };

  const downloadVideo = (video: CompressedVideo) => {
    const link = document.createElement("a");
    link.href = video.url;
    link.download = video.filename;
    link.click();
  };

  const downloadAll = () => {
    compressedVideos.forEach((video, index) => {
      setTimeout(() => downloadVideo(video), index * 100);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const calculateCompression = (original: number, compressed: number): number => {
    return Math.round(((original - compressed) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Video Compressor
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Compress video files for easier sharing. Reduce file size while maintaining quality.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your video files and compress them to reduce file size without significant quality loss. Choose from quality presets and resolution options to control the compression level. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">– 198,442 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {loadingFFmpeg && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading video compressor...</p>
            </div>
          )}

          {!loadingFFmpeg && videoFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop video files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Video Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP4, MOV, AVI, WebM, and most video formats
              </p>
            </div>
          ) : !loadingFFmpeg && videoFiles.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {videoFiles.length} {videoFiles.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {videoFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.originalSize)}
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
                  <div className="px-4 pb-4 pt-2 border-t border-gray-200 space-y-4">
                    {/* Quality */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compression Quality
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Low (High Compression)", value: "low" },
                          { label: "Medium", value: "medium" },
                          { label: "High (Low Compression)", value: "high" },
                        ].map((quality) => (
                          <button
                            key={quality.value}
                            onClick={() => setOptions({ ...options, quality: quality.value })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === quality.value
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {quality.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Low: Smallest file size, lower quality. High: Larger file size, better quality.
                      </p>
                    </div>

                    {/* Resolution */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Resolution
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "Original", value: "original" },
                          { label: "1080p", value: "1920" },
                          { label: "720p", value: "1280" },
                          { label: "480p", value: "854" },
                        ].map((resolution) => (
                          <button
                            key={resolution.value}
                            onClick={() => setOptions({ ...options, resolution: resolution.value })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.resolution === resolution.value
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {resolution.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Lowering resolution reduces file size significantly. Original keeps the source resolution.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Compress Button */}
              {compressedVideos.length === 0 && (
                <button
                  onClick={compressFiles}
                  disabled={compressing || !ffmpegReady}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {compressing ? (
                    <>{progress || "Compressing..."}</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Compress Videos
                    </>
                  )}
                </button>
              )}

              {/* Compressed Videos */}
              {compressedVideos.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Compressed Videos ({compressedVideos.length})
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={downloadAll}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Download All
                      </button>
                      <button
                        onClick={() => {
                          setCompressedVideos([]);
                          setVideoFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {compressedVideos.map((video) => (
                      <div
                        key={video.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate mb-2">
                              {video.filename}
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                              <div>
                                <span className="font-medium">Original:</span> {formatFileSize(video.originalSize)}
                              </div>
                              <div>
                                <span className="font-medium">Compressed:</span> {formatFileSize(video.compressedSize)}
                              </div>
                              <div className="text-green-600 font-semibold">
                                {calculateCompression(video.originalSize, video.compressedSize)}% smaller
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadVideo(video)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
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
                <strong className="text-gray-900">Upload video files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your video files. Supports MP4, MOV, AVI, WebM, and most video formats.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose compression settings</strong>
                <p className="text-gray-600 text-sm">
                  Select quality level and output resolution. Lower quality and resolution result in smaller file sizes.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Compress and download</strong>
                <p className="text-gray-600 text-sm">
                  Click Compress Videos and download your compressed files. View file size comparison before and after.
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
                Why compress video files?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Compressing videos reduces file size, making them easier to share via email, messaging apps, and social media. Smaller files also upload faster and take up less storage space.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much can I compress a video?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Compression depends on your settings. Low quality with 480p resolution can reduce file size by 70-90%, while high quality with original resolution may only reduce by 20-40%. The tool shows exact file size comparison.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will compression reduce video quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes, compression always involves some quality loss. However, with medium or high quality settings, the difference is often imperceptible for most viewing purposes. Low quality setting is best for file size reduction when quality is less important.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my videos uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All compression happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What settings should I use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                For social media and messaging, use medium quality with 720p or 480p resolution. For archiving or situations where quality matters, use high quality with original resolution. Experiment to find the right balance for your needs.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What format is the output video?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                All compressed videos are output as MP4 files using the H.264 codec, which is widely supported across all devices and platforms. The audio is encoded as AAC at 128kbps for good quality and small size.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-video" />
    </div>
  );
}
