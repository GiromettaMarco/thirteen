import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { FieldErrorI18n } from '@/components/ui/field-i18n'
import type { ComponentProps } from 'react'
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>({
  control,
  inputId,
  inputName,
  label,
  orientation = 'horizontal',
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
}) {
  return (
    <Controller
      control={control}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Checkbox
            aria-invalid={fieldState.invalid}
            checked={!!field.value}
            disabled={field.disabled}
            id={inputId}
            name={field.name}
            onBlur={field.onBlur}
            onCheckedChange={(checked) =>
              field.onChange(checked === true ? 'true' : '')
            }
            ref={field.ref}
          />

          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          {fieldState.invalid && <FieldErrorI18n errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
