import {
  type DelayMode,
  type HttpHandler,
  type HttpResponseInit,
  type JsonBodyType,
  HttpResponse,
  delay,
  http
} from 'msw'

function getBody(props: object = {}, flash: object = {}): JsonBodyType {
  return {
    component: 'page',
    flash,
    props,
    sharedProps: [],
    url: '/',
    version: '0'
  }
}

function getInit(status: number = 200): HttpResponseInit {
  return {
    headers: {
      'Content-Type': 'application/json',
      Vary: 'X-Inertia',
      'X-Inertia': 'true'
    },
    status
  }
}

async function makeResponse(options?: {
  duration?: DelayMode | number
  flash?: object
  props?: object
  status?: number
}) {
  await delay(options?.duration ?? 0)

  return HttpResponse.json(
    getBody(options?.props, options?.flash),
    getInit(options?.status)
  )
}

const handlers = [
  http.get('/', async () => makeResponse()),
  http.get('/forgot-password', async () => makeResponse()),
  http.get('/register', async () => makeResponse())
]

export function getHandlers(extra?: HttpHandler | HttpHandler[]) {
  if (extra) {
    if (Array.isArray(extra)) {
      return [...handlers, ...extra]
    }

    return [...handlers, extra]
  }

  return handlers
}

export const loginSuccess = http.post('/login', async () => makeResponse())

export const loginFail = http.post('/login', async () =>
  makeResponse({
    duration: 'real',
    props: {
      errors: {
        root: 'These credentials do not match our records.'
      }
    }
  })
)
