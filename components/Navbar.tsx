"use client";

import Link from "next/link";
import { FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const categories = [
    {
      name: "Image Tools",
      tools: [
        { name: "Image to PDF", href: "/image-to-pdf" },
        { name: "HEIC to JPG", href: "/heic-to-jpg" },
        { name: "PNG to JPG", href: "/png-to-jpg" },
        { name: "JPG to PNG", href: "/jpg-to-png" },
        { name: "Image Compressor", href: "/compress-image" },
        { name: "Image Resizer", href: "/resize-image" },
      ],
    },
    {
      name: "PDF Tools",
      tools: [
        { name: "Compress PDF", href: "/compress-pdf" },
        { name: "Merge PDF", href: "/merge-pdf" },
        { name: "Split PDF", href: "/split-pdf" },
        { name: "PDF to JPG", href: "/pdf-to-jpg" },
        { name: "JPG to PDF", href: "/jpg-to-pdf" },
      ],
    },
    {
      name: "Video Tools",
      tools: [
        { name: "Compress Video", href: "/compress-video" },
        { name: "Video to GIF", href: "/video-to-gif" },
        { name: "Video Trimmer", href: "/trim-video" },
      ],
    },
    {
      name: "Audio Tools",
      tools: [
        { name: "Audio Compressor", href: "/compress-audio" },
        { name: "Audio Trimmer", href: "/trim-audio" },
      ],
    },
    {
      name: "Document Tools",
      tools: [
        { name: "Word to PDF", href: "/word-to-pdf" },
        { name: "Excel to PDF", href: "/excel-to-pdf" },
        { name: "PPT to PDF", href: "/ppt-to-pdf" },
      ],
    },
    {
      name: "Other Tools",
      tools: [
        { name: "ZIP Files", href: "/zip-files" },
        { name: "Unzip Files", href: "/unzip-files" },
      ],
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FileToolWorks</span>
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <div className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(category.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-gray-50">
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === category.name && (
                  <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
