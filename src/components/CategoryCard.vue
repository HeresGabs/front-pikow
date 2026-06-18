<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title: string
  description: string
  icon?: Component
  color?: 'yellow' | 'green' | 'blue'
}>()

const colors: Record<string, string> = {
  yellow: 'bg-pikow-yellow text-pikow-ink',
  green: 'bg-pikow-green text-pikow-ink',
  blue: 'bg-pikow-blue text-white',
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl p-6" :class="colors[color ?? 'yellow']">
    <component :is="icon" v-if="icon" class="size-7" />
    <h3 class="font-display text-xl">{{ title }}</h3>
    <p class="font-body text-sm opacity-80">{{ description }}</p>
  </div>
</template>
