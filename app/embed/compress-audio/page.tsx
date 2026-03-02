"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Download, Loader2 } from "lucide-react";

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

export default function EmbedCompressAudio() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [bitrate, setBitrate] = useState<Bitrate>("128k");
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedAudios, setCompressedAudios] = useState<Map<string, CompressedAudio>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ffmpegRef = useRef<any>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

  useEffect(() => {
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (nav) nav.style.display = "none";
    if (footer) footer.style.display = "none";
    return () => {
      if (nav) nav.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const validAudioTypes = ["audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/flac", "audio/x-flac"];
    const newFiles: AudioFile[] = [];
    const invalidFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isValidType = validAudioTypes.includes(file.type) ||
        file.name.toLowerCase().endsWith(".mp3") ||
        file.name.toLowerCase().endsWith(".wav") ||
        file.name.toLowerCase().endsWith(".aac") ||
        file.name.toLowerCase().endsWith(".ogg") ||
        file.name.toLowerCase().endsWith(".flac");

      if (isValidType) {
        newFiles.push({ id: Math.random().toString(36).substr(2, 9), file, name: file.name, size: file.size });
      } else {
        invalidFiles.push(file.name);
      }
    }
    if (invalidFiles.length > 0) {
      setError(`Invalid file types: ${invalidFiles.join(", ")}. Supports MP3, WAV, AAC, OGG, FLAC.`);
    } else {
      setError(null);
    }
    setAudioFiles((prev) => [...prev, ...newFiles]);
    setCompressedAudios(new Map());
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const removeAudio = (id: string) => {
    setAudioFiles((prev) => prev.filter((a) => a.id !== id));
    setCompressedAudios((prev) => { const m = new Map(prev); m.delete(id); return m; });
    if (audioFiles.length === 1) setError(null);
  };

  const loadFFmpeg = async () => {
    if (ffmpegLoaded && ffmpegRef.current) return ffmpegRef.current;
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress: prog }) => { setProgress(Math.round(prog * 100)); });
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    ffmpegRef.current = ffmpeg;
    setFfmpegLoaded(true);
    return ffmpeg;
  };

  const compressAudio = async () => {
    if (audioFiles.length === 0) return;
    setCompressing(true); setError(null); setProgress(0);
    try {
      const ffmpeg = await loadFFmpeg();
      const results = new Map<string, CompressedAudio>();
      for (let i = 0; i < audioFiles.length; i++) {
        const af = audioFiles[i];
        setProgress(Math.round((i / audioFiles.length) * 100));
        const data = await af.file.arrayBuffer();
        const inputName = `input_${i}.${af.name.split(".").pop()}`;
        const outputName = `output_${i}.mp3`;
        await ffmpeg.writeFile(inputName, new Uint8Array(data));
        await ffmpeg.exec(["-i", inputName, "-b:a", bitrate, "-ar", "44100", outputName]);
        const out = await ffmpeg.readFile(outputName);
        const blob = new Blob([out], { type: "audio/mpeg" });
        results.set(af.id, { blob, size: blob.size });
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      }
      setCompressedAudios(results);
      setProgress(100);
    } catch {
      setError("Failed to compress audio. Please try again.");
    } finally {
      setCompressing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadAudio = (af: AudioFile) => {
    const c = compressedAudios.get(af.id);
    if (!c) return;
    const url = URL.createObjectURL(c.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${af.name.replace(/\.[^/.]+$/, "")}_compressed.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => { audioFiles.forEach((af) => downloadAudio(af)); };

  const startOver = () => {
    setAudioFiles([]); setCompressedAudios(new Map()); setError(null); setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fmt = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const s = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + s[i];
  };

  const ratio = (orig: number, comp: number) => orig === 0 ? 0 : Math.round(((orig - comp) / orig) * 100);

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          {audioFiles.length === 0 ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Drop audio files here</h3>
              <p className="text-gray-600 mb-3 text-sm">or click to browse</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/mpeg,audio/wav,audio/aac,audio/ogg,audio/flac,.mp3,.wav,.aac,.ogg,.flac"
                onChange={(e) => handleFileSelect(e.target.files)}
                multiple
                className="hidden"
                id="embed-file-input"
              />
              <label
                htmlFor="embed-file-input"
                className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors text-sm"
              >
                Select Audio Files
              </label>
              <p className="text-xs text-gray-500 mt-3">MP3, WAV, AAC, OGG, FLAC</p>
            </div>
          ) : (
            <div>
              <div className="mb-4 space-y-2">
                {audioFiles.map((af) => {
                  const c = compressedAudios.get(af.id);
                  return (
                    <div key={af.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{af.name}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                          <span>{fmt(af.size)}</span>
                          {c && (
                            <>
                              <span>→</span>
                              <span className="text-green-600 font-medium">{fmt(c.size)} ({ratio(af.size, c.size)}% smaller)</span>
                            </>
                          )}
                        </div>
                      </div>
                      {c ? (
                        <button onClick={() => downloadAudio(af)} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      ) : (
                        <button onClick={() => removeAudio(af.id)} disabled={compressing} className="p-1.5 hover:bg-red-100 text-red-600 rounded disabled:opacity-50">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-800">{error}</p>
                </div>
              )}

              {compressedAudios.size === 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Bitrate</label>
                  <div className="flex gap-1.5">
                    {(["64k", "128k", "192k"] as Bitrate[]).map((br) => (
                      <button
                        key={br}
                        onClick={() => setBitrate(br)}
                        disabled={compressing}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors disabled:opacity-50 ${
                          bitrate === br ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {br === "64k" ? "Low (64k)" : br === "128k" ? "Medium (128k)" : "High (192k)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {compressing && (
                <div className="mb-4">
                  <span className="text-xs text-gray-700">{progress > 0 ? `Compressing... ${progress}%` : "Loading FFmpeg..."}</span>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {compressedAudios.size === 0 ? (
                <button
                  onClick={compressAudio}
                  disabled={compressing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2"
                >
                  {compressing ? (<><Loader2 className="w-4 h-4 animate-spin" /> Compressing...</>) : "Compress Audio"}
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-800 font-medium">Compressed successfully!</p>
                  </div>
                  {audioFiles.length > 1 && (
                    <button onClick={downloadAll} className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-semibold text-sm flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download All
                    </button>
                  )}
                  <button onClick={startOver} className="w-full bg-white text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm">
                    Start Over
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-3 text-center">
          <a
            href="https://www.filetoolworks.com/compress-audio"
            target="_blank"
            rel="noopener"
            className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
          >
            Powered by FileToolWorks
          </a>
        </div>
      </div>
    </div>
  );
}
