import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState
} from '@tanstack/react-table'

//#region App
export type Appearance = 'dark' | 'light' | 'system'

export type Theme = 'dark' | 'light'

export type Locale = 'en' | 'it'

export interface WithTimestamps {
  created_at: string
  updated_at: string
}

export interface PasswordReport {
  hasLength: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSymbol: boolean
  hasUppercase: boolean
  level: number
}

export interface AnyItem {
  id: string | number
  name?: string
}

//#region Auth/Inertia
export interface UsersPermissions {
  edit: boolean
  view: boolean
}

export interface AppPermissions {
  users: UsersPermissions
}

export interface AuthUser extends WithTimestamps {
  [key: string]: unknown // This allows for additional properties...
  avatar?: string
  current_team_id: number
  email: string
  email_verified_at: string | null
  id: number
  name: string
  profile_id: number
}

export interface Auth<TWithUser extends boolean = false> {
  password_confirmed_at: number | null
  permissions: AppPermissions
  user: TWithUser extends true ? AuthUser : AuthUser | null
}

export interface FlashMessage {
  description?: string | null
  level?: 'success' | 'info' | 'warning' | 'error' | null
  title: string
}

//#region Dashboard
export interface UserAgent {
  browser: string
  is_desktop: boolean
  platform: string
}

export interface Session {
  agent: UserAgent
  ip_address: string
  is_current_device: boolean
  last_active: string
}

export type ProfileRole = 'guest' | 'developer' | 'designer' | 'manager'

export interface Profile {
  id: number
  name: string
  public: boolean
  role: ProfileRole
  user_id: number
}

export interface Invitation extends WithTimestamps {
  id: number
  user: AuthUser & { profile: Profile }
  user_id: number
}

//#region View
export interface RawView {
  filters: string
  pagination: string
  sorting: string
  visibility: string
}

export interface View {
  filters: ColumnFiltersState
  pagination: PaginationState
  sorting: SortingState
  visibility: VisibilityState
}

export interface ViewStore {
  page: string
  table: string
}

//#region Team
export interface Team extends WithTimestamps {
  id: number
  name: string
}

export interface TeamPermissions {
  admin: boolean
  can_delete: boolean
  can_edit: boolean
  can_edit_members: boolean
  can_edit_projects: boolean
}

export interface WithTeamPermissions {
  pivot: TeamPermissions &
    WithTimestamps & {
      profile_id: number
      team_id: number
    }
}

//#region Project
export interface Project extends WithTimestamps {
  archived: boolean
  deadline: string | null
  description: string | null
  id: number
  name: string
  team_id: number
}

//#region Task
export type TaskLabel = 'bug' | 'documentation' | 'feature'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatus =
  | 'backlog'
  | 'canceled'
  | 'done'
  | 'in_progress'
  | 'todo'

export interface Task extends WithTimestamps {
  description: string | null
  id: number
  label: TaskLabel | null
  name: string
  priority: TaskPriority
  profile_id: number | null
  project_id: number
  status: TaskStatus
}

export interface TaskWithProfile extends Task {
  profile: Profile
}
