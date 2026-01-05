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

export interface Auth<TWithUser extends boolean = false> {
  permissions: Permissions
  user: TWithUser extends true ? User : User | null
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
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
