"use client"

import Link from "next/link"
import Image from "next/image"
import { Code2, Lightbulb, Eye, Brain, Github, Twitter, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-6">About LeetTrack</h1>
          <p className="text-xl text-gray-300 mb-10">
            Built by a visual learner, for visual learners. Track your coding journey with clarity and insight.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              LeetTrack was born out of personal frustration. As a visual learner, I found it challenging to track my
              LeetCode progress using spreadsheets and text-based notes. I needed a way to{" "}
              <span className="text-amber-400">see</span> my progress, not just record it.
            </p>
            <p className="text-gray-300 mb-4">
              After trying various tools and finding none that catered to visual learners like me, I decided to build my
              own solution. LeetTrack is designed to help you visualize your coding journey, identify patterns in your
              performance, and focus your practice where it matters most.
            </p>
            <p className="text-gray-300">
              What started as a personal project has grown into a tool that helps developers around the world improve
              their problem-solving skills through visual insights and targeted feedback.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative">
            <div className="absolute -inset-1 bg-amber-500/20 blur-md rounded-xl opacity-30"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="h-8 w-8 text-amber-500" />
                <h3 className="text-2xl font-bold text-amber-500">From Frustration to Solution</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300 italic">
                    "As someone who thinks in pictures, I was struggling to improve my coding skills using traditional
                    tracking methods. I needed to see patterns, not just numbers."
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-500 font-bold">JD</span>
                    </div>
                    <p className="text-amber-400">Founder, LeetTrack</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-bold text-amber-500">2023</p>
                    <p className="text-gray-400 text-sm">Founded</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-bold text-amber-500">5k+</p>
                    <p className="text-gray-400 text-sm">Users</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                    <p className="text-2xl font-bold text-amber-500">100%</p>
                    <p className="text-gray-400 text-sm">Local Data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Our Philosophy</h2>
            <p className="text-gray-300 text-lg">
              We believe in building tools that respect your privacy, enhance your learning, and adapt to your unique
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6 mx-auto">
                  <Eye className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">Visual Learning</h3>
                <p className="text-gray-300 text-center">
                  We design for visual thinkers who process information better through charts, graphs, and visual
                  patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6 mx-auto">
                  <Lightbulb className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">Actionable Insights</h3>
                <p className="text-gray-300 text-center">
                  We don't just show data; we help you understand what it means and how to improve based on it.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="pt-6">
                <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6 mx-auto">
                  <Brain className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-500 mb-3 text-center">Privacy First</h3>
                <p className="text-gray-300 text-center">
                  We believe your data belongs to you. That's why we store everything locally on your device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-500 mb-12 text-center">How LeetTrack Works</h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 md:w-1/2">
                <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="Data collection illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-500 h-8 w-8 rounded-full flex items-center justify-center text-black font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-amber-500">Bring Your Own API Key</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Connect LeetTrack to your LeetCode account using your API key. This allows us to fetch your submission
                  history and problem data.
                </p>
                <p className="text-gray-300">
                  Don't have an API key? No problem! You can manually input your progress or use our browser extension
                  to automatically track your submissions.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-500 h-8 w-8 rounded-full flex items-center justify-center text-black font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-amber-500">Local Storage</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  All your data is stored securely in your browser's IndexedDB. This means your information never leaves
                  your device unless you explicitly choose to export it.
                </p>
                <p className="text-gray-300">
                  This approach ensures maximum privacy while still providing powerful tracking and analysis
                  capabilities.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 md:w-1/2 order-1 md:order-2">
                <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="Local storage illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 md:w-1/2">
                <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="AI analysis illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-500 h-8 w-8 rounded-full flex items-center justify-center text-black font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-amber-500">AI-Powered Analysis</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Our AI tutor analyzes your submission patterns, success rates, and problem-solving approaches to
                  provide personalized insights and recommendations.
                </p>
                <p className="text-gray-300">
                  When you're stuck on a problem, the AI can help identify where you're going wrong and suggest
                  improvements to your approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-500 mb-12 text-center">Meet the Creator</h2>

          <div className="max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden">
            <div className="h-64 w-full bg-gray-700 overflow-hidden">
              <Image
                src="/placeholder.svg?height=250&width=400"
                width={400}
                height={250}
                alt="Creator profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-amber-500 mb-2">John Doe</h3>
              <p className="text-gray-400 mb-4">Founder & Developer</p>
              <p className="text-gray-300 mb-6">
                A visual learner and software engineer who was frustrated with existing LeetCode tracking tools. Built
                LeetTrack to help others like him visualize their coding journey.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-amber-500">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-500">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-500 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold text-amber-500 mb-3">Is my data secure?</h3>
              <p className="text-gray-300">
                Yes, absolutely. All your data is stored locally in your browser's IndexedDB. It never leaves your
                device unless you explicitly choose to export it. We have no servers storing your information.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold text-amber-500 mb-3">Do I need a LeetCode API key?</h3>
              <p className="text-gray-300">
                While having a LeetCode API key enhances the experience by allowing automatic syncing, it's not
                required. You can manually track your progress or use our browser extension as alternatives.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold text-amber-500 mb-3">How does the AI tutor work?</h3>
              <p className="text-gray-300">
                Our AI tutor analyzes your submission patterns, success rates, and problem types to identify areas for
                improvement. It can also analyze specific failed submissions to help you understand where you went wrong
                and how to fix your approach.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold text-amber-500 mb-3">Can I compare with friends?</h3>
              <p className="text-gray-300">
                Yes! You can compare your progress with up to 4 friends at once by entering their LeetCode usernames.
                This feature requires API access to fetch their public data for comparison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">
            Ready to Transform Your LeetCode Experience?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Join other visual learners who are using LeetTrack to gain insights and improve their coding skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Start Tracking Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

