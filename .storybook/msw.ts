import {
  type HttpHandler,
  type HttpResponseInit,
  type JsonBodyType,
  HttpResponse,
  http
} from 'msw'

function getBody(props: object = {}): JsonBodyType {
  return {
    component: 'page',
    flash: {},
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

const responses = [
  http.get('/', async () => HttpResponse.json(getBody(), getInit())),
  http.get('/forgot-password', async () =>
    HttpResponse.json(getBody(), getInit())
  ),
  http.post('/login', async () => HttpResponse.json(getBody(), getInit())),
  http.get('/register', async () => HttpResponse.json(getBody(), getInit()))
]

export function getResponses(handlers?: HttpHandler[]) {
  if (handlers) {
    return [...responses, ...handlers]
  }

  return responses
}
