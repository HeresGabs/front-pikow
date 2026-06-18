<script setup lang="ts">
import { Star, User } from 'lucide-vue-next'

defineProps<{
  name: string
  title: string
  text: string
  rating?: number
}>()
</script>

<template>
  <div class="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
    <div class="flex items-center gap-3">
      <span
        class="flex size-9 items-center justify-center rounded-lg bg-pikow-blue text-white"
      >
        <User class="size-5" />
      </span>
      <span class="font-body text-sm font-bold text-pikow-ink">{{ name }}</span>
    </div>

    <div class="flex gap-0.5 text-pikow-yellow">
      <Star
        v-for="n in 5"
        :key="n"
        class="size-4"
        :fill="n <= (rating ?? 5) ? 'currentColor' : 'none'"
      />
    </div>

    <h4 class="font-display text-base text-pikow-ink">{{ title }}</h4>
    <p class="font-body text-sm text-pikow-ink/60">{{ text }}</p>
  </div>
</template>
