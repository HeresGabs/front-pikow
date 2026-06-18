<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Star, Minus, Plus, Truck, ShieldCheck, CircleCheck } from 'lucide-vue-next'
import AppNavbar from '@/components/AppNavbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useCartStore } from '@/stores/cart'
import boitePikow from '@/assets/boite_pikow.png'

const cart = useCartStore()
const { t } = useI18n()

const PRODUCT_ID = 'impro-rigolow'
const PRICE = 34.9
const OLD_PRICE = 44.9
const RATING = 4.9
const RATING_COUNT = 312

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/boutique' },
]

const quantity = ref(1)
const discount = computed(() => Math.round((1 - PRICE / OLD_PRICE) * 100))
const boxKeys = ['shop.box1', 'shop.box2', 'shop.box3', 'shop.box4', 'shop.box5']
const reviews = [
  { key: 'shop.review1', rating: 5, author: 'Camille' },
  { key: 'shop.review2', rating: 5, author: 'Yann (RH)' },
  { key: 'shop.review3', rating: 4, author: 'Mme Roux' },
]

function price(amount: number): string {
  return `${amount.toFixed(2)} €`
}

function addToCart() {
  cart.add({ id: PRODUCT_ID, name: t('shop.productName'), price: PRICE }, quantity.value)
}
</script>

<template>
  <div class="min-h-screen bg-pikow-gray">
    <AppNavbar :links="navLinks" show-cart />

    <main class="mx-auto max-w-6xl px-6 py-10">
      <div class="grid gap-10 lg:grid-cols-2">
        <div>
          <div
            class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl bg-pikow-blue"
          >
            <img
              :src="boitePikow"
              :alt="$t('shop.productName')"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center gap-2">
            <span class="flex gap-0.5 text-pikow-yellow">
              <Star v-for="n in 5" :key="n" class="size-5 fill-current" />
            </span>
            <span class="font-body text-sm font-bold text-pikow-ink/70">
              {{ RATING.toFixed(1) }} · {{ RATING_COUNT }} {{ $t('shop.reviews') }}
            </span>
          </div>

          <h1 class="mt-3 font-display text-4xl text-pikow-ink">{{ $t('shop.productName') }}</h1>
          <p class="mt-3 max-w-md font-body text-sm text-pikow-ink/60">{{ $t('shop.subtitle') }}</p>

          <div class="mt-6 flex items-center gap-3">
            <span class="font-display text-3xl text-pikow-ink">{{ price(PRICE) }}</span>
            <span class="font-body text-lg text-pikow-ink/40 line-through">{{
              price(OLD_PRICE)
            }}</span>
            <span
              class="rounded-full bg-pikow-red px-2.5 py-1 font-body text-xs font-bold text-white"
            >
              -{{ discount }}%
            </span>
          </div>

          <div class="mt-6 flex items-center gap-4">
            <div class="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm">
              <button
                class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-pikow-gray text-pikow-ink disabled:opacity-40"
                :disabled="quantity <= 1"
                @click="quantity--"
              >
                <Minus class="size-4" />
              </button>
              <span class="w-6 text-center font-body font-bold">{{ quantity }}</span>
              <button
                class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-pikow-blue text-white"
                @click="quantity++"
              >
                <Plus class="size-4" />
              </button>
            </div>
            <span class="font-body text-sm font-bold text-pikow-teal">{{
              $t('shop.inStock')
            }}</span>
          </div>

          <button
            class="mt-6 flex w-full cursor-pointer items-center justify-center rounded-full bg-pikow-blue px-7 py-4 font-body text-base font-bold text-white transition hover:bg-pikow-blue-dark active:scale-[0.99]"
            @click="addToCart"
          >
            {{ $t('shop.addToCart') }} · {{ price(PRICE * quantity) }}
          </button>

          <div class="mt-4 flex flex-wrap gap-6 font-body text-sm text-pikow-ink/60">
            <span class="flex items-center gap-2"
              ><Truck class="size-4" /> {{ $t('shop.delivery') }}</span
            >
            <span class="flex items-center gap-2">
              <ShieldCheck class="size-4" /> {{ $t('shop.securePayment') }}
            </span>
          </div>

          <div class="mt-7 rounded-3xl bg-white p-6 shadow-sm">
            <p class="font-display text-lg text-pikow-ink">{{ $t('shop.inBox') }}</p>
            <ul class="mt-4 flex flex-col gap-3">
              <li
                v-for="key in boxKeys"
                :key="key"
                class="flex items-center gap-3 font-body text-sm text-pikow-ink/80"
              >
                <CircleCheck class="size-5 shrink-0 fill-pikow-teal text-white" />
                {{ $t(key) }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section class="mt-16">
        <h2 class="font-display text-3xl text-pikow-ink">{{ $t('shop.lovedTitle') }}</h2>
        <div class="mt-6 grid gap-5 sm:grid-cols-3">
          <div
            v-for="review in reviews"
            :key="review.key"
            class="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
          >
            <span class="flex gap-0.5 text-pikow-yellow">
              <Star v-for="n in review.rating" :key="n" class="size-4 fill-current" />
            </span>
            <p class="mt-3 font-body text-sm font-bold text-pikow-ink">« {{ $t(review.key) }} »</p>
            <p class="mt-3 font-body text-sm text-pikow-ink/50">- {{ review.author }}</p>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
