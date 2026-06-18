import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    function setToken(value: string) {
      token.value = value
    }

    function logout() {
      token.value = null
    }

    return {
      token,
      isAuthenticated,
      setToken,
      logout,
    }
  },
  {
    persist: true,
  },
)
