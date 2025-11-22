import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FileToolWorks - Free Online File Conversion Tools",
  description: "Convert, compress, and edit files online for free. Fast, secure, no signup required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
