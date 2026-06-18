import { apiFetch } from './index'

export interface Element {
  id: number
  type: string
  value: string
  theme: string
}

export function getRandomElements(theme: string, age: number): Promise<Element[]> {
  return apiFetch<Element[]>(`/elements/random?theme=${theme}&age=${age}`)
}
