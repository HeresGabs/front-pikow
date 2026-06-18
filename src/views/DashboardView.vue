<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Trophy, Coins } from 'lucide-vue-next'
import { getGames, getGamePitches, type Game, type Pitch } from '@/api/games'
import { useTranslateWord } from '@/composables/useTranslateWord'
import AppNavbar from '@/components/AppNavbar.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Ranking {
  name: string
  score: number
}

interface GameDetails {
  game: Game
  pitches: Pitch[]
  ranking: Ranking[]
  winner: string
  topScore: number
}

const { t, locale } = useI18n()
const translateWord = useTranslateWord()

const loading = ref(true)
const error = ref('')
const games = ref<GameDetails[]>([])

const sort = ref('recent')
const themeFilter = ref('all')

const SORTS = computed(() => [
  { label: t('dashboard.sortRecent'), value: 'recent' },
  { label: t('dashboard.sortOld'), value: 'old' },
  { label: t('dashboard.sortScoreDesc'), value: 'score-desc' },
  { label: t('dashboard.sortScoreAsc'), value: 'score-asc' },
])
const THEMES = computed(() => [
  { label: t('dashboard.themeAll'), value: 'all' },
  { label: t('themes.famille'), value: 'famille' },
  { label: t('themes.business'), value: 'business' },
  { label: t('themes.spicy'), value: 'spicy' },
])
const THEME_BADGE: Record<string, string> = {
  famille: 'bg-pikow-green/30 text-pikow-teal',
  business: 'bg-pikow-blue/15 text-pikow-blue',
  spicy: 'bg-pikow-red/15 text-pikow-red',
}

function buildRanking(pitches: Pitch[]): Ranking[] {
  const totals: Record<string, number> = {}
  pitches.forEach((p) => {
    totals[p.playerName] = (totals[p.playerName] ?? 0) + (p.score ?? 0)
  })
  return Object.entries(totals)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
}

const filtered = computed(() => {
  let list = games.value.filter((g) => {
    if (g.game.status !== 'finished') return false
    if (themeFilter.value !== 'all' && g.game.theme !== themeFilter.value) return false
    return true
  })

  list = [...list].sort((a, b) => {
    switch (sort.value) {
      case 'old':
        return new Date(a.game.date).getTime() - new Date(b.game.date).getTime()
      case 'score-desc':
        return b.topScore - a.topScore
      case 'score-asc':
        return a.topScore - b.topScore
      default:
        return new Date(b.game.date).getTime() - new Date(a.game.date).getTime()
    }
  })
  return list
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(locale.value, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const list = await getGames()
    const details = await Promise.all(
      list.map(async (game) => {
        const pitches = await getGamePitches(game.id).catch(() => [] as Pitch[])
        const ranking = buildRanking(pitches)
        return {
          game,
          pitches: [...pitches].sort((a, b) => a.turnNumber - b.turnNumber),
          ranking,
          winner: ranking[0]?.name ?? '—',
          topScore: ranking[0]?.score ?? 0,
        }
      })
    )
    games.value = details
  } catch {
    error.value = t('dashboard.loadError')
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="min-h-screen bg-pikow-gray">
    <AppNavbar />

    <div class="mx-auto max-w-5xl px-6 py-10">
      <h1 class="font-display text-3xl text-pikow-ink sm:text-4xl">{{ $t('dashboard.title') }}</h1>
      <p class="mt-1 font-body text-sm text-pikow-ink/60">
        {{ $t('dashboard.subtitle') }}
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <BaseSelect v-model="sort" :label="$t('dashboard.sortBy')" id="dash-sort" :options="SORTS" />
        <BaseSelect
          v-model="themeFilter"
          :label="$t('dashboard.theme')"
          id="dash-theme"
          :options="THEMES"
        />
      </div>

      <p v-if="loading" class="mt-10 text-center font-body text-pikow-ink/50">
        {{ $t('common.loading') }}
      </p>
      <p v-else-if="error" class="mt-10 text-center font-body font-bold text-pikow-red">
        {{ error }}
      </p>

      <div
        v-else-if="!filtered.length"
        class="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm"
      >
        <p class="font-body text-pikow-ink/60">{{ $t('dashboard.empty') }}</p>
        <div class="mt-4 flex justify-center">
          <BaseButton variant="primary" to="/game/new">{{ $t('dashboard.startGame') }}</BaseButton>
        </div>
      </div>

      <div v-else class="mt-6 flex flex-col gap-5">
        <div
          v-for="entry in filtered"
          :key="entry.game.id"
          class="rounded-2xl bg-white p-6 shadow-sm"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-3">
              <span
                class="rounded-full px-3 py-1 font-body text-xs font-bold"
                :class="THEME_BADGE[entry.game.theme] ?? 'bg-pikow-gray text-pikow-ink'"
              >
                {{ $t(`themes.${entry.game.theme}`) }}
              </span>
              <span class="font-body text-sm text-pikow-ink/60">{{
                formatDate(entry.game.date)
              }}</span>
              <span class="font-body text-sm text-pikow-ink/60"
                >· {{ entry.game.nbPlayers }} {{ $t('dashboard.players') }}</span
              >
            </div>
            <div class="flex items-center gap-2 font-body text-sm font-bold text-pikow-ink">
              <Trophy class="size-4 text-pikow-yellow" />
              {{ $t('dashboard.winner') }} {{ entry.winner }}
              <span class="flex items-center gap-1 text-pikow-ink/60">
                <Coins class="size-4" />{{ entry.topScore }}
              </span>
            </div>
          </div>

          <div v-if="entry.pitches.length" class="mt-4 border-t border-black/5 pt-4">
            <p class="mb-2 font-body text-xs font-bold text-pikow-ink/50">{{ $t('dashboard.rounds') }}</p>
            <ul class="flex flex-col gap-2">
              <li
                v-for="pitch in entry.pitches"
                :key="pitch.id"
                class="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-pikow-gray px-4 py-2"
              >
                <span class="font-body text-sm font-bold text-pikow-ink">{{
                  pitch.playerName
                }}</span>
                <span class="font-body text-sm text-pikow-ink/70">
                  {{ translateWord(pitch.word1.value) }} + {{ translateWord(pitch.word2.value) }}
                </span>
                <span class="flex items-center gap-1 font-body text-sm font-bold text-pikow-ink">
                  <Coins class="size-4 text-pikow-yellow" />{{ pitch.score ?? 0 }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
