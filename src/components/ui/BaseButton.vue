<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'yellow' | 'red'
    type?: 'button' | 'submit' | 'reset'
    href?: string
    to?: string
    block?: boolean
  }>(),
  { variant: 'primary', type: 'button', block: false }
)

const variants: Record<string, string> = {
  primary: 'bg-pikow-blue text-white hover:bg-pikow-blue-dark',
  secondary: 'bg-white text-pikow-ink shadow-sm hover:bg-pikow-gray',
  yellow: 'bg-pikow-yellow text-white hover:brightness-95',
  red: 'bg-pikow-red text-white hover:brightness-95',
}

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))
const classes = computed(() => [variants[props.variant], props.block ? 'w-full' : ''])
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="to || href ? undefined : type"
    class="inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3 font-body text-sm font-bold transition active:scale-95"
    :class="classes"
  >
    <slot />
  </component>
</template>
