import Link from "next/link"
import { memo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "@/types"

interface UserInfoProps {
  user: User
  askedTime: string
  className?: string
}

const UserInfo = memo(function UserInfo({ user, askedTime, className = "" }: UserInfoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <span className="text-xs text-muted-foreground">
        <Link href={`/users/${user.name}`} className="text-primary hover:underline">
          {user.name}
        </Link>{" "}
        asked {askedTime}
      </span>
    </div>
  )
})

export default UserInfo