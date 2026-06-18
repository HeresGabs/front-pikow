<script setup lang="ts">
defineProps<{
  label?: string
  type?: string
  placeholder?: string
  id?: string
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
    <input
      :id="id"
      v-model="model"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="w-full rounded-full px-5 py-3 font-body text-sm outline-none transition focus:ring-2 focus:ring-pikow-blue/40"
      :class="dark ? 'bg-white text-pikow-ink' : 'bg-pikow-gray text-pikow-ink'"
    />
  </div>
</template>
