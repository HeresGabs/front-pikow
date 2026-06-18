<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  light?: boolean
}>()
</script>

<template>
  <div class="text-center">
    <h2
      class="font-display text-3xl sm:text-4xl"
      :class="light ? 'text-white' : 'text-pikow-ink'"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-2 font-body text-sm font-bold"
      :class="light ? 'text-white/80' : 'text-pikow-ink/70'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
