"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LineChart,
  PieChart,
  Users,
  Database,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  History,
  CheckCircle,
  XCircle,
  Trophy,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-300 mb-10">
            Designed for visual learners who want to see their progress and identify areas for improvement.
          </p>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="container mx-auto py-16 px-4">
        <Tabs defaultValue="insights" className="max-w-5xl mx-auto">
          <TabsList className="flex justify-center w-full mb-12 bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <TabsTrigger value="insights" className="px-4 py-4 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-300 rounded-md text-lg">
              Visual Insights
            </TabsTrigger>
            <TabsTrigger value="social" className="px-4 py-4 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-300 rounded-md text-lg">
              Compare & Share
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-4 py-4 data-[state=active]:bg-amber-500 data-[state=active]:text-black text-gray-300 rounded-md text-lg">
              AI Tutor
            </TabsTrigger>
          </TabsList>

          {/* Visual Insights Tab */}
          <TabsContent value="insights" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-amber-500 mb-6">Visualize Your Progress</h2>
                <p className="text-gray-300 mb-8">
                  For visual learners, spreadsheets and text-based trackers just don't cut it. LeetTrack provides
                  intuitive visualizations that help you instantly understand your progress and identify patterns.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <History className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Submission History</h3>
                      <p className="text-gray-300">
                        Track your last X problems submitted and see your acceptance rate over time.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <PieChart className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Problem Type Analysis</h3>
                      <p className="text-gray-300">
                        Identify your most and least successful problem categories to focus your practice.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <LineChart className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Progress Trends</h3>
                      <p className="text-gray-300">
                        See how your skills are improving over time with detailed trend analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative">
                <div className="absolute -inset-1 bg-amber-500/20 blur-md rounded-xl opacity-30"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-amber-500 mb-6">Your Dashboard</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-amber-400 mb-2 font-medium">Recent Submissions</h4>
                      <div className="h-48 w-full bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=200&width=400"
                          width={400}
                          height={200}
                          alt="Recent submissions chart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="text-amber-400 mb-2 font-medium">Success Rate</h4>
                        <div className="h-32 w-full bg-gray-700 rounded-lg overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=150&width=200"
                            width={200}
                            height={150}
                            alt="Success rate chart"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="text-amber-400 mb-2 font-medium">Problem Types</h4>
                        <div className="h-32 w-full bg-gray-700 rounded-lg overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=150&width=200"
                            width={200}
                            height={150}
                            alt="Problem types chart"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Compare & Share Tab */}
          <TabsContent value="social" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative order-2 md:order-1">
                <div className="absolute -inset-1 bg-amber-500/20 blur-md rounded-xl opacity-30"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-amber-500 mb-6">Friend Comparison</h3>
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h4 className="text-amber-400 mb-2 font-medium">Side-by-Side Comparison</h4>
                    <div className="h-64 w-full bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=250&width=400"
                        width={400}
                        height={250}
                        alt="Friend comparison chart"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-400 mb-1">Your Solved</p>
                      <p className="text-2xl font-bold text-amber-500">87</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-400 mb-1">Friend's Solved</p>
                      <p className="text-2xl font-bold text-amber-500">92</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-amber-500 mb-6">Compare With Friends</h2>
                <p className="text-gray-300 mb-8">
                  Learning is better together. Compare your progress with friends to stay motivated and discover new
                  problem-solving approaches.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Side-by-Side Comparison</h3>
                      <p className="text-gray-300">
                        Compare your stats with up to 4 friends at once by entering their LeetCode usernames.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Friendly Competition</h3>
                      <p className="text-gray-300">
                        See who's solving more problems and maintaining better success rates.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Learn From Others</h3>
                      <p className="text-gray-300">
                        Discover which problem types your friends excel at that you might need to practice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Tutor Tab */}
          <TabsContent value="ai" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-amber-500 mb-6">AI-Powered Tutor</h2>
                <p className="text-gray-300 mb-8">
                  Get personalized guidance and insights from our AI tutor that analyzes your performance and helps you
                  understand where you're going wrong.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <BrainCircuit className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Personalized Recommendations</h3>
                      <p className="text-gray-300">
                        Receive tailored suggestions for improvement based on your performance patterns.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <XCircle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Error Analysis</h3>
                      <p className="text-gray-300">
                        When your solution fails, get insights on why it failed and how to fix it.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-amber-500/10 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-500 mb-1">Concept Reinforcement</h3>
                      <p className="text-gray-300">
                        Get explanations of the underlying concepts you need to master for specific problem types.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 relative">
                <div className="absolute -inset-1 bg-amber-500/20 blur-md rounded-xl opacity-30"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-amber-500 mb-6">AI Tutor Interface</h3>
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BrainCircuit className="h-5 w-5 text-amber-500" />
                      <h4 className="text-amber-400 font-medium">Problem Analysis</h4>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-400 mb-2">Problem: Merge Two Sorted Lists</p>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <p className="text-gray-300 text-sm">Your solution failed on test case: [1,2,4], [1,3,4]</p>
                      </div>
                      <div className="h-px w-full bg-gray-700 my-3"></div>
                      <p className="text-gray-300 text-sm font-medium mb-1">AI Analysis:</p>
                      <p className="text-gray-300 text-sm">
                        Your solution has an issue with the edge case when one list is empty. You're not checking if
                        either list is null before attempting to access its values.
                      </p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-gray-300 text-sm font-medium mb-1">Suggested Fix:</p>
                      <div className="bg-gray-800 rounded p-2 text-amber-300 text-xs font-mono mb-3">
                        <pre>{"if (!list1) return list2;\nif (!list2) return list1;"}</pre>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Add these checks at the beginning of your function to handle empty list cases.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <h4 className="text-amber-400 font-medium">Improvement Areas</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-amber-500" />
                        <p className="text-gray-300 text-sm">Focus on linked list problems (60% failure rate)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-amber-500" />
                        <p className="text-gray-300 text-sm">Practice more medium difficulty tree problems</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-amber-500" />
                        <p className="text-gray-300 text-sm">Review edge cases in your dynamic programming solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Additional Features */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-500 text-center mb-16">More Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Database className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle className="text-amber-500">Local-First Storage</CardTitle>
                <CardDescription className="text-gray-300">
                  All your data is stored securely in your browser's IndexedDB.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                <p>No accounts needed. Your data never leaves your device unless you choose to export it.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <LineChart className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle className="text-amber-500">Detailed Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your progress with comprehensive charts and visualizations.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                <p>Monitor your submission history, success rates, and problem type performance over time.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle className="text-amber-500">Bring Your Own API Key</CardTitle>
                <CardDescription className="text-gray-300">
                  Use your own LeetCode API key for enhanced functionality.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-400">
                <p>Connect directly to your LeetCode account for automatic data syncing and more detailed insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-2xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-500 mb-6">Ready to Visualize Your Progress?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Start tracking your LeetCode journey today and gain insights that spreadsheets and notes can't provide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Start Tracking Now</Button>
            </Link>
            <Link href="/about">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

