import Link from "next/link"
import { Code2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"

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
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            Features
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
            About
          </Link>
          <Link href="/sign-in" className="cursor-pointer">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">Get Started</Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-amber-500 bg-amber-500  text-black hover:bg-amber-600 hover:border-amber-600 cursor-pointer"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white border-l border-gray-800 p-6">
              <div className="flex flex-col h-full">
                <SheetHeader className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
                  <SheetTitle className="text-left text-amber-500 flex items-center gap-2">
                    <Code2 className="h-6 w-6" />
                    <span>LeetTrack</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="grid gap-6 py-6">
                  <SheetClose asChild>
                    <Link
                      href="/features"
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer text-lg"
                    >
                      Features
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer text-lg"
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/sign-in" className="cursor-pointer mt-4">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Get Started</Button>
                    </Link>
                  </SheetClose>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

