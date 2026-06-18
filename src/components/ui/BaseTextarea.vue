<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  id?: string
  rows?: number
  dark?: boolean
  required?: boolean
  resizable?: boolean
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
      {{ label }}<span v-if="required" class="text-pikow-red">&nbsp;*</span>
    </label>
    <textarea
      :id="id"
      v-model="model"
      :rows="rows ?? 4"
      :placeholder="placeholder"
      :required="required"
      class="w-full rounded-3xl px-5 py-3 font-body text-sm outline-none transition focus:ring-2 focus:ring-pikow-blue/40"
      :class="[
        dark ? 'bg-white text-pikow-ink' : 'bg-pikow-gray text-pikow-ink',
        resizable ? 'resize-y' : 'resize-none',
      ]"
    />
  </div>
</template>
