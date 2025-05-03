"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getUserSubmissions } from "@/app/(client)/dashboard/actions"
import type { UserSubmission } from "@/types/leetcode"

interface ProblemsSolvedDataPoint {
  date: string // Date in YYYY-MM-DD format
  count: number // Number of problems solved on that date
  total: number // Running total of problems solved up to that date
}

interface ProblemsOverTimeCardProps {
  username: string | undefined // Allow undefined for username
}

export function ProblemsOverTimeCard({ username }: ProblemsOverTimeCardProps) {
  const [timeRange, setTimeRange] = useState<number>(30)
  const [problemsOverTimeData, setProblemsOverTimeData] = useState<ProblemsSolvedDataPoint[]>([])

  const {
    data: submissions,
    isLoading: isLoadingSubmissions,
    isError: isErrorSubmissions,
    error: submissionError,
  } = useQuery<UserSubmission[], Error>({
    queryKey: ["allSubmissions", username],
    queryFn: () => {
      if (!username) {
        return Promise.reject(new Error("Username not provided."))
      }
      const userJson = localStorage.getItem("leetTrackUser")
      let sessionCookieValue = null
      if (userJson) {
        try {
          const parsedUser = JSON.parse(userJson)
          sessionCookieValue = parsedUser.sessionCookie
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e)
        }
      }
      return getUserSubmissions(username, sessionCookieValue)
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 15,
    retry: 1,
  })

  useEffect(() => {
    if (submissions) {
      // Filter accepted submissions
      const acceptedSubmissions = submissions.filter(
        (submission) => submission.statusDisplay.toLowerCase() === "accepted",
      )

      const today = new Date()
      const startDate = new Date()
      startDate.setDate(today.getDate() - timeRange)
      startDate.setHours(0, 0, 0, 0)

      // Generate all dates in the range
      const dateRange: string[] = []
      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        dateRange.push(d.toISOString().split("T")[0]) // YYYY-MM-DD format
      }

      // Count unique problems solved per day
      const problemsByDay = new Map<string, Set<string>>()

      // Initialize all dates with empty sets
      dateRange.forEach((date) => {
        problemsByDay.set(date, new Set())
      })

      // Add problems to their respective days
      acceptedSubmissions.forEach((submission) => {
        // Parse timestamp directly without multiplying by 1000
        const date = new Date(Number.parseInt(submission.timestamp))
        const dateStr = date.toISOString().split("T")[0]

        // Only process submissions within our date range
        if (problemsByDay.has(dateStr)) {
          problemsByDay.get(dateStr)?.add(submission.titleSlug)
        }
      })

      // Create data points with daily counts and running totals
      let runningTotal = 0
      const dataPoints: ProblemsSolvedDataPoint[] = dateRange.map((date) => {
        const problemsSet = problemsByDay.get(date) || new Set()
        const dailyCount = problemsSet.size
        runningTotal += dailyCount

        return {
          date,
          count: dailyCount, // Daily count (not running total)
          total: runningTotal, // Running total for reference
        }
      })


      setProblemsOverTimeData(dataPoints)
    } else if (!isLoadingSubmissions && !isErrorSubmissions) {
      setProblemsOverTimeData([])
    }
  }, [submissions, timeRange, isLoadingSubmissions, isErrorSubmissions])

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(Number(e.target.value))
  }

  // Format X-axis tick with simpler date display
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label)
      const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

      return (
        <div className="bg-[#101828] p-3 border border-[#FD9A00]/40 rounded-md shadow-lg">
          <p className="text-sm font-medium text-[#FD9A00]">{formattedDate}</p>
          <p className="text-sm text-[#D1D5DC]">
            <span className="font-bold">{payload[0].value}</span> problems solved
          </p>
          <p className="text-xs text-[#D1D5DC]/70">
            Total: <span className="font-medium">{payload[0].payload.total}</span> problems
          </p>
        </div>
      )
    }

    return null
  }

  // Get min and max values for Y-axis domain based on daily counts
  const getYAxisDomain = (data: ProblemsSolvedDataPoint[]) => {
    if (!data || data.length === 0) return [0, 5]

    const counts = data.map((d) => d.count)
    const maxCount = Math.max(...counts)

    // Set a reasonable Y-axis range based on the max daily count
    return [0, Math.max(5, maxCount + 1)]
  }

  // Determine display loading state based on submission fetching
  const displayLoading = isLoadingSubmissions && !submissions

  return (
    <div className="bg-[#101828] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#FD9A00]">Problems Solved Over Time</h2>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#FD9A00]" />
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="bg-[#000] text-[#D1D5DC] border border-[#2D3748] rounded-md p-2 text-sm"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {displayLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">Loading submission data...</p>
          </div>
        ) : isErrorSubmissions ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-red-400">Error: {submissionError?.message || "Failed to load submissions"}</p>
          </div>
        ) : problemsOverTimeData && problemsOverTimeData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={problemsOverTimeData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#D1D5DC", fontSize: 12 }}
                tickFormatter={formatXAxis}
                tickLine={{ stroke: "#D1D5DC" }}
                axisLine={{ stroke: "#D1D5DC" }}
                tickMargin={10}
                minTickGap={30}
              />
              <YAxis
                domain={getYAxisDomain(problemsOverTimeData)}
                tick={{ fill: "#D1D5DC", fontSize: 12 }}
                tickLine={{ stroke: "#D1D5DC" }}
                axisLine={{ stroke: "#D1D5DC" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#FD9A00"
                fill="rgba(253, 154, 0, 0.2)"
                strokeWidth={2}
                activeDot={{ r: 6, fill: "#FD9A00" }}
                dot={{ fill: "#FD9A00", r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">No accepted submissions found for the selected time period.</p>
          </div>
        )}
      </div>
    </div>
  )
}

