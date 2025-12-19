import { InputField } from '@/components/forms/hook-form-fields/input-field'
import type { ComponentProps } from 'react'
import { type FieldValues } from 'react-hook-form'

export function EmailField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'on',
  type = 'email',
  ...props
}: ComponentProps<typeof InputField<TFieldValues>>) {
  return (
    <InputField
      autoComplete={autoComplete}
      type={type}
      {...props}
    />
  )
}
