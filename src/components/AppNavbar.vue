<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ChevronDown, LogOut, Menu, User, X, LayoutGrid } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import PikowLogo from './PikowLogo.vue'
import BaseButton from './ui/BaseButton.vue'

withDefaults(
  defineProps<{
    links?: { label: string; href: string }[]
  }>(),
  {
    links: () => [
      { label: 'Accueil', href: '/' },
      { label: 'Boutique', href: '#' },
    ],
  },
)

const router = useRouter()
const auth = useAuthStore()

const open = ref(false)
const userMenu = ref(false)

function logout() {
  auth.logout()
  userMenu.value = false
  open.value = false
  router.push('/')
}
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
        <BaseButton v-if="auth.isAuthenticated" variant="primary" to="/game/new">
          Jouer
        </BaseButton>
        <div v-if="auth.isAuthenticated" class="relative">
          <button
            class="flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-bold text-pikow-ink shadow-sm"
            @click="userMenu = !userMenu"
          >
            <User class="size-4 text-pikow-blue" />
            {{ auth.displayName }}
            <ChevronDown class="size-4" />
          </button>
          <div
            v-if="userMenu"
            class="absolute right-0 z-30 mt-2 w-48 overflow-hidden rounded-2xl bg-white py-1 shadow-lg"
          >
            <RouterLink
              to="/dashboard"
              class="flex w-full items-center gap-2 px-4 py-2.5 font-body text-sm text-pikow-ink transition hover:bg-pikow-gray"
              @click="userMenu = false"
            >
              <LayoutGrid class="size-4" />
              Mes parties
            </RouterLink>
            <button
              class="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left font-body text-sm text-pikow-ink transition hover:bg-pikow-gray"
              @click="logout"
            >
              <LogOut class="size-4" />
              Se déconnecter
            </button>
          </div>
        </div>
        <BaseButton v-else variant="primary" to="/login">Jouer</BaseButton>
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
      <li v-if="auth.isAuthenticated" class="flex items-center gap-2 font-body text-sm font-bold">
        <User class="size-4 text-pikow-blue" />
        {{ auth.displayName }}
      </li>
      <li v-if="auth.isAuthenticated">
        <BaseButton variant="primary" block to="/game/new">Jouer</BaseButton>
      </li>
      <li v-if="auth.isAuthenticated">
        <RouterLink
          to="/dashboard"
          class="block font-body text-sm font-bold text-pikow-ink"
          @click="open = false"
        >
          Mes parties
        </RouterLink>
      </li>
      <li v-if="auth.isAuthenticated">
        <BaseButton variant="secondary" block @click="logout">Se déconnecter</BaseButton>
      </li>
      <li v-else><BaseButton variant="primary" block to="/login">Jouer</BaseButton></li>
    </ul>
  </header>
</template>
