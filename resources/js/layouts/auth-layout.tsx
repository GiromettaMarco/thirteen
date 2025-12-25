import { Brand } from '@/components/ui/brand'
import { flashMessages } from '@/lib/flash'
import { home } from '@/routes'
import { Link, router } from '@inertiajs/react'
import { useEffect, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

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

  useEffect(() => {
    return router.on('flash', (event) => {
      flashMessages(event.detail.flash.toast)
    })
  }, [])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <div className="w-full text-center">
            <Link
              href={home.url()}
              className="inline-block"
              aria-label={t(($) => $.homepage)}
            >
              <Brand className="size-16" />
            </Link>
          </div>

          <div className="space-y-2 text-center">
            {h1 && <h1 className="text-xl font-medium">{h1}</h1>}
            {p && (
              <p className="text-muted-foreground text-center text-sm">{p}</p>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
