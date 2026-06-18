<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import PikowLogo from '@/components/PikowLogo.vue'
import AssociationCard from '@/components/AssociationCard.vue'
import ProductChip from '@/components/ProductChip.vue'
import StepCard from '@/components/StepCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import TestimonialCard from '@/components/TestimonialCard.vue'
import JoinSection from '@/components/JoinSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SocialIcon from '@/components/SocialIcon.vue'

import BaseButton from '@/components/ui/BaseButton.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import FilterPill from '@/components/ui/FilterPill.vue'

import {
  Tablet,
  Shuffle,
  Timer,
  Trophy,
  Users,
  Linkedin,
  Instagram,
  Facebook,
  Music2,
} from 'lucide-vue-next'
</script>

<template>
  <main class="min-h-screen bg-white pb-24">
    <div class="bg-pikow-ink px-6 py-10 text-center text-white">
      <h1 class="font-display text-3xl">Bibliothèque de composants Pikow</h1>
    </div>

    <div class="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;AppNavbar /&gt;</p>
        <div class="overflow-hidden rounded-2xl border border-black/10">
          <AppNavbar />
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;PikowLogo /&gt;</p>
        <div class="flex flex-wrap items-center gap-8 rounded-2xl border border-black/10 p-8">
          <PikowLogo />
          <div class="rounded-xl bg-pikow-blue p-4"><PikowLogo light /></div>
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;BaseButton variant="…" /&gt;</p>
        <div class="flex flex-wrap gap-4 rounded-2xl border border-black/10 p-8">
          <BaseButton variant="primary">S'inscrire &amp; jouer !</BaseButton>
          <BaseButton variant="secondary">Voir comment ça marche</BaseButton>
          <BaseButton variant="yellow">Rejoindre</BaseButton>
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;SectionTitle /&gt;</p>
        <div class="rounded-2xl border border-black/10 p-8">
          <SectionTitle title="Ils l'ont testé !" subtitle="Avis vérifiés des joueurs" />
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">
          &lt;AssociationCard /&gt; &amp; &lt;ProductChip /&gt;
        </p>
        <div class="grid items-start gap-6 rounded-2xl border border-black/10 p-8 sm:grid-cols-2">
          <AssociationCard />
          <div class="flex flex-wrap gap-4">
            <ProductChip name="Pizza" emoji="🍕" color="pink" />
            <ProductChip name="Ballon" emoji="🏐" color="yellow" />
            <ProductChip name="Robot" emoji="🤖" color="blue" />
          </div>
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;StepCard /&gt;</p>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;CategoryCard color="…" /&gt;</p>
        <div class="grid gap-5 sm:grid-cols-3">
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
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;TestimonialCard /&gt;</p>
        <div class="grid gap-5 sm:grid-cols-3">
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
            :rating="4"
            title="Super jeu !"
            text="Si vous jouez pas au jeu vous ratez vraiment quelque chose !"
          />
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">
          &lt;SearchBar /&gt; &amp; &lt;FilterPill /&gt;
        </p>
        <div class="flex flex-col items-center gap-4 rounded-2xl bg-pikow-gray p-8">
          <SearchBar placeholder="Chablis…" class="max-w-md" />
          <div class="flex gap-2">
            <FilterPill label="+10km" />
            <FilterPill label="+20km" />
            <FilterPill label="+30km" active />
          </div>
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">
          &lt;BaseInput /&gt; &amp; &lt;BaseTextarea /&gt; &amp; &lt;BaseCheckbox /&gt;
        </p>
        <div class="grid gap-6 rounded-2xl border border-black/10 p-8 md:grid-cols-2">
          <div class="flex flex-col gap-4">
            <BaseInput label="Société" placeholder="Pikow" id="demo-company" />
            <BaseInput label="Email" type="email" placeholder="hello@pikow.fr" id="demo-email" />
            <BaseTextarea label="Message" placeholder="Votre message…" id="demo-message" />
            <BaseCheckbox>J'accepte les conditions d'utilisation.</BaseCheckbox>
          </div>
          <div class="flex flex-col gap-4 rounded-xl bg-pikow-blue p-6">
            <BaseInput dark label="Société" placeholder="Pikow" id="demo-company-dark" />
            <BaseTextarea
              dark
              label="Message"
              placeholder="Votre message…"
              id="demo-message-dark"
            />
            <BaseCheckbox dark>Version sur fond foncé.</BaseCheckbox>
          </div>
        </div>
      </section>

      <section>
        <p class="mb-4 font-mono text-xs text-pikow-ink/40">&lt;SocialIcon /&gt;</p>
        <div class="flex gap-3 rounded-2xl border border-black/10 p-8">
          <SocialIcon :icon="Linkedin" color="blue" />
          <SocialIcon :icon="Music2" color="pink" />
          <SocialIcon :icon="Instagram" color="red" />
          <SocialIcon :icon="Facebook" color="teal" />
        </div>
      </section>
    </div>

    <p class="mx-auto mb-4 max-w-5xl px-6 font-mono text-xs text-pikow-ink/40">
      &lt;JoinSection /&gt;
    </p>
    <JoinSection />

    <p class="mx-auto mt-16 mb-4 max-w-5xl px-6 font-mono text-xs text-pikow-ink/40">
      &lt;SiteFooter /&gt;
    </p>
    <SiteFooter />
  </main>
</template>
