<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { login, register } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import PikowLogo from '@/components/PikowLogo.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function errorMessage(e: unknown): string {
  const err = e as { violations?: { message: string }[]; message?: string }
  if (err?.violations?.length) return err.violations.map((v) => v.message).join(' ')
  return err?.message ?? 'Une erreur est survenue, réessaie.'
}

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await register({ email: email.value, password: password.value })
    const { token } = await login({ email: email.value, password: password.value })
    auth.setSession(token, email.value)
    router.push('/')
  } catch (e) {
    error.value = errorMessage(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-pikow-gray px-6 py-12">
    <RouterLink to="/"><PikowLogo /></RouterLink>

    <div class="mt-8 w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 class="font-display text-2xl text-pikow-ink">Créer un compte</h1>
      <p class="mt-1 font-body text-sm text-pikow-ink/60">
        Inscris-toi et lance ta première partie.
      </p>

      <form class="mt-6 flex flex-col gap-4" @submit.prevent="onSubmit">
        <BaseInput
          v-model="email"
          type="email"
          label="Email"
          id="register-email"
          placeholder="hello@pikow.fr"
        />
        <BaseInput
          v-model="password"
          type="password"
          label="Mot de passe"
          id="register-password"
          placeholder="••••••••"
        />
        <p v-if="error" class="font-body text-sm font-bold text-pikow-red">{{ error }}</p>
        <BaseButton type="submit" variant="primary" block>
          {{ loading ? 'Création…' : "S'inscrire & jouer !" }}
        </BaseButton>
      </form>

      <p class="mt-6 text-center font-body text-sm text-pikow-ink/60">
        Déjà un compte ?
        <RouterLink to="/login" class="font-bold text-pikow-blue">Se connecter</RouterLink>
      </p>
    </div>
  </div>
</template>
