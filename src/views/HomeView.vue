<script setup lang="ts">
import { Tablet, Shuffle, Timer, Trophy, Users } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'
import AssociationCard from '@/components/AssociationCard.vue'
import StepCard from '@/components/StepCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import TestimonialCard from '@/components/TestimonialCard.vue'
import StoreLocator from '@/components/StoreLocator.vue'
import JoinSection from '@/components/JoinSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const auth = useAuthStore()

const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.shop', href: '/boutique' },
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppNavbar :links="navLinks" />

    <section class="bg-pikow-gray px-6 py-14 sm:py-20">
      <div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <i18n-t
            keypath="hero.title"
            tag="h1"
            class="font-display text-4xl leading-tight sm:text-5xl"
          >
            <template #highlight>
              <span class="text-pikow-blue">{{ $t('hero.highlight') }}</span>
            </template>
          </i18n-t>
          <p class="mt-5 max-w-md font-body text-sm text-pikow-ink/70">
            {{ $t('hero.subtitle') }}
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <BaseButton v-if="auth.isAuthenticated" variant="primary" to="/game/new">
              {{ $t('hero.startGame') }}
            </BaseButton>
            <BaseButton v-else variant="primary" to="/register">{{
              $t('hero.register')
            }}</BaseButton>
            <BaseButton variant="secondary" href="#comment-ca-marche">
              {{ $t('hero.howItWorks') }}
            </BaseButton>
          </div>
        </div>
        <AssociationCard class="mx-auto w-full max-w-md" />
      </div>
    </section>

    <section id="comment-ca-marche" class="scroll-mt-6 bg-white px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle :title="$t('how.title')" />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            :step="$t('how.step', { n: 1 })"
            :title="$t('how.s1Title')"
            :icon="Tablet"
            iconColor="blue"
            :description="$t('how.s1Desc')"
          />
          <StepCard
            :step="$t('how.step', { n: 2 })"
            :title="$t('how.s2Title')"
            :icon="Shuffle"
            iconColor="pink"
            :description="$t('how.s2Desc')"
          />
          <StepCard
            :step="$t('how.step', { n: 3 })"
            :title="$t('how.s3Title')"
            :icon="Timer"
            iconColor="red"
            :description="$t('how.s3Desc')"
          />
          <StepCard
            :step="$t('how.step', { n: 4 })"
            :title="$t('how.s4Title')"
            :icon="Trophy"
            iconColor="green"
            :description="$t('how.s4Desc')"
          />
        </div>
      </div>
    </section>

    <section class="bg-pikow-gray px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle :title="$t('bands.title')" />
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <CategoryCard
            color="yellow"
            :icon="Users"
            :title="$t('bands.familiesTitle')"
            :description="$t('bands.familiesDesc')"
          />
          <CategoryCard
            color="green"
            :icon="Users"
            :title="$t('bands.companiesTitle')"
            :description="$t('bands.companiesDesc')"
          />
          <CategoryCard
            color="blue"
            :icon="Users"
            :title="$t('bands.schoolsTitle')"
            :description="$t('bands.schoolsDesc')"
          />
        </div>
      </div>
    </section>

    <section class="bg-white px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle :title="$t('reviews.title')" :subtitle="$t('reviews.subtitle')" />
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <TestimonialCard
            v-for="i in 3"
            :key="i"
            :name="$t('reviews.name')"
            :rating="5"
            :title="$t('reviews.reviewTitle')"
            :text="$t('reviews.reviewText')"
          />
        </div>
      </div>
    </section>

    <StoreLocator />

    <JoinSection />

    <SiteFooter />
  </div>
</template>
