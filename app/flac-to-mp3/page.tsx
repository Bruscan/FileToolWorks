"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

type Bitrate = "128k" | "192k" | "320k";

interface AudioFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface ConvertedAudio {
  blob: Blob;
  size: number;
}

export default function FlacToMp3() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [bitrate, setBitrate] = useState<Bitrate>("192k");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedAudios, setConvertedAudios] = useState<Map<string, ConvertedAudio>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: AudioFile[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const isValidType = file.type === "audio/flac" ||
                         file.type === "audio/x-flac" ||
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
      setError(`Invalid file types: ${invalidFiles.join(", ")}. Please select FLAC files only.`);
    } else {
      setError(null);
    }

    setAudioFiles((prev) => [...prev, ...newFiles]);
    setConvertedAudios(new Map());
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
    setConvertedAudios((prev) => {
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

  const convertAudio = async () => {
    if (audioFiles.length === 0) return;

    setConverting(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();
      const newConvertedAudios = new Map<string, ConvertedAudio>();

      for (let i = 0; i < audioFiles.length; i++) {
        const audioFile = audioFiles[i];
        setProgress(Math.round((i / audioFiles.length) * 100));

        const audioData = await audioFile.file.arrayBuffer();
        const inputName = `input_${i}.flac`;
        const outputName = `output_${i}.mp3`;

        await ffmpeg.writeFile(inputName, new Uint8Array(audioData));

        await ffmpeg.exec([
          "-i", inputName,
          "-codec:a", "libmp3lame",
          "-b:a", bitrate,
          outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data], { type: "audio/mpeg" });

        newConvertedAudios.set(audioFile.id, {
          blob,
          size: blob.size,
        });

        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      }

      setConvertedAudios(newConvertedAudios);
      setProgress(100);

    } catch (err) {
      console.error("Conversion error:", err);
      setError("Failed to convert audio. Please try again with different files.");
    } finally {
      setConverting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadAudio = (audioFile: AudioFile) => {
    const converted = convertedAudios.get(audioFile.id);
    if (!converted) return;

    const url = URL.createObjectURL(converted.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = audioFile.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.mp3`;
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
    setConvertedAudios(new Map());
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getBitrateLabel = (br: Bitrate) => {
    switch (br) {
      case "128k": return "128kbps";
      case "192k": return "192kbps";
      case "320k": return "320kbps";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const calculateSizeReduction = (originalSize: number, convertedSize: number) => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - convertedSize) / originalSize) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FLAC to MP3 Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert FLAC audio files to MP3 format instantly. Free, fast, and secure.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your FLAC files and convert them to MP3 with customizable bitrate. FLAC files are lossless but large. MP3 gives you smaller files that work on every device and music player. All conversion happens in your browser using WebAssembly, so your files stay private. Need general audio compression? Try our <Link href="/compress-audio" className="text-blue-600 hover:underline">audio compressor</Link>. You can also convert <Link href="/wav-to-mp3" className="text-blue-600 hover:underline">WAV to MP3</Link> or <Link href="/m4a-to-mp3" className="text-blue-600 hover:underline">M4A to MP3</Link>.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 40% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 145,891 votes</span>
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
                Drop FLAC files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/flac,audio/x-flac,.flac"
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select FLAC Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: FLAC audio files
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-3">
                {audioFiles.map((audioFile) => {
                  const converted = convertedAudios.get(audioFile.id);
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
                          {converted && (
                            <>
                              <span>→</span>
                              <span className="text-green-600 font-medium">
                                MP3: {formatFileSize(converted.size)}
                                ({calculateSizeReduction(audioFile.size, converted.size)}% smaller)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {converted ? (
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
                          disabled={converting}
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

              {convertedAudios.size === 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MP3 Bitrate Quality
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBitrate("128k")}
                      disabled={converting}
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
                      disabled={converting}
                      className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                        bitrate === "192k"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {getBitrateLabel("192k")}
                    </button>
                    <button
                      onClick={() => setBitrate("320k")}
                      disabled={converting}
                      className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                        bitrate === "320k"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {getBitrateLabel("320k")}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    128kbps for smaller files, 192kbps for balanced quality, 320kbps for near-lossless MP3 quality.
                  </p>
                </div>
              )}

              {converting && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Converting to MP3... ${progress}%` : "Loading FFmpeg..."}
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

              {convertedAudios.size === 0 ? (
                <button
                  onClick={convertAudio}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>Convert to MP3</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      FLAC files converted to MP3 successfully!
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
                <strong className="text-gray-900">Upload FLAC files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your FLAC audio files. Batch conversion is supported.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Choose MP3 bitrate</strong>
                <p className="text-gray-600 text-sm">
                  Pick 128kbps, 192kbps, or 320kbps. Higher bitrate = better quality but larger file.
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
                  Hit Convert to MP3 and download your files. FLAC to MP3 typically reduces file size by 60-80%. Want to trim your audio first? Use the <Link href="/trim-audio" className="text-blue-600 hover:underline">Audio Trimmer</Link>.
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
                Why convert FLAC to MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                FLAC is a lossless audio format that preserves full quality but creates large files (30-50 MB per song). MP3 files are 60-80% smaller and play on virtually every device, app, and music player. For everyday listening, most people cannot tell the difference between a 320kbps MP3 and the original FLAC.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What bitrate should I use for FLAC to MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                320kbps is the best choice if you want the closest quality to your FLAC originals. 192kbps offers a good balance between quality and size for music. 128kbps works fine for podcasts, voice recordings, or when storage space matters most. Read our <Link href="/blog/flac-to-mp3" className="text-blue-600 hover:underline">FLAC to MP3 conversion guide</Link> for more details.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Will I lose audio quality converting FLAC to MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes, some quality is lost because MP3 is a lossy format while FLAC is lossless. However, at 320kbps the difference is minimal and inaudible to most listeners on standard headphones and speakers. Your original FLAC files remain unchanged.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All conversion happens in your browser using WebAssembly (FFmpeg compiled for the web). Your FLAC files never leave your device. Nothing is uploaded, stored, or tracked. Learn more on our <Link href="/security" className="text-blue-600 hover:underline">security page</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much smaller will my files be?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                A typical 30 MB FLAC file becomes about 7-10 MB as a 320kbps MP3, or 4-6 MB at 192kbps. The exact reduction depends on the audio content and bitrate you choose. Check our <Link href="/blog/flac-vs-mp3" className="text-blue-600 hover:underline">FLAC vs MP3 comparison</Link> for detailed size examples.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this converter free?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This FLAC to MP3 converter is completely free with no file limits, no signup, and no watermarks. Convert as many files as you need. Check out our other audio tools: <Link href="/compress-audio" className="text-blue-600 hover:underline">Audio Compressor</Link>, <Link href="/wav-to-mp3" className="text-blue-600 hover:underline">WAV to MP3</Link>, and <Link href="/extract-audio" className="text-blue-600 hover:underline">Extract Audio from Video</Link>.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="flac-to-mp3" />
    </div>
  );
}
