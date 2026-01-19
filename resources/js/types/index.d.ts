//#region App
export type Appearance = 'dark' | 'light' | 'system'

export type Theme = 'dark' | 'light'

export type Locale = 'en' | 'it'
//#endregion

//#region Auth/Inertia
export interface UsersPermissions {
  edit: boolean
  view: boolean
}

export interface Permissions {
  users: UsersPermissions
}

export interface AuthUser {
  avatar?: string
  created_at: string
  email: string
  email_verified_at: string | null
  id: number
  name: string
  profile_id: number
  updated_at: string
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
