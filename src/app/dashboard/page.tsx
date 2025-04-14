"use client"

import { useState, useEffect } from "react"
import { getFromStore, getAllFromStore, OBJECT_STORES } from "@/lib/db"
import { UserProfile, RecentSubmission, UserSubmission } from "@/types/leetcode"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from '@/components/ui/badge'
import { Clock } from "lucide-react"

// Define interface for acceptance rate data
interface AcceptanceRateData {
  rate: number | null;
  acceptedCount: number;
  totalCount: number;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [recentSubmissions, setRecentSubmissions] = useState<UserSubmission[]>([])
  const [allSubmissions, setAllSubmissions] = useState<UserSubmission[]>([])
  const [acceptanceRateData, setAcceptanceRateData] = useState<AcceptanceRateData>({
    rate: null,
    acceptedCount: 0,
    totalCount: 0
  });
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
            const fetchedAllSubmissions = await getAllFromStore<UserSubmission>(OBJECT_STORES.USER_SUBMISSIONS);
            const userAllSubmissions = fetchedAllSubmissions.filter(sub => sub.username === basicUserData.username);
            setAllSubmissions(userAllSubmissions);

            if (userAllSubmissions.length > 0) {
              const accepted = userAllSubmissions.filter(sub => sub.statusDisplay === 'Accepted').length;
              const total = userAllSubmissions.length;
              setAcceptanceRateData({
                rate: Math.round((accepted / total) * 100),
                acceptedCount: accepted,
                totalCount: total,
              });
            }

            const userRecentSubmissions = userAllSubmissions
              .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
              .slice(0, 20);
            
            if (userRecentSubmissions.length > 0) {
               setRecentSubmissions(userRecentSubmissions);
            } else if (userProfile.recentSubmissionList) {
               console.warn("Fallback to recentSubmissionList from profile - mapping to UserSubmission");
               const mappedSubmissions = userProfile.recentSubmissionList.map(sub => ({
                 ...sub,
                 id: String(sub.id ?? Math.random().toString(36).substring(7)),
                 username: sub.username || basicUserData.username,
                 runtime: 'N/A',
                 memory: 'N/A',
               }));
               setRecentSubmissions(mappedSubmissions);
            }
          } catch (submissionError) {
            console.error("Error fetching submissions:", submissionError);
            if (userProfile.recentSubmissionList) {
              console.warn("Fallback to recentSubmissionList from profile after error - mapping to UserSubmission");
              const mappedSubmissions = userProfile.recentSubmissionList.map(sub => ({
                ...sub,
                id: String(sub.id ?? Math.random().toString(36).substring(7)),
                username: sub.username || basicUserData.username,
                runtime: 'N/A',
                memory: 'N/A',
              }));
              setRecentSubmissions(mappedSubmissions);
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
          
          <div className="bg-[#101828] p-4 rounded-lg flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-2 text-[#FD9A00]">Acceptance Rate</h2>
              <Clock className="h-5 w-5 text-[#FD9A00]" />
            </div>
            {acceptanceRateData.rate !== null ? (
              <div>
                <p className="text-5xl font-bold text-white mb-1">{acceptanceRateData.rate}%</p>
                <p className="text-sm text-gray-400">
                  {acceptanceRateData.acceptedCount} accepted out of {acceptanceRateData.totalCount} submissions
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Calculating...</p>
            )}
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
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-400">
                  <th className="pb-3 font-medium">Problem</th>
                  <th className="pb-3 font-medium">Difficulty</th>
                  <th className="pb-3 font-medium">Language</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSubmissions.map((submission, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="py-3 pr-4">
                      <Link href={`/problem/${submission.titleSlug}`} className="hover:text-[#FD9A00] hover:underline">
                        {submission.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">
                      {/* Placeholder for Difficulty - Requires data fetching update */}
                      {/* Example usage once data is available:
                      <Badge 
                        variant="outline" 
                        className={`px-2 py-0.5 text-xs ${getDifficultyBadgeClasses(submission.difficulty)}`}
                      >
                        {submission.difficulty || 'N/A'} 
                      </Badge> 
                      */}
                       {/* Render an invisible badge as a layout placeholder */}
                       <Badge 
                        variant="outline" 
                        className="px-2 py-0.5 text-xs bg-transparent border-transparent text-transparent select-none"
                      >
                        Medium {/* Content doesn't matter, it's invisible */}
                      </Badge>
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
        </div>
      )}
    </div>
  )
}

// Helper function for difficulty badge styling (can be moved elsewhere if preferred)
const getDifficultyBadgeClasses = (difficulty: string = '') => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-900 text-green-300 border-green-700'
    case 'medium': return 'bg-yellow-900 text-yellow-300 border-yellow-700'
    case 'hard': return 'bg-red-900 text-red-300 border-red-700'
    default: return 'bg-gray-700 text-gray-300 border-gray-500'
  }
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