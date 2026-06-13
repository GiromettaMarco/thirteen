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
        'flex field-sizing-content w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        className
      )}
      value={value ?? ''}
      {...props}
    />
  )
}
