import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-12 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">FileToolWorks</h3>
            <p className="text-sm">
              Free online tools for file conversion and editing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Image Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/image-to-pdf" className="hover:text-white">Image to PDF</Link></li>
              <li><Link href="/compress-image" className="hover:text-white">Compress Image</Link></li>
              <li><Link href="/jpg-to-png" className="hover:text-white">JPG to PNG</Link></li>
              <li><Link href="/png-to-jpg" className="hover:text-white">PNG to JPG</Link></li>
              <li><Link href="/resize-image" className="hover:text-white">Resize Image</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">PDF Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pdf-to-image" className="hover:text-white">PDF to Image</Link></li>
              <li><Link href="/compress-pdf" className="hover:text-white">Compress PDF</Link></li>
              <li><Link href="/merge-pdf" className="hover:text-white">Merge PDF</Link></li>
              <li><Link href="/split-pdf" className="hover:text-white">Split PDF</Link></li>
              <li><Link href="/pdf-to-word" className="hover:text-white">PDF to Word</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 FileToolWorks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
