import { PasswordFieldPreset } from '@/components/auth/fields'
import { AUTH_PASSWORD_TIMEOUT } from '@/config'
import type { Control } from 'react-hook-form'

function isPasswordExpired(confirmedAt?: number | null): boolean {
  if (!confirmedAt) {
    return true
  }

  return (
    Math.round(new Date().getTime() / 1000) - confirmedAt >
    AUTH_PASSWORD_TIMEOUT
  )
}

export function TimedPassword<TFieldValues extends { password: string }>({
  confirmedAt,
  control,
  placeholder = false
}: {
  confirmedAt?: number | null
  control: Control<TFieldValues>
  placeholder?: boolean
}) {
  if (!isPasswordExpired(confirmedAt)) {
    return null
  }

  return (
    <PasswordFieldPreset
      control={control}
      placeholder={placeholder}
    />
  )
}
