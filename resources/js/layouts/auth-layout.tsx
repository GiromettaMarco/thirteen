import { Link } from '@inertiajs/react'
import { type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/components/ui/brand'
import { home } from '@/routes'

export default function AuthLayout({
  children,
  h1,
  p
}: PropsWithChildren<{
  h1?: string
  p?: string
}>) {
  // i18n
  const { t } = useTranslation()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <div className="w-full text-center">
            <Link
              aria-label={t(($) => $.homepage)}
              className="inline-block"
              href={home.url()}
            >
              <Brand className="size-16" />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            {h1 && <h1 className="text-xl font-medium">{h1}</h1>}
            {p && (
              <p className="text-center text-sm text-muted-foreground">{p}</p>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
