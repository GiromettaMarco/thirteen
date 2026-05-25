import { AutoTextarea } from '@/components/ui/auto-textarea'
import { CalendarI18n } from '@/components/ui/calendar-i18n'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import { FieldErrorI18n } from '@/components/ui/field-i18n'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { flashMessage } from '@/lib/flash'
import { useTsvResolver, type InferSchema } from '@/lib/tsv/hookform'
import type { Schema } from '@/lib/tsv/schema'
import type { Ruleset } from '@/lib/tsv/types'
import { cn, formatDateForDB } from '@/lib/utils'
import type { RouteDefinition } from '@/wayfinder'
import type {
  CancelTokenCallback,
  Errors,
  GlobalEventCallback,
  Page,
  RequestPayload,
  SharedPageProps
} from '@inertiajs/core'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { Minus, Plus } from 'lucide-react'
import type { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type {
  ComponentProps,
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  SVGProps
} from 'react'
import { useEffect, type ReactNode } from 'react'
import type {
  DefaultValues,
  FieldValues,
  Path,
  FieldError as RHFFieldError,
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
  defaults = {},
  onBefore,
  onBeforeUpdate,
  onCancel,
  onCancelToken,
  onError,
  onFinish,
  onFlash,
  onPrefetched,
  onPrefetching,
  onProgress,
  onStart,
  onSuccess,
  preserveScroll = true,
  resetOnSuccess = true,
  route,
  schema,
  setDefaultsOnSuccess = false
}: {
  children: RenderFN<TValues>
  className?: string
  defaults?: Partial<DefaultValues<TValues>>
  onBefore?: GlobalEventCallback<'before', RequestPayload>
  onBeforeUpdate?: GlobalEventCallback<'beforeUpdate', RequestPayload>
  onCancel?: GlobalEventCallback<'cancel', RequestPayload>
  onCancelToken?: CancelTokenCallback
  onError?: GlobalEventCallback<'error', RequestPayload>
  onFinish?: GlobalEventCallback<'finish', RequestPayload>
  onFlash?: GlobalEventCallback<'flash', RequestPayload>
  onPrefetched?: GlobalEventCallback<'prefetched', RequestPayload>
  onPrefetching?: GlobalEventCallback<'prefetching', RequestPayload>
  onProgress?: GlobalEventCallback<'progress', RequestPayload>
  onStart?: GlobalEventCallback<'start', RequestPayload>
  onSuccess?: GlobalEventCallback<'success', RequestPayload>
  preserveScroll?: boolean
  resetOnSuccess?: boolean
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
  setDefaultsOnSuccess?: boolean
}) {
  const defaultValues = Object.fromEntries(
    Object.keys(schema.ruleset).map((field) => [field, defaults[field] ?? ''])
  ) as DefaultValues<TValues>

  // React Hook Form
  const reactForm = userReactForm<TValues>({
    resolver: useTsvResolver(schema),
    defaultValues
  })

  // Inertia
  const inertiaForm = useInertiaForm<object>(defaultValues)

  /**
   * Add a toast notification for root level errors.
   *
   * @param errors
   */
  function onErrorWithToast(errors: Errors) {
    if (errors.root) {
      flashMessage({ title: errors.root, level: 'error' })
    }

    if (onError) {
      onError(errors)
    }
  }

  function onSuccessWithReset(page: Page<SharedPageProps>) {
    if (setDefaultsOnSuccess) {
      inertiaForm.setDefaults()
      reactForm.reset(reactForm.getValues())
    }

    if (resetOnSuccess) {
      inertiaForm.reset()
      reactForm.reset()
    }

    if (onSuccess) {
      onSuccess(page)
    }
  }

  // Submit handler
  function onSubmit(values: TValues) {
    inertiaForm.transform(() => values)
    inertiaForm[route.method](route.url, {
      onBefore,
      onBeforeUpdate,
      onCancel,
      onCancelToken,
      onError: onErrorWithToast,
      onFinish,
      onFlash,
      onPrefetched,
      onPrefetching,
      onProgress,
      onStart,
      onSuccess: onSuccessWithReset,
      preserveScroll
    })
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

export function ErrorMonitor({ error }: { error?: RHFFieldError }) {
  if (!error) {
    return null
  }

  if (error.type === 'tsv') {
    return <FieldErrorI18n errors={[error]} />
  }

  return <FieldError errors={[error]} />
}

export function InputField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  disabled,
  inputId,
  inputName,
  label,
  placeholder,
  type,
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
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

          <ErrorMonitor error={fieldState.error} />
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

export function PasswordField<TFieldValues extends FieldValues = FieldValues>({
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

export function HiddenField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete = 'off',
  className,
  type = 'hidden',
  ...props
}: ComponentProps<typeof InputField<TFieldValues>>) {
  return (
    <InputField
      autoComplete={autoComplete}
      className={cn('hidden', className)}
      type={type}
      {...props}
    />
  )
}

export function NumericField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  disabled,
  inputId,
  inputName,
  label,
  onMinusClick,
  onPlusClick,
  placeholder,
  type,
  ui = true,
  uiMinus = 'Decrease',
  uiPlus = 'Increase',
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onMinusClick?: (value: string) => void
  onPlusClick?: (value: string) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
  ui?: boolean
  uiMinus?: string
  uiPlus?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <InputGroup>
            <InputGroupInput
              aria-invalid={fieldState.invalid}
              autoComplete={autoComplete}
              id={inputId}
              inputMode="numeric"
              placeholder={placeholder}
              type={type}
              {...field}
            />

            {ui && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => onMinusClick && onMinusClick(field.value)}
                  size="icon-xs"
                >
                  <Minus />
                  <span className="sr-only">{uiMinus}</span>
                </InputGroupButton>

                <InputGroupButton
                  onClick={() => onPlusClick && onPlusClick(field.value)}
                  size="icon-xs"
                >
                  <Plus />
                  <span className="sr-only">{uiPlus}</span>
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

export function CheckboxField<TFieldValues extends FieldValues = FieldValues>({
  'aria-readonly': ariaReadonly,
  className,
  control,
  disabled,
  inputId,
  inputName,
  label,
  onCheckedChange,
  orientation = 'horizontal',
  readonly,
  uncheckedValue = '',
  value = 'true',
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  readonly?: boolean
  uncheckedValue?: string
  value?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          aria-readonly={readonly || ariaReadonly}
          className={cn('aria-readonly:opacity-50', className)}
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Checkbox
            aria-invalid={fieldState.invalid}
            checked={field.value === value}
            disabled={field.disabled}
            id={inputId}
            name={field.name}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => {
              if (!readonly) {
                field.onChange(checked === true ? value : uncheckedValue)

                if (onCheckedChange) {
                  onCheckedChange(checked)
                }
              }
            }}
            ref={field.ref}
            value={value}
          />

          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

export function InfoCheckboxField<
  TFieldValues extends FieldValues = FieldValues
>({
  'aria-readonly': ariaReadonly,
  className,
  control,
  disabled,
  inputId,
  inputName,
  label,
  onCheckedChange,
  orientation = 'horizontal',
  readonly,
  text,
  uncheckedValue = '',
  value = 'true',
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  readonly?: boolean
  text?: string
  uncheckedValue?: string
  value?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          aria-readonly={readonly || ariaReadonly}
          className={cn('block aria-readonly:opacity-50', className)}
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Label
            className="hover:bg-accent/50 has-aria-checked:border-info-foreground has-aria-checked:bg-info flex items-start gap-3 rounded-lg border p-3"
            data-slot="field-label"
          >
            <Checkbox
              aria-invalid={fieldState.invalid}
              checked={field.value === value}
              className="data-[state=checked]:border-info-foreground data-[state=checked]:bg-info-foreground dark:data-[state=checked]:border-info-foreground dark:data-[state=checked]:bg-info-foreground data-[state=checked]:text-white"
              disabled={field.disabled}
              id={inputId}
              name={field.name}
              onBlur={field.onBlur}
              onCheckedChange={(checked) => {
                if (!readonly) {
                  field.onChange(checked === true ? value : uncheckedValue)

                  if (onCheckedChange) {
                    onCheckedChange(checked)
                  }
                }
              }}
              ref={field.ref}
              value={value}
            />

            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{label}</p>

              <p className="text-muted-foreground text-sm">{text}</p>

              <ErrorMonitor error={fieldState.error} />
            </div>
          </Label>
        </Field>
      )}
    />
  )
}

export function SwitchField<TFieldValues extends FieldValues = FieldValues>({
  'aria-readonly': ariaReadonly,
  className,
  control,
  disabled,
  inputId,
  inputName,
  label,
  onCheckedChange,
  orientation = 'horizontal',
  readonly,
  uncheckedValue = '',
  value = 'true',
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void
  readonly?: boolean
  uncheckedValue?: string
  value?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          aria-readonly={readonly || ariaReadonly}
          className={cn('aria-readonly:opacity-50', className)}
          data-invalid={fieldState.invalid}
          orientation={orientation}
          {...props}
        >
          <Switch
            aria-invalid={fieldState.invalid}
            checked={field.value === value}
            disabled={field.disabled}
            id={inputId}
            name={field.name}
            onBlur={field.onBlur}
            onCheckedChange={(checked) => {
              if (!readonly) {
                field.onChange(checked === true ? value : uncheckedValue)

                if (onCheckedChange) {
                  onCheckedChange(checked)
                }
              }
            }}
            ref={field.ref}
            value={value}
          />

          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

export function FancyRadioField<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  defaultValue,
  description,
  disabled,
  groupId,
  inputName,
  items,
  label,
  ...props
}: ComponentProps<typeof FieldSet> & {
  control: Control<TFieldValues>
  defaultValue: string
  description?: string
  disabled?: boolean
  groupId?: string
  inputName: FieldPath<TFieldValues>
  items: Array<{
    Icon?: FC<SVGProps<SVGSVGElement>>
    id?: string
    label: string
    value: string
  }>
  label?: string
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <FieldSet
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={groupId}>{label}</FieldLabel>}

          {description && <FieldDescription>{description}</FieldDescription>}

          <ErrorMonitor error={fieldState.error} />

          <RadioGroup
            defaultValue={defaultValue}
            disabled={field.disabled}
            id={groupId}
            name={inputName}
            onBlur={field.onBlur}
            onValueChange={(value) => field.onChange(value)}
            ref={field.ref}
          >
            {items.map((item) => (
              <Label
                className="hover:bg-accent/50 ring-ring/50 rounded-md border transition-all has-focus-visible:ring-[3px]"
                data-slot="field-label"
                key={item.value + item.id}
              >
                <div className="has-aria-checked:border-ring flex w-full items-center gap-3 rounded-md p-3 transition-all has-aria-checked:border-l-8">
                  <RadioGroupItem
                    className="sr-only"
                    id={item.id}
                    value={item.value}
                  />
                  {item.Icon && <item.Icon />}
                  <span>{item.label}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </FieldSet>
      )}
    />
  )
}

interface SelectOption {
  key?: string | number
  label: ReactNode
  value: string
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  autoComplete,
  control,
  description,
  disabled,
  inputId,
  inputName,
  label,
  options,
  placeholder,
  ...props
}: ComponentProps<typeof Field> & {
  autoComplete?: HTMLInputAutoCompleteAttribute
  control: Control<TFieldValues>
  description?: string
  disabled?: boolean
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  options: SelectOption[]
  placeholder?: string
  type?: HTMLInputTypeAttribute
}) {
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={inputName}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <Select
            autoComplete={autoComplete}
            disabled={field.disabled}
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger
              aria-invalid={fieldState.invalid}
              id={inputId}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.key ?? option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {description && <FieldDescription>{description}</FieldDescription>}

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

export default function CalendarField<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  inputId,
  inputName,
  label,
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
}) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <CalendarI18n
            aria-invalid={fieldState.invalid}
            className="w-full rounded-md border"
            fixedWeeks={true}
            id={inputId}
            mode="single"
            onSelect={(date) =>
              field.onChange(date ? formatDateForDB(date) : '')
            }
            selected={field.value}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}

export function TextareaField<TFieldValues extends FieldValues = FieldValues>({
  control,
  inputId,
  inputName,
  label,
  placeholder,
  ...props
}: ComponentProps<typeof Field> & {
  control: Control<TFieldValues>
  inputId?: string
  inputName: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
}) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          {...props}
        >
          {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

          <AutoTextarea
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            className="resize-none"
            id={inputId}
            placeholder={placeholder}
            {...field}
          />

          <ErrorMonitor error={fieldState.error} />
        </Field>
      )}
    />
  )
}
