<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="rounded-full px-4 py-1.5 font-body text-xs font-bold transition"
    :class="
      active
        ? 'bg-pikow-blue text-white'
        : 'bg-white text-pikow-ink/70 hover:bg-pikow-gray'
    "
  >
    {{ label }}
  </button>
</template>
