<script setup lang="ts">
import { reactive } from 'vue'
import { Linkedin, Instagram, Facebook, Music2 } from 'lucide-vue-next'
import PikowLogo from './PikowLogo.vue'
import SocialIcon from './SocialIcon.vue'
import BaseInput from './ui/BaseInput.vue'
import BaseTextarea from './ui/BaseTextarea.vue'
import BaseButton from './ui/BaseButton.vue'

const form = reactive({ email: '', message: '' })
</script>

<template>
  <footer class="bg-white px-6 py-14">
    <div class="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
      <div class="flex flex-col items-center gap-6 text-center">
        <PikowLogo class="scale-150" />
        <div>
          <p class="mb-3 font-display text-lg text-pikow-ink">Nous suivre</p>
          <div class="flex justify-center gap-3">
            <SocialIcon :icon="Linkedin" color="blue" />
            <SocialIcon :icon="Music2" color="pink" />
            <SocialIcon :icon="Instagram" color="red" />
            <SocialIcon :icon="Facebook" color="teal" />
          </div>
        </div>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent>
        <BaseInput v-model="form.email" label="Email" id="footer-email" type="email" />
        <BaseTextarea v-model="form.message" label="Message" id="footer-message" :rows="3" />
        <BaseButton type="submit" variant="primary" block>Contacter</BaseButton>
      </form>
    </div>

    <p class="mt-12 text-center font-body text-xs text-pikow-ink/50">
      2026 Pikow. Tous droits réservés.
    </p>
  </footer>
</template>
