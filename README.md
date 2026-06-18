# Front-Pikow

## Stack Technique

Le projet est basé sur les technologies modernes suivantes :

- **Framework :** Vue 3 + Typescript + vite
- **Gestion d'état :** Pinia
- **Style et UI :** Tailwind CSS v4, icônes via Lucide
- **Internationalisation (i18n) :** Vue I18n
- **Qualité de code :** ESLint, Prettier
- **Autres :** Leaflet (pour les cartes), Vue Signature Pad (pour le tableau blanc)

## Équipe et Répartition des Rôles

Le développement a été réparti de la manière suivante :

- **Gabriel MAILLARD** : Développement Front-end
- **Lucie FREIHAUT** : Développement Back-end

## Installation et Lancement

**Prérequis :** Node.js v22+ ou v24+ et npm.

```sh
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement (Hot-Reload)
npm run dev

# 3. Compiler et minifier pour la production
npm run build

# 4. Formater et vérifier le code
npm run lint
```

## Architecture du Projet

```text
src/
├── api/          # appels HTTP vers l'API (auth, games, pitches...)
├── assets/       # Fichiers statiques, feuilles de style globales (CSS), polices, logos
├── components/   # Composants Vue réutilisables
│   ├── icons/    # Icônes SVG
│   └── ui/       # Composants de base (boutons, inputs, sélecteurs...)
├── composables/  # Hooks (Composables Vue) réutilisables
├── i18n/         # internationalisation
├── locales/      # Traductions JSON (FR, EN...) utilisées
├── plugins/      # Initialisation de modules externes
├── router/       # Gestion des routes de l'application (Vue Router)
├── stores/       # Gestion globale de l'état avec Pinia (Auth, Cart, Game...)
├── utils/        # Fonctions utilitaires, helpers
├── views/        # Pages complètes associées aux routes (Home, Login, Dashboard...)
```

## Intégration Continue (CI)

La pipeline est configurée via GitHub Actions.

Cette CI se déclenche automatiquement lors d'un `push` sur les branches `main` et `develop` ou lors d'une `pull_request` vers `main`. Elle fait :

1. Cehck du code
2. Configuration de Node.js
3. Installation des dépendances (`npm install`)
4. Prettier Check : Vérifie que tout le code (TS, Vue, JS) respecte les standards de formatage.
5. ESLint : Exécute l'analyse statique du code (Linting) pour détecter et prévenir les bugs ou défauts de qualité.
