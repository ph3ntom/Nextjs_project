import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for questions
const questions = [
  {
    id: 1,
    title:
      "Why did Vue choose a reactivity-based state management approach, and why does Vue 3 support both 'ref()' and 'reactive()'?",
    description:
      "I'm curious about the background and philosophy behind Vue's decision to adopt a reactivity-based state management approach. I understand the various benefits of using a reactive state...",
    votes: 0,
    answers: 0,
    views: 2,
    tags: ["vue.js", "vuejs2", "vuejs3", "reactive"],
    user: {
      name: "yeongahui",
      image: "/placeholder-user.jpg",
      initials: "YA",
    },
    askedTime: "1 min ago",
  },
  {
    id: 2,
    title:
      "How to find the start of a substring that isn't proceeded by a certain character, and ends with a character not proceeded by a character, in regex",
    description:
      "So, I have a regex problem I'm trying to solve and can't figure out. I need to find a string that starts with R or K, but not followed by a #, continuing onwards til it finds another R or K which...",
    votes: 0,
    answers: 0,
    views: 5,
    tags: ["regex", "string"],
    user: {
      name: "user29974491",
      image: "/placeholder-user.jpg",
      initials: "UN",
    },
    askedTime: "2 mins ago",
  },
  {
    id: 3,
    title: "SignalR in dotnet 9 and Angular v19 errors - Websockets issues",
    description:
      "here is errors from Chrome Debugger's screen: [2025-03-14T07:24:52.776Z] Information: Normalizing '/downloadHub' to 'https://127.0.0.1:63349/downloadHub'. Utils.js:148 [2025-03-14T07:24:52.776Z]...",
    votes: 0,
    answers: 0,
    views: 5,
    tags: [".net", "angular", "asp.net-core-signalr"],
    user: {
      name: "DOS2057",
      image: "/placeholder-user.jpg",
      initials: "DO",
    },
    askedTime: "4 mins ago",
  },
]

export default function QuestionList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div>{question.votes} votes</div>
                <div>{question.answers} answers</div>
                <div>{question.views} views</div>
              </div>
              <div className="space-y-2">
                <Link href={`/questions/${question.id}`} className="text-lg font-medium hover:text-primary">
                  {question.title}
                </Link>
                <p className="text-sm text-muted-foreground">{question.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={question.user.image} alt={question.user.name} />
                    <AvatarFallback>{question.user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    <Link href={`/users/${question.user.name}`} className="text-primary hover:underline">
                      {question.user.name}
                    </Link>{" "}
                    asked {question.askedTime}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

