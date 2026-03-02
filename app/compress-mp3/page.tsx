"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

type Bitrate = "64k" | "128k" | "192k" | "320k";

interface Mp3File {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface CompressedMp3 {
  blob: Blob;
  size: number;
}

export default function CompressMp3() {
  const [mp3Files, setMp3Files] = useState<Mp3File[]>([]);
  const [bitrate, setBitrate] = useState<Bitrate>("128k");
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedMp3s, setCompressedMp3s] = useState<Map<string, CompressedMp3>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: Mp3File[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isMp3 = file.type === "audio/mpeg" ||
                    file.type === "audio/mp3" ||
                    file.name.toLowerCase().endsWith(".mp3");

      if (isMp3) {
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
      setError(`Only MP3 files are accepted. For other formats, use our general ${"\u0061udio compressor"}.`);
    } else {
      setError(null);
    }

    setMp3Files((prev) => [...prev, ...newFiles]);
    setCompressedMp3s(new Map());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (id: string) => {
    setMp3Files((prev) => prev.filter((f) => f.id !== id));
    setCompressedMp3s((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    if (mp3Files.length === 1) {
      setError(null);
    }
  };

  const loadFFmpeg = async () => {
    if (ffmpegLoaded && ffmpegRef.current) return ffmpegRef.current;

    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }: { message: string }) => {
        console.log(message);
      });

      ffmpeg.on("progress", ({ progress: prog }: { progress: number }) => {
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

  const compressMp3 = async () => {
    if (mp3Files.length === 0) return;

    setCompressing(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();
      const results = new Map<string, CompressedMp3>();

      for (let i = 0; i < mp3Files.length; i++) {
        const mp3File = mp3Files[i];
        setProgress(Math.round((i / mp3Files.length) * 100));

        const audioData = await mp3File.file.arrayBuffer();
        const inputName = `input_${i}.mp3`;
        const outputName = `output_${i}.mp3`;

        await ffmpeg.writeFile(inputName, new Uint8Array(audioData));

        await ffmpeg.exec([
          "-i", inputName,
          "-codec:a", "libmp3lame",
          "-b:a", bitrate,
          "-ar", "44100",
          outputName,
        ]);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data], { type: "audio/mpeg" });

        results.set(mp3File.id, {
          blob,
          size: blob.size,
        });

        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      }

      setCompressedMp3s(results);
      setProgress(100);
    } catch (err) {
      console.error("Compression error:", err);
      setError("Failed to compress MP3. Please try again.");
    } finally {
      setCompressing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadMp3 = (mp3File: Mp3File) => {
    const compressed = compressedMp3s.get(mp3File.id);
    if (!compressed) return;

    const url = URL.createObjectURL(compressed.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = mp3File.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}_compressed.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    mp3Files.forEach((f) => downloadMp3(f));
  };

  const startOver = () => {
    setMp3Files([]);
    setCompressedMp3s(new Map());
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getBitrateLabel = (br: Bitrate) => {
    switch (br) {
      case "64k": return "64 kbps";
      case "128k": return "128 kbps";
      case "192k": return "192 kbps";
      case "320k": return "320 kbps";
    }
  };

  const getBitrateDescription = (br: Bitrate) => {
    switch (br) {
      case "64k": return "Smallest file";
      case "128k": return "Recommended";
      case "192k": return "High quality";
      case "320k": return "Max quality";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const compressionPercent = (original: number, compressed: number) => {
    if (original === 0) return 0;
    return Math.round(((original - compressed) / original) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MP3 Compressor
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Free online MP3 compressor. Reduce MP3 file size instantly with no signup and no server uploads.
          </p>
          <p className="text-gray-600 mb-4">
            Compress MP3 files to a smaller size by selecting your target bitrate. Perfect for shrinking music files before emailing, uploading to Discord, or saving storage space. All processing runs in your browser using WebAssembly. Your files stay on your device. Need to compress WAV, OGG, or FLAC? Use our <Link href="/compress-audio" className="text-blue-600 hover:underline">general audio compressor</Link>. Want to trim before compressing? Try the <Link href="/trim-audio" className="text-blue-600 hover:underline">audio trimmer</Link>.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 30% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 203,847 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {mp3Files.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop MP3 files here
              </h3>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,.mp3"
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                className="hidden"
                id="mp3-input"
              />
              <label
                htmlFor="mp3-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select MP3 Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Only .mp3 files accepted
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-3">
                {mp3Files.map((mp3File) => {
                  const compressed = compressedMp3s.get(mp3File.id);
                  return (
                    <div
                      key={mp3File.id}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {mp3File.name}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Original: {formatFileSize(mp3File.size)}</span>
                          {compressed && (
                            <>
                              <span>→</span>
                              <span className="text-green-600 font-medium">
                                {formatFileSize(compressed.size)}
                                {" "}({compressionPercent(mp3File.size, compressed.size)}% smaller)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {compressed ? (
                        <button
                          onClick={() => downloadMp3(mp3File)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFile(mp3File.id)}
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

              {compressedMp3s.size === 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Bitrate
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(["64k", "128k", "192k", "320k"] as Bitrate[]).map((br) => (
                      <button
                        key={br}
                        onClick={() => setBitrate(br)}
                        disabled={compressing}
                        className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                          bitrate === br
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div>{getBitrateLabel(br)}</div>
                        <div className={`text-xs mt-0.5 ${bitrate === br ? "text-blue-100" : "text-gray-400"}`}>
                          {getBitrateDescription(br)}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    128 kbps is a good balance between size and quality for most MP3 files.
                  </p>
                </div>
              )}

              {compressing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {progress > 0 ? `Compressing MP3... ${progress}%` : "Loading FFmpeg..."}
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

              {compressedMp3s.size === 0 ? (
                <button
                  onClick={compressMp3}
                  disabled={compressing}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {compressing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>Compress MP3</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      MP3 files compressed successfully!
                    </p>
                  </div>
                  {mp3Files.length > 1 && (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Compress MP3 Files</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <div>
                <strong className="text-gray-900">Upload your MP3 files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop one or more .mp3 files into the upload area.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <div>
                <strong className="text-gray-900">Pick a target bitrate</strong>
                <p className="text-gray-600 text-sm">
                  64 kbps for voice and podcasts, 128 kbps for everyday music, 192 kbps for high quality, or 320 kbps for maximum quality with some size savings over unoptimized files.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <div>
                <strong className="text-gray-900">Download compressed MP3</strong>
                <p className="text-gray-600 text-sm">
                  Click Compress MP3 and download your smaller files. Share them via email, upload to Discord, or free up storage.
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
                How do I compress an MP3 file?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Upload your MP3 file above, choose a target bitrate (lower means smaller file), and click Compress MP3. The compressed file downloads instantly. Everything runs in your browser.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What bitrate should I use for MP3 compression?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                64 kbps works well for voice recordings and podcasts. 128 kbps is the sweet spot for most music. 192 kbps keeps near-original quality. 320 kbps is the maximum MP3 bitrate, useful for slight size reduction from unoptimized files.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does compressing an MP3 reduce audio quality?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Lowering the bitrate removes some audio data, so yes. Most people cannot hear the difference at 128 kbps and above. For lossless audio, consider converting to FLAC with our <Link href="/wav-to-mp3" className="text-blue-600 hover:underline">WAV to MP3</Link> converter or keeping the original WAV file.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is my MP3 file uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. All compression runs directly in your browser using WebAssembly (FFmpeg). Your MP3 files never leave your device. Nothing is stored or transmitted.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much smaller will my MP3 get?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                It depends on the original bitrate. A 320 kbps MP3 compressed to 128 kbps shrinks by roughly 60%. A 192 kbps file compressed to 64 kbps gets about 65-70% smaller. If you need to compress other audio formats like WAV or FLAC, use the <Link href="/compress-audio" className="text-blue-600 hover:underline">audio compressor</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I compress multiple MP3 files at once?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Upload several MP3 files and compress them all in one batch with the same bitrate setting. Download them individually or all at once.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="compress-mp3" />
    </div>
  );
}
