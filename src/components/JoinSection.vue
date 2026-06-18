<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { sendContact } from '@/api/contact'
import SectionTitle from './ui/SectionTitle.vue'
import BaseInput from './ui/BaseInput.vue'
import BaseSelect from './ui/BaseSelect.vue'
import BaseTextarea from './ui/BaseTextarea.vue'
import BaseCheckbox from './ui/BaseCheckbox.vue'
import BaseButton from './ui/BaseButton.vue'

const { t } = useI18n()

const motifs = computed(() => [
  { label: t('join.motifContact'), value: 'contact' },
  { label: t('join.motifCompany'), value: 'revendeur' },
])

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
  return err?.message ?? t('join.errorGeneric')
}

async function onSubmit() {
  error.value = ''
  success.value = false

  if (!form.consent) {
    error.value = t('join.errorConsent')
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
      <SectionTitle light :title="$t('join.title')" :subtitle="$t('join.subtitle')" />

      <form class="mt-8 flex flex-col gap-5" @submit.prevent="onSubmit">
        <BaseSelect
          v-model="form.motif"
          dark
          :label="$t('join.motif')"
          id="join-motif"
          :options="motifs"
        />
        <div class="grid gap-5" :class="form.motif === 'revendeur' ? 'sm:grid-cols-2' : ''">
          <BaseInput
            v-if="form.motif === 'revendeur'"
            v-model="form.company"
            dark
            required
            :label="$t('join.company')"
            id="join-company"
          />
          <BaseInput
            v-model="form.email"
            dark
            required
            :label="$t('common.email')"
            id="join-email"
            type="email"
          />
        </div>
        <BaseTextarea
          v-model="form.message"
          dark
          required
          resizable
          :label="$t('common.message')"
          id="join-message"
          :rows="3"
        />
        <BaseCheckbox v-model="form.consent" dark>
          {{ $t('join.consent') }}
        </BaseCheckbox>

        <p v-if="error" class="font-body text-sm font-bold text-pikow-red">{{ error }}</p>
        <p v-if="success" class="font-body text-sm font-bold text-pikow-green">
          {{ $t('join.success') }}
        </p>

        <div class="flex justify-center">
          <BaseButton type="submit" variant="yellow">
            {{ loading ? $t('join.submitting') : $t('join.submit') }}
          </BaseButton>
        </div>
      </form>
    </div>
  </section>
</template>
