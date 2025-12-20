export interface RequestCookies {
  [key: string]: string | undefined
}

export interface ClientCookies {
  [key: string]: string | undefined
}

export function parseRequestCookie(
  cookieString: string | null
): RequestCookies {
  if (!cookieString) {
    return {}
  }

  const requestCookies: RequestCookies = {}

  const pairs = cookieString.split('; ')

  pairs.forEach((pair) => {
    const [name, value] = pair.split('=')

    if (value !== undefined) {
      requestCookies[name] = value
    }
  })

  return requestCookies
}

export function extractCookies(request: Request): RequestCookies {
  return parseRequestCookie(request.headers.get('cookie'))
}

/**
 * Extract a ResponseInit with 'set-cookie' defined from a Response object.
 *
 * @param response
 * @returns
 */
export function extractSetCookie(response: Response): ResponseInit | undefined {
  const setCookies = response.headers.getSetCookie()

  if (!setCookies) {
    return undefined
  }

  const headers: [string, string][] = []

  setCookies.forEach((setCookie) => {
    headers.push(['Set-Cookie', setCookie])
  })

  return { headers: new Headers(headers) }
}

/**
 * Transform a cookie string into an object.
 *
 * @param cookie Cookie string obtained with document.cookie
 * @returns
 */
export function parseClientCookies(cookie: string | null): ClientCookies {
  if (!cookie) {
    return {}
  }

  const clientCookies: ClientCookies = {}

  const pairs = cookie.split('; ')

  pairs.forEach((pair) => {
    const [name, value] = pair.split('=')
    clientCookies[name] = value
  })

  return clientCookies
}

/**
 * Set a cookie client-side with default vaues.
 *
 * @param name The cookie name
 * @param value The cookie value
 * @param days Days before expiring (default: 365)
 * @returns The saved cookie string
 */
export function setClientCookie(
  name: string,
  value: string | number | boolean,
  days = 365
): string {
  const maxAge = days * 24 * 60 * 60

  return (document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`)
}

/**
 * Get all cookies saved client-side.
 *
 * @returns Key paired object with cookie names and values
 */
export function getClientCookies(): ClientCookies {
  return parseClientCookies(document.cookie)
}

/**
 * Get a single client-side cookie value.
 *
 * @param name
 * @returns The cookie value or undefined if not found
 */
export function getClientCookie(name: string): string | undefined {
  return getClientCookies()[name]
}

/**
 * Delete a client-side cookie.
 *
 * @param name
 * @returns The string used to delete the cookie
 */
export function deleteClientCookie(name: string): string {
  return setClientCookie(name, '', 0)
}
