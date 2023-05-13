import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useAccountStore, useOpetationStore } from '../stores';

const ifAuthenticated = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (localStorage.getItem('accessToken')) {
    next();
    return;
  }

  router.push({ 
    name: 'login',
    params: {
      returnTo: to.path,
    },
  });
};

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/main.vue'),
      children: [
        { path: '', component: () => import('../views/TestView.vue') },
        {
          path: '/balance',
          name: 'balance',
          component: () => import('../views/BalanceView.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/account/:id',
          name: 'account',
          component: () => import('../views/AccountView.vue'),
          beforeEnter: ifAuthenticated
        },
        {
          path: '/operations/:id?',
          name: 'operations',
          component: () => import('../views/OperationsView.vue'),
          beforeEnter: ifAuthenticated
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
  ]
})

export default router
