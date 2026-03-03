import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is My File Converter Safe? Free Safety Checker",
  description:
    "Check if your file converter is safe with our free safety checker. Based on the FBI warning about malicious file converters. Score any tool on 10 safety criteria.",
  keywords: [
    "is my file converter safe",
    "safe file converter",
    "file converter safety",
    "FBI file converter warning",
    "file converter malware",
    "safe online converter",
    "is convertio safe",
    "is zamzar safe",
    "is freeconvert safe",
    "file converter security check",
    "safe alternative file converter",
    "FBI warning file converter safe alternative",
  ],
  alternates: {
    canonical: "https://www.filetoolworks.com/is-my-converter-safe",
  },
  openGraph: {
    title: "Is My File Converter Safe? Free Safety Checker",
    description:
      "Check if your file converter is safe. Based on the FBI warning about malicious converters. Score any tool on 10 criteria.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is My File Converter Safe?",
    description:
      "Free safety checker for file converters. Based on FBI warning about malicious tools.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are free file converters safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how they work. Browser-based converters that process files locally on your device are safe because your files never leave your computer. Server-based converters carry more risk since your files pass through third-party servers. The FBI has warned about malicious converters that install malware, so always verify how a tool processes your files before using it.",
      },
    },
    {
      "@type": "Question",
      name: "What did the FBI say about file converters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In March 2025, the FBI Denver Field Office warned that criminals were creating fake file converter websites and software that secretly installed ransomware, keyloggers, and other malware. The converters appeared to work normally, but the downloaded files or installed software contained hidden threats.",
      },
    },
    {
      "@type": "Question",
      name: "How can I tell if a file converter is safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check if the tool processes files in your browser (client-side) rather than uploading them to servers. Look for HTTPS, a clear privacy policy, no required downloads, and no aggressive ads or pop-ups. Use our safety checker to evaluate any converter against 10 security criteria.",
      },
    },
    {
      "@type": "Question",
      name: "What is a browser-based file converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A browser-based (client-side) file converter runs entirely in your web browser using JavaScript and WebAssembly. Your files are read, processed, and converted without ever being uploaded to a server. This is the safest type of file converter because your data never leaves your device. FileToolWorks uses this approach for all 40+ of its tools.",
      },
    },
    {
      "@type": "Question",
      name: "Is Convertio safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Convertio is a legitimate service, but it uploads your files to their servers for processing. They state files are deleted within 24 hours. If you are handling sensitive documents, consider using a browser-based converter instead where files never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "Is Zamzar safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zamzar is a well-established converter, but it uploads files to their servers and shares data with third parties according to their privacy policy. Files are stored for up to seven days. For maximum privacy, use a tool that processes files locally in your browser.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
