<script setup lang="ts">
import { Search } from 'lucide-vue-next'

defineProps<{
  placeholder?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="model"
      type="text"
      :placeholder="placeholder ?? 'Rechercher…'"
      class="w-full rounded-full bg-white px-6 py-4 pr-14 font-body text-sm shadow-md outline-none transition focus:ring-2 focus:ring-pikow-blue/40"
    />
    <Search
      class="absolute top-1/2 right-5 size-5 -translate-y-1/2 text-pikow-ink/60"
    />
  </div>
</template>
