<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'

withDefaults(defineProps<{ light?: boolean }>(), { light: false })
</script>

<template>
  <RouterLink
    to="/dashboard"
    class="inline-flex h-11 items-center gap-2 rounded-full px-4 font-body text-sm font-bold shadow-sm transition"
    :class="
      light
        ? 'bg-white/15 text-white hover:bg-white/25'
        : 'bg-white text-pikow-ink hover:bg-pikow-gray'
    "
  >
    <UserRound class="size-4" />
    {{ $t('common.profile') }}
  </RouterLink>
</template>
