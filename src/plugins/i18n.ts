import { createI18n } from 'vue-i18n'
import frMessages from '../locales/fr.json'
import enMessages from '../locales/en.json'

// Import des traductions de base de Vuetify pour que ses composants parlent FR/EN
import { fr as vuetifyFr, en as enVuetify } from 'vuetify/locale'

const messages = {
  fr: {
    ...frMessages,
    $vuetify: vuetifyFr, // Fusionne les labels Vuetify
  },
  en: {
    ...enMessages,
    $vuetify: enVuetify, // Fusionne les labels Vuetify
  },
}

export const i18n = createI18n({
  legacy: false, // Requis pour l'utilisation de la Composition API (Vue 3)
  locale: 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de secours
  messages,
})
