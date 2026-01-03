import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'

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
            src={avatar}
            alt={name}
          />
        )}
        <AvatarFallback className="rounded-lg">
          {Array.from(name)[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{name}</span>
        <span className="text-muted-foreground truncate text-xs">{email}</span>
      </div>

      {dots && <EllipsisVertical className="ml-auto size-4" />}
    </div>
  )
}
