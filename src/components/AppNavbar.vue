<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ChevronDown, LogOut, Menu, User, X, LayoutGrid } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import PikowLogo from './PikowLogo.vue'
import BaseButton from './ui/BaseButton.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

withDefaults(
  defineProps<{
    links?: { key: string; href: string }[]
  }>(),
  {
    links: () => [
      { key: 'nav.home', href: '/' },
      { key: 'nav.shop', href: '#' },
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
        <li v-for="link in links" :key="link.key">
          <a
            :href="link.href"
            class="font-body text-sm font-bold text-pikow-ink transition hover:text-pikow-blue"
          >
            {{ $t(link.key) }}
          </a>
        </li>
      </ul>

      <div class="hidden items-center gap-4 md:flex">
        <BaseButton v-if="auth.isAuthenticated" variant="primary" to="/game/new">
          {{ $t('nav.play') }}
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
              {{ $t('nav.myGames') }}
            </RouterLink>
            <button
              class="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left font-body text-sm text-pikow-ink transition hover:bg-pikow-gray"
              @click="logout"
            >
              <LogOut class="size-4" />
              {{ $t('nav.logout') }}
            </button>
          </div>
        </div>
        <BaseButton v-else variant="primary" to="/login">{{ $t('nav.play') }}</BaseButton>
        <LanguageSwitcher />
      </div>

      <button class="text-pikow-ink md:hidden" :aria-label="$t('nav.language')" @click="open = !open">
        <X v-if="open" class="size-7" />
        <Menu v-else class="size-7" />
      </button>
    </nav>

    <ul v-if="open" class="flex flex-col gap-4 px-6 pb-6 md:hidden">
      <li v-for="link in links" :key="link.key">
        <a :href="link.href" class="font-body text-sm font-bold text-pikow-ink">
          {{ $t(link.key) }}
        </a>
      </li>
      <li v-if="auth.isAuthenticated" class="flex items-center gap-2 font-body text-sm font-bold">
        <User class="size-4 text-pikow-blue" />
        {{ auth.displayName }}
      </li>
      <li v-if="auth.isAuthenticated">
        <BaseButton variant="primary" block to="/game/new">{{ $t('nav.play') }}</BaseButton>
      </li>
      <li v-if="auth.isAuthenticated">
        <RouterLink
          to="/dashboard"
          class="block font-body text-sm font-bold text-pikow-ink"
          @click="open = false"
        >
          {{ $t('nav.myGames') }}
        </RouterLink>
      </li>
      <li v-if="auth.isAuthenticated">
        <BaseButton variant="secondary" block @click="logout">{{ $t('nav.logout') }}</BaseButton>
      </li>
      <li v-else><BaseButton variant="primary" block to="/login">{{ $t('nav.play') }}</BaseButton></li>
      <li><LanguageSwitcher /></li>
    </ul>
  </header>
</template>
