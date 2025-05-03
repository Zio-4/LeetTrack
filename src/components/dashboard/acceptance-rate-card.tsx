"use client"

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { UserSubmission } from '@/types/leetcode'
import { useQuery } from '@tanstack/react-query'
import { getUserSubmissions } from '@/app/(client)/dashboard/actions'

// Define interface for acceptance rate data
interface AcceptanceRateData {
	rate: number | null
	acceptedCount: number
	totalCount: number
}

interface AcceptanceRateCardProps {
	username: string | undefined
}

export function AcceptanceRateCard({ username }: AcceptanceRateCardProps) {
	const [acceptanceRateData, setAcceptanceRateData] = useState<AcceptanceRateData>({
		rate: null,
		acceptedCount: 0,
		totalCount: 0,
	})

	const {
		data: submissions,
		isLoading,
		isError,
		error,
	} = useQuery<UserSubmission[], Error>({
		queryKey: ['allSubmissions', username],
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
			if (submissions.length > 0) {
				const accepted = submissions.filter(sub => sub.statusDisplay === 'Accepted').length
				const total = submissions.length
				setAcceptanceRateData({
					rate: total > 0 ? Math.round((accepted / total) * 100) : 0,
					acceptedCount: accepted,
					totalCount: total,
				})
			} else {
				setAcceptanceRateData({ rate: 0, acceptedCount: 0, totalCount: 0 })
			}
		} else if (!isLoading && !isError) {
			setAcceptanceRateData({ rate: 0, acceptedCount: 0, totalCount: 0 });
		}
	}, [submissions, isLoading, isError])

	const displayLoading = isLoading && !submissions

	return (
		<div className="bg-[#101828] p-4 rounded-lg flex flex-col justify-between min-h-[150px]">
			<div className="flex justify-between items-start">
				<h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Acceptance Rate</h2>
				<Clock className="h-5 w-5 text-[#FD9A00]" />
			</div>
			<div className="flex-grow flex items-center justify-center">
				{displayLoading ? (
					<p className="text-sm text-gray-400">Loading submission data...</p>
				) : isError ? (
					<p className="text-sm text-red-400">Error: {error?.message || 'Failed to load'}</p>
				) : acceptanceRateData.totalCount > 0 ? (
					<div className="text-center">
						<p className="text-5xl font-bold text-white mb-1">{acceptanceRateData.rate}%</p>
						<p className="text-sm text-gray-400">
							{acceptanceRateData.acceptedCount} accepted / {acceptanceRateData.totalCount} submissions
						</p>
					</div>
				) : (
					<p className="text-sm text-gray-400">No submission data found.</p>
				)}
			</div>
		</div>
	)
} 