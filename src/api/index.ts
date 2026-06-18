const BASE_URL = import.meta.env.VITE_API_URL

function getToken(): string | null {
  // Pinia persistedstate stocke dans localStorage
  const auth = localStorage.getItem('auth')
  if (!auth) return null
  return JSON.parse(auth).token ?? null
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const isJson = response.headers.get('content-type')?.includes('json')

  if (!response.ok) {
    const body = isJson ? await response.json().catch(() => null) : null
    throw body ?? { status: response.status, message: `Erreur serveur (${response.status}).` }
  }

  if (response.status === 204) return undefined as T

  return (isJson ? response.json() : response.text()) as Promise<T>
}
