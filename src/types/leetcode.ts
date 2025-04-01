// User Profile Types
export interface UserProfile {
  username: string;
  sessionCookie: string | null;
  lastDataFetch: string;
  allQuestionsCount: AllQuestionsCount[];
  matchedUser: MatchedUser | null;
  recentSubmissionList: RecentSubmission[] | null;
}

export interface AllQuestionsCount {
  count: number;
  difficulty: string;
}

export interface MatchedUser {
  activeBadge: Badge | null;
  badges: Badge[];
  contributions: Contributions;
  githubUrl: string | null;
  profile: Profile;
  socialAccounts: unknown;
  submissionCalendar: string;
  submitStats: SubmitStats;
  upcomingBadges: Badge[];
  username: string;
}

export interface Badge {
  displayName: string;
  icon: string;
  id: string;
}

export interface Contributions {
  points: number;
  questionCount: number;
  testcaseCount: number;
}

export interface Profile {
  aboutMe: string;
  company: string | null;
  countryName: string | null;
  ranking: number;
  realName: string;
  reputation: number;
  school: string | null;
  skillTags: string[];
  starRating: number;
  userAvatar: string;
  websites: string[];
}

export interface SubmitStats {
  acSubmissionNum: AcSubmissionNum[];
  totalSubmissionNum: TotalSubmissionNum[];
}

export interface AcSubmissionNum {
  count: number;
  difficulty: string;
  submissions: number;
}

export interface TotalSubmissionNum {
  count: number;
  difficulty: string;
  submissions: number;
}

export interface RecentSubmission {
  id?: number;  // Added for IndexedDB
  username?: string;  // Added for relating to a user
  lang: string;
  statusDisplay: string;
  timestamp: string;
  title: string;
  titleSlug: string;
}

// Contest Records
export interface ContestRecord {
  username: string;
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  badges: Badge[];
  contestHistory: ContestHistoryEntry[];
}

export interface ContestHistoryEntry {
  contestId: string;
  contestName: string;
  ranking: number;
  score: number;
  finishTime: string;
}

// Problem Types
export interface Problem {
  titleSlug: string;
  title: string;
  difficulty: string;
  tags: string[];
  status: string | null;
  acRate: number;
  frequency: number;
}

export interface ProblemDetail extends Problem {
  content: string;
  similarQuestions: string;
  hints: string[];
  sampleTestCase: string;
  exampleTestcases: string;
}

// Daily Challenge
export interface DailyChallenge {
  date: string;
  problem: Problem;
}

// User Submissions
export interface UserSubmission {
  id: string;
  titleSlug: string;
  title: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
  runtime: string;
  memory: string;
}

// Submission Details
export interface SubmissionDetail {
  id: string;
  code: string;
  runtime: string;
  memory: string;
  statusDisplay: string;
  timestamp: string;
  lang: string;
  runtimePercentile: number;
  memoryPercentile: number;
} 