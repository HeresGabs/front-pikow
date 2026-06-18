<script setup lang="ts">
import { reactive } from 'vue'
import SectionTitle from './ui/SectionTitle.vue'
import BaseInput from './ui/BaseInput.vue'
import BaseTextarea from './ui/BaseTextarea.vue'
import BaseCheckbox from './ui/BaseCheckbox.vue'
import BaseButton from './ui/BaseButton.vue'

const form = reactive({
  company: '',
  email: '',
  message: '',
  consent: false,
})
</script>

<template>
  <section class="bg-pikow-blue px-6 py-14">
    <div class="mx-auto max-w-3xl">
      <SectionTitle
        light
        title="Nous rejoindre"
        subtitle="Contactez nous pour discuter de nouvelles opportunités"
      />

      <form class="mt-8 flex flex-col gap-5" @submit.prevent>
        <div class="grid gap-5 sm:grid-cols-2">
          <BaseInput v-model="form.company" dark label="Société" id="join-company" />
          <BaseInput v-model="form.email" dark label="Email" id="join-email" type="email" />
        </div>
        <BaseTextarea v-model="form.message" dark label="Message" id="join-message" :rows="3" />
        <BaseCheckbox v-model="form.consent" dark>
          En cochant cette case, j'accepte que les données saisies soient utilisées par Pikow pour
          traiter ma demande et m'apporter une réponse.
        </BaseCheckbox>
        <div class="flex justify-center">
          <BaseButton type="submit" variant="yellow">Rejoindre</BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>
