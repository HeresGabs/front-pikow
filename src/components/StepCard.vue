<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  step: string
  title: string
  description: string
  icon: Component
  iconColor?: 'blue' | 'pink' | 'red' | 'green' | 'yellow'
}>()

const colors: Record<string, string> = {
  blue: 'bg-pikow-blue/10 text-pikow-blue',
  pink: 'bg-pikow-pink/15 text-pikow-pink',
  red: 'bg-pikow-red/15 text-pikow-red',
  green: 'bg-pikow-green/20 text-pikow-teal',
  yellow: 'bg-pikow-yellow/15 text-pikow-yellow',
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
    <span
      class="flex size-11 items-center justify-center rounded-xl"
      :class="colors[iconColor ?? 'blue']"
    >
      <component :is="icon" class="size-6" />
    </span>
    <div>
      <p class="font-body text-xs font-bold text-pikow-ink/50">{{ step }}</p>
      <h3 class="font-display text-lg text-pikow-ink">{{ title }}</h3>
    </div>
    <p class="font-body text-sm text-pikow-ink/60">{{ description }}</p>
  </div>
</template>
