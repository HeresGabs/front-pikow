<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Coins, Minus, Plus, Trophy } from 'lucide-vue-next'
import { createPitch } from '@/api/pitches'
import { useGameStore } from '@/stores/game'
import { avatar } from '@/utils/players'
import ProfileLink from '@/components/ProfileLink.vue'

const route = useRoute()
const router = useRouter()
const game = useGameStore()

const saving = ref(false)

async function validate() {
  if (game.remainingTokens > 0) return
  saving.value = true
  game.applyVotes()

  const gameId = String(route.params.id)
  const requests = game.players
    .map((player, i) => ({
      player,
      words: game.turnWords[i],
      score: game.votes[i] ?? 0,
      order: i + 1,
    }))
    .filter((entry) => entry.words)
    .map((entry) =>
      createPitch({
        gameId,
        playerName: entry.player.name,
        playerAge: entry.player.age,
        turnNumber: entry.order,
        word1Id: entry.words!.word1.id,
        word2Id: entry.words!.word2.id,
        duration: game.duration,
        score: entry.score,
      }).catch(() => null)
    )

  await Promise.all(requests)
  saving.value = false
  router.push(`/game/${gameId}/results`)
}

onMounted(() => {
  if (!game.gameId) router.replace('/game/new')
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-pikow-gray px-6 py-10">
    <div class="mx-auto w-full max-w-5xl flex-1">
      <div class="mb-4 flex justify-end">
        <ProfileLink />
      </div>
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 class="font-display text-3xl text-pikow-ink sm:text-4xl">Attribuez vos jetons</h1>
          <p class="mt-1 font-body text-sm text-pikow-ink/60">
            Donnez vos jetons à l'idée la plus convaincante ou la plus drôle.
          </p>
        </div>
        <div class="flex items-center gap-3 rounded-2xl bg-pikow-yellow px-5 py-3">
          <Coins class="size-6 text-pikow-ink" />
          <div>
            <p class="font-display text-2xl leading-none text-pikow-ink">
              {{ game.remainingTokens }}
            </p>
            <p class="font-body text-xs text-pikow-ink/70">jetons restants</p>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div
          v-for="(player, i) in game.players"
          :key="i"
          class="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <span class="text-3xl leading-none">{{ avatar(i) }}</span>
            <span class="font-body font-bold text-pikow-ink">{{ player.name }}</span>
          </div>
          <div class="flex items-center gap-3">
            <button
              class="flex size-9 cursor-pointer items-center justify-center rounded-full bg-pikow-gray text-pikow-ink disabled:opacity-40"
              :disabled="(game.votes[i] ?? 0) <= 0"
              @click="game.removeVote(i)"
            >
              <Minus class="size-4" />
            </button>
            <span class="w-6 text-center font-display text-lg text-pikow-ink">
              {{ game.votes[i] ?? 0 }}
            </span>
            <button
              class="flex size-9 cursor-pointer items-center justify-center rounded-full bg-pikow-blue text-white disabled:opacity-40"
              :disabled="game.remainingTokens <= 0"
              @click="game.addVote(i)"
            >
              <Plus class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-5xl pt-8">
      <p
        v-if="game.remainingTokens > 0"
        class="mb-3 text-center font-body text-sm text-pikow-ink/60"
      >
        Distribuez tous vos jetons pour valider ({{ game.remainingTokens }} restant{{
          game.remainingTokens > 1 ? 's' : ''
        }}).
      </p>
      <button
        class="flex w-full items-center justify-center gap-2 rounded-full bg-pikow-red px-7 py-3 font-body text-sm font-bold text-white transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        :class="game.remainingTokens === 0 ? 'cursor-pointer' : ''"
        :disabled="game.remainingTokens > 0 || saving"
        @click="validate"
      >
        <Trophy class="size-5" />
        {{ saving ? 'Enregistrement…' : 'Valider & voir les scores' }}
      </button>
    </div>
  </div>
</template>
