import { BasicRule } from '@/lib/tsv/rule'

/**
 * Parse value as a boolean.
 */
export class BoolRule extends BasicRule<boolean> {
  sanitize(value: unknown) {
    // Cast to boolean
    return !!value
  }

  test() {
    return true as const
  }
}
