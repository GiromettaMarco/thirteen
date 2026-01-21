//#region App
export type Appearance = 'dark' | 'light' | 'system'

export type Theme = 'dark' | 'light'

export type Locale = 'en' | 'it'

export interface WithTimestamps {
  created_at: string
  updated_at: string
}
//#endregion

//#region Auth/Inertia
export interface UsersPermissions {
  edit: boolean
  view: boolean
}

export interface Permissions {
  users: UsersPermissions
}

export interface AuthUser extends WithTimestamps {
  avatar?: string
  current_team_id: number
  email: string
  email_verified_at: string | null
  id: number
  name: string
  profile_id: number
  [key: string]: unknown // This allows for additional properties...
}

export interface Auth<TWithUser extends boolean = false> {
  password_confirmed_at: number | null
  permissions: Permissions
  user: TWithUser extends true ? AuthUser : AuthUser | null
}

export interface FlashMessage {
  title: string
  description?: string | null
  level?: 'success' | 'info' | 'warning' | 'error' | null
}
//#endregion

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
//#endregion

//#region Team
export interface Team extends WithTimestamps {
  id: number
  name: string
}

export interface UsersTeam extends Team {
  pivot: {
    can_delete: boolean
    can_edit: boolean
    created_at: string
    team_id: number
    updated_at: string
    user_id: number
  }
}
//#endregion
