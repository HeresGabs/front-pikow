<script setup lang="ts">
import logoUrl from '@/assets/logo/logo_bleu_1.svg'

defineProps<{
  light?: boolean
}>()
</script>

<template>
  <img
    :src="logoUrl"
    alt="Pikow"
    class="h-14 w-auto select-none"
    :class="{ 'brightness-0 invert': light }"
  />
</template>
