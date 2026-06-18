<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VueSignaturePad } from 'vue-signature-pad'
import { Play, Pause, RotateCcw, CheckSquare, Eraser, Trash2, AlarmClock } from 'lucide-vue-next'
import { getRandomElements } from '@/api/elements'
import { useGameStore, type TurnWords } from '@/stores/game'
import { avatar } from '@/utils/players'
import ProfileLink from '@/components/ProfileLink.vue'

const route = useRoute()
const router = useRouter()
const game = useGameStore()

const remaining = ref(game.duration)
const running = ref(false)
const drawing = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const showTurn = ref(false)
const turnName = ref('')
const showTimeUp = ref(false)
let turnTimeout: ReturnType<typeof setTimeout> | null = null
let timeUpTimeout: ReturnType<typeof setTimeout> | null = null

const BG = '#ffffff'
const COLORS = ['#333333', '#2b35e8', '#e7544b', '#016953', '#ffbf00', '#c45cf0']
const SIZES = [
  { label: 'S', min: 1, max: 2 },
  { label: 'M', min: 2, max: 4 },
  { label: 'L', min: 4, max: 7 },
]
const DEFAULT_SIZE = { label: 'M', min: 2, max: 4 }
const color = ref(COLORS[0] ?? '#333333')
const sizeIndex = ref(1)
const eraser = ref(false)
const pad = ref<{ clearSignature: () => void } | null>(null)

function currentSize() {
  return SIZES[sizeIndex.value] ?? DEFAULT_SIZE
}

const padOptions = ref<Record<string, unknown>>({
  penColor: color.value,
  minWidth: currentSize().min,
  maxWidth: currentSize().max,
  backgroundColor: BG,
})

function syncOptions() {
  padOptions.value = {
    penColor: eraser.value ? BG : color.value,
    minWidth: eraser.value ? 8 : currentSize().min,
    maxWidth: eraser.value ? 14 : currentSize().max,
    backgroundColor: BG,
  }
}

function pickColor(value: string) {
  eraser.value = false
  color.value = value
  syncOptions()
}

function pickSize(index: number) {
  sizeIndex.value = index
  syncOptions()
}

function toggleEraser() {
  eraser.value = true
  syncOptions()
}

function clearBoard() {
  pad.value?.clearSignature()
}

const currentWords = computed(() => game.turnWords[game.currentPitchIndex])
const progress = computed(() => (game.duration ? (remaining.value / game.duration) * 100 : 0))
const minutes = computed(() => String(Math.floor(remaining.value / 60)).padStart(2, '0'))
const seconds = computed(() => String(remaining.value % 60).padStart(2, '0'))

function announceTurn(name: string) {
  turnName.value = name
  showTurn.value = true
  if (turnTimeout) clearTimeout(turnTimeout)
  turnTimeout = setTimeout(() => (showTurn.value = false), 3000)
}

function triggerTimeUp() {
  showTimeUp.value = true
  if (timeUpTimeout) clearTimeout(timeUpTimeout)
  timeUpTimeout = setTimeout(() => {
    showTimeUp.value = false
    advance()
  }, 3000)
}

async function drawWords() {
  const player = game.currentPlayer
  if (!player || game.turnWords[game.currentPitchIndex]) return
  drawing.value = true
  try {
    const prev = game.turnWords[game.currentPitchIndex - 1]
    const prevIds = prev ? [prev.word1.id, prev.word2.id] : []
    let result: TurnWords | null = null
    for (let attempt = 0; attempt < 10 && !result; attempt++) {
      const elements = await getRandomElements(game.theme, player.age)
      const a = elements[0]
      const b = elements[1]
      if (!a || !b) break
      const overlaps = prevIds.includes(a.id) || prevIds.includes(b.id)
      if (!overlaps || attempt === 9) {
        result = {
          word1: { id: a.id, value: a.value },
          word2: { id: b.id, value: b.value },
        }
      }
    }
    if (result) game.setWords(game.currentPitchIndex, result)
  } finally {
    drawing.value = false
  }
}

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = null
  running.value = false
}

function toggleTimer() {
  if (running.value) {
    stopTimer()
    return
  }
  if (remaining.value <= 0) remaining.value = game.duration
  running.value = true
  timer = setInterval(() => {
    remaining.value -= 1
    if (remaining.value <= 0) {
      stopTimer()
      triggerTimeUp()
    }
  }, 1000)
}

function resetTimer() {
  stopTimer()
  remaining.value = game.duration
}

async function advance() {
  stopTimer()
  if (timeUpTimeout) {
    clearTimeout(timeUpTimeout)
    timeUpTimeout = null
  }
  showTimeUp.value = false
  if (game.isLastPitch) {
    router.push(`/game/${route.params.id}/vote`)
    return
  }
  game.nextPitch()
  remaining.value = game.duration
  clearBoard()
  announceTurn(game.currentPlayer?.name ?? '')
  await drawWords()
}

onMounted(() => {
  if (!game.gameId) {
    router.replace('/game/new')
    return
  }
  announceTurn(game.currentPlayer?.name ?? '')
  drawWords()
})

