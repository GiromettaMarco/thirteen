import type { Schema } from '@/lib/tsv/schema'
import type { Ruleset, SanitizedValues, SchemaValues } from '@/lib/tsv/types'
import {
  type Field,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type InternalFieldName,
  type Ref,
  type Resolver,
  type ResolverError,
  type ResolverOptions,
  type ResolverSuccess,
  get,
  set
} from 'react-hook-form'

const setCustomValidity = (
  ref: Ref,
  fieldPath: string,
  errors: FieldErrors
) => {
  if (ref && 'reportValidity' in ref) {
    const error = get(errors, fieldPath) as FieldError | undefined
    ref.setCustomValidity((error && error.message) || '')

    ref.reportValidity()
  }
}

// Native validation (web only)
export const validateFieldsNatively = <TFieldValues extends FieldValues>(
  errors: FieldErrors,
  options: ResolverOptions<TFieldValues>
): void => {
  for (const fieldPath in options.fields) {
    const field = options.fields[fieldPath]
    if (field && field.ref && 'reportValidity' in field.ref) {
      setCustomValidity(field.ref, fieldPath, errors)
    } else if (field && field.refs) {
      field.refs.forEach((ref: HTMLInputElement) =>
        setCustomValidity(ref, fieldPath, errors)
      )
    }
  }
}

export const toNestErrors = <TFieldValues extends FieldValues>(
  errors: FieldErrors,
  options: ResolverOptions<TFieldValues>
): FieldErrors<TFieldValues> => {
  if (options.shouldUseNativeValidation) {
    validateFieldsNatively(errors, options)
  }

  const fieldErrors = {} as FieldErrors<TFieldValues>
  for (const path in errors) {
    const field = get(options.fields, path) as Field['_f'] | undefined
    const error = Object.assign(errors[path] || {}, {
      ref: field && field.ref
    })

    if (isNameInFieldArray(options.names || Object.keys(errors), path)) {
      const fieldArrayErrors = Object.assign({}, get(fieldErrors, path))

      set(fieldArrayErrors, 'root', error)
      set(fieldErrors, path, fieldArrayErrors)
    } else {
      set(fieldErrors, path, error)
    }
  }

  return fieldErrors
}

const isNameInFieldArray = (
  names: InternalFieldName[],
  name: InternalFieldName
) => {
  const path = escapeBrackets(name)
  return names.some((n) => escapeBrackets(n).match(`^${path}\\.\\d+`))
}

/**
 * Escapes special characters in a string to be used in a regex pattern.
 * it removes the brackets from the string to match the `set` method.
 *
 * @param input - The input string to escape.
 * @returns The escaped string.
 */
function escapeBrackets(input: string): string {
  return input.replace(/\]|\[/g, '')
}

/**
 * Produce a resolver function for react hook form.
 */
export function useTsvResolver<
  R extends Ruleset,
  Input extends SchemaValues<R>,
  Context,
  Output
>(schema: Schema<R>): Resolver<Input, Context, Input | Output> {
  // Resolver
  return (values: Input, context: unknown, options: ResolverOptions<Input>) => {
    const { errors, sanitized, success } = schema.validate(values)

    if (success) {
      return {
        values: sanitized as Output,
        errors: {}
      } satisfies ResolverSuccess<Output>
    }

    return {
      values: {},
      errors: toNestErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, message]) => [
            key,
            {
              message: message.text,
              params: message.params,
              type: 'tsv'
            }
          ])
        ),
        options
      )
    } satisfies ResolverError<Input>
  }
}

/**
 * Infer sanitized and validated data type from schema.
 */
export type InferSchema<T> =
  T extends Schema<infer R> ? SanitizedValues<R> : never
