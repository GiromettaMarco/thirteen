import { cn } from '@gmcode/react-ui'
import { EllipsisVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserInfo({
  avatar,
  className,
  dots = false,
  email,
  name
}: {
  avatar?: string
  className?: string
  dots?: boolean
  email: string
  name: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 py-1.5 text-left text-sm',
        className
      )}
    >
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        {avatar && (
          <AvatarImage
            alt={name}
            src={avatar}
          />
        )}
        <AvatarFallback className="rounded-lg">
          {Array.from(name)[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span
          className="truncate font-medium"
          data-slot="user-name"
        >
          {name}
        </span>
        <span
          className="truncate text-xs text-muted-foreground"
          data-slot="user-email"
        >
          {email}
        </span>
      </div>

      {dots && <EllipsisVertical className="ml-auto size-4" />}
    </div>
  )
}
