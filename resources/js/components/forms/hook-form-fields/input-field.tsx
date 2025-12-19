import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { FieldErrorI18n } from '@/components/ui/field-i18n'
import { Input } from '@/components/ui/input'
import type {
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'

export function InputField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  inputId,
  inputName,
  label,
  placeholder,
  type,
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}) {
  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <Input
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            id={inputId}
            placeholder={placeholder}
            type={type}
            {...field}
          />

          {fieldState.error &&
            (fieldState.error.type === 'tsv' ? (
              <FieldErrorI18n errors={[fieldState.error]} />
            ) : (
              <FieldError errors={[fieldState.error]} />
            ))}
        </Field>
      )}
    />
  )
}
