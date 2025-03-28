import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Database, Lock, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span>LeetTrack</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-primary hover:text-primary/80">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-primary hover:text-primary/80">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium text-primary hover:text-primary/80">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="#try-now">Try Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Track Your LeetCode Progress, <span className="text-primary">Locally</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A simple, intuitive dashboard to track your LeetCode journey without any account or authentication.
                    Your data stays on your device.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#try-now">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="LeetTrack Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                  Everything you need to excel
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  LeetTrack provides all the tools you need to track your progress and improve your problem-solving
                  skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-black/40 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Local-First</h3>
                <p className="text-center text-gray-300">
                  No account or authentication required. Your data stays on your device, giving you complete privacy and
                  control.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-black/40 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Intuitive Dashboard</h3>
                <p className="text-center text-gray-300">
                  Clean, simple, and intuitive interface to track your progress, completed problems, and success rates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-black/40 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">Data-Driven Insights</h3>
                <p className="text-center text-gray-300">
                  Get personalized insights and recommendations based on your performance to guide your learning
                  journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  LeetTrack makes it easy to monitor your progress and improve your skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="LeetTrack Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">1. Log Your Solutions</h3>
                      <p className="text-muted-foreground">
                        Simply add the problems you've solved, along with difficulty, category, and your solution
                        approach.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">2. Track Your Progress</h3>
                      <p className="text-muted-foreground">
                        Visualize your progress over time with intuitive charts and statistics.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-primary">3. Get Insights</h3>
                      <p className="text-muted-foreground">
                        Receive personalized recommendations on what to focus on next based on your performance
                        patterns.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="privacy" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <h2 className="mt-4 text-3xl font-bold text-primary">Your Data Stays With You</h2>
                <p className="mt-2 text-muted-foreground md:text-xl">
                  LeetTrack is built with privacy in mind. All your data is stored locally on your device, and we never
                  collect or transmit your personal information.
                </p>
                <ul className="mt-6 grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>No account required</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>No data collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Works offline</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="Privacy Illustration"
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about LeetTrack.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">Is LeetTrack completely free?</h3>
                  <p className="mt-1 text-gray-300">
                    Yes, LeetTrack is completely free to use with no hidden costs or premium features.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">Can I export my data?</h3>
                  <p className="mt-1 text-gray-300">
                    Yes, you can export all your data in JSON format for backup or to transfer to another device.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">Does it work offline?</h3>
                  <p className="mt-1 text-gray-300">
                    Yes, once loaded, LeetTrack works completely offline as all data is stored locally.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">What happens if I clear my browser data?</h3>
                  <p className="mt-1 text-gray-300">
                    Your LeetTrack data will be lost if you clear your browser's local storage. We recommend exporting
                    your data regularly.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">Can I sync across devices?</h3>
                  <p className="mt-1 text-gray-300">
                    Currently, LeetTrack doesn't support automatic syncing. You can manually export and import your data
                    between devices.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-black/40 p-4">
                  <h3 className="text-lg font-bold text-primary">Is LeetTrack affiliated with LeetCode?</h3>
                  <p className="mt-1 text-gray-300">
                    No, LeetTrack is an independent tool and is not affiliated with or endorsed by LeetCode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="try-now" className="w-full py-12 md:py-24 lg:py-32 bg-black text-primary">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                Ready to improve your LeetCode skills?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start tracking your progress today and get insights to guide your learning journey.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#">Try LeetTrack Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary border-primary hover:bg-primary/10"
              >
                <Link href="https://github.com/leettrack/app" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-border bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>LeetTrack</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LeetTrack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-primary hover:text-primary/80">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-primary hover:text-primary/80">
              Terms
            </Link>
            <Link
              href="https://github.com/leettrack/app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

