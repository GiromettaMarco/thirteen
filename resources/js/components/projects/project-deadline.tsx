import { cn, format } from '@/lib/utils'
import { differenceInCalendarDays } from 'date-fns'
import { useTranslation } from 'react-i18next'

export function ProjectDeadline({
  deadline,
  className
}: {
  deadline: Date | string | null | undefined
  className?: string
}) {
  // i18n
  const { i18n, t } = useTranslation()

  // Nothing to print
  if (!deadline) {
    return null
  }

  // Parse date
  const parsedDeadline =
    deadline instanceof Date ? deadline : new Date(deadline)

  // The date format is invalid
  if (isNaN(parsedDeadline.valueOf())) {
    return null
  }

  const deadlineCountdown = parsedDeadline
    ? differenceInCalendarDays(parsedDeadline, new Date())
    : 0

  return (
    <>
      {deadlineCountdown > 7 ? (
        <p className={className}>
          {t(($) => $.projects.deadline)}:{' '}
          {format(parsedDeadline, i18n.language)}
        </p>
      ) : deadlineCountdown > 1 ? (
        <p className={cn('text-warning-foreground', className)}>
          {t(($) => $.projects.deadlineIn, { count: deadlineCountdown })}
        </p>
      ) : deadlineCountdown >= 0 ? (
        <p className={cn('text-error-foreground', className)}>
          {t(($) => $.projects.deadlineIn, { count: deadlineCountdown })}
        </p>
      ) : (
        <p className={cn('text-destructive', className)}>
          {t(($) => $.projects.deadlineBy, { count: deadlineCountdown * -1 })}
        </p>
      )}
    </>
  )
}
