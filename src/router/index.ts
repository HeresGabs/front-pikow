import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Pages publiques
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/boutique',
      name: 'boutique',
      component: () => import('../views/BoutiqueView.vue'),
    },

    // Pages protégées
    {
      path: '/game/new',
      name: 'game-new',
      component: () => import('../views/GameNewView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/game/:id/pitch',
      name: 'game-pitch',
      component: () => import('../views/GamePitchView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/game/:id/results',
      name: 'game-results',
      component: () => import('../views/GameResultsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// Guard
router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router