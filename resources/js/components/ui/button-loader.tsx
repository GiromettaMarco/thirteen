import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export default function ButtonLoader({
  children,
  className,
  loading,
  ...props
}: ComponentProps<'span'> & {
  loading: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap',
        className
      )}
      {...props}
    >
      {!loading && children}
      {loading && (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          <span className="sr-only">{t(($) => $.loading)}</span>
        </>
      )}
    </span>
  )
}
