"use client"

import { useState, useEffect } from "react"
import { getFromStore, getAllFromStore, OBJECT_STORES } from "@/lib/db"
import { UserProfile, RecentSubmission } from "@/types/leetcode"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const userJson = localStorage.getItem("leetTrackUser")

      if (!userJson) {
        setIsRedirecting(true)
        router.push("/sign-in")
        return
      }

      setLoading(true)
      setError(null)
      setIsRedirecting(false)

      try {
        const basicUserData = JSON.parse(userJson)
        
        const userProfile = await getFromStore<UserProfile>(
          OBJECT_STORES.USER_PROFILE, 
          basicUserData.username
        )
        
        if (userProfile) {
          setUserData(userProfile)
          
          try {
            const allSubmissions = await getAllFromStore<RecentSubmission>(OBJECT_STORES.RECENT_SUBMISSIONS)
            const userSubmissions = allSubmissions
              .filter(sub => sub.username === basicUserData.username)
              .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
              .slice(0, 20)
              
            if (userSubmissions.length > 0) {
              setRecentSubmissions(userSubmissions)
            } else if (userProfile.recentSubmissionList) {
              setRecentSubmissions(userProfile.recentSubmissionList)
            }
          } catch (submissionError) {
            console.error("Error fetching recent submissions:", submissionError)
            if (userProfile.recentSubmissionList) {
              setRecentSubmissions(userProfile.recentSubmissionList)
            }
          }
        } else {
          console.warn("User profile not found in IndexedDB, falling back to basic data.")
          setUserData(basicUserData as UserProfile)
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to load user data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])
  
  if (isRedirecting) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">User not found. Redirecting to sign-in...</p>
      </div>
    </div>
  }
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">Loading your LeetCode data...</p>
      </div>
    </div>
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  }
  
  if (!userData) {
    return <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-[#101828] p-6 rounded-lg">
        <p className="text-[#D1D5DC]">An unexpected issue occurred. Please try refreshing or signing in again.</p>
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
              <p className="text-sm text-[#D1D5DC]">{userData.matchedUser.profile.aboutMe}</p>
            )}
          </div>
          
          <div className="bg-[#101828] p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Problems by Difficulty</h2>
            {userData.allQuestionsCount?.map((item) => (
              <div key={item.difficulty} className="flex justify-between mb-2">
                <span>{item.difficulty}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-[#101828] p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Submission Stats</h2>
            {userData.matchedUser.submitStats.acSubmissionNum.map((item) => (
              <div key={item.difficulty} className="flex justify-between mb-2">
                <span>{item.difficulty}</span>
                <span className="font-medium">{item.count} / {item.submissions}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {recentSubmissions.length > 0 && (
        <div className="bg-[#101828] p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#FD9A00]">Recent Submissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[#D1D5DC]">
                  <th className="pb-2">Problem</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Language</th>
                  <th className="pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="py-2">
                      <Link href={`/problem/${submission.titleSlug}`} className="hover:text-[#FD9A00] hover:underline">
                        {submission.title}
                      </Link>
                    </td>
                    <td className="py-2">
                      <span className={submission.statusDisplay === "Accepted" ? "text-green-500" : "text-red-500"}>
                        {submission.statusDisplay}
                      </span>
                    </td>
                    <td className="py-2">{submission.lang}</td>
                    <td className="py-2">{new Date(parseInt(submission.timestamp) * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}