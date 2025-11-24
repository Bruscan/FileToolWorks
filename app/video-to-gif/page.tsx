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
}

interface ConvertedGif {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
}

interface Options {
  fps: number;
  size: string; // "original", "720", "480", "360"
  quality: string; // "low", "medium", "high"
  startTime: string; // in seconds
  duration: string; // in seconds
}

export default function VideoToGIF() {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedGifs, setConvertedGifs] = useState<ConvertedGif[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [progress, setProgress] = useState("");
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [options, setOptions] = useState<Options>({
    fps: 15,
    size: "original",
    quality: "medium",
    startTime: "",
    duration: "",
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

  const convertFiles = async () => {
    if (videoFiles.length === 0 || !ffmpegRef.current || !ffmpegReady) return;

    setConverting(true);
    setProgress("Initializing...");
    const converted: ConvertedGif[] = [];

    for (const videoFile of videoFiles) {
      try {
        const ffmpeg = ffmpegRef.current;
        const inputName = "input.mp4";
        const outputName = "output.gif";

        setProgress(`Loading ${videoFile.originalName}...`);

        // Write input file to FFmpeg's file system
        await ffmpeg.writeFile(inputName, await fetchFile(videoFile.file));

        // Build FFmpeg command arguments
        const args = ["-i", inputName];

        // Add start time if specified
        if (options.startTime && parseFloat(options.startTime) > 0) {
          args.push("-ss", options.startTime);
        }

        // Add duration if specified
        if (options.duration && parseFloat(options.duration) > 0) {
          args.push("-t", options.duration);
        }

        // Build video filter
        let vfFilter = `fps=${options.fps}`;

        // Add scale based on size option
        if (options.size !== "original") {
          vfFilter += `,scale=${options.size}:-1:flags=lanczos`;
        } else {
          vfFilter += `,scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos`;
        }

        // Add quality settings based on quality option
        if (options.quality === "low") {
          vfFilter += ",split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3";
        } else if (options.quality === "medium") {
          vfFilter += ",split[s0][s1];[s0]palettegen=max_colors=192[p];[s1][p]paletteuse=dither=bayer:bayer_scale=2";
        } else {
          vfFilter += ",split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer:bayer_scale=1";
        }

        args.push("-vf", vfFilter);
        args.push("-loop", "0"); // Loop forever
        args.push(outputName);

        setProgress(`Converting ${videoFile.originalName}...`);

        // Execute FFmpeg command
        await ffmpeg.exec(args);

        // Read output file
        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([new Uint8Array(data as Uint8Array).buffer], { type: "image/gif" });
        const url = URL.createObjectURL(blob);
        const filename = videoFile.originalName.replace(/\.[^.]+$/, ".gif");

        converted.push({
          id: videoFile.id,
          blob,
          url,
          filename,
        });

        // Cleanup
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);

      } catch (err) {
        console.error("Conversion error:", err);
        alert(`Failed to convert ${videoFile.originalName}. Please try again with a smaller video or different settings.`);
      }
    }

    setConvertedGifs(converted);
    setConverting(false);
    setProgress("");
  };

  const downloadGif = (gif: ConvertedGif) => {
    const link = document.createElement("a");
    link.href = gif.url;
    link.download = gif.filename;
    link.click();
  };

  const downloadAll = () => {
    convertedGifs.forEach((gif, index) => {
      setTimeout(() => downloadGif(gif), index * 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Video to GIF Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert video clips to animated GIFs instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your video files and convert them to animated GIF format with customizable frame rate, size, and quality settings. All processing happens in your browser for complete privacy. No file size limits, no signup required. Note that large videos will produce large GIF files.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 104,892 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {loadingFFmpeg && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading video converter...</p>
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
                    {/* FPS */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frame Rate (FPS)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 15, 24, 30].map((fps) => (
                          <button
                            key={fps}
                            onClick={() => setOptions({ ...options, fps })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.fps === fps
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {fps}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Size
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { label: "Original", value: "original" },
                          { label: "720p", value: "720" },
                          { label: "480p", value: "480" },
                          { label: "360p", value: "360" },
                        ].map((size) => (
                          <button
                            key={size.value}
                            onClick={() => setOptions({ ...options, size: size.value })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.size === size.value
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        GIF Quality
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Low", value: "low" },
                          { label: "Medium", value: "medium" },
                          { label: "High", value: "high" },
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
                    </div>

                    {/* Start Time and Duration */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time (seconds, optional)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={options.startTime}
                          onChange={(e) => setOptions({ ...options, startTime: e.target.value })}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (seconds, optional)
                        </label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={options.duration}
                          onChange={(e) => setOptions({ ...options, duration: e.target.value })}
                          placeholder="Full video"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              {convertedGifs.length === 0 && (
                <button
                  onClick={convertFiles}
                  disabled={converting || !ffmpegReady}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>{progress || "Converting..."}</>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Convert to GIF
                    </>
                  )}
                </button>
              )}

              {/* Converted GIFs */}
              {convertedGifs.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Converted GIFs ({convertedGifs.length})
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
                          setConvertedGifs([]);
                          setVideoFiles([]);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {convertedGifs.map((gif) => (
                      <div
                        key={gif.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={gif.url}
                          alt={gif.filename}
                          className="w-full h-48 object-contain bg-gray-100 rounded mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-gray-600 truncate block">
                              {gif.filename}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(gif.blob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            onClick={() => downloadGif(gif)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors ml-2"
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
                <strong className="text-gray-900">Customize settings</strong>
                <p className="text-gray-600 text-sm">
                  Choose frame rate, output size, quality, and optionally trim your video by setting start time and duration.
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
                  Click &quot;Convert to GIF&quot; and download your animated GIF files individually or all at once.
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
                Why convert video to GIF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                GIFs are perfect for sharing short video clips on social media, messaging apps, and websites. They auto-play without sound and are widely supported across all platforms.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why are GIF files so large?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                GIF is an uncompressed format that stores every frame as an image. To reduce file size, use lower FPS, smaller output size, or shorter duration. Consider using 10-15 FPS and 480p or 360p for smaller files.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my videos uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security.
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
                What settings should I use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                For social media, we recommend 15 FPS, 480p size, and medium quality. For high quality animations, use 24 FPS, original or 720p size, and high quality. Lower settings produce smaller file sizes.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How do I trim my video?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Use the start time field to skip to a specific point in your video (in seconds), and the duration field to set how many seconds to convert. Leave them empty to convert the entire video.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="video-to-gif" />
    </div>
  );
}
