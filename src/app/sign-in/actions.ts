"use server";

import { LeetCode, Credential } from "leetcode-query";

export type SignInResult = 
  | { success: true; username: string; userData: any }
  | { success: false; error: string };

export async function signIn(
  formData: FormData
): Promise<SignInResult> {
  const username = formData.get("username") as string;
  const sessionCookie = formData.get("sessionCookie") as string;

  if (!username || !username.trim()) {
    return { success: false, error: "Username is required" };
  }

  try {
    // Initialize LeetCode instance
    let leetcode: LeetCode;
    
    // If session cookie is provided, use it for authentication
    if (sessionCookie && sessionCookie.trim()) {
      const credential = new Credential();
      await credential.init(sessionCookie);
      leetcode = new LeetCode(credential);
    } else {
      // Otherwise use anonymous access
      leetcode = new LeetCode();
    }
    
    // Search for the user
    const userData = await leetcode.user(username);
    
    if (!userData.matchedUser) {
      return { 
        success: false, 
        error: "User not found. Please check the username and try again." 
      };
    }

    // Return success with user data
    return { 
      success: true, 
      username,
      userData 
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { 
      success: false, 
      error: "Failed to authenticate. Please try again later." 
    };
  }
} 