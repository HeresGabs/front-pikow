<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineProps<{
  dark?: boolean
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="flex cursor-pointer items-start gap-3">
    <span class="relative mt-0.5 inline-flex size-5 shrink-0">
      <input
        v-model="model"
        type="checkbox"
        class="peer size-5 cursor-pointer appearance-none rounded-md border-2 bg-white transition"
        :class="dark ? 'border-white' : 'border-pikow-ink/20'"
      />
      <Check
        class="pointer-events-none absolute inset-0 m-auto size-3.5 stroke-3 text-pikow-blue opacity-0 transition peer-checked:opacity-100"
      />
    </span>
    <span class="font-body text-sm" :class="dark ? 'text-white/90' : 'text-pikow-ink/80'">
      <slot />
    </span>
  </label>
</template>
