import type { RouteDefinition } from '@/wayfinder'
import type { PropsWithChildren } from 'react'
import { action } from 'storybook/actions'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export function Link({
  'aria-label': ariaLabel,
  children,
  className,
  href = ''
}: PropsWithChildren<{
  'aria-label'?: string
  className?: string
  href?: string | RouteDefinition<Method>
}>) {
  if (typeof href === 'string' || href.method === 'get') {
    return (
      <a
        aria-label={ariaLabel}
        className={className}
        href={typeof href === 'string' ? href : href.method}
        onClick={(event) => {
          event.preventDefault()
          action('link to')(href)
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={className}
      type="button"
    >
      {children}
    </button>
  )
}
