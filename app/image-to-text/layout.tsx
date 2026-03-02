import type { Metadata } from "next";
import ToolJsonLd from "@/components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Image to Text (OCR) - Extract Text from Images Online Free",
  description:
    "Extract text from images using OCR. Free online tool that reads text from JPG, PNG, screenshots, and photos. No upload to servers, runs entirely in your browser.",
  keywords: [
    "image to text",
    "extract text from image",
    "ocr online",
    "image text extractor",
    "photo to text",
    "screenshot to text",
    "ocr free online",
    "image ocr",
    "picture to text",
    "text recognition",
  ],
  openGraph: {
    title: "Image to Text (OCR) - Extract Text from Images Online Free",
    description:
      "Extract text from images using OCR. Free, private, runs in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Text (OCR)",
    description: "Extract text from images using OCR. Free, no upload.",
  },
  alternates: {
    canonical: "https://www.filetoolworks.com/image-to-text",
  },
};

const faqs = [
  {
    question: "How does the OCR text extraction work?",
    answer:
      "This tool uses Tesseract.js, an open-source OCR engine that runs directly in your browser using WebAssembly. It analyzes the pixels in your image to detect and recognize text characters.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. All OCR processing happens locally in your browser. Your images never leave your device, ensuring complete privacy. The OCR engine and language data are downloaded once and cached.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "JPG, PNG, WebP, BMP, GIF, and most standard image formats. Screenshots, photos of documents, and scanned images all work. For best results, use clear, high-contrast images.",
  },
  {
    question: "Why is the first scan slow?",
    answer:
      "The first time you use this tool, it downloads the OCR language model (about 4MB). This is cached in your browser, so subsequent scans are much faster.",
  },
  {
    question: "Can I extract text from handwritten notes?",
    answer:
      "The OCR engine works best with printed text. Handwritten text recognition is limited and may produce inaccurate results. For best accuracy, use images with clear printed or typed text.",
  },
  {
    question: "What languages does this support?",
    answer:
      "Currently this tool supports English text recognition. The OCR engine uses the English trained data model for character recognition.",
  },
];

export default function ImageToTextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolJsonLd
        name="Image to Text (OCR) - Extract Text from Images Online Free"
        description="Extract text from images using OCR. Free online tool that reads text from JPG, PNG, screenshots, and photos. No upload to servers, runs entirely in your browser."
        slug="image-to-text"
        faqs={faqs}
        rating={4.7}
        ratingCount={196000}
      />
      {children}
    </>
  );
}
