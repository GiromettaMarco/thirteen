import { Button, cn } from '@gmcode/react-ui'
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
      className={cn('w-fit px-0', className)}
      variant="link"
    >
      <Link href={href}>{name}</Link>
    </Button>
  )
}
