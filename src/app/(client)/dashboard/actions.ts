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


export async function getUserSubmissions(username: string, sessionCookie?: string): Promise<UserSubmission[]> {
  if (!username) {
    // Although username isn't used in the API call shown, 
    // keeping the check as it might be relevant for context or future use.
    throw new Error("Username is required for context."); 
  }

  console.log(`Fetching submissions for user: ${username} via Server Action using singleton LeetCode client`);
  try {
    // Get the singleton instance of the LeetCode client

    const leetcode = await getLeetCodeClient(sessionCookie);

    const apiSubmissions: Submission[] = await leetcode.submissions({ 
      limit: 10000, // Fetch a large number to get all submissions
      offset: 0 
    }); 

    if (!Array.isArray(apiSubmissions)) {
       console.error("API response is not an array:", apiSubmissions);
       throw new Error("Received invalid data format for submissions.");
    }

    console.log(`Fetched submissions:`, apiSubmissions.slice(0, 5));
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

// Interface for problems solved data point
export interface ProblemsSolvedDataPoint {
  date: string;  // Date in YYYY-MM-DD format
  count: number; // Number of problems solved on that date
}

/**
 * Gets the number of accepted submissions grouped by day for a specific time period
 */
export async function getProblemsOverTime(
  username: string, 
  days: number = 30, 
  sessionCookie?: string
): Promise<ProblemsSolvedDataPoint[]> {
  if (!username) {
    throw new Error("Username is required");
  }

  console.log(`Fetching problems solved over time for user: ${username}, period: ${days} days`);
  
  try {
    // 1. Get all submissions for the user
    const allSubmissions = await getUserSubmissions(username, sessionCookie);
    
    // 2. Filter for only accepted submissions
    const acceptedSubmissions = allSubmissions.filter(
      submission => submission.statusDisplay.toLowerCase() === 'accepted'
    );
    
    // 3. Calculate the start date (X days ago from today)
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    
    // 4. Filter submissions by date range
    const filteredSubmissions = acceptedSubmissions.filter(submission => {
      const submissionDate = new Date(parseInt(submission.timestamp) * 1000);
      return submissionDate >= startDate && submissionDate <= today;
    });

    // 5. Group submissions by day (using a Map for unique problems per day)
    const problemsByDay = new Map<string, Set<string>>();
    
    // Initialize all dates in the range with empty sets
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0]; // YYYY-MM-DD format
      problemsByDay.set(dateStr, new Set());
    }
    
    // Add problems to their respective days
    filteredSubmissions.forEach(submission => {
      const date = new Date(parseInt(submission.timestamp) * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      // Only count unique problems (by titleSlug)
      if (problemsByDay.has(dateStr)) {
        problemsByDay.get(dateStr)?.add(submission.titleSlug);
      }
    });
    
    // 6. Convert to array of data points with running total
    let runningTotal = 0;
    const dataPoints: ProblemsSolvedDataPoint[] = Array.from(problemsByDay.entries())
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, problems]) => {
        // Add new problems to running total
        runningTotal += problems.size;
        return {
          date,
          count: runningTotal
        };
      });
    
    console.log(`Generated ${dataPoints.length} data points for problems solved over time`);
    return dataPoints;
  } catch (error) {
    console.error(`Error fetching problems over time for ${username}:`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch problems over time for ${username}: ${errorMessage}`);
  }
} 