<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { login } from '@/api/auth'
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
  return err?.message ?? 'Email ou mot de passe incorrect.'
}

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
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
  <div class="flex min-h-screen flex-col items-center justify-center bg-pikow-gray px-6 py-12">
    <RouterLink to="/"><PikowLogo /></RouterLink>

    <div class="mt-8 w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 class="font-display text-2xl text-pikow-ink">Connexion</h1>
      <p class="mt-1 font-body text-sm text-pikow-ink/60">Connecte-toi pour jouer à Pikow.</p>

      <form class="mt-6 flex flex-col gap-4" @submit.prevent="onSubmit">
        <BaseInput
          v-model="email"
          type="email"
          label="Email"
          id="login-email"
          placeholder="hello@pikow.fr"
        />
        <BaseInput
          v-model="password"
          type="password"
          label="Mot de passe"
          id="login-password"
          placeholder="••••••••"
        />
        <p v-if="error" class="font-body text-sm font-bold text-pikow-red">{{ error }}</p>
        <BaseButton type="submit" variant="primary" block>
          {{ loading ? 'Connexion…' : 'Se connecter' }}
        </BaseButton>
      </form>

      <p class="mt-6 text-center font-body text-sm text-pikow-ink/60">
        Pas encore de compte ?
        <RouterLink to="/register" class="font-bold text-pikow-blue">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>
