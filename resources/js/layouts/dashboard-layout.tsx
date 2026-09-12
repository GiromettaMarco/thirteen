import { cn, Separator } from '@gmcode/react-ui'
import { Link, usePage } from '@inertiajs/react'
import {
  CircleUser,
  Folder,
  Gauge,
  HelpCircle,
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
import { Breadcrumbs, type BreadcrumbLink } from '@/components/breadcrumbs'
import { Logo } from '@/components/ui/brand'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
import { dashboard, home, logout, settings } from '@/routes'
import { edit as accountEdit } from '@/routes/account'
import { index as invitationsIndex } from '@/routes/invitations'
import { show as profileShow } from '@/routes/profile'
import { index as projectsIndex } from '@/routes/projects'
import { index as teamsIndex, show as teamsShow } from '@/routes/teams'
import type { AppPermissions } from '@/types'
import type { RouteDefinition } from '@/wayfinder'

//#region SidebarItem
function SidebarItem({
  active = false,
  href,
  Icon,
  id,
  label
}: {
  active?: boolean
  href: RouteDefinition<'get'>
  Icon: FC<SVGProps<SVGSVGElement>>
  id?: string
  label: string
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn({ 'bg-accent': active })}
        tooltip={label}
      >
        <Link
          href={href}
          id={id}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

//#region Navigation
function Navigation({
  currentTeamId,
  permissions
}: {
  currentTeamId: number | null
  permissions: AppPermissions
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
              href={dashboard()}
              Icon={Gauge}
              id="to-dashboard"
              label={t(($) => $.dashboard)}
            />
            {currentTeamId && (
              <>
                <SidebarItem
                  active={url === projectsIndex.url({ team: currentTeamId })}
                  href={projectsIndex({ team: currentTeamId })}
                  Icon={Folder}
                  id="to-projects"
                  label={t(($) => $.project, { count: 2 })}
                />

                <SidebarItem
                  active={url === teamsShow.url({ team: currentTeamId })}
                  href={teamsShow({ team: currentTeamId })}
                  Icon={Users}
                  id="to-current-team"
                  label={t(($) => $.team, { count: 1 })}
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
            href={teamsIndex()}
            Icon={UserStar}
            id="to-teams"
            label={t(($) => $.team, { count: 2 })}
          />

          {permissions.users.edit && (
            <SidebarItem
              active={url === invitationsIndex.url()}
              href={invitationsIndex()}
              Icon={Mail}
              id="to-invitations"
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
              href={settings()}
              Icon={Settings}
              id="to-settings"
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

//#region UserDropdown
function UserDropdown({
  avatar,
  email,
  profileId,
  profileName
}: {
  avatar?: string
  email: string
  profileId: number
  profileName: string
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
              aria-label={t(($) => $.userMenu)}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              id="open-user-menu"
              size="lg"
            >
              <UserInfo
                avatar={avatar}
                className="w-full"
                dots={true}
                email={email}
                name={profileName}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UserInfo
                avatar={avatar}
                className="px-1"
                email={email}
                name={profileName}
              />
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link
                  href={accountEdit()}
                  id="to-account"
                >
                  <CircleUser />
                  {t(($) => $.account)}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link
                  href={profileShow(profileId)}
                  id="to-profile"
                >
                  <UserRound />
                  {t(($) => $.profile)}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="w-full"
            >
              <Link
                aria-label={t(($) => $.auth.signOut)}
                href={logout()}
                id="logout"
              >
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

//#region Layout
export default function DashboardLayout({
  breadcrumbs = [],
  button,
  children,
  title
}: PropsWithChildren<{
  breadcrumbs?: BreadcrumbLink[]
  button?: ReactNode
  title?: string
}>) {
  const { auth, sidebarOpen } = usePage().props

  if (!auth.user) {
    throw new Error('The dashboard layout requires "user" to be set.')
  }

  return (
    <SidebarProvider
      defaultOpen={sidebarOpen}
      style={
        {
          '--header-height': 'calc(var(--spacing) * 12)',
          '--sidebar-width': 'calc(var(--spacing) * 72)'
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
                  <Logo className="text-base font-semibold text-brand" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <Navigation
            currentTeamId={auth.user.current_team_id}
            permissions={auth.permissions}
          />
        </SidebarContent>

        <SidebarFooter>
          <UserDropdown
            email={auth.user.email}
            profileId={auth.user.profile_id}
            profileName={auth.user.name}
          />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-(--header-height) w-full shrink-0 items-center gap-1 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />

          <Separator
            className="mx-2 data-[orientation=vertical]:h-4"
            orientation="vertical"
          />

          <h1 className="text-base font-medium">{title}</h1>

          {button && (
            <div className="ml-auto flex items-center gap-2">{button}</div>
          )}
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
