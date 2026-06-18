import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Player {
  name: string
  age: number
}

export interface DrawnWord {
  id: number
  value: string
}

export interface TurnWords {
  word1: DrawnWord
  word2: DrawnWord
}

const TOKENS_PER_PLAYER = 6

export const useGameStore = defineStore(
  'game',
  () => {
    const gameId = ref<string | null>(null)
    const theme = ref('famille')
    const duration = ref(60)
    const players = ref<Player[]>([])
    const malusPerPlayer = ref(2)

    const currentPitchIndex = ref(0)
    const turnWords = ref<Record<number, TurnWords>>({})
    const votes = ref<Record<number, number>>({})
    const scores = ref<Record<number, number>>({})

    const currentPlayer = computed(() => players.value[currentPitchIndex.value] ?? null)
    const isLastPitch = computed(() => currentPitchIndex.value >= players.value.length - 1)
    const totalTokens = computed(() => TOKENS_PER_PLAYER * players.value.length)
    const usedTokens = computed(() => Object.values(votes.value).reduce((sum, n) => sum + n, 0))
    const remainingTokens = computed(() => totalTokens.value - usedTokens.value)

    function resetRound() {
      currentPitchIndex.value = 0
      turnWords.value = {}
      votes.value = {}
      scores.value = {}
      players.value.forEach((_, i) => {
        votes.value[i] = 0
        scores.value[i] = 0
      })
    }

    function initGame(id: string, selectedTheme: string, pitchDuration: number, list: Player[]) {
      gameId.value = id
      theme.value = selectedTheme
      duration.value = pitchDuration
      players.value = list
      resetRound()
    }

    function setWords(index: number, words: TurnWords) {
      turnWords.value[index] = words
    }

    function nextPitch() {
      currentPitchIndex.value++
    }

    function addVote(index: number) {
      if (remainingTokens.value > 0) votes.value[index] = (votes.value[index] ?? 0) + 1
    }

    function removeVote(index: number) {
      const current = votes.value[index] ?? 0
      if (current > 0) votes.value[index] = current - 1
    }

    function applyVotes() {
      players.value.forEach((_, i) => {
        scores.value[i] = (scores.value[i] ?? 0) + (votes.value[i] ?? 0)
      })
    }

    function reset() {
      gameId.value = null
      theme.value = 'famille'
      duration.value = 60
      players.value = []
      currentPitchIndex.value = 0
      turnWords.value = {}
      votes.value = {}
      scores.value = {}
    }

    return {
      gameId,
      theme,
      duration,
      players,
      malusPerPlayer,
      currentPitchIndex,
      turnWords,
      votes,
      scores,
      currentPlayer,
      isLastPitch,
      totalTokens,
      usedTokens,
      remainingTokens,
      initGame,
      setWords,
      nextPitch,
      addVote,
      removeVote,
      applyVotes,
      reset,
    }
  },
  {
    persist: true,
  },
)
