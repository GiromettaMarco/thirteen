import { TsvMessage } from '@/lib/tsv/message'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  maxValue: string
  minValue: string
  number: string
  required: string
  integer: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvRuleOptions<Messages, O, PE> {
  /**
   * Maximum value. `null` for no check.
   *
   * @defaultValue `null`
   */
  maxValue?: number | null

  /**
   * Minimum value. `null` for no check.
   *
   * @defaultValue `0`
   */
  minValue?: number | null

  /**
   * If true and tested value is a string, value will be parsed as an integer.
   *
   * @defaultValue `true`
   */
  parseInt?: boolean
}

/**
 * Validate as an integer.
 *
 * May be optional.
 */
export class IntegerRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvRule<number, Messages, O, PE> {
  /**
   * Maximum value. `null` for no check.
   *
   * @defaultValue `null`
   */
  maxValue: number | null

  /**
   * Error messages.
   */
  messages

  /**
   * Minimum value. `null` for no check.
   *
   * @defaultValue `0`
   */
  minValue: number | null

  /**
   * If true and tested value is a string, value will be parsed as an integer.
   *
   * @defaultValue `true`
   */
  parseInt: boolean

  constructor({
    maxValue = null,
    messages,
    minValue = 0,
    optional,
    parseEmpty,
    parseInt = true
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.maxValue = maxValue
    this.minValue = minValue
    this.parseInt = parseInt

    this.messages = Object.assign(
      {
        integer: 'integer',
        maxValue: 'maxValue',
        minValue: 'minValue',
        number: 'number',
        required: 'required'
      },
      messages
    )
  }

  sanitize(value: unknown) {
    // Parent sanitize
    const parsedValue = super.sanitize(value)

    // Parse int
    if (this.parseInt && parsedValue && typeof parsedValue === 'string') {
      return parseInt(parsedValue)
    }

    return parsedValue
  }

  test(value: unknown) {
    // Null, undefined and empty string
    if (value === undefined || value === null || value === '') {
      if (this.optional) {
        return true
      }

      return new TsvMessage(this.messages.required)
    }

    // Not number
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return new TsvMessage(this.messages.number)
    }

    // Min value
    if (this.minValue !== null && value < this.minValue) {
      return new TsvMessage(this.messages.minValue, {
        value: value,
        min: this.minValue
      })
    }

    // Max value
    if (this.maxValue !== null && value > this.maxValue) {
      return new TsvMessage(this.messages.maxValue, {
        value: value,
        max: this.maxValue
      })
    }

    // Not integer
    if (!Number.isInteger(value)) {
      return new TsvMessage(this.messages.integer)
    }

    return true
  }
}
