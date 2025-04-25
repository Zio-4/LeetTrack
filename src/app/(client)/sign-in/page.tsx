"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CodeIcon } from "lucide-react"
import { signIn } from "./actions"
import { updateStore, OBJECT_STORES } from "@/lib/db"
import { UserProfile } from "@/types/leetcode"


export default function SignIn() {
  const [username, setUsername] = useState("")
  const [sessionCookie, setSessionCookie] = useState("")
  const [signInError, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!username.trim()) {
      setError("Username is required")
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("username", username)
      if (sessionCookie.trim()) {
        formData.append("sessionCookie", sessionCookie)
      }

      const result = await signIn(formData)

      if (result.success) {
        // Create basic user profile data
        const basicUserData = {
          username: result.username,
          sessionCookie: sessionCookie.trim() || null,
          lastDataFetch: new Date().toISOString()
        }
        
        // Store basic authentication data in localStorage for easy access
        localStorage.setItem("leetTrackUser", JSON.stringify(basicUserData))
        
        // Create full user profile for IndexedDB with extended data
        const userProfile: UserProfile = {
          ...basicUserData,
          allQuestionsCount: result.userData?.allQuestionsCount || [],
          matchedUser: result.userData?.matchedUser || null,
          recentSubmissionList: result.userData?.recentSubmissionList || null
        }
        
        // Store the user profile in IndexedDB
        await updateStore(OBJECT_STORES.USER_PROFILE, userProfile)
        
        // Navigate to dashboard
        router.push("/dashboard")
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center" style={{ backgroundColor: "#000" }}>
      <div className="w-full max-w-md space-y-8 rounded-xl p-8" style={{ backgroundColor: "#101828" }}>
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FD9A00" }}
          >
            <CodeIcon className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#FD9A00" }}>
            LeetTrack
          </h1>
          <p className="mt-2" style={{ color: "#D1D5DC" }}>
            Sign in to track your coding progress
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium" style={{ color: "#D1D5DC" }}>
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              className="w-full rounded-md border-gray-700 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500"
              style={{ backgroundColor: "#000", color: "#D1D5DC", borderColor: "#2D3748" }}
              placeholder="Enter your LeetCode username"
              disabled={isLoading}
            />
            {signInError && <p className="text-sm text-red-500">{signInError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="sessionCookie" className="block text-sm font-medium" style={{ color: "#D1D5DC" }}>
              Leetcode session cookie
            </label>
            <Input
              id="sessionCookie"
              name="sessionCookie"
              type="text"
              value={sessionCookie}
              onChange={(e) => setSessionCookie(e.target.value)}
              className="w-full rounded-md border-gray-700 bg-gray-800 text-white focus:border-orange-500 focus:ring-orange-500"
              style={{ backgroundColor: "#000", color: "#D1D5DC", borderColor: "#2D3748" }}
              placeholder="Enter your LeetCode session cookie (optional)"
              disabled={isLoading}
            />
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              This is needed for more advanced data but not required.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full rounded-md py-3 font-medium transition-colors hover:cursor-pointer bg-[#FD9A00] hover:bg-amber-600"
            style={{ color: "#000" }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}

