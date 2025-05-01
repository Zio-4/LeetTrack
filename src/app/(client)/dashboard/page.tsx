"use client"

import { useState, useEffect } from "react"
import { getFromStore, OBJECT_STORES } from "@/lib/db"
import { UserProfile, UserSubmission } from "@/types/leetcode"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from '@/components/ui/badge'
import { AcceptanceRateCard } from "@/components/dashboard/acceptance-rate-card"
import { ProblemsOverTimeCard } from "@/components/dashboard/problems-over-time-card"


export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<UserSubmission[]>([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProfileData = async () => {
      const userJson = localStorage.getItem("leetTrackUser")
      if (!userJson) {
        setIsRedirecting(true)
        router.push("/sign-in")
        return
      }

      setProfileLoading(true)
      setProfileError(null)
      setIsRedirecting(false)

      try {
        const parsedUser = JSON.parse(userJson)
        setUserData(parsedUser);

        // Fetch recent submissions only if username exists
        if (parsedUser.username) {
          // Provide default empty array if undefined
          setRecentSubmissions(parsedUser.recentSubmissionList || []) 
        }

      } catch (err) {
        console.error("Error parsing user data or fetching profile:", err)
        setProfileError("Failed to load user data. Please try again.")
        // Clear potentially partial data
        setUserData(null)
        setRecentSubmissions([]) 
      } finally {
        setProfileLoading(false)
      }
    }

    fetchProfileData()
  }, [router])

  if (profileLoading) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">Loading user profile...</p>
      </div>
    </div>
  }
  
  if (profileError) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-red-500">
          {profileError} 
        </p>
      </div>
    </div>
  }

  if (isRedirecting) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">User not found. Redirecting to sign-in...</p>
      </div>
    </div>
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">Loading...</p>
      </div>
    </div>
  }
  
  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-[#D1D5DC]">
      <h1 className="text-2xl font-bold mb-4 text-[#FD9A00]">Welcome, {userData.username}!</h1>
      
      {userData.matchedUser && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#101828] p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Profile</h2>
            <div className="flex items-center mb-4">
              <img 
                src={userData.matchedUser.profile.userAvatar} 
                alt={userData.username} 
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-[#D1D5DC]">{userData.matchedUser.profile.realName || userData.username}</p>
                <p className="text-sm text-[#D1D5DC]">Ranking: {userData.matchedUser.profile.ranking}</p>
              </div>
            </div>
            {userData.matchedUser.profile.aboutMe && (
              <p className="text-sm text-[#D1D5DC] break-words">{userData.matchedUser.profile.aboutMe}</p>
            )}
          </div>
          
          {/* Pass only the username to the AcceptanceRateCard */}
          {userData?.username && (
            <AcceptanceRateCard username={userData.username} />
          )}
          
          <div className="bg-[#101828] p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Solved Problems</h2>
            {userData.matchedUser.submitStats.acSubmissionNum.map((item) => (
              <div key={item.difficulty} className="flex justify-between mb-2">
                <span>{item.difficulty}</span>
                <span className="font-medium">{item.count} solved</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Problems Solved Over Time Chart */}
      {userData?.username && (
        <div className="mb-6">
          <ProblemsOverTimeCard username={userData.username} />
        </div>
      )}
      
      <div className="bg-[#101828] p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#FD9A00]">Recent Submissions</h2>
        {recentSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-400">
                  <th className="pb-3 font-medium">Problem</th>
                  <th className="pb-3 font-medium">Language</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission) => (
                  <tr key={submission.id || submission.timestamp} className="border-t border-gray-700">
                    <td className="py-3 pr-4">
                      <Link href={`/problem/${submission.titleSlug}`} className="hover:text-[#FD9A00] hover:underline">
                        {submission.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">{submission.lang}</td>
                    <td className="py-3 pr-4">
                       <Badge 
                        variant="outline" 
                        className={`px-2.5 py-0.5 text-xs ${getStatusBadgeClasses(submission.statusDisplay)}`}
                      >
                        {submission.statusDisplay}
                      </Badge>
                    </td>
                    <td className="py-3">{formatDate(submission.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
           <p className="text-sm text-gray-400">No recent submissions found.</p>
        )}
      </div>
    </div>
  )
}

// Helper function for status badge styling
const getStatusBadgeClasses = (status: string = '') => {
  switch (status.toLowerCase()) {
    case 'accepted': return 'bg-green-900 text-green-300 border-green-700'
    // Add other statuses as needed, e.g., 'wrong answer'
    case 'wrong answer': return 'bg-red-900 text-red-300 border-red-700' 
    default: return 'bg-gray-700 text-gray-300 border-gray-500'
  }
}

// Helper function for date formatting
const formatDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp) * 1000)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}