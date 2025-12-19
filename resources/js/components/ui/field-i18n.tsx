import type { TsvMessageParams } from '@/lib/tsv/message'
import { cn } from '@/lib/utils'
import { useMemo, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function FieldErrorI18n({
  className,
  children,
  errors,
  ...props
}: ComponentProps<'div'> & {
  errors?: Array<{ message?: string; params?: TsvMessageParams } | undefined>
}) {
  // i18n
  const { t } = useTranslation('validations')

  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    if (errors?.length == 1) {
      // @ts-expect-error: assert translation key
      return t(errors[0]?.message, errors[0]?.params)
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error) =>
            error?.message && (
              // @ts-expect-error: assert translation key
              <li key={error.message}>{t(error.message, error.params)}</li>
            )
        )}
      </ul>
    )
  }, [children, errors, t])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  )
}
