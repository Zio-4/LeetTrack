'use client'

import Link from "next/link"
import { Code2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check localStorage only on the client side
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('leetTrackUser')
      setIsAuthenticated(!!user)
    }
  }, [pathname])

  // Function to handle sign out
  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('leetTrackUser')
      setIsAuthenticated(false)
      router.push('/') // Redirect to home page after sign out
    }
  }

  return (
    <header className="w-full bg-black text-white">
      <div className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Code2 className="h-8 w-8 text-amber-500" />
            <span className="text-xl font-bold text-amber-500">LeetTrack</span>
          </Link>
        </div>  
        {isAuthenticated ? 
          <button onClick={handleSignOut} className="text-black bg-amber-500 hover:bg-amber-600 p-2 rounded-md transition-colors cursor-pointer">Sign Out</button> :
          (<nav className="hidden md:flex items-center gap-6">
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
        )}
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
                  {isAuthenticated ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <Button className="bg-amber-500 hover:bg-amber-600 text-black">Dashboard</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button onClick={handleSignOut} variant="outline" className="border-amber-500 text-amber-500 hover:bg-gray-800 hover:text-amber-400">
                          Sign Out
                        </Button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/sign-in" className="cursor-pointer mt-4">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">Get Started</Button>
                      </Link>
                    </SheetClose>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

