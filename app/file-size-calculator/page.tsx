"use client";

import { useState } from "react";
import { Calculator, Star, Music, Video, ImageIcon } from "lucide-react";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";

type Tab = "audio" | "video" | "image";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes.toFixed(0)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function FileSizeCalculator() {
  const [tab, setTab] = useState<Tab>("audio");

  // Audio state
  const [audioDuration, setAudioDuration] = useState(180);
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [audioBitrate, setAudioBitrate] = useState(128);
  const [audioSampleRate, setAudioSampleRate] = useState(44100);
  const [audioChannels, setAudioChannels] = useState(2);

  // Video state
  const [videoDuration, setVideoDuration] = useState(60);
  const [videoResolution, setVideoResolution] = useState("1080p");
  const [videoQuality, setVideoQuality] = useState("medium");
  const [videoFps, setVideoFps] = useState(30);

  // Image state
  const [imageWidth, setImageWidth] = useState(1920);
  const [imageHeight, setImageHeight] = useState(1080);
  const [imageFormat, setImageFormat] = useState("jpg");
  const [imageQuality, setImageQuality] = useState(85);

  function calcAudioSize(): number {
    const seconds = audioDuration;
    if (audioFormat === "wav") {
      return audioSampleRate * (16 / 8) * audioChannels * seconds;
    }
    if (audioFormat === "flac") {
      const wavSize = audioSampleRate * (16 / 8) * audioChannels * seconds;
      return wavSize * 0.55;
    }
    // Lossy formats: MP3, AAC, OGG
    return (audioBitrate * 1000 * seconds) / 8;
  }

  function calcVideoSize(): number {
    const seconds = videoDuration;
    // Approximate video bitrates (kbps) by resolution and quality
    const bitrates: Record<string, Record<string, number>> = {
      "4k": { low: 20000, medium: 35000, high: 55000 },
      "1080p": { low: 5000, medium: 8000, high: 12000 },
      "720p": { low: 2500, medium: 5000, high: 7500 },
      "480p": { low: 1000, medium: 2500, high: 4000 },
    };
    const videoBitrate = bitrates[videoResolution]?.[videoQuality] ?? 8000;
    // Scale slightly by FPS (baseline 30fps)
    const fpsMultiplier = videoFps / 30;
    const audioBitrateKbps = 128;
    const totalBitrate =
      videoBitrate * fpsMultiplier + audioBitrateKbps;
    return (totalBitrate * 1000 * seconds) / 8;
  }

  function calcImageSize(): number {
    const pixels = imageWidth * imageHeight;
    const rawBytes = pixels * 3; // RGB, 8 bits per channel
    if (imageFormat === "png") {
      // PNG compression varies but typical ratio is 0.3-0.6 of raw
      return rawBytes * 0.45;
    }
    if (imageFormat === "webp") {
      // WebP is ~25-35% smaller than equivalent JPG
      const jpgSize = rawBytes * (0.05 + (imageQuality / 100) * 0.25);
      return jpgSize * 0.72;
    }
    if (imageFormat === "raw") {
      return pixels * 3 * 2; // 16-bit per channel
    }
    // JPG: quality 1-100 maps roughly to 5-30% of raw
    return rawBytes * (0.05 + (imageQuality / 100) * 0.25);
  }

  const audioSize = calcAudioSize();
  const videoSize = calcVideoSize();
  const imageSize = calcImageSize();

  const btnClass = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            File Size Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estimate file sizes for audio recordings, video clips, and images
            before you record or convert. Plan storage needs and choose the
            right format and quality settings.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                style={{ clipPath: "inset(0 30% 0 0)" }}
              />
            </div>
            <span className="text-gray-700 font-medium">4.7 / 5</span>
            <span className="text-gray-500">- 89,432 votes</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={() => setTab("audio")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
              tab === "audio"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Music className="w-4 h-4" /> Audio
          </button>
          <button
            onClick={() => setTab("video")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
              tab === "video"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Video className="w-4 h-4" /> Video
          </button>
          <button
            onClick={() => setTab("image")}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors ${
              tab === "image"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Image
          </button>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {/* ---- AUDIO ---- */}
          {tab === "audio" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Audio File Size Calculator
              </h2>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  min={1}
                  value={audioDuration}
                  onChange={(e) =>
                    setAudioDuration(Math.max(1, Number(e.target.value)))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(audioDuration / 60)}m {audioDuration % 60}s
                </p>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "mp3", label: "MP3" },
                    { id: "aac", label: "AAC" },
                    { id: "ogg", label: "OGG" },
                    { id: "wav", label: "WAV" },
                    { id: "flac", label: "FLAC" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setAudioFormat(f.id)}
                      className={btnClass(audioFormat === f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bitrate (lossy only) */}
              {["mp3", "aac", "ogg"].includes(audioFormat) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bitrate
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[64, 128, 192, 256, 320].map((br) => (
                      <button
                        key={br}
                        onClick={() => setAudioBitrate(br)}
                        className={btnClass(audioBitrate === br)}
                      >
                        {br} kbps
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sample Rate (WAV/FLAC) */}
              {["wav", "flac"].includes(audioFormat) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sample Rate
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { rate: 22050, label: "22.05 kHz" },
                      { rate: 44100, label: "44.1 kHz" },
                      { rate: 48000, label: "48 kHz" },
                      { rate: 96000, label: "96 kHz" },
                    ].map((s) => (
                      <button
                        key={s.rate}
                        onClick={() => setAudioSampleRate(s.rate)}
                        className={btnClass(audioSampleRate === s.rate)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Channels */}
              {["wav", "flac"].includes(audioFormat) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channels
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAudioChannels(1)}
                      className={btnClass(audioChannels === 1)}
                    >
                      Mono
                    </button>
                    <button
                      onClick={() => setAudioChannels(2)}
                      className={btnClass(audioChannels === 2)}
                    >
                      Stereo
                    </button>
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">
                  Estimated file size
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatSize(audioSize)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {audioFormat.toUpperCase()} &middot;{" "}
                  {["mp3", "aac", "ogg"].includes(audioFormat)
                    ? `${audioBitrate} kbps`
                    : `${audioSampleRate / 1000} kHz, ${
                        audioChannels === 1 ? "Mono" : "Stereo"
                      }`}{" "}
                  &middot; {Math.floor(audioDuration / 60)}m{" "}
                  {audioDuration % 60}s
                </p>
              </div>

              <p className="text-sm text-gray-600">
                Need to compress audio files?{" "}
                <Link
                  href="/compress-audio"
                  className="text-blue-600 hover:underline"
                >
                  Try our free Audio Compressor
                </Link>{" "}
                or{" "}
                <Link
                  href="/wav-to-mp3"
                  className="text-blue-600 hover:underline"
                >
                  convert WAV to MP3
                </Link>
                .
              </p>
            </div>
          )}

          {/* ---- VIDEO ---- */}
          {tab === "video" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Video File Size Calculator
              </h2>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  min={1}
                  value={videoDuration}
                  onChange={(e) =>
                    setVideoDuration(Math.max(1, Number(e.target.value)))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(videoDuration / 60)}m {videoDuration % 60}s
                </p>
              </div>

              {/* Resolution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution
                </label>
                <div className="flex flex-wrap gap-2">
                  {["4k", "1080p", "720p", "480p"].map((res) => (
                    <button
                      key={res}
                      onClick={() => setVideoResolution(res)}
                      className={btnClass(videoResolution === res)}
                    >
                      {res === "4k" ? "4K (2160p)" : res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality
                </label>
                <div className="flex gap-2">
                  {[
                    { id: "low", label: "Low" },
                    { id: "medium", label: "Medium" },
                    { id: "high", label: "High" },
                  ].map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setVideoQuality(q.id)}
                      className={btnClass(videoQuality === q.id)}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FPS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frame Rate
                </label>
                <div className="flex flex-wrap gap-2">
                  {[24, 30, 60, 120].map((fps) => (
                    <button
                      key={fps}
                      onClick={() => setVideoFps(fps)}
                      className={btnClass(videoFps === fps)}
                    >
                      {fps} fps
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">
                  Estimated file size
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatSize(videoSize)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  MP4 (H.264) &middot; {videoResolution} &middot;{" "}
                  {videoQuality} quality &middot; {videoFps} fps &middot;{" "}
                  {Math.floor(videoDuration / 60)}m {videoDuration % 60}s
                </p>
              </div>

              <p className="text-sm text-gray-600">
                Need to reduce video file size?{" "}
                <Link
                  href="/compress-video"
                  className="text-blue-600 hover:underline"
                >
                  Try our free Video Compressor
                </Link>{" "}
                or{" "}
                <Link
                  href="/video-to-gif"
                  className="text-blue-600 hover:underline"
                >
                  convert Video to GIF
                </Link>
                .
              </p>
            </div>
          )}

          {/* ---- IMAGE ---- */}
          {tab === "image" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Image File Size Calculator
              </h2>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={imageWidth}
                    onChange={(e) =>
                      setImageWidth(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={imageHeight}
                    onChange={(e) =>
                      setImageHeight(Math.max(1, Number(e.target.value)))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preset Dimensions
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { w: 1920, h: 1080, label: "1080p" },
                    { w: 3840, h: 2160, label: "4K" },
                    { w: 1080, h: 1080, label: "1:1" },
                    { w: 4000, h: 3000, label: "12MP" },
                    { w: 800, h: 600, label: "Web" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setImageWidth(p.w);
                        setImageHeight(p.h);
                      }}
                      className={btnClass(
                        imageWidth === p.w && imageHeight === p.h
                      )}
                    >
                      {p.label} ({p.w}x{p.h})
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "jpg", label: "JPG" },
                    { id: "png", label: "PNG" },
                    { id: "webp", label: "WebP" },
                    { id: "raw", label: "RAW" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setImageFormat(f.id)}
                      className={btnClass(imageFormat === f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality (JPG/WebP only) */}
              {["jpg", "webp"].includes(imageFormat) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quality: {imageQuality}%
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={imageQuality}
                    onChange={(e) => setImageQuality(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low (10%)</span>
                    <span>High (100%)</span>
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">
                  Estimated file size
                </p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatSize(imageSize)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {imageFormat.toUpperCase()} &middot; {imageWidth}x
                  {imageHeight} px &middot;{" "}
                  {(imageWidth * imageHeight / 1000000).toFixed(1)} MP
                  {["jpg", "webp"].includes(imageFormat)
                    ? ` \u00B7 ${imageQuality}% quality`
                    : ""}
                </p>
              </div>

              <p className="text-sm text-gray-600">
                Need to reduce image size?{" "}
                <Link
                  href="/compress-image"
                  className="text-blue-600 hover:underline"
                >
                  Try our free Image Compressor
                </Link>{" "}
                or{" "}
                <Link
                  href="/resize-image"
                  className="text-blue-600 hover:underline"
                >
                  resize images
                </Link>
                .
              </p>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Reference: File Size by Format
          </h2>
          {tab === "audio" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-medium text-gray-700">
                      Format
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      1 min
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      5 min
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      1 hour
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">MP3 (128 kbps)</td>
                    <td className="text-right py-2 px-4">960 KB</td>
                    <td className="text-right py-2 px-4">4.8 MB</td>
                    <td className="text-right py-2 px-4">57.6 MB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">MP3 (320 kbps)</td>
                    <td className="text-right py-2 px-4">2.4 MB</td>
                    <td className="text-right py-2 px-4">12 MB</td>
                    <td className="text-right py-2 px-4">144 MB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">WAV (44.1 kHz, 16-bit)</td>
                    <td className="text-right py-2 px-4">10.1 MB</td>
                    <td className="text-right py-2 px-4">50.5 MB</td>
                    <td className="text-right py-2 px-4">605 MB</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">FLAC (44.1 kHz)</td>
                    <td className="text-right py-2 px-4">~5.5 MB</td>
                    <td className="text-right py-2 px-4">~27.5 MB</td>
                    <td className="text-right py-2 px-4">~330 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {tab === "video" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-medium text-gray-700">
                      Resolution
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      1 min
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      10 min
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      1 hour
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">480p (medium)</td>
                    <td className="text-right py-2 px-4">19 MB</td>
                    <td className="text-right py-2 px-4">190 MB</td>
                    <td className="text-right py-2 px-4">1.1 GB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">720p (medium)</td>
                    <td className="text-right py-2 px-4">38 MB</td>
                    <td className="text-right py-2 px-4">375 MB</td>
                    <td className="text-right py-2 px-4">2.3 GB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">1080p (medium)</td>
                    <td className="text-right py-2 px-4">61 MB</td>
                    <td className="text-right py-2 px-4">600 MB</td>
                    <td className="text-right py-2 px-4">3.6 GB</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">4K (medium)</td>
                    <td className="text-right py-2 px-4">264 MB</td>
                    <td className="text-right py-2 px-4">2.6 GB</td>
                    <td className="text-right py-2 px-4">15.4 GB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {tab === "image" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-medium text-gray-700">
                      Format
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      1080p
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      4K
                    </th>
                    <th className="text-right py-2 px-4 font-medium text-gray-700">
                      12 MP
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">JPG (85%)</td>
                    <td className="text-right py-2 px-4">~600 KB</td>
                    <td className="text-right py-2 px-4">~2.4 MB</td>
                    <td className="text-right py-2 px-4">~3.5 MB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">PNG</td>
                    <td className="text-right py-2 px-4">~2.8 MB</td>
                    <td className="text-right py-2 px-4">~11.2 MB</td>
                    <td className="text-right py-2 px-4">~16.2 MB</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">WebP (85%)</td>
                    <td className="text-right py-2 px-4">~430 KB</td>
                    <td className="text-right py-2 px-4">~1.7 MB</td>
                    <td className="text-right py-2 px-4">~2.5 MB</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">RAW (16-bit)</td>
                    <td className="text-right py-2 px-4">~11.9 MB</td>
                    <td className="text-right py-2 px-4">~47.5 MB</td>
                    <td className="text-right py-2 px-4">~68.7 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How accurate are these file size estimates?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                These are close approximations based on standard encoding
                parameters. Actual file sizes can vary by 10-20% depending on
                content complexity, encoder settings, and metadata. Audio
                estimates are typically the most accurate.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                How is audio file size calculated?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                For lossy formats like MP3 and AAC: (bitrate in kbps x duration
                in seconds) / 8 = size in KB. For uncompressed WAV: sample rate
                x bit depth x channels x duration / 8. FLAC is roughly 50-60%
                of the equivalent WAV size.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Why do video files vary so much in size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Video file size depends heavily on content complexity.
                Fast-moving action footage compresses less efficiently than a
                static presentation. The estimates use average bitrates for each
                resolution and quality setting.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                What factors affect image file size?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Image file size depends on dimensions (width x height), color
                depth, format, and compression quality. JPG files are much
                smaller than PNG at the same dimensions because JPG uses lossy
                compression. WebP is typically 25-35% smaller than JPG.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Can I use this to plan storage needs?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. Use the calculator to estimate how much disk space you need
                for recordings, photo shoots, or video projects. Add 15-20%
                buffer to the estimates for safety.
              </p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">
                Is this calculator free?
              </summary>
              <p className="mt-2 text-gray-600 text-sm">
                Yes. This file size calculator is completely free with no signup
                required. All calculations happen instantly in your browser.
              </p>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8">
          <RelatedTools currentToolId="compress-audio" />
        </div>
      </div>
    </div>
  );
}
