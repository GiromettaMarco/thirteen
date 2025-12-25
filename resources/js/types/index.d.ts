export type Appearance = 'dark' | 'light' | 'system'

export type Theme = 'dark' | 'light'

export interface Auth<TWithUser extends boolean = false> {
  user: TWithUser extends true ? User : User | null
}

export interface SharedData {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  [key: string]: unknown
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
  description: string | null
  level: 'success' | 'info' | 'warning' | 'error' | null
}
