import { BrandAndLogo } from '@/components/ui/brand'
import { Button } from '@/components/ui/button'
import PublicLayout from '@/layouts/public-layout'
import { login } from '@/routes'
import { Head, Link } from '@inertiajs/react'
import { ArrowUpRight } from 'lucide-react'

export default function Welcome() {
  return (
    <PublicLayout>
      <Head title="Welcome">
        <link
          rel="preconnect"
          href="https://fonts.bunny.net"
        />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <div className="flex min-h-full w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
        <div className="flex w-full max-w-83.75 flex-col-reverse lg:max-w-4xl lg:flex-row">
          <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-5 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
            <h1 className="mb-1 font-medium">Let's get started</h1>
            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
              Laravel has an incredibly rich ecosystem.
              <br />
              We suggest starting with the following.
            </p>
            <ul className="mb-4 flex flex-col lg:mb-6">
              <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                <span className="relative bg-white py-1 dark:bg-[#161615]">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                  </span>
                </span>
                <span>
                  Read the
                  <a
                    href="https://laravel.com/docs"
                    target="_blank"
                    className="text-brand ml-1 inline-flex items-center space-x-1 font-medium underline underline-offset-4"
                  >
                    <span>Documentation</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </span>
              </li>
              <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#e3e3e0] dark:before:border-[#3E3E3A]">
                <span className="relative bg-white py-1 dark:bg-[#161615]">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#e3e3e0] bg-[#FDFDFC] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.03),0px_1px_2px_0px_rgba(0,0,0,0.06)] dark:border-[#3E3E3A] dark:bg-[#161615]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#dbdbd7] dark:bg-[#3E3E3A]" />
                  </span>
                </span>
                <span>
                  Watch video tutorials at
                  <a
                    href="https://laracasts.com"
                    target="_blank"
                    className="text-brand ml-1 inline-flex items-center space-x-1 font-medium underline underline-offset-4"
                  >
                    <span>Laracasts</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </span>
              </li>
            </ul>
            <ul className="flex gap-3 text-sm leading-normal">
              <li>
                <Button asChild>
                  <Link href={login()}>Login</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div className="bg-brand/5 relative -mb-px aspect-335/376 w-full shrink-0 overflow-hidden rounded-t-lg lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-109.5 lg:rounded-t-none lg:rounded-r-lg">
            <BrandAndLogo
              className="flex flex-col-reverse p-8 text-center"
              brandClassName="translate-y-0 opacity-100 transition-all duration-750 starting:translate-y-4 starting:opacity-0"
              logoClassName="text-brand translate-y-0 text-6xl font-bold opacity-100 transition-all delay-300 duration-750 starting:translate-y-4 starting:opacity-0"
            />
            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
