import { Breadcrumbs, type BreadcrumbLink } from '@/components/breadcrumbs'
import { Logo } from '@/components/ui/brand'
import { GitHub } from '@/components/ui/brand-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { UserInfo } from '@/components/ui/user-info'
import { cn } from '@/lib/utils'
import { dashboard, home, logout, settings } from '@/routes'
import { edit as accountEdit } from '@/routes/account'
import { index as invitationsIndex } from '@/routes/invitations'
import { index as projectsIndex } from '@/routes/projects'
import { index as teamsIndex, show as teamsShow } from '@/routes/teams'
import type { Permissions } from '@/types'
import type { RouteDefinition } from '@/wayfinder'
import { Link, usePage } from '@inertiajs/react'
import {
  CircleUser,
  Folder,
  Gauge,
  HelpCircle,
  Home,
  LogOut,
  Mail,
  Settings,
  UserRound,
  Users,
  UserStar
} from 'lucide-react'
import type {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  SVGProps
} from 'react'
import { useTranslation } from 'react-i18next'

//#region SidebarItem
function SidebarItem({
  active = false,
  Icon,
  href,
  label
}: {
  active?: boolean
  Icon: FC<SVGProps<SVGSVGElement>>
  href: RouteDefinition<'get'>
  label: string
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn({ 'bg-accent': active })}
        tooltip={label}
      >
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
//#endregion

//#region Navigation
function Navigation({
  currentTeamId,
  permissions
}: {
  currentTeamId: number | null
  permissions: Permissions
}) {
  // i18n
  const { t } = useTranslation()

  // Current url
  const { url } = usePage()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarItem
              active={url === dashboard.url()}
              Icon={Gauge}
              href={dashboard()}
              label={t(($) => $.dashboard)}
            />

            {/* @TODO add no current team fallback (projects page) */}

            {currentTeamId && (
              <>
                <SidebarItem
                  active={url === projectsIndex.url({ team: currentTeamId })}
                  Icon={Folder}
                  href={projectsIndex({ team: currentTeamId })}
                  label={t(($) => $.project, { count: 2 })}
                />

                <SidebarItem
                  active={url === teamsShow.url({ team: currentTeamId })}
                  Icon={Users}
                  href={teamsShow({ team: currentTeamId })}
                  label={t(($) => $.team, { count: 2 })}
                />
              </>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>{t(($) => $.management)}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarItem
            active={url === teamsIndex.url()}
            Icon={UserStar}
            href={teamsIndex()}
            label={t(($) => $.team, { count: 2 })}
          />

          {permissions.users.edit && (
            <SidebarItem
              active={url === invitationsIndex.url()}
              Icon={Mail}
              href={invitationsIndex()}
              label={t(($) => $.invitation, { count: 2 })}
            />
          )}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarItem
              active={url === settings.url()}
              Icon={Settings}
              href={settings()}
              label={t(($) => $.settings)}
            />

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="https://github.com/GiromettaMarco/thirteen/issues"
                  rel="noreferrer"
                  target="_blank"
                >
                  <HelpCircle />
                  <span>{t(($) => $.help)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
//#endregion

//#region ProfileDropdown
function ProfileDropdown({
  avatar,
  email,
  // id,
  name
}: {
  avatar?: string
  email: string
  id: number
  name: string
}) {
  // i18n
  const { t } = useTranslation()

  // Sidebar state
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <UserInfo
                avatar={avatar}
                className="w-full"
                dots={true}
                email={email}
                name={name}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UserInfo
                avatar={avatar}
                className="px-1"
                email={email}
                name={name}
              />
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link href={accountEdit()}>
                  <CircleUser />
                  {t(($) => $.account)}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="text-muted-foreground"
              >
                {/* <Link href={route('users.show', { user: id })}> */}
                <Link href="#">
                  <UserRound />
                  {t(($) => $.profile)}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="w-full cursor-pointer"
            >
              <Link href={logout()}>
                <LogOut />
                {t(($) => $.auth.signOut)}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
//#endregion

//#region Layout
export default function DashboardLayout({
  button,
  breadcrumbs = [],
  children,
  title
}: PropsWithChildren<{
  button?: ReactNode
  breadcrumbs?: BreadcrumbLink[]
  title?: string
}>) {
  const { auth, sidebarOpen } = usePage().props

  if (!auth.user) {
    throw new Error('The dashboard layout requires "user" to be set.')
  }

  if (!auth.profile) {
    throw new Error('The dashboard layout requires "profile" to be set.')
  }

  return (
    <SidebarProvider
      defaultOpen={sidebarOpen}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)'
        } as CSSProperties
      }
    >
      <Sidebar
        collapsible="icon"
        variant="inset"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href={home()}>
                  <Home />
                  <Logo className="text-base font-semibold" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <Navigation
            // currentTeamId={auth.user.currentTeamId}
            currentTeamId={null}
            permissions={auth.permissions}
          />
        </SidebarContent>

        <SidebarFooter>
          <ProfileDropdown
            email={auth.user.email}
            id={auth.user.id}
            name={auth.profile.name}
          />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-(--header-height) w-full shrink-0 items-center gap-1 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1 cursor-pointer" />

          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />

          <h1 className="text-base font-medium">{title}</h1>

          <div className="ml-auto flex items-center gap-2">
            {button ?? (
              <Button
                variant="ghost"
                asChild
                size="icon"
                className="hidden sm:flex"
              >
                <a
                  href="https://github.com/GiromettaMarco/thirteen"
                  rel="noreferrer"
                  target="_blank"
                  title="GitHub"
                  className="dark:text-foreground"
                >
                  <GitHub className="size-6" />
                </a>
              </Button>
            )}
          </div>
        </header>

        <Breadcrumbs
          className="mt-1 px-4 lg:px-6"
          links={breadcrumbs}
        />

        <div className="@container/main grid gap-4 py-4 md:gap-6 md:py-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
//#endregion
