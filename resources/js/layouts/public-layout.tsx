import { Button, cn, Separator } from '@gmcode/react-ui'
import { Link } from '@inertiajs/react'
import { Menu, UserRound, X } from 'lucide-react'
import {
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import { AppearanceSelector } from '@/components/appearance-selector'
import { LanguageSelector } from '@/components/language-selector'
import { BrandAndLogo } from '@/components/ui/brand'
import { GitHub } from '@/components/ui/brand-icons'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { authentication, dashboard, forms, home } from '@/routes'

const PUBLIC_MOBILE_MENU_BREAKPOINT = 1024

//#region Mobile Menu
function MobileMenu({
  open,
  setOpen
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 z-20 flex h-full w-96 max-w-full -translate-x-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-e bg-background p-8 transition duration-300 lg:hidden',
        { 'translate-0': open }
      )}
    >
      <div className="flex justify-between">
        <Link href={home()}>
          <BrandAndLogo
            brandClassName="size-10"
            className="flex flex-initial items-center gap-4"
          />
        </Link>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
        >
          <X />
        </Button>
      </div>
      <Link
        className="rounded px-2 py-1 text-accent-foreground hover:bg-accent"
        href={authentication()}
      >
        {t(($) => $.layouts.public.menu.authentication)}
      </Link>
      <Link
        className="rounded px-2 py-1 text-accent-foreground hover:bg-accent"
        href={forms()}
      >
        {t(($) => $.layouts.public.menu.forms)}
      </Link>
      <Link
        className="rounded px-2 py-1 text-accent-foreground hover:bg-accent"
        href="#"
      >
        {t(($) => $.layouts.public.menu.httpTesting)}
      </Link>
      <Link
        className="rounded px-2 py-1 text-accent-foreground hover:bg-accent"
        href="https://github.com/GiromettaMarco/thirteen/actions/workflows/tests.yml"
      >
        {t(($) => $.layouts.public.menu.e2eTesting)}
      </Link>
      <Separator />
      <Link
        className="rounded px-2 py-1 text-accent-foreground hover:bg-accent"
        href={dashboard()}
      >
        {t(($) => $.dashboard)}
      </Link>
    </nav>
  )
}

//#region Public Menu
function PublicMenu() {
  // i18n
  const { t } = useTranslation()

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
          >
            <Link href={authentication()}>
              {t(($) => $.layouts.public.menu.authentication)}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
          >
            <Link href={forms()}>{t(($) => $.layouts.public.menu.forms)}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>
            {t(($) => $.layouts.public.menu.tests)}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="https://github.com/GiromettaMarco/thirteen/actions/workflows/tests.yml">
                    <div className="font-medium">
                      {t(($) => $.layouts.public.menu.http.title)}
                    </div>
                    <div className="text-muted-foreground">
                      {t(($) => $.layouts.public.menu.http.description)}
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">
                      {t(($) => $.layouts.public.menu.e2e.title)}
                    </div>
                    <div className="text-muted-foreground">
                      {t(($) => $.layouts.public.menu.e2e.description)}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

//#region Layout
export default function PublicLayout({ children }: PropsWithChildren) {
  // i18n
  const { t } = useTranslation()

  // Mobile menu state
  const [open, setOpen] = useState(false)

  // Prevent scroll when the mobile menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('overflow-hidden', open)
    }
  }, [open])

  // Close the mobile menu when switching to desktop size
  useEffect(() => {
    function closeIfDesktop() {
      if (window.innerWidth >= PUBLIC_MOBILE_MENU_BREAKPOINT) {
        setOpen(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', closeIfDesktop)
      return () => window.removeEventListener('resize', closeIfDesktop)
    }
  }, [])

  return (
    <>
      <MobileMenu
        open={open}
        setOpen={setOpen}
      />

      <div
        className={cn(
          'flex max-w-screen flex-col overflow-x-hidden backdrop-blur-none transition-[background] duration-500',
          { 'blur-lg': open }
        )}
        onClick={() => {
          if (open) {
            setOpen(false)
          }
        }}
      >
        <header className="h-14">
          <div className="fixed top-0 z-10 w-full border-b border-dashed bg-background/60 backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between gap-8 border-x border-dashed px-4 sm:px-6">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex-initial lg:hidden">
                  <Button
                    id="open-mobile-menu"
                    onClick={() => setOpen(true)}
                    variant="ghost"
                  >
                    <Menu />
                    <span className="sr-only">{t(($) => $.openMenu)}</span>
                  </Button>
                </div>

                <Link href={home()}>
                  <BrandAndLogo
                    brandClassName="size-10"
                    className="flex flex-initial items-center gap-4 pe-2"
                  />
                </Link>

                <div className="grow" />
              </div>

              <div className="hidden grow justify-center lg:flex">
                <PublicMenu />
              </div>

              <div className="flex flex-1 items-center justify-end gap-4">
                <LanguageSelector variant="ghost" />

                <AppearanceSelector variant="ghost" />

                <Tooltip>
                  <TooltipTrigger className="hidden lg:block">
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                    >
                      <Link href={dashboard()}>
                        <UserRound />
                        <span className="sr-only">{t(($) => $.dashboard)}</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{t(($) => $.dashboard)}</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        <main className="border-b border-dashed">
          <div className="container mx-auto min-h-[calc(100dvh-7rem-2px)] border-x border-dashed p-4 sm:p-6">
            {children}
          </div>
        </main>

        <footer className="flex w-full flex-col">
          <div className="w-full border-t border-dashed">
            <div className="container mx-auto flex h-14 items-center justify-between gap-8 border-x border-dashed px-4 text-sm sm:px-6">
              <a
                href="https://github.com/GiromettaMarco"
                rel="noreferrer"
                target="_blank"
              >
                <GitHub className="size-7" />
              </a>

              <a
                className="hover:underline"
                href="https://github.com/GiromettaMarco/thirteen/blob/master/LICENSE.md"
                rel="noreferrer"
                target="_blank"
              >
                © 2025 Marco Girometta
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
