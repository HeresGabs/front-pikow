import { useAuthStore } from '../stores/auth'
import { isJwtExpired } from '../utils/jwt'

const BASE_URL = import.meta.env.VITE_API_URL

function getToken(): string | null {
  const auth = localStorage.getItem('auth')
  if (!auth) return null
  return JSON.parse(auth).token ?? null
}

function handleSessionExpired() {
  try {
    useAuthStore().logout()
  } catch {
    localStorage.removeItem('auth')
  }
  if (!window.location.pathname.startsWith('/login')) {
    window.location.assign('/login')
  }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  if (token && isJwtExpired(token)) {
    handleSessionExpired()
    throw { status: 401, message: 'Session expirée, reconnecte-toi.' }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const isJson = response.headers.get('content-type')?.includes('json')

  if (response.status === 401 && token) {
    handleSessionExpired()
    throw { status: 401, message: 'Session expirée, reconnecte-toi.' }
  }

  if (!response.ok) {
    const body = isJson ? await response.json().catch(() => null) : null
    throw body ?? { status: response.status, message: `Erreur serveur (${response.status}).` }
  }

  if (response.status === 204) return undefined as T

  return (isJson ? response.json() : response.text()) as Promise<T>
}
