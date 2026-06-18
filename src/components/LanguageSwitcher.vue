<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from 'lucide-vue-next'
import { LOCALE_META, SUPPORTED_LOCALES, setLocale, type Locale } from '@/i18n'

const { locale, t } = useI18n()
const open = ref(false)

function choose(value: Locale) {
  setLocale(value)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3 py-2 font-body text-sm font-bold text-pikow-ink shadow-sm"
      :aria-label="t('nav.language')"
      @click="open = !open"
    >
      <span class="text-base leading-none">{{ LOCALE_META[locale as Locale].flag }}</span>
      <span class="uppercase">{{ locale }}</span>
      <ChevronDown class="size-4" />
    </button>
    <div
      v-if="open"
      class="absolute right-0 z-40 mt-2 w-40 overflow-hidden rounded-2xl bg-white py-1 shadow-lg"
    >
      <button
        v-for="code in SUPPORTED_LOCALES"
        :key="code"
        class="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left font-body text-sm transition hover:bg-pikow-gray"
        :class="locale === code ? 'font-bold text-pikow-blue' : 'text-pikow-ink'"
        @click="choose(code)"
      >
        <span class="text-base leading-none">{{ LOCALE_META[code].flag }}</span>
        {{ LOCALE_META[code].label }}
      </button>
    </div>
  </div>
</template>
