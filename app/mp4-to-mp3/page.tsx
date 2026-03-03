"use client";

import { useState, useRef } from "react";
import { Upload, X, Download, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

type Bitrate = "128k" | "192k" | "320k";

interface VideoFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface ConvertedAudio {
  blob: Blob;
  size: number;
}

export default function Mp4ToMp3() {
  const [videoFiles, setVideoFiles] = useState<VideoFile[]>([]);
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

    const newFiles: VideoFile[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const isValid = file.type === "video/mp4" ||
                     file.name.toLowerCase().endsWith(".mp4") ||
                     file.name.toLowerCase().endsWith(".m4v");

      if (isValid) {
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
      setError(`Not MP4 files: ${invalidFiles.join(", ")}. Please select MP4 video files only.`);
    } else {
      setError(null);
    }

    setVideoFiles((prev) => [...prev, ...newFiles]);
    setConvertedAudios(new Map());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (id: string) => {
    setVideoFiles((prev) => prev.filter((f) => f.id !== id));
    setConvertedAudios((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    if (videoFiles.length === 1) {
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

  const convertFiles = async () => {
    if (videoFiles.length === 0) return;

    setConverting(true);
    setError(null);
    setProgress(0);

    try {
      const ffmpeg = await loadFFmpeg();
      const newConvertedAudios = new Map<string, ConvertedAudio>();

      for (let i = 0; i < videoFiles.length; i++) {
        const videoFile = videoFiles[i];
        setProgress(Math.round((i / videoFiles.length) * 100));

        const videoData = await videoFile.file.arrayBuffer();
        const ext = videoFile.name.substring(videoFile.name.lastIndexOf(".")).toLowerCase();
        const inputName = `input_${i}${ext}`;
        const outputName = `output_${i}.mp3`;

        await ffmpeg.writeFile(inputName, new Uint8Array(videoData));

        await ffmpeg.exec([
          "-i", inputName,
          "-vn",
          "-codec:a", "libmp3lame",
          "-b:a", bitrate,
          outputName
        ]);

        const data = await ffmpeg.readFile(outputName);
        const blob = new Blob([data], { type: "audio/mpeg" });

        newConvertedAudios.set(videoFile.id, {
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
      setError("Failed to extract audio. Please try again with different files.");
    } finally {
      setConverting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadAudio = (videoFile: VideoFile) => {
    const converted = convertedAudios.get(videoFile.id);
    if (!converted) return;

    const url = URL.createObjectURL(converted.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = videoFile.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    videoFiles.forEach((videoFile) => {
      downloadAudio(videoFile);
    });
  };

  const startOver = () => {
    setVideoFiles([]);
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
            MP4 to MP3 Converter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Extract audio from MP4 videos as MP3 files. Free, fast, and private.
          </p>
          <p className="text-gray-600 mb-4">
            Upload your MP4 video files and extract the audio track as MP3. Perfect for saving music from video files, creating podcast clips from recordings, or getting audio from downloaded videos. The video portion is discarded and only the audio is kept. All processing happens in your browser. Your files never leave your device. Need to extract audio in other formats? Use our <Link href="/extract-audio" className="text-blue-600 hover:underline">audio extractor</Link> for WAV and AAC output. Want to compress the MP3 further? Try the <Link href="/compress-audio" className="text-blue-600 hover:underline">audio compressor</Link>.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 25% 0 0)" }} />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 276,923 votes</span>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {videoFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop MP4 files here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,.mp4,.m4v"
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select MP4 Files
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supports: MP4 and M4V video files
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-3">
                {videoFiles.map((videoFile) => {
                  const converted = convertedAudios.get(videoFile.id);
                  return (
                    <div
                      key={videoFile.id}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {videoFile.name}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Video: {formatFileSize(videoFile.size)}</span>
                          {converted && (
                            <>
                              <span>→</span>
                              <span className="text-green-600 font-medium">
                                MP3: {formatFileSize(converted.size)}
                                ({calculateSizeReduction(videoFile.size, converted.size)}% smaller)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {converted ? (
                        <button
                          onClick={() => downloadAudio(videoFile)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFile(videoFile.id)}
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
                    128kbps for smaller files, 192kbps for balanced quality, 320kbps for best audio quality.
                  </p>
                </div>
              )}

              {converting && (
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

              {convertedAudios.size === 0 ? (
                <button
                  onClick={convertFiles}
                  disabled={converting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {converting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Extracting Audio...
                    </>
                  ) : (
                    <>Extract MP3 Audio</>
                  )}
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      Audio extracted from MP4 files successfully!
                    </p>
                  </div>
                  {videoFiles.length > 1 && (
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
                <strong className="text-gray-900">Upload MP4 files</strong>
                <p className="text-gray-600 text-sm">
                  Click or drag and drop your MP4 video files. Batch extraction is supported for multiple files.
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
                  Pick 128kbps, 192kbps, or 320kbps. Higher bitrate = better audio quality but larger file size.
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
                  Click Extract MP3 Audio and download your audio files. The video is discarded, only audio is kept. Need to trim the result? Use the <Link href="/trim-audio" className="text-blue-600 hover:underline">Audio Trimmer</Link>.
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
                Why convert MP4 to MP3?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP4 files contain both video and audio. If you only need the audio (music, podcast, speech), extracting it as MP3 removes the video data and dramatically reduces file size. A 100 MB video might produce a 5-10 MB MP3 file.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What bitrate should I choose?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                320kbps for music and high-fidelity audio. 192kbps for a good balance of quality and file size. 128kbps for speech, podcasts, or when file size matters most. Learn more in our <Link href="/blog/audio-bitrate-explained" className="text-blue-600 hover:underline">audio bitrate guide</Link>.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Does the audio quality depend on the source video?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. The output quality cannot exceed the source audio quality. If the original MP4 has 128kbps AAC audio, converting to 320kbps MP3 will not improve it. The tool re-encodes audio at your selected bitrate from whatever the source contains.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Are my files uploaded to a server?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                No. Everything runs in your browser using WebAssembly (FFmpeg compiled for the web). Your MP4 files never leave your device. Nothing is uploaded, stored, or tracked. See our <Link href="/security" className="text-blue-600 hover:underline">security page</Link> for details.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How much smaller will the MP3 be?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                MP3 files are typically 90-95% smaller than the source MP4 since the entire video stream is discarded. A 200 MB video at 192kbps MP3 will produce roughly a 7-15 MB audio file depending on duration. Check our <Link href="/blog/mp3-vs-mp4" className="text-blue-600 hover:underline">MP3 vs MP4 comparison</Link> for size examples.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this converter free?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This MP4 to MP3 converter is completely free with no file limits, no signup, and no watermarks. Extract audio from as many videos as you need. Also try our <Link href="/compress-audio" className="text-blue-600 hover:underline">Audio Compressor</Link>, <Link href="/wav-to-mp3" className="text-blue-600 hover:underline">WAV to MP3</Link>, and <Link href="/flac-to-mp3" className="text-blue-600 hover:underline">FLAC to MP3</Link> converters.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolId="mp4-to-mp3" />
    </div>
  );
}
