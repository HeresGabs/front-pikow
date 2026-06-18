<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { login, register } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import PikowLogo from '@/components/PikowLogo.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function errorMessage(e: unknown): string {
  const err = e as { violations?: { message: string }[]; message?: string }
  if (err?.violations?.length) return err.violations.map((v) => v.message).join(' ')
  return err?.message ?? t('auth.registerError')
}

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await register({ email: email.value, password: password.value })
    const { token } = await login({ email: email.value, password: password.value })
    auth.setSession(token, email.value)
    router.push('/game/new')
  } catch (e) {
    error.value = errorMessage(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center bg-pikow-gray px-6 py-12">
    <RouterLink
      to="/"
      class="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-bold text-pikow-ink shadow-sm transition hover:bg-pikow-gray"
    >
      <ArrowLeft class="size-4" />
      {{ $t('common.backHome') }}
    </RouterLink>

    <RouterLink to="/"><PikowLogo /></RouterLink>

    <div class="mt-8 w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 class="font-display text-2xl text-pikow-ink">{{ $t('auth.registerTitle') }}</h1>
      <p class="mt-1 font-body text-sm text-pikow-ink/60">
        {{ $t('auth.registerSubtitle') }}
      </p>

      <form class="mt-6 flex flex-col gap-4" @submit.prevent="onSubmit">
        <BaseInput
          v-model="email"
          type="email"
          :label="$t('auth.emailLabel')"
          id="register-email"
          :placeholder="$t('auth.emailPlaceholder')"
        />
        <BaseInput
          v-model="password"
          type="password"
          :label="$t('auth.passwordLabel')"
          id="register-password"
          :placeholder="$t('auth.passwordPlaceholder')"
        />
        <p v-if="error" class="font-body text-sm font-bold text-pikow-red">{{ error }}</p>
        <BaseButton type="submit" variant="primary" block>
          {{ loading ? $t('auth.registerSubmitting') : $t('auth.registerSubmit') }}
        </BaseButton>
      </form>

      <p class="mt-6 text-center font-body text-sm text-pikow-ink/60">
        {{ $t('auth.registerHave') }}
        <RouterLink to="/login" class="font-bold text-pikow-blue">{{
          $t('auth.registerLogin')
        }}</RouterLink>
      </p>
    </div>
  </div>
</template>
