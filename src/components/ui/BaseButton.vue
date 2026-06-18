<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'yellow'
    type?: 'button' | 'submit' | 'reset'
    href?: string
    block?: boolean
  }>(),
  { variant: 'primary', type: 'button', block: false },
)

const variants: Record<string, string> = {
  primary: 'bg-pikow-blue text-white hover:bg-pikow-blue-dark',
  secondary: 'bg-white text-pikow-ink shadow-sm hover:bg-pikow-gray',
  yellow: 'bg-pikow-yellow text-white hover:brightness-95',
}

const classes = computed(() => [variants[props.variant], props.block ? 'w-full' : ''])
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    class="inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 font-body text-sm font-bold transition active:scale-95"
    :class="classes"
  >
    <slot />
  </component>
</template>
