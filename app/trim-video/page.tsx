"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, X, Download, Scissors, Star } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

interface VideoFile {
  id: string;
  file: File;
  originalName: string;
  duration: number | null;
  previewUrl: string;
}

interface TrimmedVideo {
  id: string;
  blob: Blob;
  url: string;
  filename: string;
}

interface TrimOptions {
  startTime: string;
  endTime: string;
}

export default function TrimVideo() {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
  const [trimming, setTrimming] = useState(false);
  const [trimmedVideos, setTrimmedVideos] = useState<TrimmedVideo[]>([]);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [progress, setProgress] = useState("");
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [trimOptions, setTrimOptions] = useState<TrimOptions>({
    startTime: "",
    endTime: "",
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

  // Parse time string (MM:SS or seconds) to seconds
  const parseTimeToSeconds = (timeStr: string): number => {
    if (!timeStr) return 0;

    // Check if it's in MM:SS format
    if (timeStr.includes(":")) {
      const parts = timeStr.split(":");
      if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10) || 0;
        const seconds = parseFloat(parts[1]) || 0;
        return minutes * 60 + seconds;
      }
    }

    // Otherwise treat as seconds
    return parseFloat(timeStr) || 0;
  };

  // Get video duration
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => resolve(0);
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: VideoFile[] = [];

    for (const file of Array.from(fileList)) {
      if (file.type.startsWith("video/")) {
        const duration = await getVideoDuration(file);
        const previewUrl = URL.createObjectURL(file);

        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          originalName: file.name,
          duration,
          previewUrl,
        });
      }
    }

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
    setVideoFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const trimFiles = async () => {
    if (videoFiles.length === 0 || !ffmpegRef.current || !ffmpegReady) return;

    const startSeconds = parseTimeToSeconds(trimOptions.startTime);
    const endSeconds = parseTimeToSeconds(trimOptions.endTime);

    // Validation
    if (endSeconds > 0 && startSeconds >= endSeconds) {
      alert("End time must be greater than start time.");
      return;
    }

    for (const videoFile of videoFiles) {
      if (videoFile.duration && endSeconds > videoFile.duration) {
        alert(`End time cannot exceed video duration (${formatDuration(videoFile.duration)}).`);
        return;
      }
    }

    setTrimming(true);
    setProgress("Initializing...");
    const trimmed: TrimmedVideo[] = [];

    for (const videoFile of videoFiles) {
      try {
        const ffmpeg = ffmpegRef.current;

        // Determine file extension
        const fileExt = videoFile.originalName.split(".").pop() || "mp4";
        const inputName = `input.${fileExt}`;
        const outputName = `output.${fileExt}`;

        setProgress(`Loading ${videoFile.originalName}...`);

        // Write input file to FFmpeg's file system
        await ffmpeg.writeFile(inputName, await fetchFile(videoFile.file));

        // Build FFmpeg command arguments
        const args = [];

        // Add start time if specified
        if (startSeconds > 0) {
          args.push("-ss", startSeconds.toString());
        }

        args.push("-i", inputName);

        // Calculate duration for trimming
        if (endSeconds > 0) {
          const duration = endSeconds - startSeconds;
          args.push("-t", duration.toString());
        }

        // Copy codec (fast, no re-encoding)
        args.push("-c", "copy");

        args.push(outputName);

        setProgress(`Trimming ${videoFile.originalName}...`);

        // Execute FFmpeg command
        await ffmpeg.exec(args);

        // Read output file
        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([new Uint8Array(data as Uint8Array).buffer], {
          type: videoFile.file.type || "video/mp4"
        });
        const url = URL.createObjectURL(blob);

        // Generate filename with "_trimmed" suffix
        const filename = videoFile.originalName.replace(/(\.[^.]+)$/, "_trimmed$1");

        trimmed.push({
          id: videoFile.id,
          blob,
          url,
          filename,
        });

        // Cleanup
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);

      } catch (err) {
        console.error("Trimming error:", err);
        alert(`Failed to trim ${videoFile.originalName}. Please try again with different settings.`);
      }
    }

    setTrimmedVideos(trimmed);
    setTrimming(false);
    setProgress("");
  };

  const downloadVideo = (video: TrimmedVideo) => {
    const link = document.createElement("a");
    link.href = video.url;
    link.download = video.filename;
    link.click();
  };

  const downloadAll = () => {
    trimmedVideos.forEach((video, index) => {
      setTimeout(() => downloadVideo(video), index * 100);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Video Trimmer
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Trim and cut video clips online. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your video files and trim them by setting start and end times. The output keeps the same quality and format as your original video. All processing happens in your browser for complete privacy. No file size limits, no signup required.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 20% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.8 / 5</span>
            <span className="text-gray-500">– 143,276 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {loadingFFmpeg && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading video trimmer...</p>
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
                        {file.duration && ` • Duration: ${formatDuration(file.duration)}`}
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

              {/* Trim Options */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-4">Trim Settings</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time (optional)
                    </label>
                    <input
                      type="text"
                      value={trimOptions.startTime}
                      onChange={(e) => setTrimOptions({ ...trimOptions, startTime: e.target.value })}
                      placeholder="0 or 1:30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: seconds (e.g., 30) or MM:SS (e.g., 1:30)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time (optional)
                    </label>
                    <input
                      type="text"
                      value={trimOptions.endTime}
                      onChange={(e) => setTrimOptions({ ...trimOptions, endTime: e.target.value })}
                      placeholder="Full video or 2:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: seconds (e.g., 60) or MM:SS (e.g., 2:00)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Leave both fields empty to keep the entire video unchanged. Set only start time to trim from that point to the end.
                </p>
              </div>

              {/* Trim Button */}
              {trimmedVideos.length === 0 && (
                <button
                  onClick={trimFiles}
                  disabled={trimming || !ffmpegReady}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {trimming ? (
                    <>{progress || "Trimming..."}</>
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      Trim Video
                    </>
                  )}
                </button>
              )}

              {/* Trimmed Videos */}
              {trimmedVideos.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Trimmed Videos ({trimmedVideos.length})
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
                          trimmedVideos.forEach((v) => URL.revokeObjectURL(v.url));
                          setTrimmedVideos([]);
                          setVideoFiles([]);
                          setTrimOptions({ startTime: "", endTime: "" });
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {trimmedVideos.map((video) => (
                      <div
                        key={video.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                          src={video.url}
                          controls
                          className="w-full h-48 bg-gray-100 rounded mb-3"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-gray-600 truncate block">
                              {video.filename}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(video.blob.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            onClick={() => downloadVideo(video)}
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
                <strong className="text-gray-900">Set trim times</strong>
                <p className="text-gray-600 text-sm">
                  Enter start and end times in seconds or MM:SS format. Leave empty to keep the entire video.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Trim and download</strong>
                <p className="text-gray-600 text-sm">
                  Click &quot;Trim Video&quot; and download your trimmed videos individually or all at once.
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
                How do I trim a video?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Upload your video, enter the start time (when to begin) and end time (when to stop). You can use seconds (like 30) or MM:SS format (like 1:30). Click Trim Video to create your trimmed clip.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does trimming reduce video quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. This tool uses codec copy mode, which means the video is not re-encoded. The trimmed video keeps the exact same quality, resolution, and format as the original.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my videos uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All processing happens directly in your browser using FFmpeg WebAssembly. Your videos never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What time formats can I use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                You can enter times in two formats: seconds (like 45 or 90.5) or minutes and seconds (like 1:30 or 2:15). The tool accepts both formats for start and end times.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Since processing happens in your browser, there are no server-imposed file size limits. However, very large files may take longer to process depending on your device performance.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I trim multiple videos at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. You can upload multiple videos and apply the same trim settings to all of them. Each video will be processed and available for download individually or as a batch.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="trim-video" />
    </div>
  );
}
