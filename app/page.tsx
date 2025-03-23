import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, HandIcon as HandWaving } from "lucide-react"
import InterestingPosts from "@/components/interesting-posts"

// Sample user data - in a real app, this would come from your auth system
const user = {
  name: "HY LEE",
  reputation: 1,
  watchedTags: ["c#", "c++", "javascript", "next.js", "node.js", "python", "typescript"],
}

export default function Home() {
  return (
    <div className="container py-6">
      {/* Welcome Section */}
      <div className="flex items-start gap-4 mb-8">
        <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
          <HandWaving className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome to Stack Overflow, {user.name}!</h1>
          <p className="text-muted-foreground">
            Find answers to your technical questions and help others answer theirs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reputation Card */}
        <Card>
          <CardHeader>
            <CardTitle>Reputation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{user.reputation}</div>
              <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
                {/* Placeholder reputation graph */}
                <div className="h-full w-full bg-gradient-to-r from-blue-500/20 to-blue-500/30" />
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Earn reputation by{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Asking
              </Link>
              ,{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Answering
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Editing
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        {/* Badge Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle>Badge progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">Take the tour to earn your first badge!</p>
            <Button variant="secondary" className="w-full">
              Get started here
            </Button>
          </CardContent>
        </Card>

        {/* Watched Tags Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Watched tags</CardTitle>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.watchedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-accent">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 mt-8">
        {/* Interesting Posts Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Interesting posts for you</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Based on your viewing history and watched tags.{" "}
            <Link href="#" className="text-blue-500 hover:underline">
              Customize your feed
            </Link>
          </p>
          <InterestingPosts />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Overflow Blog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="#" className="flex items-start gap-2 text-sm hover:text-blue-500">
                <span>📈</span>
                Can climate tech startups address the current crisis?
              </Link>
              <Link href="#" className="flex items-start gap-2 text-sm hover:text-blue-500">
                <span>🚀</span>
                What we learned at TDX 2025
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured on Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="#" className="flex items-start gap-2 text-sm group">
                <Badge variant="outline" className="shrink-0">
                  Community
                </Badge>
                <span className="group-hover:text-blue-500">Community Asks Sprint Announcement - March 2025</span>
              </Link>
              <Link href="#" className="flex items-start gap-2 text-sm group">
                <Badge variant="outline" className="shrink-0">
                  Meta
                </Badge>
                <span className="group-hover:text-blue-500">
                  Meta Stack Exchange site maintenance scheduled starting Monday, March 17,...
                </span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

