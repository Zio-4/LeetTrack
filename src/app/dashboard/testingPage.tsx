"use server"
import Image from "next/image";
import axios from 'axios';
import { LeetCode } from "leetcode-query";

export default async function Home() {


interface Submission {
  title: string;
  timestamp: string;
  status: string;
  topicTags: string[];
}

// async function fetchLeetCodeSubmissions(username: string): Promise<Submission[]> {
//   const query = {
//     query: `
//       query recentAcSubmissions($username: String!, $limit: Int!) {
//         recentSubmissionList(username: $username, limit: $limit) {
//           title
//           timestamp
//           statusDisplay
//           topicTags { name }
//         }
//       }
//     `,
//     variables: { username, limit: 10 },
//   };

//   try {
//     const response = await axios.post('https://leetcode.com/graphql', query);
//     return response.data.data.recentSubmissionList.map((sub: any) => ({
//       title: sub.title,
//       timestamp: sub.timestamp,
//       status: sub.statusDisplay,
//       topicTags: sub.topicTags.map((tag: any) => tag.name),
//     }));
//   } catch (error) {
//     console.error('Error fetching submissions:', error);
//     return [];
//   }
// }

// fetchLeetCodeSubmissions('philipz4848').then(console.log);

const leetcode = new LeetCode();
const user = await leetcode.user("philipz4848");
console.log({user});

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <h1>Hello World</h1>
    </div>
  );
}
