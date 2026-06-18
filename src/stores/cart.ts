import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([])

    const count = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
    const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

    function add(item: Omit<CartItem, 'quantity'>, quantity = 1) {
      const existing = items.value.find((i) => i.id === item.id)
      if (existing) existing.quantity += quantity
      else items.value.push({ ...item, quantity })
    }

    function remove(id: string) {
      items.value = items.value.filter((i) => i.id !== id)
    }

    function setQuantity(id: string, quantity: number) {
      const item = items.value.find((i) => i.id === id)
      if (item) item.quantity = Math.max(1, quantity)
    }

    function clear() {
      items.value = []
    }

    return { items, count, total, add, remove, setQuantity, clear }
  },
  {
    persist: true,
  }
)
