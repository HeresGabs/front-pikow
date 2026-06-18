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
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: 'about:blank' },
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppNavbar :links="navLinks" />

    <section class="bg-pikow-gray px-6 py-14 sm:py-20">
      <div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h1 class="font-display text-4xl leading-tight sm:text-5xl">
            Inventez des produits
            <span class="text-pikow-blue">complètement</span>
            improbables.
          </h1>
          <p class="mt-5 max-w-md font-body text-sm text-pikow-ink/70">
            Inspiré de « Qui veut être mon associé ? », Pikow associe deux objets au hasard… à vous
            d'en faire le pitch du siècle !
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <BaseButton v-if="auth.isAuthenticated" variant="primary" to="/game/new">
              Lancer une partie
            </BaseButton>
            <BaseButton v-else variant="primary" to="/register"
              >S'inscrire &amp; jouer !</BaseButton
            >
            <BaseButton variant="secondary" href="#comment-ca-marche">
              Voir comment ça marche
            </BaseButton>
          </div>
        </div>
        <AssociationCard class="mx-auto w-full max-w-md" />
      </div>
    </section>

    <section id="comment-ca-marche" class="scroll-mt-6 bg-white px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle title="Comment ça marche ?" />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StepCard
            step="Etape 1"
            title="Une seule tablette"
            :icon="Tablet"
            iconColor="blue"
            description="Tout le monde joue autour d'un seul appareil partagé."
          />
          <StepCard
            step="Etape 2"
            title="Deux mots improbables"
            :icon="Shuffle"
            iconColor="pink"
            description="L'app tire au sort deux objets à associer."
          />
          <StepCard
            step="Etape 3"
            title="Pitch chronométré"
            :icon="Timer"
            iconColor="red"
            description="Tout le monde joue autour d'un seul appareil partagé."
          />
          <StepCard
            step="Etape 4"
            title="Votez"
            :icon="Trophy"
            iconColor="green"
            description="La meilleure idée remporte la partie."
          />
        </div>
      </div>
    </section>

    <section class="bg-pikow-gray px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle title="Pour toutes les bandes" />
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <CategoryCard
            color="yellow"
            :icon="Users"
            title="Familles"
            description="Des fous rires partagés à partir de 7 ans."
          />
          <CategoryCard
            color="green"
            :icon="Users"
            title="Entreprises"
            description="L'ice breaker parfait pour vos équipes."
          />
          <CategoryCard
            color="blue"
            :icon="Users"
            title="Écoles"
            description="Tout le monde joue autour d'un seul appareil partagé."
          />
        </div>
      </div>
    </section>

    <section class="bg-white px-6 py-16">
      <div class="mx-auto max-w-6xl">
        <SectionTitle title="Ils l'ont testé !" subtitle="Avis vérifiés des joueurs" />
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <TestimonialCard
            name="Amélie Poulain"
            :rating="5"
            title="Super jeu !"
            text="Si vous jouez pas au jeu vous ratez vraiment quelque chose !"
          />
          <TestimonialCard
            name="Amélie Poulain"
            :rating="5"
            title="Super jeu !"
            text="Si vous jouez pas au jeu vous ratez vraiment quelque chose !"
          />
          <TestimonialCard
            name="Amélie Poulain"
            :rating="5"
            title="Super jeu !"
            text="Si vous jouez pas au jeu vous ratez vraiment quelque chose !"
          />
        </div>
      </div>
    </section>

    <StoreLocator />

    <JoinSection />

    <SiteFooter />
  </div>
</template>
