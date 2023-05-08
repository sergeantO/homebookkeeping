import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/balance',
      name: 'balance',
      component: () => import('../views/BalanceView.vue')
    },
    {
      path: '/account/:id',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/operations/:id?',
      name: 'operations',
      component: () => import('../views/OperationsView.vue')
    },
  ]
})

export default router
