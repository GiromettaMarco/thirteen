import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { FieldErrorI18n } from '@/components/ui/field-i18n'
import { Input } from '@/components/ui/input'
import { useTsvResolver, type InferSchema } from '@/lib/tsv/hookform'
import type { Schema } from '@/lib/tsv/schema'
import type { Ruleset } from '@/lib/tsv/types'
import { cn } from '@/lib/utils'
import type { RouteDefinition } from '@/wayfinder'
import { useForm as useInertiaForm } from '@inertiajs/react'
import type {
  ComponentProps,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute
} from 'react'
import { useEffect, type ReactNode } from 'react'
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form'
import {
  Controller,
  useForm as userReactForm,
  type Control,
  type FieldPath
} from 'react-hook-form'

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

type RenderFN<TValues extends FieldValues> = ({
  form,
  loading
}: {
  form: UseFormReturn<TValues>
  loading: boolean
}) => ReactNode

export function Form<
  TRuleset extends Ruleset,
  TSchema extends Schema<TRuleset>,
  TValues extends InferSchema<TSchema>
>({
  children,
  className,
  defaults,
  route,
  schema
}: {
  children: RenderFN<TValues>
  className?: string
  defaults: DefaultValues<TValues>
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
}) {
  // React Hook Form
  const reactForm = userReactForm<TValues>({
    resolver: useTsvResolver(schema),
    defaultValues: defaults
  })

  // Inertia
  const inertiaForm = useInertiaForm<object>(defaults)

  // Submit handler
  async function onSubmit(values: TValues) {
    inertiaForm.transform(() => values)
    inertiaForm[route.method](route.url)
  }

  // Add inertia (server) errors to react form.
  useEffect(() => {
    for (const [key, error] of Object.entries(inertiaForm.errors)) {
      if (error) {
        reactForm.setError(key as Path<TValues>, {
          type: 'inertia',
          message: error as string
        })
      }
    }
  }, [inertiaForm.errors, reactForm])

  return (
    <form
      action={route.url}
      className={cn('grid gap-6', className)}
      method={route.method}
      onSubmit={reactForm.handleSubmit(onSubmit)}
    >
      {children({
        form: reactForm,
        loading: inertiaForm.processing
      })}
    </form>
  )
}

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

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'on',
  type = 'text',
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

export default function PasswordField<
  TFieldValues extends FieldValues = FieldValues
>({
  autoComplete = 'off',
  type = 'password',
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
