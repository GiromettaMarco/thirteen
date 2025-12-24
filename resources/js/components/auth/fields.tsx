import PasswordField, { EmailField, TextField } from '@/components/form'
import type { Control, FieldPath } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function NameFieldPreset<TFieldValues extends { name: string }>({
  control
}: {
  control: Control<TFieldValues>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <TextField
      control={control}
      inputId="name"
      inputName={'name' as FieldPath<TFieldValues>}
      label={t(($) => $.name)}
      placeholder={t(($) => $.fullName)}
    />
  )
}

export function EmailFieldPreset<TFieldValues extends { email: string }>({
  control
}: {
  control: Control<TFieldValues>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <EmailField
      control={control}
      inputId="email"
      inputName={'email' as FieldPath<TFieldValues>}
      label={t(($) => $.emailAddress)}
      placeholder={'email@example.com'}
    />
  )
}

export function PasswordFieldPreset<TFieldValues extends { password: string }>({
  control
}: {
  control: Control<TFieldValues>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <PasswordField
      control={control}
      inputId="password"
      inputName={'password' as FieldPath<TFieldValues>}
      label={t(($) => $.auth.password)}
      placeholder={t(($) => $.auth.password)}
    />
  )
}

export function ConfirmPasswordFieldPreset<
  TFieldValues extends { password_confirmation: string }
>({ control }: { control: Control<TFieldValues> }) {
  // i18n
  const { t } = useTranslation()

  return (
    <PasswordField
      control={control}
      inputId="confirm-password"
      inputName={'password_confirmation' as FieldPath<TFieldValues>}
      label={t(($) => $.auth.confirmPassword)}
      placeholder={t(($) => $.auth.confirmPassword)}
    />
  )
}
