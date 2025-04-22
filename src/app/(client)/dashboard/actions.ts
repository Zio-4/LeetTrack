"use server"

import { UserSubmission } from '@/types/leetcode';
// Import the singleton getter function
import { getLeetCodeClient } from '@/lib/leetcode-client'; 

// Interface for the data returned by the LeetCode API client
// Based on user provided structure
interface Submission {
    id: number;
    isPending: boolean;
    lang: string;
    memory: number | null; // Allow null in case API returns it
    runtime: number | null; // Allow null in case API returns it
    statusDisplay: string; // Assuming SubmissionStatus is string compatible
    time: string;
    timestamp: number;
    title: string;
    titleSlug: string;
    url: string;
}

// Removed placeholder function fetchAllUserSubmissionsFromLeetCodeAPI
// Removed old mapApiResponseToUserSubmission function

// Helper function to format runtime (ms)
function formatRuntime(runtimeMs: number | null): string {
    if (runtimeMs === null || runtimeMs === undefined) {
        return 'N/A';
    }
    return `${runtimeMs} ms`;
}

// Helper function to format memory (MB)
function formatMemory(memoryBytes: number | null): string {
    if (memoryBytes === null || memoryBytes === undefined) {
        return 'N/A';
    }
    // Assuming the API provides memory in bytes, convert to MB
    const memoryMb = (memoryBytes / (1024 * 1024)).toFixed(2);
    return `${memoryMb} MB`;
}


export async function getUserSubmissions(username: string): Promise<UserSubmission[]> {
  if (!username) {
    // Although username isn't used in the API call shown, 
    // keeping the check as it might be relevant for context or future use.
    throw new Error("Username is required for context."); 
  }

  console.log(`Fetching submissions for user: ${username} via Server Action using singleton LeetCode client`);
  try {
    // Get the singleton instance of the LeetCode client
    const leetcode = getLeetCodeClient();

    const apiSubmissions: Submission[] = await leetcode.submissions({ 
      limit: 10000, // Fetch a large number to get all submissions
      offset: 0 
    }); 

    if (!Array.isArray(apiSubmissions)) {
       console.error("API response is not an array:", apiSubmissions);
       throw new Error("Received invalid data format for submissions.");
    }

    console.log(`Fetched submissions:`, apiSubmissions);
    // Map the raw API response to the UserSubmission type directly
    const userSubmissions: UserSubmission[] = apiSubmissions.map((sub: Submission) => {
      // Defensive checks for potentially null/undefined values from API
      const safeTitle = sub.title ?? 'N/A';
      const safeTitleSlug = sub.titleSlug ?? 'n-a';
      const safeLang = sub.lang ?? 'N/A';
      const safeStatus = sub.statusDisplay ?? 'N/A';
      
      return {
        id: String(sub.id), // Convert number ID to string
        title: safeTitle,
        titleSlug: safeTitleSlug,
        timestamp: String(sub.timestamp), // Convert number timestamp to string
        statusDisplay: safeStatus,
        lang: safeLang,
        runtime: formatRuntime(sub.runtime), // Format runtime
        memory: formatMemory(sub.memory), // Format memory
        username: username, // Add the username from the function argument
      };
    });
    
    console.log(`Successfully fetched and mapped ${userSubmissions.length} submissions for ${username}`);
    return userSubmissions;
  } catch (error) {
    console.error(`Error fetching submissions for ${username}:`, error);
    // Propagate a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch submissions for ${username}: ${errorMessage}`);
  }
} 