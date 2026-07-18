const API_BASE_URL = 'http://localhost:8080'

export type AccountType = 'donor' | 'employee' | 'partner'

type RegisterPayload = {
  email: string
  password: string
  accountType: AccountType
  organization?: string
}

type LoginPayload = {
  email: string
  password: string
}

async function postJson(path: string, payload: unknown) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.error ?? 'Something went wrong. Please try again.')
  }

  return body
}

export function register(payload: RegisterPayload) {
  return postJson('/register', payload)
}

export function login(payload: LoginPayload) {
  return postJson('/login', payload)
}
