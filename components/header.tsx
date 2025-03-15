"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function Header() {
  const { theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2">
            {theme === "dark" ? (
              <Image src="/logo-dark.svg" alt="DevForum Logo" width={30} height={30} className="h-8 w-8" />
            ) : (
              <Image src="/logo-light.svg" alt="DevForum Logo" width={30} height={30} className="h-8 w-8" />
            )}
            <span className="hidden font-bold sm:inline-block">DevForum</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium">
            Products
          </Link>
          <Link href="/overflow" className="text-sm font-medium">
            DevFlow!
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

