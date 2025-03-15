import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Bookmark } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import AnswerForm from "@/components/answer-form"
import CodeBlock from "@/components/code-block"

// Sample question data - in a real app, this would come from a database
const question = {
  id: "77932960",
  title: "What needs to be added to path @/lib/utils when trying to use shadcn/ui components?",
  content: `I am trying to use the \`shadcn/dropdown\` component in my react application. I am not using Tailwind. I followed their docs and chose the path to add the code manually, but now I get an error:

\`\`\`
Module not found: Can't resolve '@/lib/utils'
  3 | import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons"
  4 | 
> 5 | import { cn } from "@/lib/utils";
  6 | 
  7 | const DropdownMenu = DropdownMenuPrimitive.Root;
\`\`\`

Please guide me on what needs to be added to folder \`@/lib/utils\`.`,
  askedAt: new Date("2023-09-19T14:30:00"),
  modifiedAt: new Date("2023-09-19T16:45:00"),
  viewCount: 16000,
  votes: 12,
  user: {
    name: "user123456",
    image: "/placeholder-user.jpg",
    reputation: 1698,
  },
  tags: ["reactjs", "shadcnui"],
}

// Sample answers
const answers = [
  {
    id: 1,
    content: `cn() can be found in the shadcn git repo:

\`\`\`typescript
import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
\`\`\`

source: https://github.com/shadcn-ui/ui/blob/bebc28430e0daa4e508def74fb3ba8a08e98f6f/apps/www/lib/utils.ts#L5C1-L9C1`,
    postedAt: new Date("2023-09-20T10:14:00"),
    votes: 12,
    user: {
      name: "ybmeng",
      image: "/placeholder-user.jpg",
      reputation: 121,
    },
    accepted: true,
  },
  {
    id: 2,
    content: `The \`cn\` function is a utility that combines \`clsx\` and \`tailwind-merge\` to handle class name merging efficiently.

You need to create a file at \`lib/utils.ts\` with the following content:

\`\`\`typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
\`\`\`

Then install the required dependencies:

\`\`\`bash
npm install clsx tailwind-merge
\`\`\`

This function allows you to conditionally apply Tailwind classes and properly merge them without conflicts.`,
    postedAt: new Date("2023-09-20T11:30:00"),
    votes: 8,
    user: {
      name: "devHelper",
      image: "/placeholder-user.jpg",
      reputation: 3245,
    },
    accepted: false,
  },
]

export default function QuestionPage() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div>Asked {formatDistanceToNow(question.askedAt)} ago</div>
          <div>Modified {formatDistanceToNow(question.modifiedAt)} ago</div>
          <div>Viewed {question.viewCount.toLocaleString()} times</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
        {/* Voting controls */}
        <div className="flex flex-row md:flex-col items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Upvote</span>
          </Button>
          <div className="text-xl font-bold">{question.votes}</div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Downvote</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bookmark className="h-5 w-5" />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>

        {/* Question content */}
        <div className="space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            {question.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
                const code = paragraph.slice(3, -3)
                return <CodeBlock key={idx} code={code} language="typescript" />
              }
              return <p key={idx}>{paragraph}</p>
            })}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-accent">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Share
              </Button>
              <Button variant="ghost" size="sm">
                Follow
              </Button>
              <Button variant="ghost" size="sm">
                Flag
              </Button>
            </div>
            <div className="flex items-center gap-2 bg-accent/50 p-2 rounded-md">
              <div className="text-sm text-muted-foreground">
                Asked <time>{formatDistanceToNow(question.askedAt)} ago</time>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={question.user.image} alt={question.user.name} />
                  <AvatarFallback>{question.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/users/${question.user.name}`} className="text-sm font-medium hover:underline">
                    {question.user.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{question.user.reputation}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{answers.length} Answers</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">Sorted by:</span>
            <select className="bg-background border rounded-md px-2 py-1 text-sm">
              <option>Highest score (default)</option>
              <option>Trending</option>
              <option>Date modified</option>
              <option>Date created</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className={`border ${answer.accepted ? "border-green-500 dark:border-green-700" : "border-border"} rounded-md p-4`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
                {/* Voting controls */}
                <div className="flex flex-row md:flex-col items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowUp className="h-6 w-6" />
                    <span className="sr-only">Upvote</span>
                  </Button>
                  <div className="text-xl font-bold">{answer.votes}</div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowDown className="h-6 w-6" />
                    <span className="sr-only">Downvote</span>
                  </Button>
                  {answer.accepted && (
                    <div className="text-green-500 dark:text-green-400 text-xs font-medium mt-2">Accepted</div>
                  )}
                </div>

                {/* Answer content */}
                <div className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    {answer.content.split("\n\n").map((paragraph, idx) => {
                      if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
                        const code = paragraph.slice(3, -3)
                        return <CodeBlock key={idx} code={code} language="typescript" />
                      }
                      return <p key={idx}>{paragraph}</p>
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        Follow
                      </Button>
                      <Button variant="ghost" size="sm">
                        Flag
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/50 p-2 rounded-md">
                      <div className="text-sm text-muted-foreground">
                        Answered <time>{formatDistanceToNow(answer.postedAt)} ago</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={answer.user.image} alt={answer.user.name} />
                          <AvatarFallback>{answer.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/users/${answer.user.name}`} className="text-sm font-medium hover:underline">
                            {answer.user.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">{answer.user.reputation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer form */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Your Answer</h2>
        <AnswerForm questionId={question.id} />
      </div>

      {/* Related questions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Related</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              180
            </Badge>
            <Link href="#" className="text-sm hover:underline">
              How to import a CSS file in a React Component
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/50 text-foreground border-accent/50">
              404
            </Badge>
            <Link href="#" className="text-sm hover:underline">
              When to use ES6 class based React components vs. ES6 React function components?
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/50 text-foreground border-accent/50">
              0
            </Badge>
            <Link href="#" className="text-sm hover:underline">
              React Testing library custom setup import test-utils: module not installed. Unable to resolve path
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/50 text-foreground border-accent/50">
              6
            </Badge>
            <Link href="#" className="text-sm hover:underline">
              Can Shadcn ui be installed for Vite + React with javascript and not typescript?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

