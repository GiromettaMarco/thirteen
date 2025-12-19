export interface TsvMessageParams {
  [key: string]: number | string
}

export class TsvMessage {
  /**
   * The message text. Usually a translation key.
   */
  text: string

  /**
   * Parameters for a translation function.
   */
  params?: TsvMessageParams

  constructor(text: string, params?: TsvMessageParams) {
    this.text = text
    this.params = params
  }
}

export type TsvTranslator = (message: TsvMessage) => string
