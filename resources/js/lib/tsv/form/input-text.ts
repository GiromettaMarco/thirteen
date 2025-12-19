import {
  InputRule,
  inputRuleMessages,
  type InputRuleOptions
} from '@/lib/tsv/form/input'
import { TsvMessage } from '@/lib/tsv/message'

const defaultMessages = {
  ...inputRuleMessages,
  maxChars: 'maxChars',
  minChars: 'minChars'
}

interface RuleOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `null`
   */
  minChars?: number | null
}

/**
 * Validation for an HTML input text field.
 */
export class InputTextRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `null`
   */
  minChars: number | null

  constructor({
    maxChars = 255,
    messages,
    minChars = null,
    optional
  }: RuleOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.maxChars = maxChars
    this.minChars = minChars
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    // Min chars
    if (this.minChars !== null && value.length < this.minChars) {
      return new TsvMessage(this.messages.minChars, {
        length: value.length,
        min: this.minChars
      })
    }

    // Max chars
    if (this.maxChars !== null && value.length > this.maxChars) {
      return new TsvMessage(this.messages.maxChars, {
        length: value.length,
        max: this.maxChars
      })
    }

    return true
  }
}
