import Link from "next/link"
import { Home, MessageSquare, Tag, Users, Building, Briefcase, MessageCircle } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/questions"
              className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Questions</span>
            </Link>
            <Link
              href="/tags"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Link>
            <Link
              href="/users"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
            <Link
              href="/companies"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Building className="h-4 w-4" />
              <span>Companies</span>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">LABS</h2>
          <div className="space-y-1">
            <Link
              href="/jobs"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link
              href="/discussions"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Discussions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

