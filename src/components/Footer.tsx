// src/components/layout/Footer.tsx
import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Code2 className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-bold text-amber-500">LeetTrack</span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Privacy
            </Link>
            <Link href="https://github.com/Zio-4/LeetTrack" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              GitHub
            </Link>
            <Link href="https://x.com/hey_zio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              X
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LeetTrack. All rights reserved. Not affiliated with LeetCode.
        </div>
      </div>
    </footer>
  );
}
