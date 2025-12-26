import type { ComponentProps } from 'react'

export function Heading({
  description,
  Tag = 'h2',
  title,
  ...props
}: ComponentProps<'header'> & {
  description?: string
  Tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  title: string
}) {
  return (
    <header {...props}>
      <Tag className="text-xl font-semibold tracking-tight">{title}</Tag>
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
    </header>
  )
}
