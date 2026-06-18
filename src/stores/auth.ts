import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    const email = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    const displayName = computed(() => {
      if (!email.value) return ''
      return email.value.split('@')[0]
    })

    function setSession(value: string, userEmail: string) {
      token.value = value
      email.value = userEmail
    }

    function logout() {
      token.value = null
      email.value = null
    }

    return {
      token,
      email,
      isAuthenticated,
      displayName,
      setSession,
      logout,
    }
  },
  {
    persist: true,
  },
)
