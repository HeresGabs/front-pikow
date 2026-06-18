import { apiFetch } from './index'

export interface ContactPayload {
  type: 'contact' | 'revendeur'
  email: string
  message: string
  company?: string | null
}

export interface ContactResponse {
  id: number
}

export function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  return apiFetch<ContactResponse>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
