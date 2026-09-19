import { Button, cn } from '@gmcode/react-ui'
import type { UrlMethodPair } from '@inertiajs/core'
import { Link } from '@inertiajs/react'
import type { MouseEventHandler } from 'react'

export function CellAction({
  className,
  href,
  onClick,
  value
}: {
  className?: string
  href?: string | UrlMethodPair | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
  value: string | number | null | undefined
}) {
  if (href) {
    return (
      <Button
        asChild
        className={cn('w-fit px-0', className)}
        data-action="resource"
        onClick={onClick}
        variant="link"
      >
        <Link href={href}>{value}</Link>
      </Button>
    )
  }

  if (onClick) {
    return (
      <Button
        className={cn('w-fit px-0', className)}
        data-action="resource"
        onClick={onClick}
        variant="link"
      >
        {value}
      </Button>
    )
  }

  return <span>{value}</span>
}
