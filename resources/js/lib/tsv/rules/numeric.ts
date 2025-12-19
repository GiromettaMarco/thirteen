import { TsvMessage } from '@/lib/tsv/message'
import { floatRegex, integerRegex } from '@/lib/tsv/regex'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  integer: string
  maxValue: string
  minValue: string
  numeric: string
  required: string
  string: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvRuleOptions<Messages, O, PE> {
  /**
   * If true, the value must represent an integer.
   *
   * @defaultValue `true`
   */
  integer?: boolean

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
}

/**
 * Validate as a string representing a number.
 *
 * May be optional.
 */
export class NumericRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvRule<string, Messages, O, PE> {
  /**
   * If true, the value must represent an integer.
   *
   * @defaultValue `true`
   */
  integer: boolean

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

  constructor({
    integer = true,
    maxValue = null,
    messages,
    minValue = 0,
    optional,
    parseEmpty
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.integer = integer
    this.maxValue = maxValue
    this.minValue = minValue

    this.messages = Object.assign(
      {
        integer: 'integer',
        maxValue: 'maxValue',
        minValue: 'minValue',
        numeric: 'numeric',
        required: 'required',
        string: 'string'
      },
      messages
    )
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new TsvMessage(this.messages.required)
    }

    // Not string
    if (typeof value !== 'string') {
      return new TsvMessage(this.messages.string)
    }

    // Numeric (integer or float)
    if (this.integer) {
      if (!integerRegex.test(value)) {
        return new TsvMessage(this.messages.integer)
      }
    } else {
      if (!floatRegex.test(value)) {
        return new TsvMessage(this.messages.numeric)
      }
    }

    // Min value
    if (this.minValue !== null && Number(value) < this.minValue) {
      return new TsvMessage(this.messages.minValue, {
        value: value,
        min: this.minValue
      })
    }

    // Max value
    if (this.maxValue !== null && Number(value) > this.maxValue) {
      return new TsvMessage(this.messages.maxValue, {
        value: value,
        max: this.maxValue
      })
    }

    return true
  }
}
