import { apiFetch } from './index'

export interface CreatePitchPayload {
  gameId: string
  playerName: string
  playerAge: number
  turnNumber: number
  word1Id: number
  word2Id: number
  duration: number
  score?: number | null
}

export interface PitchResponse {
  id: string
  playerName: string
  turnNumber: number
  duration: number
  score: number | null
}

export function createPitch(payload: CreatePitchPayload): Promise<PitchResponse> {
  return apiFetch<PitchResponse>('/pitches', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
