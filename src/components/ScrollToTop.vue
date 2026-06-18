<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="visible"
      class="fixed right-6 bottom-6 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full bg-pikow-blue text-white shadow-lg transition hover:bg-pikow-blue-dark"
      :aria-label="$t('common.backToTop')"
      @click="toTop"
    >
      <ArrowUp class="size-5" />
    </button>
  </Transition>
</template>
