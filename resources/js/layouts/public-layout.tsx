import { AppearanceSelector } from '@/components/appearance-selector'
import { LanguageSelector } from '@/components/language-selector'
import { BrandAndLogo } from '@/components/ui/brand'
import { Button } from '@/components/ui/button'
import GitHub from '@/components/ui/icons/github'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { dashboard } from '@/routes'
import { Link } from '@inertiajs/react'
import { Circle, CircleCheck, CircleHelp, Menu, X } from 'lucide-react'
import {
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'

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
        'bg-background fixed top-0 left-0 z-20 flex h-full w-96 max-w-full -translate-x-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-e p-8 transition duration-300 lg:hidden',
        { 'translate-0': open }
      )}
    >
      <div className="flex justify-between">
        <BrandAndLogo
          className="flex flex-initial items-center gap-4"
          brandClassName="size-10"
        />

        <Button
          variant="ghost"
          onClick={() => setOpen(false)}
        >
          <X />
        </Button>
      </div>

      <Link
        className="hover:bg-accent text-accent-foreground rounded px-2 py-1"
        href="#"
      >
        Components
      </Link>

      <Link
        className="hover:bg-accent text-accent-foreground rounded px-2 py-1"
        href="#"
      >
        Docs
      </Link>

      <Link
        className="hover:bg-accent text-accent-foreground rounded px-2 py-1"
        href="#"
      >
        List
      </Link>

      <Separator />

      <Link
        className="hover:bg-accent text-accent-foreground rounded px-2 py-1"
        href={dashboard()}
      >
        {t(($) => $.dashboard)}
      </Link>
    </nav>
  )
}
//#endregion

//#region Public Menu
function PublicMenu() {
  // i18n
  const { t } = useTranslation()

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex-wrap">
        {/* Any content */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-100 lg:w-124 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="#"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Introduction
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Installation
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      How to install dependencies and structure your app.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Typography
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Styles for headings, paragraphs, lists...etc
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Two columns list */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-100 md:w-124 md:grid-cols-2 lg:w-148">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Alert Dialog
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      A modal dialog that interrupts the user with important
                      content and expects a response.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Hover Card
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      For sighted users to preview content available behind a
                      link.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Progress
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Displays an indicator showing the completion progress of a
                      task, typically displayed as a progress bar.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Scroll-area
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      Visually or semantically separates content.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">Tabs</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      A set of layered sections of content—known as tab
                      panels—that are displayed one at a time.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="text-sm leading-none font-medium">
                      Tooltip
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      A popup that displays information related to an element
                      when the element receives keyboard focus or the mouse
                      hovers over it.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Single link */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={navigationMenuTriggerStyle()}
          >
            <Link href="#">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* List */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>List</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* With Icon */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="flex-row items-center gap-2"
                  >
                    <CircleHelp />
                    {t(($) => $.statusValue.backlog)}
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="flex-row items-center gap-2"
                  >
                    <Circle />
                    {t(($) => $.statusValue.todo)}
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="flex-row items-center gap-2"
                  >
                    <CircleCheck />
                    {t(($) => $.statusValue.done)}
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
//#endregion

//#region Layout
export default function PublicLayout({ children }: PropsWithChildren) {
  // i18n
  const { t } = useTranslation()

  // Mobile menu state
  const [open, setOpen] = useState(false)

  // Prevent scroll when the mobile menu is open
  useEffect(() => {
    if (typeof document !== undefined) {
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

    if (typeof window !== undefined) {
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
          <div className="bg-background/60 fixed top-0 z-10 w-full border-b border-dashed backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between gap-8 border-x border-dashed px-4 sm:px-6">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex-initial lg:hidden">
                  <Button
                    variant="ghost"
                    onClick={() => setOpen(true)}
                  >
                    <Menu />
                  </Button>
                </div>

                <BrandAndLogo
                  className="flex flex-initial items-center gap-4 pe-2"
                  brandClassName="size-10"
                />

                <div className="grow" />
              </div>

              <div className="hidden grow justify-center lg:flex">
                <PublicMenu />
              </div>

              <div className="flex flex-1 items-end justify-end gap-2">
                <NavigationMenu className="hidden sm:block">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={dashboard()}>{t(($) => $.dashboard)}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <LanguageSelector />

                <AppearanceSelector />
              </div>
            </div>
          </div>
        </header>

        <main className="border-b border-dashed">
          <div className="container mx-auto flex min-h-[calc(100dvh-7rem-2px)] border-x border-dashed p-4 sm:p-6">
            {children}
          </div>
        </main>

        <footer className="flex w-full flex-col">
          <div className="w-full border-t border-dashed">
            <div className="container mx-auto flex h-14 items-center justify-between gap-8 border-x border-dashed px-4 text-sm sm:px-6">
              <a
                className="hover:underline"
                href="https://github.com/GiromettaMarco/Mono/blob/master/LICENSE.md"
                rel="noreferrer"
                target="_blank"
              >
                © 2025 Marco Girometta
              </a>

              <a
                href="https://github.com/GiromettaMarco"
                rel="noreferrer"
                target="_blank"
              >
                <GitHub className="size-7" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
//#endregion
