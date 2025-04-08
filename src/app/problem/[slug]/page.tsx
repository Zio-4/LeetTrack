import { LeetCode, Problem } from "leetcode-query"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"

async function getProblemData(slug: string): Promise<Problem | null> {
  try {
    const leetcode = new LeetCode()
    const problemData = await leetcode.problem(slug)

    console.log(problemData)
    return problemData
  } catch (error) {
    console.error(`Error fetching problem data for slug ${slug}:`, error)
    return null
  }
}

// Throws error if you try to type it. Has to match PageProps?
export default async function ProblemPage({ params }: any) {
  const problemData = await getProblemData(params.slug)

  if (!problemData) {
    notFound()
  }

  const cleanContent = DOMPurify.sanitize(problemData.content ?? '', { 
    USE_PROFILES: { html: true } 
  })

  let stats: { totalAccepted: string, totalSubmission: string, acRate: string } | null = null
  try {
    if (problemData.stats && typeof problemData.stats === 'string' && problemData.stats.trim() !== '') {
      stats = JSON.parse(problemData.stats)
    }
  } catch (e) {
    console.error("Failed to parse problem stats:", e)
    stats = null
  }
  
  let similarQuestions: { title: string, titleSlug: string, difficulty: string }[] = []
  try {
    if (problemData.similarQuestions && typeof problemData.similarQuestions === 'string' && problemData.similarQuestions.trim() !== '') {
      similarQuestions = JSON.parse(problemData.similarQuestions)
    }
  } catch (e) {
    console.error("Failed to parse similar questions:", e)
    similarQuestions = []
  }

  const getDifficultyColor = (difficulty: string = '') => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
      default: return 'text-[#D1D5DC]'
    }
  }
  
  const getDifficultyBorderColor = (difficulty: string = '') => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'border-green-500'
      case 'medium': return 'border-yellow-500'
      case 'hard': return 'border-red-500'
      default: return 'border-gray-500'
    }
  }

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-[#D1D5DC]">
      <Card className="bg-[#101828] border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-[#FD9A00] mb-2">
                {problemData.questionFrontendId ?? 'N/A'}. {problemData.title ?? 'Unknown Problem'}
              </CardTitle>
              <div className="flex items-center space-x-2 mb-3">
                {problemData.difficulty && (
                   <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(problemData.difficulty)} ${getDifficultyBorderColor(problemData.difficulty)} px-2 py-1`}
                  >
                    {problemData.difficulty}
                  </Badge>
                )}
                {problemData.isPaidOnly && (
                  <Badge variant="secondary" className="bg-yellow-600 text-black">Premium</Badge>
                )}
              </div>
            </div>
            {stats && (
              <div className="text-right text-sm flex-shrink-0">
                <p>Accepted: {stats.totalAccepted ?? 'N/A'}</p>
                <p>Submissions: {stats.totalSubmission ?? 'N/A'}</p>
                <p>Acceptance Rate: {stats.acRate ?? 'N/A'}%</p>
                <div className="flex justify-end space-x-3 mt-1">
                   <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> {problemData.likes ?? 0}</span>
                   <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg> {problemData.dislikes ?? 0}</span>
                </div>
              </div>
            )}
          </div>
          <Separator className="my-4 bg-gray-700" />
          {Array.isArray(problemData.topicTags) && problemData.topicTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {problemData.topicTags.map(tag => (
                <Badge key={tag.slug} variant="secondary" className="bg-gray-600 text-[#D1D5DC]">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {cleanContent && (
             <>
              <h3 className="text-xl font-semibold mb-3 text-[#FD9A00]">Description</h3>
              <div 
                className="prose prose-invert max-w-none text-[#D1D5DC] 
                           prose-code:text-[#FD9A00] prose-code:bg-[#1F2937] prose-code:p-1 prose-code:rounded
                           prose-strong:text-[#FD9A00]
                           prose-a:text-blue-400 hover:prose-a:text-blue-300"
                dangerouslySetInnerHTML={{ __html: cleanContent }} 
              />
            </>
          )}
          
          {Array.isArray(problemData.hints) && problemData.hints.length > 0 && (
             <>
              <Separator className="my-6 bg-gray-700" />
              <h3 className="text-xl font-semibold mb-3 text-[#FD9A00]">Hints</h3>
              <ul className="list-disc pl-5 space-y-2">
                {problemData.hints.map((hint, index) => (
                  typeof hint === 'string' 
                    ? <li key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hint) }}></li>
                    : null 
                ))}
              </ul>
            </>
          )}

          {similarQuestions.length > 0 && (
             <>
              <Separator className="my-6 bg-gray-700" />
              <h3 className="text-xl font-semibold mb-3 text-[#FD9A00]">Similar Questions</h3>
              <ul className="list-disc pl-5 space-y-1">
                 {similarQuestions.map((q) => (
                   <li key={q.titleSlug}>
                      <Link href={`/problem/${q.titleSlug}`} className="text-blue-400 hover:text-blue-300 hover:underline">
                        {q.title}
                      </Link>
                      {q.difficulty && (
                        <span className={`ml-2 ${getDifficultyColor(q.difficulty)}`}>({q.difficulty})</span>
                      )}
                   </li>
                 ))}
              </ul>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  )
} 