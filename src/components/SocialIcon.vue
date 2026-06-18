<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  href?: string
  color?: 'blue' | 'pink' | 'red' | 'teal'
}>()

const colors: Record<string, string> = {
  blue: 'bg-pikow-blue',
  pink: 'bg-pikow-pink',
  red: 'bg-pikow-red',
  teal: 'bg-pikow-teal',
}
</script>

<template>
  <a
    :href="href ?? '#'"
    class="flex size-10 items-center justify-center rounded-xl text-white transition hover:scale-105"
    :class="colors[color ?? 'blue']"
  >
    <component :is="icon" class="size-5" />
  </a>
</template>
