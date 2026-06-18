import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Player {
  name: string
  age: number
  score: number
}

export const useGameStore = defineStore('game', () => {
    const gameId = ref<string | null>(null)
    const theme = ref<string | null>(null)
    const players = ref<Player[]>([])
    const currentPlayerIndex = ref(0)
    const turnNumber = ref(1)

    function initGame(id: string, selectedTheme: string, selectedPlayers: Player[]) {
        gameId.value = id
        theme.value = selectedTheme
        players.value = selectedPlayers.map(p => ({ ...p, score: 0 }))
        currentPlayerIndex.value = 0
        turnNumber.value = 1
    }

    function currentPlayer(): Player | null {
        return players.value[currentPlayerIndex.value] ?? null
    }

    function addScore(points: number) {
        const player = players.value[currentPlayerIndex.value]
        if (player) {
            player.score += points
        }
    }

    function nextPlayer() {
        currentPlayerIndex.value++
        turnNumber.value++
    }

    function isLastPlayer(): boolean {
        return currentPlayerIndex.value >= players.value.length - 1
    }

    function reset() {
        gameId.value = null
        theme.value = null
        players.value = []
        currentPlayerIndex.value = 0
        turnNumber.value = 1
    }

    return {
        gameId,
        theme,
        players,
        currentPlayerIndex,
        turnNumber,
        initGame,
        currentPlayer,
        addScore,
        nextPlayer,
        isLastPlayer,
        reset,
    }
}, {
    persist: true
})