onBeforeUnmount(() => {
  stopTimer()
  if (turnTimeout) clearTimeout(turnTimeout)
  if (timeUpTimeout) clearTimeout(timeUpTimeout)
})
</script>

<template>
  <div class="relative min-h-screen bg-pikow-gray px-6 py-8">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showTurn"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pikow-blue text-center text-white"
      >
        <span class="text-7xl">{{ avatar(game.currentPitchIndex) }}</span>
        <p class="mt-4 font-body text-lg opacity-90">{{ $t('gamePitch.turnOf') }}</p>
        <p class="font-display text-5xl">{{ turnName }}</p>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showTimeUp"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pikow-red text-center text-white"
      >
        <AlarmClock class="size-16" />
        <p class="mt-4 font-display text-5xl">{{ $t('gamePitch.timeUp') }}</p>
        <p class="mt-2 font-body text-lg opacity-90">{{ $t('gamePitch.pitchOver') }}</p>
      </div>
    </Transition>

    <div class="mx-auto mb-4 flex max-w-6xl justify-end">
      <ProfileLink />
    </div>

    <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <p class="font-body text-sm font-bold text-pikow-ink/60">
          {{
            $t('gamePitch.header', {
              i: game.currentPitchIndex + 1,
              total: game.players.length,
              name: game.currentPlayer?.name,
            })
          }}
        </p>

        <div class="mt-4 flex items-stretch gap-3">
          <div
            class="flex flex-1 items-center justify-center rounded-2xl bg-pikow-yellow px-4 py-5 text-center font-display text-xl text-pikow-ink"
          >
            {{ currentWords?.word1.value ?? '…' }}
          </div>
          <span class="self-center font-display text-3xl text-pikow-ink">+</span>
          <div
            class="flex flex-1 items-center justify-center rounded-2xl bg-pikow-red px-4 py-5 text-center font-display text-xl text-white"
          >
            {{ currentWords?.word2.value ?? '…' }}
          </div>
        </div>

        <div class="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-1.5">
              <button
                v-for="c in COLORS"
                :key="c"
                class="size-6 cursor-pointer rounded-full transition"
                :class="!eraser && color === c ? 'ring-2 ring-pikow-ink ring-offset-2' : ''"
                :style="{ backgroundColor: c }"
                @click="pickColor(c)"
              />
            </div>
            <div class="flex items-center gap-1">
              <button
                v-for="(s, i) in SIZES"
                :key="s.label"
                class="flex size-8 cursor-pointer items-center justify-center rounded-full transition"
                :class="!eraser && sizeIndex === i ? 'bg-pikow-gray' : ''"
                @click="pickSize(i)"
              >
                <span
                  class="rounded-full bg-pikow-ink"
                  :style="{ width: `${s.max + 3}px`, height: `${s.max + 3}px` }"
                />
              </button>
            </div>
            <button
              class="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-xs font-bold transition"
              :class="eraser ? 'bg-pikow-blue text-white' : 'bg-pikow-gray text-pikow-ink'"
              @click="toggleEraser"
            >
              <Eraser class="size-4" />
              {{ $t('gamePitch.eraser') }}
            </button>
            <button
              class="ml-auto flex cursor-pointer items-center gap-1.5 rounded-full bg-pikow-red px-3 py-1.5 font-body text-xs font-bold text-white transition hover:brightness-95"
              @click="clearBoard"
            >
              <Trash2 class="size-4" />
              {{ $t('gamePitch.clearAll') }}
            </button>
          </div>

          <div
            class="mt-3 h-[48vh] w-full overflow-hidden rounded-2xl border border-black/5 [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:cursor-crosshair [&>div]:h-full [&>div]:w-full"
          >
            <VueSignaturePad ref="pad" :options="padOptions" />
          </div>
        </div>

        <p v-if="drawing" class="mt-3 text-center font-body text-sm text-pikow-ink/50">
          {{ $t('gamePitch.drawing') }}
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <div class="rounded-3xl bg-pikow-teal p-6 text-center text-white">
          <p class="font-body text-sm opacity-90">{{ $t('gamePitch.pitchTime') }}</p>
          <p class="font-display text-5xl">{{ minutes }}:{{ seconds }}</p>
          <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/30">
            <div
              class="h-full rounded-full bg-white transition-all"
              :style="{ width: `${progress}%` }"
            />
          </div>
          <div class="mt-4 flex justify-center gap-3">
            <button
              class="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white text-pikow-teal"
              @click="toggleTimer"
            >
              <Pause v-if="running" class="size-5" />
              <Play v-else class="size-5" />
            </button>
            <button
              class="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/25 text-white"
              @click="resetTimer"
            >
              <RotateCcw class="size-5" />
            </button>
          </div>
        </div>

        <button
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-pikow-ink px-7 py-3 font-body text-sm font-bold text-white transition active:scale-95"
          @click="advance"
        >
          <CheckSquare class="size-5" />
          {{ game.isLastPitch ? $t('gamePitch.toVote') : $t('gamePitch.nextPlayer') }}
        </button>
      </div>
    </div>
  </div>
</template>
