import { Button, cn } from '@gmcode/react-ui'
import type { UrlMethodPair } from '@inertiajs/core'
import { Link } from '@inertiajs/react'
import type { MouseEventHandler } from 'react'

export function NameCell({
  className,
  href,
  name,
  onClick
}: {
  className?: string
  href?: string | UrlMethodPair | undefined
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  if (href) {
    return (
      <Button
        asChild
        className={cn('w-fit px-0', className)}
        onClick={onClick}
        variant="link"
      >
        <Link href={href}>{name}</Link>
      </Button>
    )
  }

  if (onClick) {
    return (
      <Button
        className={cn('w-fit px-0', className)}
        onClick={onClick}
        variant="link"
      >
        {name}
      </Button>
    )
  }

  return <span>{name}</span>
}
