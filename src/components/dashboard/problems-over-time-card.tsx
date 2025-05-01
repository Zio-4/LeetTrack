'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProblemsOverTime, ProblemsSolvedDataPoint } from '@/app/(client)/dashboard/actions'

interface ProblemsOverTimeCardProps {
	username: string
}

export function ProblemsOverTimeCard({ username }: ProblemsOverTimeCardProps) {
	const [timeRange, setTimeRange] = useState<number>(30) // Default to 30 days
	
	// Fetch problems over time data based on the selected time range
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['problemsOverTime', username, timeRange],
		queryFn: () => {
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
            return getProblemsOverTime(username, timeRange, sessionCookieValue)
		},
		enabled: !!username,
		staleTime: 5 * 60 * 1000, // 5 minutes
	})
	
	// Handle dropdown change
	const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTimeRange(Number(e.target.value))
	}
	
	// Format X-axis tick with simpler date display
	const formatXAxis = (dateStr: string) => {
		const date = new Date(dateStr)
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
	}
	
	// Custom tooltip component for the chart
	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			const date = new Date(label)
			const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
			
			return (
				<div className="bg-[#101828] p-2 border border-[#FD9A00]/40 rounded-md shadow-lg">
					<p className="text-xs text-[#FD9A00]">{formattedDate}</p>
					<p className="text-sm text-[#D1D5DC]">
						<span className="font-bold">{payload[0].value}</span> problems solved
					</p>
				</div>
			)
		}
		
		return null
	}
	
	// Get min and max values for Y-axis domain
	const getYAxisDomain = (data: ProblemsSolvedDataPoint[]) => {
		if (!data || data.length === 0) return [0, 10]
		const minCount = Math.max(0, Math.min(...data.map(d => d.count)) - 3)
		const maxCount = Math.max(...data.map(d => d.count)) + 3
		return [minCount, maxCount]
	}
	
	return (
		<div className="bg-[#101828] p-4 rounded-lg">
			<div className="flex justify-between items-start mb-4">
				<h2 className="text-xl font-semibold text-[#FD9A00]">Problems Solved Over Time</h2>
				<div className="flex items-center gap-2">
					<Clock className="h-5 w-5 text-[#FD9A00]" />
					<select 
						value={timeRange}
						onChange={handleTimeRangeChange}
						className="bg-[#000] text-[#D1D5DC] border border-[#101828] rounded-md p-1 text-sm"
					>
						<option value={7}>7 days</option>
						<option value={30}>30 days</option>
						<option value={90}>90 days</option>
					</select>
				</div>
			</div>
			
			<div className="h-[300px] w-full">
				{isLoading ? (
					<div className="h-full flex items-center justify-center">
						<p className="text-sm text-gray-400">Loading data...</p>
					</div>
				) : isError ? (
					<div className="h-full flex items-center justify-center">
						<p className="text-sm text-red-400">Error: {error?.message || 'Failed to load data'}</p>
					</div>
				) : data && data.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={data}
							margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
						>
							<XAxis 
								dataKey="date" 
								tick={{ fill: '#D1D5DC', fontSize: 12 }}
								tickFormatter={formatXAxis}
								tickLine={{ stroke: '#D1D5DC' }}
								axisLine={{ stroke: '#D1D5DC' }}
								tickMargin={10}
							/>
							<YAxis 
								domain={getYAxisDomain(data)}
								tick={{ fill: '#D1D5DC', fontSize: 12 }}
								tickLine={{ stroke: '#D1D5DC' }}
								axisLine={{ stroke: '#D1D5DC' }}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Line 
								type="monotone" 
								dataKey="count" 
								stroke="#FD9A00" 
								strokeWidth={2}
								dot={{ fill: '#FD9A00', r: 4 }}
								activeDot={{ r: 6, fill: '#FD9A00' }}
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div className="h-full flex items-center justify-center">
						<p className="text-sm text-gray-400">No data available for the selected time period.</p>
					</div>
				)}
			</div>
		</div>
	)
} 