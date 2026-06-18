<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Crown, RefreshCw, RotateCcw, Coins } from 'lucide-vue-next'
import { createGame, finishGame } from '@/api/games'
import { useGameStore } from '@/stores/game'
import { avatar } from '@/utils/players'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProfileLink from '@/components/ProfileLink.vue'

const router = useRouter()
const game = useGameStore()

const MEDALS = ['🥇', '🥈', '🥉']

const ranking = computed(() =>
  game.players
    .map((player, index) => ({ player, index, score: game.scores[index] ?? 0 }))
    .sort((a, b) => b.score - a.score),
)

const maxScore = computed(() => Math.max(1, ...ranking.value.map((r) => r.score)))
const winner = computed(() => ranking.value[0]?.player.name ?? '')

const replaying = ref(false)

async function replay() {
  const players = game.players.map((p) => ({ ...p }))
  const theme = game.theme
  const duration = game.duration
  replaying.value = true
  if (game.gameId) await finishGame(game.gameId).catch(() => null)
  try {
    const created = await createGame({ theme, nbPlayers: players.length })
    game.initGame(created.id, theme, duration, players)
    router.push(`/game/${created.id}/pitch`)
  } catch {
    router.push('/game/new')
  } finally {
    replaying.value = false
  }
}

async function newGame() {
  if (game.gameId) await finishGame(game.gameId).catch(() => null)
  game.reset()
  router.push('/game/new')
}

onMounted(() => {
  if (!game.gameId) router.replace('/game/new')
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center bg-pikow-blue px-6 py-12 text-white">
    <div class="mb-6 flex w-full max-w-3xl justify-end">
      <ProfileLink light />
    </div>
    <div class="w-full max-w-3xl text-center">
      <Crown class="mx-auto size-10 text-pikow-yellow" />
      <h1 class="mt-3 font-display text-3xl sm:text-4xl">{{ winner }} remporte la partie !</h1>
      <p class="mt-1 font-body text-sm text-white/80">Le meilleur entrepreneur du jour 🎉</p>

      <div class="mt-8 flex flex-col gap-3">
        <div
          v-for="(row, position) in ranking"
          :key="row.index"
          class="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4"
        >
          <span class="w-8 text-center text-xl">{{ MEDALS[position] ?? position + 1 }}</span>
          <span class="text-3xl leading-none">{{ avatar(row.index) }}</span>
          <div class="flex-1 text-left">
            <p class="font-body font-bold">{{ row.player.name }}</p>
            <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
              <div
                class="h-full rounded-full bg-pikow-yellow transition-all"
                :style="{ width: `${(row.score / maxScore) * 100}%` }"
              />
            </div>
          </div>
          <span class="flex items-center gap-1 font-display text-lg">
            <Coins class="size-4 text-pikow-yellow" />
            {{ row.score }}
          </span>
        </div>
      </div>

      <div class="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <BaseButton variant="yellow" @click="replay">
          <RefreshCw class="mr-2 size-5" />
          {{ replaying ? 'Création…' : 'Rejouer (mêmes joueurs)' }}
        </BaseButton>
        <BaseButton variant="secondary" @click="newGame">
          <RotateCcw class="mr-2 size-5" />
          Nouvelle partie
        </BaseButton>
      </div>
    </div>
  </div>
</template>
