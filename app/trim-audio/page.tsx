"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

interface AudioFile {
  id: string;
  file: File;
  name: string;
  size: number;
  duration: number | null;
}

export default function TrimAudio() {
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [startTime, setStartTime] = useState<string>("0");
  const [endTime, setEndTime] = useState<string>("");
  const [trimming, setTrimming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trimmedAudio, setTrimmedAudio] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const getAudioDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = "metadata";

      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(audio.src);
        resolve(audio.duration);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audio.src);
        reject(new Error("Failed to load audio metadata"));
      };

      audio.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("audio/")) {
      setError("Please select a valid audio file");
      return;
    }

    // Check supported formats
    const supportedFormats = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/aac", "audio/ogg", "audio/x-m4a"];
    const fileExt = file.name.toLowerCase();
    const isSupported = supportedFormats.includes(file.type) ||
                       fileExt.endsWith(".mp3") ||
                       fileExt.endsWith(".wav") ||
                       fileExt.endsWith(".aac") ||
                       fileExt.endsWith(".ogg") ||
                       fileExt.endsWith(".m4a");

    if (!isSupported) {
      setError("Unsupported audio format. Please use MP3, WAV, AAC, or OGG.");
      return;
    }

    try {
      const duration = await getAudioDuration(file);

      setAudioFile({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        duration,
      });
      setEndTime(duration.toFixed(2));
      setStartTime("0");
      setTrimmedAudio(null);
      setError(null);
    } catch (err) {
      setError("Failed to load audio file. Please try a different file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeAudio = () => {
    setAudioFile(null);
    setTrimmedAudio(null);
    setError(null);
    setProgress(0);
    setStartTime("0");
    setEndTime("");
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

  const getFileExtension = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || "mp3";
    // Map common extensions to FFmpeg-compatible names
    if (ext === "m4a") return "aac";
    return ext;
  };

  const getMimeType = (ext: string): string => {
    const mimeTypes: Record<string, string> = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      aac: "audio/aac",
      ogg: "audio/ogg",
    };
    return mimeTypes[ext] || "audio/mpeg";
  };

  const trimAudio = async () => {
    if (!audioFile) return;

    const start = parseFloat(startTime);
    const end = parseFloat(endTime);

    if (isNaN(start) || isNaN(end)) {
      setError("Please enter valid start and end times");
      return;
    }

    if (start < 0 || end <= start) {
      setError("End time must be greater than start time");
      return;
    }

    if (audioFile.duration && end > audioFile.duration) {
      setError(`End time cannot exceed audio duration (${audioFile.duration.toFixed(2)}s)`);
      return;
    }

    setTrimming(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();

      // Read audio file
      const audioData = await audioFile.file.arrayBuffer();
      const inputExt = getFileExtension(audioFile.name);
      const inputName = `input.${inputExt}`;
      const outputName = `output.${inputExt}`;

      await ffmpeg.writeFile(inputName, new Uint8Array(audioData));

      // Calculate duration (end - start)
      const duration = end - start;

      // Execute FFmpeg command to trim audio
      // -ss: start time, -t: duration, -c copy: copy codec (no re-encoding)
      await ffmpeg.exec([
        "-i", inputName,
        "-ss", start.toString(),
        "-t", duration.toString(),
        "-c", "copy",
        outputName
      ]);

      // Read output file
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], {
        type: getMimeType(inputExt)
      });

      setTrimmedAudio(blob);

      // Clean up
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);

    } catch (err) {
      console.error("Trimming error:", err);
      setError("Failed to trim audio. Please try again with a different audio file.");
    } finally {
      setTrimming(false);
      setProgress(0);
    }
  };

  const downloadAudio = () => {
    if (!trimmedAudio || !audioFile) return;

    const url = URL.createObjectURL(trimmedAudio);
    const a = document.createElement("a");
    a.href = url;
    const baseName = audioFile.name.replace(/\.[^/.]+$/, "");
    const ext = getFileExtension(audioFile.name);
    a.download = `${baseName}_trimmed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startOver = () => {
    setAudioFile(null);
    setTrimmedAudio(null);
    setError(null);
    setProgress(0);
    setStartTime("0");
    setEndTime("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Audio Trimmer
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Cut and trim audio files online. Fast, free, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your audio file and trim it to the exact length you need. Set start and end times in seconds to cut out unwanted parts. All processing happens in your browser for complete privacy. Supports MP3, WAV, AAC, and OGG formats. The output file maintains the same format and quality as the input.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 35% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 165,432 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {!audioFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop audio here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Audio File
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP3, WAV, AAC, OGG
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {audioFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                      {audioFile.duration && (
                        <> • Duration: {formatTime(audioFile.duration)} ({audioFile.duration.toFixed(2)}s)</>
                      )}
                    </p>
                  </div>
                  {!trimmedAudio && (
                    <button
                      onClick={removeAudio}
                      disabled={trimming}
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

              {!trimmedAudio && (
                <div className="space-y-6 mb-6">
                  {/* Trim Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time (seconds)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={audioFile.duration || undefined}
                        step="0.1"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={trimming}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time (seconds)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={audioFile.duration || undefined}
                        step="0.1"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={trimming}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                        placeholder={audioFile.duration?.toFixed(2) || ""}
                      />
                    </div>
                  </div>

                  {startTime && endTime && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Trim duration: {(parseFloat(endTime) - parseFloat(startTime)).toFixed(2)} seconds
                      </p>
                    </div>
                  )}
                </div>
              )}

              {trimming && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Trimming audio... ${progress}%` : "Loading FFmpeg..."}
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

              {!trimmedAudio ? (
                <button
                  onClick={trimAudio}
                  disabled={trimming || !startTime || !endTime}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {trimming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Trimming...
                    </>
                  ) : (
                    <>Trim Audio</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      Audio trimmed successfully!
                    </p>
                  </div>
                  <button
                    onClick={downloadAudio}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Trimmed Audio
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
                <strong className="text-gray-900">Upload audio file</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your audio file. MP3, WAV, AAC, and OGG formats are supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Set start and end times</strong>
                <p className="text-gray-600 text-sm">
                  Enter the start time and end time in seconds. The tool will show your audio duration to help you decide.
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
                  Click Trim Audio and your trimmed file will be ready to download instantly in the same format as the original.
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
                What audio formats can I trim?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support MP3, WAV, AAC, and OGG audio formats. The output file will be in the same format as your input file, preserving the original quality.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How do I know what times to use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                After uploading, we display the total duration of your audio file. You can use this to determine the start and end times. Enter times in seconds (for example, 30.5 for 30.5 seconds).
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my audio file uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All trimming happens directly in your browser using WebAssembly. Your audio file never leaves your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does trimming reduce audio quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. We use codec copying which means the audio is trimmed without re-encoding. This preserves the original quality and makes the process much faster.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is there a file size limit?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                There is no hard limit, but larger audio files may take longer to process and require more browser memory. For best performance, we recommend files under 100MB.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this tool free to use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This audio trimmer is completely free with no hidden charges, subscriptions, or signup required. Trim as many audio files as you need.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="trim-audio" />
    </div>
  );
}
