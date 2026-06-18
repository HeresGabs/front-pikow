<script setup lang="ts">
import { Linkedin, Instagram, Facebook, Music2 } from 'lucide-vue-next'
import PikowLogo from './PikowLogo.vue'
import SocialIcon from './SocialIcon.vue'
</script>

<template>
  <footer class="bg-white px-6 py-14">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
      <PikowLogo class="scale-150" />
      <div>
        <p class="mb-3 font-display text-lg text-pikow-ink">{{ $t('footer.follow') }}</p>
        <div class="flex justify-center gap-3">
          <SocialIcon :icon="Linkedin" color="blue" href="about:blank" />
          <SocialIcon :icon="Music2" color="pink" href="about:blank" />
          <SocialIcon :icon="Instagram" color="red" href="about:blank" />
          <SocialIcon :icon="Facebook" color="teal" href="about:blank" />
        </div>
      </div>
    </div>

    <p class="mt-12 text-center font-body text-xs text-pikow-ink/50">
      {{ $t('footer.rights') }}
    </p>
  </footer>
</template>
