import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, Code2, Database, LineChart, Lock, Sparkles, Construction } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 animate-pulse shadow-[0_0_15px_rgba(253,154,0,0.3)] relative">
            <div className="absolute -inset-0.5 bg-amber-500/20 blur-md rounded-lg opacity-75"></div>
            <div className="relative flex items-center justify-center gap-2">
              <Construction className="h-5 w-5 text-amber-500" />
              <p className="text-amber-400 font-semibold">Currently under construction - check back soon!</p>
              <Construction className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-6">Track Your LeetCode Progress, Locally</h1>
          <p className="text-xl text-gray-300 mb-10">
            A simple, intuitive way to track your coding practice without the need for accounts or logins. Your data
            stays on your device, always.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in" className="cursor-pointer">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Start Tracking Now</Button>
            </Link>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black cursor-pointer">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20 px-4 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-500 text-center mb-16">Why Choose LeetTrack?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6">
              <Database className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-amber-500 mb-3">Local First</h3>
            <p className="text-gray-300">
              Your data never leaves your device. No accounts, no authentication, no servers. Just you and your
              progress.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6">
              <BarChart3 className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-amber-500 mb-3">Intuitive Dashboard</h3>
            <p className="text-gray-300">
              Clean, simple, and easy to use. Track your progress with beautiful visualizations and clear metrics.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="bg-amber-500/10 p-3 rounded-full w-fit mb-6">
              <Sparkles className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-amber-500 mb-3">Smart Insights</h3>
            <p className="text-gray-300">
              Get personalized recommendations and insights based on your performance to guide your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">A Dashboard That Makes Sense</h2>
            <p className="text-gray-300 text-lg">
              Visualize your progress, identify patterns, and focus on what matters most in your coding journey.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <Image
              src="/dashboard-example.png"
              width={1200}
              height={600}
              alt="Dashboard Preview"
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="container mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">Data-Driven Insights</h2>
            <p className="text-gray-300 text-lg mb-8">
              LeetTrack analyzes your performance to provide actionable insights that help you improve faster.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-1.5 rounded-full mt-0.5">
                  <ArrowRight className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-gray-300">Identify your strengths and weaknesses across problem categories</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-1.5 rounded-full mt-0.5">
                  <ArrowRight className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-gray-300">Track your speed and efficiency improvements over time</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-1.5 rounded-full mt-0.5">
                  <ArrowRight className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-gray-300">Get personalized recommendations for what to practice next</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-amber-500/10 p-1.5 rounded-full mt-0.5">
                  <ArrowRight className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-gray-300">Visualize your learning patterns to optimize your study schedule</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-amber-500/20 blur-xl rounded-full opacity-30"></div>
            <div className="relative bg-gray-900 p-6 rounded-xl border border-gray-800">
              <LineChart className="h-12 w-12 text-amber-500 mb-6" />
              <h3 className="text-2xl font-bold text-amber-500 mb-4">Your Progress Over Time</h3>
              <div className="h-64 w-full bg-gray-800 rounded-lg mb-6 overflow-hidden">
                <Image
                  src="/progress-example.png"
                  width={512}
                  height={256}
                  alt="Progress Chart"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-amber-500">87</p>
                  <p className="text-gray-400 text-sm">Problems Solved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">64%</p>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">12</p>
                  <p className="text-gray-400 text-sm">Day Streak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Lock className="h-12 w-12 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">Your Data, Your Control</h2>
          <p className="text-gray-300 text-lg mb-10">
            We believe your coding progress should be private. That's why LeetTrack stores everything locally on your
            device. No accounts, no tracking, no data collection. Just a tool that respects your privacy.
          </p>
          <Link href="/sign-in" className="cursor-pointer">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">
            Ready to Level Up Your LeetCode Practice?
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of developers who are tracking their progress and improving their skills with LeetTrack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in" className="cursor-pointer">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Start Tracking Now</Button>
            </Link>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black cursor-pointer">View Demo</Button>
          </div>
        </div>
      </section>

    </div>
  )
}

