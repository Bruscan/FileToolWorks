import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_URL = "https://filetoolworks.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FileToolWorks | Free Online File Conversion Tools",
    template: "%s | FileToolWorks",
  },
  description: "Convert, compress, and edit files online for free. Fast, secure, no signup required.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FileToolWorks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
