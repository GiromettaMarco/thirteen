import { BrandAndLogo } from '@/components/ui/brand'
import {
  Docker,
  I18next,
  Inertia,
  Laravel,
  Pest,
  React,
  Shadcn,
  Storybook,
  Tailwind,
  TypeScript,
  Vite
} from '@/components/ui/brand-icons'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { APP_NAME } from '@/config'
import PublicLayout from '@/layouts/public-layout'
import { login } from '@/routes'
import { Head, Link } from '@inertiajs/react'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

function StackItem({
  children,
  href,
  label
}: PropsWithChildren<{ href: string; label: string }>) {
  return (
    <a
      className="rounded-lg border-2 p-2"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  )
}

export default function Home() {
  // i18n
  const { t } = useTranslation()

  return (
    <PublicLayout>
      <Head title={t(($) => $.pages.public.home.title)} />

      <div className="flex min-h-full w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <div className="flex w-full max-w-83.75 flex-col-reverse lg:max-w-4xl lg:flex-row">
          <div className="flex flex-1 flex-col gap-6 rounded-br-lg rounded-bl-lg bg-white p-6 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:justify-between lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
            <Heading
              h={t(($) => $.pages.public.home.h1, { appName: APP_NAME })}
              p={t(($) => $.pages.public.home.p)}
              tag="h1"
            />

            <div className="grid gap-2">
              <p>{t(($) => $.pages.public.home.stack)}</p>

              <div className="flex">
                <a
                  className="rounded-lg border-2 px-4 pt-2 pb-2.5"
                  href="https://inertiajs.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Inertia.js</span>
                  <Inertia />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                <StackItem
                  href="https://laravel.com/"
                  label="Laravel"
                >
                  <Laravel className="size-6" />
                </StackItem>
                <StackItem
                  href="https://vite.dev/"
                  label="Vite"
                >
                  <Vite className="size-6" />
                </StackItem>
                <StackItem
                  href="https://react.dev/"
                  label="React"
                >
                  <React className="size-6" />
                </StackItem>
                <StackItem
                  href="https://www.typescriptlang.org/"
                  label="TypeScript"
                >
                  <TypeScript className="size-6" />
                </StackItem>
                <StackItem
                  href="https://pestphp.com/"
                  label="Pest"
                >
                  <Pest className="size-6" />
                </StackItem>
                <StackItem
                  href="https://storybook.js.org/"
                  label="Storybook"
                >
                  <Storybook className="size-6" />
                </StackItem>
                <StackItem
                  href="https://ui.shadcn.com/"
                  label="shadcn/ui"
                >
                  <Shadcn className="size-6" />
                </StackItem>
                <StackItem
                  href="https://www.i18next.com/"
                  label="i18next"
                >
                  <I18next className="size-6" />
                </StackItem>
                <StackItem
                  href="https://tailwindcss.com/"
                  label="Tailwind CSS"
                >
                  <Tailwind className="size-6" />
                </StackItem>
                <StackItem
                  href="https://www.docker.com/"
                  label="Docker"
                >
                  <Docker className="size-6" />
                </StackItem>
              </div>
            </div>

            <div className="flex justify-end lg:justify-start">
              <Button asChild>
                <Link href={login()}>{t(($) => $.pages.public.home.CTA)}</Link>
              </Button>
            </div>
          </div>

          <div className="relative -mb-px aspect-335/376 w-full shrink-0 overflow-hidden rounded-t-lg bg-brand/5 lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-109.5 lg:rounded-t-none lg:rounded-r-lg">
            <BrandAndLogo
              className="flex flex-col-reverse p-8 text-center"
              brandClassName="translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-4 starting:opacity-0"
              logoClassName="text-brand select-none translate-y-0 text-6xl font-bold opacity-100 transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0"
            />
            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
