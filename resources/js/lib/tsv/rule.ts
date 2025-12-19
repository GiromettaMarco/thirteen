import { TsvMessage } from '@/lib/tsv/message'

//======================================================================
//#region BASIC RULE
//======================================================================

/**
 * Validation rule base class.
 */
export abstract class BasicRule<S = unknown> {
  /**
   * Manipulate value before testing.
   */
  sanitize?(value: unknown): unknown

  /**
   * Validation function.
   *
   * @returns `true` if the validation is passed or a `Message` object in case of error.
   */
  abstract test(value: unknown): true | TsvMessage

  /**
   * Sanitize and validate the value with error messages.
   */
  validate(value: unknown) {
    // Sanitize
    const sanitized = this.sanitize ? this.sanitize(value) : value

    // Test
    const message = this.test(sanitized)

    // Success
    if (message === true) {
      return {
        sanitized: sanitized as S,
        success: true as const
      }
    }

    // Error
    return {
      message,
      success: false as const
    }
  }
}

//======================================================================
//#region ADVANCED RULE
//======================================================================

export type ParseEmpty = 'null' | 'string' | 'unchanged' | 'undefined'

export type AdvSanitized<
  T,
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> = O extends true
  ? PE extends 'undefined'
    ? T | undefined
    : PE extends 'null'
      ? T | null
      : PE extends 'string'
        ? T | ''
        : T | undefined | null
  : T

export interface AdvRuleOptions<
  M extends object,
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> {
  /**
   * Error messages.
   */
  messages?: Partial<M>

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional?: O

  /**
   * Convert `null`, `undefined` and empty strings.
   *
   * @defaultValue `"string"`
   */
  parseEmpty?: PE
}

/**
 * Preset class for advanced validation rules.
 */
export abstract class AdvRule<
  S,
  M extends object,
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends BasicRule<AdvSanitized<S, O, PE>> {
  /**
   * Error messages.
   */
  abstract messages: M

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional: boolean

  /**
   * Convert null, undefined and empty strings.
   *
   * @defaultValue `"string"`
   */
  parseEmpty: ParseEmpty

  constructor(options?: AdvRuleOptions<M, O, PE>) {
    super()

    this.optional = !!options?.optional

    this.parseEmpty = options?.parseEmpty ?? 'string'
  }

  sanitize(value: unknown) {
    // Trim string
    const parsedValue = typeof value === 'string' ? value.trim() : value

    // Parse empty
    if (
      parsedValue === null ||
      parsedValue === undefined ||
      parsedValue === ''
    ) {
      switch (this.parseEmpty) {
        case 'null':
          return null

        case 'string':
          return ''

        case 'undefined':
          return undefined

        default:
          return parsedValue
      }
    }

    // Unknown
    return parsedValue
  }
}
