// src/components/layout/Header.tsx
import Link from "next/link";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-black text-white">
      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Code2 className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold text-amber-500">LeetTrack</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#features" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Features
          </Link>
          <Link href="/#insights" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Insights
          </Link>
          <Link href="/sign-in" className="cursor-pointer">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">Get Started</Button>
          </Link>
        </nav>
        <Button variant="outline" className="md:hidden border-amber-500 text-amber-500 hover:bg-amber-500/10 cursor-pointer">
          Menu
        </Button>
      </div>
    </header>
  );
}