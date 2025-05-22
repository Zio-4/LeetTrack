'use client'

import { Problem } from "leetcode-query"
import { CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Clock, AlertCircle, BookOpen, Code, BarChart2, Lightbulb, Zap } from "lucide-react"
import { useState } from "react"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"
import { getDifficultyColor } from "@/lib/utils"

interface ProblemContentProps {
  problemData: Problem
  cleanContent: string
  similarQuestions: { title: string; titleSlug: string; difficulty: string }[]
}

export function ProblemContent({ problemData, cleanContent, similarQuestions }: ProblemContentProps) {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <CardContent>
      {/* Tabs for Problem, AI Analysis, and Your Submissions */}
      <div className="mt-6 bg-[#101828] p-4 rounded-lg">
        <Tabs defaultValue="problem">
          <TabsList className="bg-gray-800 mb-4">
            <TabsTrigger
              value="problem"
              className="data-[state=active]:bg-[#FD9A00] data-[state=active]:text-black"
            >
              Problem
            </TabsTrigger>
            <TabsTrigger
              value="ai-analysis"
              className="data-[state=active]:bg-[#FD9A00] data-[state=active]:text-black"
            >
              AI Analysis
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-[#FD9A00] data-[state=active]:text-black"
            >
              Your Submissions
            </TabsTrigger>
          </TabsList>

          {/* Problem Tab Content */}
          <TabsContent value="problem" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl text-[#FD9A00] font-semibold">Description</h2>
              {cleanContent && (
                <div
                  className="prose prose-invert max-w-none text-[#D1D5DC] 
                            prose-code:text-[#FD9A00] prose-code:bg-[#1F2937] prose-code:p-1 prose-code:rounded
                            prose-strong:text-[#FD9A00]
                            prose-a:text-blue-400 hover:prose-a:text-blue-300"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              )}

              {Array.isArray(problemData.hints) && problemData.hints.length > 0 && (
                <>
                  <h2 className="text-xl text-[#FD9A00] font-semibold">Hints</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    {problemData.hints.map((hint, index) =>
                      typeof hint === "string" ? (
                        <li key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hint) }}></li>
                      ) : null,
                    )}
                  </ul>
                </>
              )}

              {similarQuestions.length > 0 && (
                <>
                  <h2 className="text-xl text-[#FD9A00] font-semibold">Similar Questions</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    {similarQuestions.map((q) => (
                      <li key={q.titleSlug}>
                        <Link
                          href={`/problem/${q.titleSlug}`}
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          {q.title}
                        </Link>
                        {q.difficulty && (
                          <span className={`ml-2 ${getDifficultyColor(q.difficulty)}`}>({q.difficulty})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </TabsContent>

          {/* AI Analysis Tab Content */}
          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-[#FD9A00] font-semibold">AI Analysis</h2>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowSolution(!showSolution)}
              >
                {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolution ? "Hide Solution" : "Show Solution"}
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="intuition">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Intuition Behind Solving the Problem</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <p>
                        The key intuition is to recognize that we need to efficiently find the smallest interval
                        containing each query point. Instead of checking each interval for each query (which would
                        be O(n*q)), we can:
                      </p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Sort the intervals by size (right - left + 1)</li>
                        <li>For each query point, find all intervals that contain it</li>
                        <li>Choose the smallest such interval</li>
                      </ol>
                      <p>
                        This approach can be optimized using a min-heap to track intervals containing each query
                        point.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to reveal the intuition behind solving this problem.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="key-insight">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>Key Insight</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <p>The key insight is to use a line sweep algorithm combined with a min-heap:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Sort both intervals and queries</li>
                        <li>Use a min-heap to track valid intervals for each query point</li>
                        <li>
                          For each query, add all intervals that start before or at the query point to the heap
                        </li>
                        <li>Remove intervals that end before the query point</li>
                        <li>The top of the heap will be the smallest interval containing the query point</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to reveal the key insight for this problem.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="eli5">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>ELI5 / Real World Analogy</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <p>
                        Imagine you're planning a trip and looking at different tour packages. Each tour package
                        covers a range of days (intervals). You have specific days you want to visit (queries), and
                        for each day, you want to find the shortest tour package that includes that day.
                      </p>
                      <p>For example:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Tour A: Days 1-4 (4 days)</li>
                        <li>Tour B: Days 2-4 (3 days)</li>
                        <li>Tour C: Days 3-6 (4 days)</li>
                        <li>Tour D: Day 4 only (1 day)</li>
                      </ul>
                      <p>
                        If you want to visit on Day 3, the shortest tour that includes Day 3 is Tour B (3 days).
                      </p>
                      <p>If you want to visit on Day 5, the only tour that includes Day 5 is Tour C (4 days).</p>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to see a simplified explanation of the problem.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="optimal-approach">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    <span>The Most Optimal Approach</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step-by-Step Breakdown:</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          <p>
                            <strong>Preprocessing:</strong>
                          </p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Create a new array of intervals where each interval also stores its size</li>
                            <li>Sort intervals by size (ascending)</li>
                            <li>Create a new array of queries where each query also stores its original index</li>
                            <li>Sort queries by value (ascending)</li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Line Sweep with Min-Heap:</strong>
                          </p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Initialize a min-heap to store intervals sorted by size</li>
                            <li>Initialize an answer array of the same length as queries</li>
                            <li>Initialize a pointer for the intervals array</li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Process Each Query:</strong>
                          </p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>For each query in the sorted queries array:</li>
                            <li>Add all intervals that start before or at the current query to the heap</li>
                            <li>Remove all intervals from the heap that end before the current query</li>
                            <li>
                              If the heap is not empty, the top element is the smallest interval containing the
                              query
                            </li>
                            <li>
                              Store the size of this interval in the answer array at the original index of the query
                            </li>
                            <li>If the heap is empty, store -1 in the answer array</li>
                          </ul>
                        </li>
                        <li>
                          <p>
                            <strong>Return the Answer:</strong>
                          </p>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Return the answer array</li>
                          </ul>
                        </li>
                      </ol>

                      <h3 className="font-semibold mt-4">Visual Diagram:</h3>
                      <div className="bg-gray-800 p-4 rounded-md">
                        <p className="text-center mb-2">Line Sweep Algorithm Visualization</p>
                        <div className="flex flex-col items-center">
                          <div className="w-full h-40 relative bg-gray-900 rounded-md p-2 mb-4">
                            <div className="absolute top-4 left-0 w-full h-8 flex items-center">
                              <div className="absolute left-[10%] w-[30%] h-6 bg-blue-500 rounded-md flex items-center justify-center text-xs">
                                [1,4] size=4
                              </div>
                              <div className="absolute left-[20%] w-[20%] h-6 bg-green-500 rounded-md flex items-center justify-center text-xs">
                                [2,4] size=3
                              </div>
                              <div className="absolute left-[30%] w-[30%] h-6 bg-purple-500 rounded-md flex items-center justify-center text-xs">
                                [3,6] size=4
                              </div>
                              <div className="absolute left-[40%] w-[1%] h-6 bg-red-500 rounded-md flex items-center justify-center text-xs">
                                [4,4] size=1
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-0 w-full h-8 flex items-center">
                              <div className="absolute left-[20%] w-1 h-8 bg-yellow-500"></div>
                              <div className="absolute left-[20%] bottom-8 text-yellow-500 text-xs">q=2</div>

                              <div className="absolute left-[30%] w-1 h-8 bg-yellow-500"></div>
                              <div className="absolute left-[30%] bottom-8 text-yellow-500 text-xs">q=3</div>

                              <div className="absolute left-[40%] w-1 h-8 bg-yellow-500"></div>
                              <div className="absolute left-[40%] bottom-8 text-yellow-500 text-xs">q=4</div>

                              <div className="absolute left-[50%] w-1 h-8 bg-yellow-500"></div>
                              <div className="absolute left-[50%] bottom-8 text-yellow-500 text-xs">q=5</div>
                            </div>
                          </div>
                          <div className="text-sm text-center">
                            <p>For query=2: Intervals [1,4] and [2,4] contain it. Min size is 3.</p>
                            <p>For query=3: Intervals [1,4], [2,4], and [3,6] contain it. Min size is 3.</p>
                            <p>For query=4: All intervals contain it. Min size is 1.</p>
                            <p>For query=5: Only interval [3,6] contains it. Size is 4.</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold mt-4">Pseudocode:</h3>
                      <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                        {`function minInterval(intervals, queries):
    // Preprocess intervals: add size information
    for each interval in intervals:
        interval.size = interval[1] - interval[0] + 1
    
    // Sort intervals by size
    sort intervals by size (ascending)
    
    // Preprocess queries: add original index
    queriesWithIndex = []
    for i = 0 to queries.length - 1:
        queriesWithIndex.push([queries[i], i])
    
    // Sort queries by value
    sort queriesWithIndex by value (ascending)
    
    // Initialize answer array
    answer = new array of length queries.length filled with -1
    
    // Initialize min-heap for intervals
    minHeap = new min-heap sorted by interval size
    
    // Initialize pointer for intervals
    i = 0
    
    // Process each query
    for each [query, originalIndex] in queriesWithIndex:
        // Add all intervals that start before or at the current query
        while i < intervals.length and intervals[i][0] <= query:
            if intervals[i][1] >= query:  // Only add if the interval contains the query
                minHeap.push(intervals[i])
            i++
        
        // Remove all intervals that end before the current query
        while minHeap is not empty and minHeap.top()[1] < query:
            minHeap.pop()
        
        // If the heap is not empty, the top element is the smallest interval containing the query
        if minHeap is not empty:
            answer[originalIndex] = minHeap.top().size
    
    return answer`}
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to see the optimal approach for solving this problem.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="complexity">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Time and Space Complexity</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Time Complexity:</h3>
                      <p>
                        <strong>O((n + q) log(n + q))</strong> where n is the number of intervals and q is the
                        number of queries.
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Sorting intervals: O(n log n)</li>
                        <li>Sorting queries: O(q log q)</li>
                        <li>Processing queries: O((n + q) log n)</li>
                        <li>Each interval is added to and removed from the heap at most once: O(n log n)</li>
                        <li>
                          Each query requires potentially O(log n) time to find the minimum interval: O(q log n)
                        </li>
                      </ul>

                      <h3 className="font-semibold mt-2">Space Complexity:</h3>
                      <p>
                        <strong>O(n + q)</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Space for storing intervals with size information: O(n)</li>
                        <li>Space for storing queries with original indices: O(q)</li>
                        <li>Space for the min-heap: O(n) in the worst case</li>
                        <li>Space for the answer array: O(q)</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to see the time and space complexity analysis.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="common-issues">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Common Issues People Face</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Common Issues with This Problem:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <strong>Brute Force Approach:</strong> Checking each interval for each query leads to
                          O(n*q) time complexity, which times out for large inputs.
                        </li>
                        <li>
                          <strong>Incorrect Heap Implementation:</strong> Not properly maintaining the min-heap or
                          not using the right comparison function.
                        </li>
                        <li>
                          <strong>Off-by-One Errors:</strong> Miscalculating the size of intervals (forgetting the
                          +1 in right - left + 1).
                        </li>
                        <li>
                          <strong>Not Handling Edge Cases:</strong> Forgetting to check if an interval actually
                          contains a query point before adding it to the heap.
                        </li>
                        <li>
                          <strong>Sorting Issues:</strong> Not properly sorting intervals or queries, or not
                          tracking original indices.
                        </li>
                      </ul>

                      <h3 className="font-semibold mt-4">Common Issues with These Types of Problems:</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <strong>Line Sweep Algorithm Complexity:</strong> Line sweep algorithms can be tricky to
                          implement correctly and efficiently.
                        </li>
                        <li>
                          <strong>Heap Operations:</strong> Not understanding the time complexity of heap operations
                          or when to use a heap.
                        </li>
                        <li>
                          <strong>Sorting with Custom Comparators:</strong> Difficulty in implementing custom
                          sorting logic for complex objects.
                        </li>
                        <li>
                          <strong>Interval Problems:</strong> Not recognizing the pattern of interval problems and
                          the common techniques used to solve them.
                        </li>
                        <li>
                          <strong>Coordinate Compression:</strong> Not using coordinate compression when dealing
                          with large ranges but few distinct values.
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>Click "Show Solution" to see common issues people face with this problem.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="your-struggles">
                <AccordionTrigger className="text-[#FD9A00]">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5" />
                    <span>Your Struggle Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {showSolution ? (
                    <div className="space-y-2">
                      <p>Based on your previous submissions, here are the areas you tend to struggle with:</p>

                      <h3 className="font-semibold mt-2">Heap Implementation:</h3>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <p>
                          In your last attempt, you had issues with the min-heap implementation. You were not
                          properly removing intervals that don't contain the current query point.
                        </p>
                        <p className="mt-2">
                          Recommendation: Review the priority queue/heap data structure and practice more problems
                          that use heaps for optimization.
                        </p>
                      </div>

                      <h3 className="font-semibold mt-4">Sorting Logic:</h3>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <p>
                          You've had trouble with the sorting logic, particularly when sorting intervals by size
                          while maintaining their original boundaries.
                        </p>
                        <p className="mt-2">
                          Recommendation: Practice problems that require custom sorting of objects with multiple
                          attributes.
                        </p>
                      </div>

                      <h3 className="font-semibold mt-4">Time Complexity Optimization:</h3>
                      <div className="bg-gray-800 p-3 rounded-md">
                        <p>
                          Your initial solutions often start with a brute force approach that exceeds the time
                          limit. You need to recognize when to use more efficient algorithms.
                        </p>
                        <p className="mt-2">
                          Recommendation: Study common algorithm patterns for interval problems, particularly line
                          sweep and heap-based approaches.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                      <p>
                        Click "Show Solution" to see an analysis of your specific struggles with this type of
                        problem.
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Your Submissions Tab Content */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl text-[#FD9A00] font-semibold">Your Submissions</h2>

              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </span>
                      <span>Wrong Answer</span>
                    </div>
                    <div className="text-sm text-gray-400">05/15/2025, 14:32</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Runtime: 245 ms</div>
                    <div>Memory: 78.5 MB</div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </span>
                      <span>Time Limit Exceeded</span>
                    </div>
                    <div className="text-sm text-gray-400">05/14/2025, 09:17</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Runtime: N/A</div>
                    <div>Memory: N/A</div>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </span>
                      <span>Accepted</span>
                    </div>
                    <div className="text-sm text-gray-400">05/10/2025, 22:05</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Runtime: 198 ms (faster than 85.42%)</div>
                    <div>Memory: 72.1 MB (less than 92.31%)</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CardContent>
  )
} 