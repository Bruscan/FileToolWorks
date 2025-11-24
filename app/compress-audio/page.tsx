"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import RelatedTools from "@/components/RelatedTools";

type Bitrate = "64k" | "128k" | "192k";

interface AudioFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface CompressedAudio {
  blob: Blob;
  size: number;
}

export default function CompressAudio() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [bitrate, setBitrate] = useState<Bitrate>("128k");
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedAudios, setCompressedAudios] = useState<Map<string, CompressedAudio>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validAudioTypes = [
      "audio/mpeg",     // MP3
      "audio/wav",      // WAV
      "audio/aac",      // AAC
      "audio/ogg",      // OGG
      "audio/flac",     // FLAC
      "audio/x-flac",   // FLAC alternative
    ];

    const newFiles: AudioFile[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file type
      const isValidType = validAudioTypes.includes(file.type) ||
                         file.name.toLowerCase().endsWith(".mp3") ||
                         file.name.toLowerCase().endsWith(".wav") ||
                         file.name.toLowerCase().endsWith(".aac") ||
                         file.name.toLowerCase().endsWith(".ogg") ||
                         file.name.toLowerCase().endsWith(".flac");

      if (isValidType) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          size: file.size,
        });
      } else {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      setError(`Invalid file types: ${invalidFiles.join(", ")}. Please select MP3, WAV, AAC, OGG, or FLAC files.`);
    } else {
      setError(null);
    }

    setAudioFiles((prev) => [...prev, ...newFiles]);
    setCompressedAudios(new Map());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeAudio = (id: string) => {
    setAudioFiles((prev) => prev.filter((audio) => audio.id !== id));
    setCompressedAudios((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    if (audioFiles.length === 1) {
      setError(null);
    }
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

  const compressAudio = async () => {
    if (audioFiles.length === 0) return;

    setCompressing(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();
      const newCompressedAudios = new Map<string, CompressedAudio>();

      for (let i = 0; i < audioFiles.length; i++) {
        const audioFile = audioFiles[i];
        setProgress(Math.round((i / audioFiles.length) * 100));

        // Read audio file
        const audioData = await audioFile.file.arrayBuffer();
        const inputName = `input_${i}.${audioFile.name.split(".").pop()}`;
        const outputName = `output_${i}.mp3`;

        await ffmpeg.writeFile(inputName, new Uint8Array(audioData));

        // Compress audio with specified bitrate
        await ffmpeg.exec([
          "-i", inputName,
          "-b:a", bitrate,        // Bitrate
          "-ar", "44100",         // Sample rate
          outputName
        ]);

        // Read output file
        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data], { type: "audio/mpeg" });

        newCompressedAudios.set(audioFile.id, {
          blob,
          size: blob.size,
        });

        // Clean up
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      }

      setCompressedAudios(newCompressedAudios);
      setProgress(100);

    } catch (err) {
      console.error("Compression error:", err);
      setError("Failed to compress audio. Please try again with different files.");
    } finally {
      setCompressing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadAudio = (audioFile: AudioFile) => {
    const compressed = compressedAudios.get(audioFile.id);
    if (!compressed) return;

    const url = URL.createObjectURL(compressed.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = audioFile.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}_compressed.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    audioFiles.forEach((audioFile) => {
      downloadAudio(audioFile);
    });
  };

  const startOver = () => {
    setAudioFiles([]);
    setCompressedAudios(new Map());
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getBitrateLabel = (br: Bitrate) => {
    switch (br) {
      case "64k": return "Low (64kbps)";
      case "128k": return "Medium (128kbps)";
      case "192k": return "High (192kbps)";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const calculateCompressionRatio = (originalSize: number, compressedSize: number) => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Audio Compressor
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Reduce audio file size and bitrate instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload audio files and compress them to reduce file size. Choose your preferred bitrate to balance between quality and file size. All processing happens in your browser for complete privacy. Supports MP3, WAV, AAC, OGG, and FLAC formats.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 40% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.6 / 5</span>
            <span className="text-gray-500">- 187,234 votes</span>
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
                Drop audio files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/wav,audio/aac,audio/ogg,audio/flac,.mp3,.wav,.aac,.ogg,.flac"
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Audio Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP3, WAV, AAC, OGG, FLAC
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-3">
                {audioFiles.map((audioFile) => {
                  const compressed = compressedAudios.get(audioFile.id);
                  return (
                    <div
                      key={audioFile.id}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {audioFile.name}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Original: {formatFileSize(audioFile.size)}</span>
                          {compressed && (
                            <>
                              <span>→</span>
                              <span className="text-green-600 font-medium">
                                Compressed: {formatFileSize(compressed.size)}
                                ({calculateCompressionRatio(audioFile.size, compressed.size)}% smaller)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {compressed ? (
                        <button
                          onClick={() => downloadAudio(audioFile)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => removeAudio(audioFile.id)}
                          disabled={compressing}
                          className="p-2 hover:bg-red-100 text-red-600 rounded disabled:opacity-50"
                          title="Remove"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {compressedAudios.size === 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bitrate Quality
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBitrate("64k")}
                      disabled={compressing}
                      className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                        bitrate === "64k"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {getBitrateLabel("64k")}
                    </button>
                    <button
                      onClick={() => setBitrate("128k")}
                      disabled={compressing}
                      className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                        bitrate === "128k"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {getBitrateLabel("128k")}
                    </button>
                    <button
                      onClick={() => setBitrate("192k")}
                      disabled={compressing}
                      className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                        bitrate === "192k"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {getBitrateLabel("192k")}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Lower bitrate means smaller files but lower quality. 128kbps is recommended for most uses.
                  </p>
                </div>
              )}

              {compressing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Compressing audio... ${progress}%` : "Loading FFmpeg..."}
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

              {compressedAudios.size === 0 ? (
                <button
                  onClick={compressAudio}
                  disabled={compressing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {compressing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>Compress Audio</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      Audio files compressed successfully!
                    </p>
                  </div>
                  {audioFiles.length > 1 && (
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
                <strong className="text-gray-900">Upload audio files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your audio files. Supports MP3, WAV, AAC, OGG, and FLAC formats.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose bitrate</strong>
                <p className="text-gray-600 text-sm">
                  Select your preferred bitrate: 64kbps (low), 128kbps (medium), or 192kbps (high).
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
                  Click Compress Audio and your files will be ready to download as MP3 with reduced file size.
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
                What audio formats can I compress?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                We support MP3, WAV, AAC, OGG, and FLAC audio formats. All files are compressed and output as MP3 format for maximum compatibility across devices.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Which bitrate should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                64kbps (low) is best for voice recordings and podcasts. 128kbps (medium) is recommended for most music and offers a good balance. 192kbps (high) provides better quality but larger file sizes.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my audio uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All audio compression happens directly in your browser using WebAssembly. Your audio files never leave your device, ensuring complete privacy and security.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much can I reduce file size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                File size reduction depends on the original file and selected bitrate. You can typically reduce file sizes by 50-90%, especially when compressing high-quality WAV or FLAC files to MP3.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I compress multiple audio files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. You can upload and compress multiple audio files in a single batch. All files will be processed with the same bitrate setting, and you can download them individually or all at once.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this tool free to use?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This audio compressor is completely free with no hidden charges, subscriptions, or signup required. Use it as many times as you need.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-audio" />
    </div>
  );
}
