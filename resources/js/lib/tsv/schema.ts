import type { TsvMessage } from '@/lib/tsv/message'
import type {
  ResultError,
  ResultSuccess,
  Ruleset,
  SanitizedValues,
  SchemaOptions,
  SchemaRule,
  SchemaValues,
  ValidationResult
} from '@/lib/tsv/types'

/**
 * Validation schema
 */
export class Schema<T extends Ruleset> {
  /**
   * Set of validation rules.
   */
  ruleset: T

  /**
   * A set of additional rules, defined at schema level.
   *
   * Executed only if Ruleset validations pass.
   */
  postValidation?: SchemaRule<T>[]

  constructor(ruleset: T, options?: SchemaOptions<T>) {
    this.ruleset = ruleset
    this.postValidation = options?.postValidation
  }

  validate(values: SchemaValues<T> | FormData): ValidationResult<T> {
    // Init
    let success = true
    const sanitized: Record<string, unknown> = {}
    const errors: Record<string, TsvMessage> = {}

    // Validate ruleset
    for (const [key, rule] of Object.entries(this.ruleset)) {
      const result = rule.validate(
        values instanceof FormData ? values.get(key) : values[key]
      )

      if (result.success) {
        sanitized[key] = result.sanitized
      } else {
        errors[key] = result.message
        success = false
      }
    }

    // Validate postValidation
    if (success && this.postValidation) {
      for (const schemaRule of this.postValidation) {
        const result = schemaRule.callback(sanitized as SanitizedValues<T>)

        if (result !== true) {
          errors[schemaRule.addTo as string] = result
          success = false
        }
      }
    }

    return success
      ? ({ sanitized, success } as ResultSuccess<T>)
      : ({ errors, success } as ResultError<T>)
  }
}
