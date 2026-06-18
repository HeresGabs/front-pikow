<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import ProductChip from './ProductChip.vue'

withDefaults(
  defineProps<{
    title?: string
    footer?: string
    left?: { name: string; emoji?: string; color?: 'pink' | 'yellow' | 'green' | 'blue' }
    right?: { name: string; emoji?: string; color?: 'pink' | 'yellow' | 'green' | 'blue' }
  }>(),
  {
    title: 'Associez…',
    footer: 'A vous de jouer !',
    left: () => ({ name: 'Pizza', emoji: '🍕', color: 'pink' }),
    right: () => ({ name: 'Ballon', emoji: '🏐', color: 'yellow' }),
  }
)
</script>

<template>
  <div class="rounded-3xl bg-pikow-blue p-8 text-center text-white">
    <p class="font-display text-lg">{{ title }}</p>

    <div class="my-6 flex items-center justify-center gap-4">
      <ProductChip :name="left.name" :emoji="left.emoji" :color="left.color" />
      <Plus class="size-7" />
      <ProductChip :name="right.name" :emoji="right.emoji" :color="right.color" />
    </div>

    <p class="font-display text-lg">{{ footer }}</p>
  </div>
</template>
