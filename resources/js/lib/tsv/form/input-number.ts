import {
  InputRule,
  inputRuleMessages,
  type InputRuleOptions
} from '@/lib/tsv/form/input'
import { TsvMessage } from '@/lib/tsv/message'

const defaultMessages = {
  ...inputRuleMessages,
  integer: 'integer',
  maxValue: 'maxValue',
  minValue: 'minValue',
  number: 'number'
}

interface RuleOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * If true, value must be an integer.
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
 * Validation for an HTML input number field.
 */
export class InputNumberRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * If true, value must be an integer.
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
  messages: typeof defaultMessages

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
    optional
  }: RuleOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.integer = integer
    this.maxValue = maxValue
    this.minValue = minValue
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    const number = Number(value)

    // Not number
    if (Number.isNaN(number)) {
      return new TsvMessage(this.messages.number)
    }

    // Min value
    if (this.minValue !== null && number < this.minValue) {
      return new TsvMessage(this.messages.minValue, {
        value: number,
        min: this.minValue
      })
    }

    // Max value
    if (this.maxValue !== null && number > this.maxValue) {
      return new TsvMessage(this.messages.maxValue, {
        value: number,
        max: this.maxValue
      })
    }

    // Not integer
    if (this.integer && !Number.isInteger(number)) {
      return new TsvMessage(this.messages.integer)
    }

    return true
  }
}
