"use server";

import { LeetCode, Credential, UserProfile } from "leetcode-query";
import { initializeLeetCodeClient, getLeetCodeClient } from '@/lib/leetcode-client';

export type SignInResult = 
  | { success: true; username: string; userData: UserProfile }
  | { success: false; error: string };

export async function signIn(
  formData: FormData
): Promise<SignInResult> {
  const username = formData.get("username") as string;
  const sessionCookie = formData.get("sessionCookie") as string | undefined;

  if (!username || !username.trim()) {
    return { success: false, error: "Username is required" };
  }

  try {
    // Initialize the LeetCode client singleton
    // Pass the session cookie if provided
    const leetcode = await initializeLeetCodeClient(sessionCookie);
    
    // Search for the user using the initialized client
    const userData = await leetcode.user(username);
    
    if (!userData.matchedUser) {
      return { 
        success: false, 
        error: "User not found. Please check the username and try again." 
      };
    }

    // Return success with user data (ensure UserProfile type matches)
    return { 
      success: true, 
      username,
      userData: userData as UserProfile,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    // Consider resetting the client if authentication failed with credentials
    // resetLeetCodeClient(); // Optional: Reset if init failed
    return { 
      success: false, 
      error: "Failed to authenticate or find user. Please check credentials and username." 
    };
  }
} 