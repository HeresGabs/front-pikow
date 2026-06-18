<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  label?: string
  id?: string
  options: { label: string; value: string }[]
  dark?: boolean
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="mb-2 block font-body text-sm font-bold"
      :class="dark ? 'text-white' : 'text-pikow-ink'"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id="id"
        v-model="model"
        class="w-full cursor-pointer appearance-none rounded-full px-5 py-3 pr-11 font-body text-sm outline-none transition focus:ring-2 focus:ring-pikow-blue/40"
        :class="dark ? 'bg-white text-pikow-ink' : 'bg-pikow-gray text-pikow-ink'"
      >
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <ChevronDown
        class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-pikow-ink/60"
      />
    </div>
  </div>
</template>
