/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes as autoRoutes } from 'vue-router/auto-routes';

const defaultLocale = 'en';

const routes = [
  {
    path: '/:locale(en|ru)?',
    component: () => import('../layouts/default.vue'),
    children: [
      ...setupLayouts(autoRoutes),
      {
        path: '', // matches /en or /ru
        name: 'home',
        component: () => import('../pages/index.vue'),
      },
      {
        path: 'map', // matches /en or /ru
        name: 'map',
        component: () => import('../pages/Map.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: `/${defaultLocale}`,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: `/${defaultLocale}`,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
