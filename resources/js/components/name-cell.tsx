import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { UrlMethodPair } from '@inertiajs/core'
import { Link } from '@inertiajs/react'

export function NameCell({
  className,
  href,
  name
}: {
  className?: string
  href?: string | UrlMethodPair | undefined
  name: string
}) {
  return (
    <Button
      asChild
      variant="link"
      className={cn('w-fit px-0', className)}
    >
      <Link href={href}>{name}</Link>
    </Button>
  )
}
