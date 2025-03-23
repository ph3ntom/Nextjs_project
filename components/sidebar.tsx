'use client'

import Link from "next/link"
import { useState } from "react"
import { Home, MessageSquare, Tag, Users, Building, Briefcase, MessageCircle } from "lucide-react"

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("/")

  interface HandleLinkClick {
    (path: string): void;
  }

  const handleLinkClick: HandleLinkClick = (path) => {
    setActiveLink(path)
  }

  return (
    <div className="hidden border-r bg-background md:block w-64">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => handleLinkClick('/')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/questions"
              onClick={() => handleLinkClick('/questions')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/questions' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Questions</span>
            </Link>
            <Link
              href="/tags"
              onClick={() => handleLinkClick('/tags')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/tags' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </Link>
            <Link
              href="/users"
              onClick={() => handleLinkClick('/users')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/users' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
            <Link
              href="/companies"
              onClick={() => handleLinkClick('/companies')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/companies' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
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
              onClick={() => handleLinkClick('/jobs')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/jobs' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link
              href="/discussions"
              onClick={() => handleLinkClick('/discussions')}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${activeLink === '/discussions' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`}
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
