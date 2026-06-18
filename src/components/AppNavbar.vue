<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import PikowLogo from './PikowLogo.vue'
import BaseButton from './ui/BaseButton.vue'

withDefaults(
  defineProps<{
    links?: { label: string; href: string }[]
  }>(),
  {
    links: () => [
      { label: 'Accueil', href: '#' },
      { label: 'Boutique', href: '#' },
    ],
  }
)

const open = ref(false)
</script>

<template>
  <header class="w-full bg-pikow-gray">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <PikowLogo />

      <ul class="hidden items-center gap-8 md:flex">
        <li v-for="link in links" :key="link.label">
          <a
            :href="link.href"
            class="font-body text-sm font-bold text-pikow-ink transition hover:text-pikow-blue"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="hidden items-center gap-4 md:flex">
        <BaseButton variant="primary">Jouer</BaseButton>
        <button class="text-xl" aria-label="Changer de langue">🇫🇷</button>
      </div>

      <button class="text-pikow-ink md:hidden" aria-label="Menu" @click="open = !open">
        <X v-if="open" class="size-7" />
        <Menu v-else class="size-7" />
      </button>
    </nav>

    <ul v-if="open" class="flex flex-col gap-4 px-6 pb-6 md:hidden">
      <li v-for="link in links" :key="link.label">
        <a :href="link.href" class="font-body text-sm font-bold text-pikow-ink">
          {{ link.label }}
        </a>
      </li>
      <li><BaseButton variant="primary" block>Jouer</BaseButton></li>
    </ul>
  </header>
</template>
