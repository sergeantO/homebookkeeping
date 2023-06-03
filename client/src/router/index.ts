import { createRouter, createWebHashHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { userInfo } from '@/services/userInfo';

const ifAuthenticated = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if ( userInfo.getAccess() ) {
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
        {
          path: '/balance',
          alias: ['/'],
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
