import { EmailField, PasswordField, TextField } from '@gmcode/forms'
import type { Control, FieldPath } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function NameFieldPreset<TFieldValues extends { name: string }>({
  control,
  placeholder = true
}: {
  control: Control<TFieldValues>
  placeholder?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <TextField
      control={control}
      inputId="name"
      inputName={'name' as FieldPath<TFieldValues>}
      label={t(($) => $.name)}
      placeholder={placeholder ? t(($) => $.fullName) : undefined}
    />
  )
}

export function EmailFieldPreset<TFieldValues extends { email: string }>({
  control,
  placeholder = true
}: {
  control: Control<TFieldValues>
  placeholder?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <EmailField
      control={control}
      inputId="email"
      inputName={'email' as FieldPath<TFieldValues>}
      label={t(($) => $.emailAddress)}
      placeholder={placeholder ? 'email@example.com' : undefined}
    />
  )
}

export function PasswordFieldPreset<TFieldValues extends { password: string }>({
  control,
  placeholder = true
}: {
  control: Control<TFieldValues>
  placeholder?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <PasswordField
      control={control}
      inputId="password"
      inputName={'password' as FieldPath<TFieldValues>}
      label={t(($) => $.auth.password)}
      placeholder={placeholder ? t(($) => $.auth.password) : undefined}
    />
  )
}

export function ConfirmPasswordFieldPreset<
  TFieldValues extends { password_confirmation: string }
>({
  control,
  placeholder = true
}: {
  control: Control<TFieldValues>
  placeholder?: boolean
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <PasswordField
      control={control}
      inputId="confirm-password"
      inputName={'password_confirmation' as FieldPath<TFieldValues>}
      label={t(($) => $.auth.confirmPassword)}
      placeholder={placeholder ? t(($) => $.auth.confirmPassword) : undefined}
    />
  )
}
