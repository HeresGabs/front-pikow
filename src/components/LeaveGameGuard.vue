<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = useRouter()
const game = useGameStore()

const show = ref(false)
let target: string | null = null
let confirmed = false

onBeforeRouteLeave((to) => {
  if (confirmed) return true
  if (!game.gameId) return true
  if (to.path.startsWith('/game/')) return true
  target = to.fullPath
  show.value = true
  return false
})

function leave() {
  confirmed = true
  show.value = false
  if (target) router.push(target)
}

function stay() {
  show.value = false
  target = null
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @click.self="stay"
  >
    <div class="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
      <h2 class="font-display text-2xl text-pikow-ink">{{ $t('leaveGame.title') }}</h2>
      <p class="mt-2 font-body text-sm text-pikow-ink/60">{{ $t('leaveGame.message') }}</p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          class="flex-1 cursor-pointer rounded-full bg-pikow-gray px-5 py-3 font-body text-sm font-bold text-pikow-ink transition hover:brightness-95"
          @click="stay"
        >
          {{ $t('leaveGame.stay') }}
        </button>
        <button
          class="flex-1 cursor-pointer rounded-full bg-pikow-red px-5 py-3 font-body text-sm font-bold text-white transition hover:brightness-95"
          @click="leave"
        >
          {{ $t('leaveGame.leave') }}
        </button>
      </div>
    </div>
  </div>
</template>
