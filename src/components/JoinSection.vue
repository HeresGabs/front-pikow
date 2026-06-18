<script setup lang="ts">
import { reactive, ref } from 'vue'
import { sendContact } from '@/api/contact'
import SectionTitle from './ui/SectionTitle.vue'
import BaseInput from './ui/BaseInput.vue'
import BaseSelect from './ui/BaseSelect.vue'
import BaseTextarea from './ui/BaseTextarea.vue'
import BaseCheckbox from './ui/BaseCheckbox.vue'
import BaseButton from './ui/BaseButton.vue'

const motifs = [
  { label: 'Contact', value: 'contact' },
  { label: 'Commande pour une entreprise', value: 'revendeur' },
]

const form = reactive({
  motif: 'contact',
  company: '',
  email: '',
  message: '',
  consent: false,
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

function errorMessage(e: unknown): string {
  const err = e as { violations?: { message: string }[]; message?: string }
  if (err?.violations?.length) return err.violations.map((v) => v.message).join(' ')
  return err?.message ?? 'Une erreur est survenue, réessaie.'
}

async function onSubmit() {
  error.value = ''
  success.value = false

  if (!form.consent) {
    error.value = 'Merci de cocher la case pour accepter le traitement de vos données.'
    return
  }

  loading.value = true
  try {
    await sendContact({
      type: form.motif === 'revendeur' ? 'revendeur' : 'contact',
      email: form.email,
      message: form.message,
      company: form.motif === 'revendeur' ? form.company.trim() : null,
    })
    success.value = true
    form.motif = 'contact'
    form.company = ''
    form.email = ''
    form.message = ''
    form.consent = false
  } catch (e) {
    error.value = errorMessage(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-pikow-blue px-6 py-14">
    <div class="mx-auto max-w-3xl">
      <SectionTitle
        light
        title="Nous rejoindre"
        subtitle="Contactez nous pour discuter de nouvelles opportunités"
      />

      <form class="mt-8 flex flex-col gap-5" @submit.prevent="onSubmit">
        <BaseSelect v-model="form.motif" dark label="Motif" id="join-motif" :options="motifs" />
        <div class="grid gap-5" :class="form.motif === 'revendeur' ? 'sm:grid-cols-2' : ''">
          <BaseInput
            v-if="form.motif === 'revendeur'"
            v-model="form.company"
            dark
            required
            label="Société"
            id="join-company"
          />
          <BaseInput
            v-model="form.email"
            dark
            required
            label="Email"
            id="join-email"
            type="email"
          />
        </div>
        <BaseTextarea
          v-model="form.message"
          dark
          required
          label="Message"
          id="join-message"
          :rows="3"
        />
        <BaseCheckbox v-model="form.consent" dark>
          En cochant cette case, j'accepte que les données saisies soient utilisées par Pikow pour
          traiter ma demande et m'apporter une réponse.
        </BaseCheckbox>

        <p v-if="error" class="font-body text-sm font-bold text-white">{{ error }}</p>
        <p v-if="success" class="font-body text-sm font-bold text-white">
          Merci ! Votre message a bien été envoyé.
        </p>

        <div class="flex justify-center">
          <BaseButton type="submit" variant="yellow">
            {{ loading ? 'Envoi…' : 'Rejoindre' }}
          </BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>
