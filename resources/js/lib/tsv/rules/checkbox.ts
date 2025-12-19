import { BoolRule } from '@/lib/tsv/rules/bool'

/**
 * Parse value as a boolean.
 *
 * `"false"` will be parsed as `false`.
 */
export class CheckboxRule extends BoolRule {
  sanitize(value: unknown) {
    // "false" string
    if (value === 'false') {
      return false
    }

    // Cast to boolean
    return !!value
  }
}
