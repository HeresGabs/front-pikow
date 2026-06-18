<script setup lang="ts">
defineProps<{
  name: string
  emoji?: string
  color?: 'pink' | 'yellow' | 'green' | 'blue'
}>()

const colors: Record<string, string> = {
  pink: 'bg-pikow-pink',
  yellow: 'bg-pikow-yellow',
  green: 'bg-pikow-green',
  blue: 'bg-pikow-blue',
}
</script>

<template>
  <div
    class="flex size-24 flex-col items-center justify-center gap-1 rounded-2xl text-white"
    :class="colors[color ?? 'pink']"
  >
    <span class="text-3xl leading-none">{{ emoji ?? '🎲' }}</span>
    <span class="font-display text-sm">{{ name }}</span>
  </div>
</template>
