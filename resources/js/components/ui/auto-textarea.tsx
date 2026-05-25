import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export function AutoTextarea({
  className,
  value,
  ...props
}: Omit<ComponentProps<'textarea'>, 'style' | 'value'> & {
  value: string | number | readonly string[] | undefined | null
}) {
  return (
    <TextareaAutosize
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      value={value ?? ''}
      {...props}
    />
  )
}
