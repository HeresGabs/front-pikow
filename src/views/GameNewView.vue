<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { Clock, Minus, Plus, Play } from 'lucide-vue-next'
import { createGame } from '@/api/games'
import { useGameStore } from '@/stores/game'
import { avatar } from '@/utils/players'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProfileLink from '@/components/ProfileLink.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const router = useRouter()
const game = useGameStore()
const { t } = useI18n()

const MIN_PLAYERS = 2
const MAX_PLAYERS = 8
const DURATIONS = [30, 60, 120]
const VOCABS = [
  { label: 'famille', value: 'famille' },
  { label: 'business', value: 'business' },
  { label: 'spicy', value: 'spicy' },
]

const players = reactive(
  Array.from({ length: MIN_PLAYERS }, (_, i) => ({
    name: `${t('gameNew.defaultPlayer')} ${i + 1}`,
    age: 18,
  }))
)
const duration = ref(60)
const vocab = ref('famille')
const error = ref('')
const loading = ref(false)

const allAdults = computed(() => players.every((p) => Number(p.age) >= 18))

watch(allAdults, (adults) => {
  if (!adults) vocab.value = 'famille'
})

function setCount(count: number) {
  const next = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, count))
  while (players.length < next)
    players.push({ name: `${t('gameNew.defaultPlayer')} ${players.length + 1}`, age: 18 })
  while (players.length > next) players.pop()
}

async function launch() {
  error.value = ''
  if (players.some((p) => !p.name.trim())) {
    error.value = t('gameNew.errName')
    return
  }
  if (players.some((p) => !p.age || Number(p.age) < 1)) {
    error.value = t('gameNew.errAge')
    return
  }

  const theme = allAdults.value ? vocab.value : 'famille'
  loading.value = true
  try {
    const created = await createGame({ theme, nbPlayers: players.length })
    game.initGame(
      created.id,
      theme,
      duration.value,
      players.map((p) => ({ name: p.name.trim(), age: Number(p.age) }))
    )
    router.push(`/game/${created.id}/pitch`)
  } catch {
    error.value = t('gameNew.errCreate')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-pikow-gray px-6 py-10">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="font-display text-3xl text-pikow-ink sm:text-4xl">
            {{ $t('gameNew.title') }}
          </h1>
          <p class="mt-1 font-body text-sm text-pikow-ink/60">
            {{ $t('gameNew.subtitle') }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <LanguageSwitcher />
          <ProfileLink />
        </div>
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-xl text-pikow-ink">
              {{ $t('gameNew.playersLabel') }} ({{ players.length }})
            </h2>
            <div class="flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <button
                class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-pikow-gray text-pikow-ink disabled:opacity-40"
                :disabled="players.length <= MIN_PLAYERS"
                @click="setCount(players.length - 1)"
              >
                <Minus class="size-4" />
              </button>
              <span class="w-5 text-center font-body font-bold">{{ players.length }}</span>
              <button
                class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-pikow-blue text-white disabled:opacity-40"
                :disabled="players.length >= MAX_PLAYERS"
                @click="setCount(players.length + 1)"
              >
                <Plus class="size-4" />
              </button>
            </div>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(player, i) in players"
              :key="i"
              class="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <span class="text-3xl leading-none">{{ avatar(i) }}</span>
              <div class="flex-1">
                <input
                  v-model="player.name"
                  type="text"
                  :placeholder="$t('gameNew.namePlaceholder')"
                  class="w-full rounded-full bg-pikow-gray px-4 py-2 font-body text-sm outline-none focus:ring-2 focus:ring-pikow-blue/40"
                />
                <div class="mt-2 flex items-center gap-2">
                  <span class="font-body text-xs text-pikow-ink/50">{{ $t('gameNew.age') }}</span>
                  <input
                    v-model.number="player.age"
                    type="number"
                    min="1"
                    class="w-20 rounded-full bg-pikow-gray px-4 py-2 font-body text-sm outline-none focus:ring-2 focus:ring-pikow-blue/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <div v-if="allAdults" class="rounded-2xl bg-white p-5 shadow-sm">
            <p class="font-display text-base text-pikow-ink">{{ $t('gameNew.vocab') }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="v in VOCABS"
                :key="v.value"
                class="cursor-pointer rounded-full px-4 py-2 font-body text-sm font-bold transition"
                :class="
                  vocab === v.value ? 'bg-pikow-blue text-white' : 'bg-pikow-gray text-pikow-ink/70'
                "
                @click="vocab = v.value"
              >
                {{ $t(`themes.${v.label}`) }}
              </button>
            </div>
          </div>

          <div class="rounded-2xl bg-white p-5 shadow-sm">
            <p class="flex items-center gap-2 font-display text-base text-pikow-ink">
              <Clock class="size-5" />
              {{ $t('gameNew.duration') }}
            </p>
            <div class="mt-3 flex gap-2">
              <button
                v-for="d in DURATIONS"
                :key="d"
                class="flex-1 cursor-pointer rounded-full px-4 py-2 font-body text-sm font-bold transition"
                :class="
                  duration === d ? 'bg-pikow-blue text-white' : 'bg-pikow-gray text-pikow-ink/70'
                "
                @click="duration = d"
              >
                {{ d }}s
              </button>
            </div>
          </div>
        </div>
      </div>

      <p v-if="error" class="mt-6 font-body text-sm font-bold text-pikow-red">{{ error }}</p>

      <div class="mt-8">
        <BaseButton variant="red" @click="launch">
          <Play class="mr-2 size-5" />
          {{ loading ? $t('gameNew.starting') : $t('gameNew.start') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
