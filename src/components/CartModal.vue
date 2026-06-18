<script setup lang="ts">
import { X, Trash2, Minus, Plus } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const emit = defineEmits<{ close: [] }>()

function fmt(amount: number): string {
  return `${amount.toFixed(2)} €`
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-10"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
      <div class="flex items-center justify-between">
        <h2 class="font-display text-2xl text-pikow-ink">{{ $t('cart.title') }}</h2>
        <button
          class="flex size-9 cursor-pointer items-center justify-center rounded-full bg-pikow-gray text-pikow-ink"
          :aria-label="$t('cart.title')"
          @click="emit('close')"
        >
          <X class="size-5" />
        </button>
      </div>

      <p v-if="!cart.items.length" class="mt-6 text-center font-body text-sm text-pikow-ink/60">
        {{ $t('cart.empty') }}
      </p>

      <template v-else>
        <ul class="mt-6 flex flex-col gap-4">
          <li v-for="item in cart.items" :key="item.id" class="flex items-center gap-3">
            <div class="flex-1">
              <p class="font-body text-sm font-bold text-pikow-ink">{{ item.name }}</p>
              <p class="font-body text-sm text-pikow-ink/60">{{ fmt(item.price) }}</p>
            </div>
            <div class="flex items-center gap-2 rounded-full bg-pikow-gray px-2 py-1">
              <button
                class="flex size-7 cursor-pointer items-center justify-center rounded-full bg-white text-pikow-ink disabled:opacity-40"
                :disabled="item.quantity <= 1"
                @click="cart.setQuantity(item.id, item.quantity - 1)"
              >
                <Minus class="size-3.5" />
              </button>
              <span class="w-5 text-center font-body text-sm font-bold">{{ item.quantity }}</span>
              <button
                class="flex size-7 cursor-pointer items-center justify-center rounded-full bg-pikow-blue text-white"
                @click="cart.setQuantity(item.id, item.quantity + 1)"
              >
                <Plus class="size-3.5" />
              </button>
            </div>
            <button
              class="flex size-8 cursor-pointer items-center justify-center rounded-full text-pikow-red transition hover:bg-pikow-red/10"
              :aria-label="$t('cart.remove')"
              @click="cart.remove(item.id)"
            >
              <Trash2 class="size-4" />
            </button>
          </li>
        </ul>

        <div class="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
          <span class="font-body text-sm font-bold text-pikow-ink/60">{{ $t('cart.total') }}</span>
          <span class="font-display text-xl text-pikow-ink">{{ fmt(cart.total) }}</span>
        </div>

        <button
          class="mt-4 w-full cursor-pointer rounded-full bg-pikow-blue px-7 py-3 font-body text-sm font-bold text-white transition hover:bg-pikow-blue-dark active:scale-[0.99]"
        >
          {{ $t('cart.checkout') }}
        </button>
      </template>
    </div>
  </div>
</template>
