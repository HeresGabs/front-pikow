import { apiFetch } from './index'

export interface Game {
  id: string
  theme: string
  nbPlayers: number
  status: string
  date: string
}

export interface CreateGamePayload {
  theme: string
  nbPlayers: number
}

export interface Pitch {
  id: string
  playerName: string
  playerAge: number
  turnNumber: number
  duration: number
  score: number | null
  word1: { id: number; value: string }
  word2: { id: number; value: string }
}

export function createGame(payload: CreateGamePayload): Promise<Game> {
  return apiFetch<Game>('/games', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getGames(): Promise<Game[]> {
  return apiFetch<Game[]>('/games')
}

export function finishGame(id: string): Promise<Game> {
  return apiFetch<Game>(`/games/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/merge-patch+json' },
    body: JSON.stringify({ status: 'finished' }),
  })
}

export function getGamePitches(id: string): Promise<Pitch[]> {
  return apiFetch<Pitch[]>(`/games/${id}/pitches`)
}
