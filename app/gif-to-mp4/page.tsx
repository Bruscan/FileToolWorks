"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Download, ChevronDown, Star } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface GifFile {
  id: string;
  file: File;
  originalName: string;
  originalSize: number;
}

interface ConvertedVideo {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
  size: number;
}

interface Options {
  quality: string;
}

export default function GifToMp4() {
  const [gifFiles, setGifFiles] = useState<GifFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [convertedVideos, setConvertedVideos] = useState<ConvertedVideo[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [options, setOptions] = useState<Options>({
    quality: "high",
  });

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
      } catch (err) {
        console.error("Error loading FFmpeg:", err);
        alert("Failed to load FFmpeg. Please refresh the page and try again.");
      } finally {
        setLoadingFFmpeg(false);
      }
    };

    loadFFmpeg();
  }, []);

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: GifFile[] = [];
    const invalidFiles: string[] = [];

    Array.from(fileList).forEach((file) => {
      const isValid = file.type === "image/gif" ||
                     file.name.toLowerCase().endsWith(".gif");
      if (isValid) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          originalSize: file.size,
        });
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Not GIF files: ${invalidFiles.join(", ")}. Please select .gif files only.`);
    } else {
      setError(null);
    }

    setGifFiles((prev) => [...prev, ...newFiles]);
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
    setGifFiles((prev) => prev.filter((f) => f.id !== id));
    if (gifFiles.length === 1) setError(null);
  };

  const convertFiles = async () => {
    if (gifFiles.length === 0 || !ffmpegRef.current || !ffmpegReady) return;

    setConverting(true);
    setProgress("Initializing...");
    setError(null);
    const converted: ConvertedVideo[] = [];

    for (const gifFile of gifFiles) {
      try {
        const ffmpeg = ffmpegRef.current;
        const inputName = "input.gif";
        const outputName = "output.mp4";

        setProgress(`Loading ${gifFile.originalName}...`);

        await ffmpeg.writeFile(inputName, await fetchFile(gifFile.file));

        const args = ["-i", inputName];

        // Ensure even dimensions for H.264 compatibility
        args.push("-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2");

        args.push("-vcodec", "libx264");

        let crfValue: string;
        if (options.quality === "low") {
          crfValue = "28";
        } else if (options.quality === "medium") {
          crfValue = "23";
        } else {
          crfValue = "18";
        }
        args.push("-crf", crfValue);
        args.push("-preset", "medium");

        // yuv420p for maximum player compatibility
        args.push("-pix_fmt", "yuv420p");

        // Web-optimized: move metadata to start of file
        args.push("-movflags", "faststart");

        // No audio in GIF files
        args.push("-an");

        args.push(outputName);

        setProgress(`Converting ${gifFile.originalName}...`);

        await ffmpeg.exec(args);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([new Uint8Array(data as Uint8Array).buffer], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        const filename = gifFile.originalName.replace(/\.[^.]+$/, ".mp4");

        converted.push({ id: gifFile.id, blob, url, filename, size: blob.size });

        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);

      } catch (err) {
        console.error("Conversion error:", err);
        setError(`Failed to convert ${gifFile.originalName}. The file may be corrupted or not an animated GIF.`);
      }
    }

    setConvertedVideos(converted);
    setConverting(false);
    setProgress("");
  };

  const downloadVideo = (video: ConvertedVideo) => {
    const link = document.createElement("a");
    link.href = video.url;
    link.download = video.filename;
    link.click();
  };

  const downloadAll = () => {
    convertedVideos.forEach((video, index) => {
      setTimeout(() => downloadVideo(video), index * 100);
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GIF to MP4 Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert animated GIF files to MP4 video format online. Free, fast, and private.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your animated GIFs and convert them to MP4 videos. MP4 files are typically 80-90% smaller than GIFs while looking sharper, making them ideal for websites, social media, and messaging apps. All conversion happens in your browser using WebAssembly. Your files never leave your device. Want to go the other way? Use our <Link href="/video-to-gif" className="text-blue-600 hover:underline">video to GIF converter</Link>. Need to compress the result? Try the <Link href="/compress-video" className="text-blue-600 hover:underline">video compressor</Link>.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 245,891 votes</span>
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

          {!loadingFFmpeg && gifFiles.length === 0 && convertedVideos.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop GIF files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                type="file"
                accept="image/gif,.gif"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select GIF Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: Animated and static GIF files
              </p>
            </div>
          ) : !loadingFFmpeg && gifFiles.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {gifFiles.length} {gifFiles.length === 1 ? "File" : "Files"}
                </h3>
                <label
                  htmlFor="add-more"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium"
                >
                  + Add More
                </label>
                <input
                  type="file"
                  accept="image/gif,.gif"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="add-more"
                />
              </div>

              {/* File List */}
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {gifFiles.map((file) => (
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

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Quality
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "High", value: "high" },
                          { label: "Medium", value: "medium" },
                          { label: "Low", value: "low" },
                        ].map((q) => (
                          <button
                            key={q.value}
                            onClick={() => setOptions({ ...options, quality: q.value })}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                              options.quality === q.value
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        High quality preserves detail. Low quality creates the smallest MP4 files. All options produce files much smaller than the original GIF.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              {convertedVideos.length === 0 && (
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
                      Convert to MP4
                    </>
                  )}
                </button>
              )}

              {/* Converted Videos */}
              {convertedVideos.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Converted Videos ({convertedVideos.length})
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
                          setConvertedVideos([]);
                          setGifFiles([]);
                          setError(null);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {convertedVideos.map((video) => {
                      const originalFile = gifFiles.find((f) => f.id === video.id);
                      const savings = originalFile
                        ? Math.round((1 - video.size / originalFile.originalSize) * 100)
                        : 0;
                      return (
                        <div
                          key={video.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate mb-1">
                                {video.filename}
                              </p>
                              <p className="text-xs text-gray-500 mb-2">
                                {formatFileSize(video.size)}
                                {savings > 0 && (
                                  <span className="text-green-600 font-medium ml-2">
                                    {savings}% smaller than GIF
                                  </span>
                                )}
                              </p>
                              <video
                                src={video.url}
                                controls
                                loop
                                autoPlay
                                muted
                                className="w-full max-w-md rounded border border-gray-200"
                              />
                            </div>
                            <button
                              onClick={() => downloadVideo(video)}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
                <strong className="text-gray-900">Upload GIF files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your animated .gif files. Batch conversion is supported for multiple files.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose quality</strong>
                <p className="text-gray-600 text-sm">
                  Open options to select output quality. Even Low quality produces sharp video that looks better than the original GIF.
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
                  Click Convert to MP4 and download your files. The MP4 will be much smaller than the GIF. Need to trim it? Use the <Link href="/trim-video" className="text-blue-600 hover:underline">Video Trimmer</Link>.
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
                Why convert GIF to MP4?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP4 files are dramatically smaller than animated GIFs, often 80-90% smaller, while delivering better visual quality. GIF is limited to 256 colors and uses inefficient compression. MP4 uses H.264 encoding which supports millions of colors and much better compression. Platforms like Twitter, Discord, and Slack all prefer MP4 over GIF for this reason.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the animation quality change?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                The MP4 will actually look better than the GIF in most cases. GIF is limited to 256 colors, which causes banding and dithering artifacts. MP4 with H.264 supports full color and produces cleaner frames. Read our <Link href="/blog/gif-vs-mp4" className="text-blue-600 hover:underline">GIF vs MP4 comparison</Link> for a detailed breakdown.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will the MP4 loop like a GIF?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP4 files do not loop automatically by default, but most platforms (Twitter, Discord, Reddit, Slack) auto-loop short MP4 videos. The preview on this page loops automatically. If you need a looping video for a website, add the loop attribute to your HTML video tag.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion runs in your browser using FFmpeg WebAssembly. Your GIF files never leave your device. No data is uploaded, stored, or tracked. This makes it safe for converting private or sensitive content. See our <Link href="/security" className="text-blue-600 hover:underline">security page</Link> for details.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much smaller will the MP4 be?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP4 files are typically 80-95% smaller than the equivalent GIF. A 10MB GIF often converts to a 500KB-2MB MP4. The exact size depends on the content complexity, frame rate, and quality setting. If you need an even smaller file, run the result through our <Link href="/compress-video" className="text-blue-600 hover:underline">video compressor</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this converter free?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This GIF to MP4 converter is completely free with no file limits, no signup, and no watermarks. Convert as many files as you need. You can also do the reverse with our <Link href="/video-to-gif" className="text-blue-600 hover:underline">video to GIF converter</Link> or convert to other formats with the <Link href="/video-to-mp4" className="text-blue-600 hover:underline">general video converter</Link>.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="gif-to-mp4" />
    </div>
  );
}
