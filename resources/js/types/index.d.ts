export type Appearance = 'dark' | 'light' | 'system'

export type Theme = 'dark' | 'light'

export type Locale = 'en' | 'it'

export interface UsersPermissions {
  edit: boolean
  view: boolean
}

export interface Permissions {
  users: UsersPermissions
}

export interface Profile {
  name: string
  public: boolean
}

export interface User {
  avatar?: string
  created_at: string
  email: string
  email_verified_at: string | null
  id: number
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
}

export interface Auth<TWithUser extends boolean = false> {
  passwordConfirmedAt: number | null
  permissions: Permissions
  profile: TWithUser extends true ? Profile : Profile | null
  user: TWithUser extends true ? User : User | null
}

export interface FlashMessage {
  title: string
  description?: string | null
  level?: 'success' | 'info' | 'warning' | 'error' | null
}

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
