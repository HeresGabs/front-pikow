const BASE_URL = import.meta.env.VITE_API_URL

function getToken(): string | null {
  const auth = localStorage.getItem('auth')
  if (!auth) return null
  try {
    return JSON.parse(auth).token ?? null
  } catch {
    return null
  }
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

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}
